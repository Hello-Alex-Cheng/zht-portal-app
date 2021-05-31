<template>
  <div class='qr-wrapper'>
    <div id="container"></div>
    <div class="other-login">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { getUrlParam } from '@/utils'
import config from '@/configs'
import request from '@/utils/request'
import router from '@/router'
import { setToken } from '@/utils/auth'
import { message } from 'ant-design-vue'

export default defineComponent ({
  name: 'QRCode',
  setup () {
    const redirect_uri = ref('')

    const getDdInfo = () => {
      const ddCode = getUrlParam('state')
      if (ddCode === 'DD_STATE') {
        // 判断是钉钉扫码进来的
        // 获取 钉钉临时授权 code  去拿用户信息
        const code = getUrlParam('code')
        request({
          baseURL: config.loginAprUrl + '?grant_type=social&scope=server&type=zht_ding&dingCode=' + code,
          method: 'POST',
          headers: {
            Authorization: 'Basic dG91cjp0b3Vy'
          }
        })
          .then(res => {
            const { expires_in, access_token } = res
            setToken(access_token, expires_in)

            router.push({ path: '/' })
          })
          .catch(err => {
            console.log('钉钉登录错误', err)
            message.error(err || '钉钉登录失败')
          })
      }
    }

    const showDDQRCode = () => {
      redirect_uri.value = window.location.origin // 获取来源路径

      const goto = encodeURIComponent(
        `
          https://oapi.dingtalk.com/connect/oauth2/sns_authorize?
            appid=${config.ddAPPID}&
            response_type=code&
            scope=snsapi_login&
            state=DD_STATE&
            redirect_uri=${redirect_uri.value}
        `
      )
      DDLogin({
        id: 'container', // 这里需要你在自己的页面定义一个HTML标签并设置id，例如<div id="login_container"></div>或<span id="login_container"></span>
        goto, // 请参考注释里的方式
        style: 'border:none;background-color:transparent;margin: 0 40px 0 0',
        width: '365',
        height: '325'
      })
      listenDDCb()
      if (window.cxc) {
        window.cxc()
      }
    }

    const listenDDCb = () => {
      const hanndleMessage = function (e) {
        const origin = e.origin
        if (origin === 'https://login.dingtalk.com') {
          // 判断是否来自ddLogin扫码事件。
          // 拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
          const loginTmpCode = e.data
          // 构造并跳转到如下链接
          const url = `
            https://oapi.dingtalk.com/connect/oauth2/sns_authorize?
              appid=${config.ddAPPID}&
              response_type=code&
              scope=snsapi_login&
              state=DD_STATE&
              redirect_uri=${redirect_uri.value}&
              loginTmpCode=${loginTmpCode}
          `
          window.location.href = url
        }
      }
      if (typeof window.addEventListener !== 'undefined') {
        window.addEventListener('message', hanndleMessage, false)
      } else if (window.attachEvent !== 'undefined') {
        window.attachEvent('onmessage', hanndleMessage)
      }
    }

    onMounted(() => {
      getDdInfo()
      showDDQRCode()
    })
  }
})
</script>

<style lang='less' scoped>
.qr-wrapper {
  .other-login {
    display: flex;
    justify-content: space-around;
  }
}
</style>
