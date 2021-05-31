<template>
  <div class="login">
    <div class="header">
      <a-row type="flex" align="middle">
        <a-col flex="1" class="col">
          <b>中惠旅后台</b>
        </a-col>
        <a-col flex="1" class="col">
          <span>首页</span>
          <span>帮助中心</span>
        </a-col>
      </a-row>
    </div>
    <div class="content">
      <div class="login">
        <ImgToggle ref="imgToggleRef" @showComputerOrQRCodeComp="showComputerOrQRCodeComp"></ImgToggle>
        <LoginAndPhone ref="loginAndPhone" v-if="isComputer">
          <a-button class="btn" type="link">免费注册</a-button>
          <a-divider type="vertical" />
          <a-button class="btn" type="link" @click="showForgotPassModal">忘记密码</a-button>
        </LoginAndPhone>
        <QRCode v-else>
          <a-button class="btn" type="link" style="color: #333; font-size: 12px;" @click="qrBtnClicked('2')">短信登录</a-button>
          <a-button class="btn" type="link" style="color: #333; font-size: 12px;" @click="qrBtnClicked('1')">密码登录</a-button>
        </QRCode>
      </div>
    </div>
    <div class="footer">
      <a-row type="flex" align="middle">
        <a-col flex="1" class="col">
          版权所有©中惠旅智慧景区股份有限公司 保留一切权利
        </a-col>
        <a-col flex="1" class="col">
          <span>中惠旅集团</span>
          <span>惠旅智能</span>
          <span>惠旅云</span>
        </a-col>
      </a-row>
    </div>
    <ForgotPassword ref="forgotRef"></ForgotPassword>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'

import LoginAndPhone from './LoginAndPhone.vue'
import ImgToggle from './ImgToggle.vue'
import QRCode from './QRCode.vue'
import ForgotPassword from './ForgotPassword.vue'

export default defineComponent({
  name: 'Login',
  components: {
    ForgotPassword,
    LoginAndPhone,
    ImgToggle,
    QRCode
  },
  setup() {
    const isComputer = ref(true)
    const imgToggleRef = ref(null)
    const loginAndPhone = ref(null)
    const forgotRef = ref(null)

    const showComputerOrQRCodeComp = function(value: boolean) {
      isComputer.value = value
    }

    const qrBtnClicked = function(key: string) {
      (imgToggleRef.value as any).toggle()
      nextTick(() => {
        (loginAndPhone.value as any).handleTabChanged(key)
      })
    }

    const showForgotPassModal = () => {
      (forgotRef.value as any).setVisible(true)
    }

    return {
      showComputerOrQRCodeComp,
      isComputer,
      imgToggleRef,
      forgotRef,
      loginAndPhone,
      qrBtnClicked,
      showForgotPassModal
    }
  }
})
</script>

<style lang="less" scoped>
@login: ~'login';

.@{login} {
  position: relative;
  width: 100%;
  height: 100vh;
  .ant-row {
    height: 100%;
  }

  .header {
    height: 6%;
    .col {
      text-align: center;
      span:nth-child(1) {
        margin-right: 32px;
      }
    }
    .col:nth-child(2) {
      color: #999999;
    }
  }

  .content {
    width: 100%;
    position: relative;
    height: calc(100% - 16%);
    background-color: #E6EBF1;
    background-image: url('../../assets/login_page_img.png');
    background-repeat: no-repeat;
    background-size: 100% auto;

    .@{login} {
      position: absolute;
      background-color: #fff;
      box-shadow: 0px 0px 20px 0px rgba(171, 184, 196, 0.5);
      border-radius: 3px;
      width: 380px;
      height: 390px;
      right: 18.75%;
      top: 22.93%;
      padding: 20px 30px;
      .btn {
        font-size: 12px;
        color: #333;
      }
    }
  }

  .footer {
    height: 10%;
    .col {
      text-align: center;
      font-size: 12px;
      color: #555555;
      span:nth-child(2) {
        padding: 0 16px;
        margin: 0 16px;
        border-right: 1px solid #555555;
        border-left: 1px solid #555555;
      }
    }
  }
}
</style>
