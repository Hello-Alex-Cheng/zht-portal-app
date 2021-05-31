<template>
  <div class='forgot-password'>
    <a-modal
      :title="showPasswordForm ? '重置密码' : '找回密码'"
      :okText="showPasswordForm ? '确认' : '下一步'"
      cancelText="取消"
      v-model:visible="visible"
      :maskClosable="false"
      :keyboard="false"
      :confirmLoading="nextLoading"
      @cancel="handleModalCancel"
      @ok="toNextStep"
    >
      <PhoneForm v-if="!showPasswordForm" ref="phoneFormRef"></PhoneForm>
      <ResetPassword ref="resetPswComp" v-else />
    </a-modal>
  </div>
</template>

<script lang='ts'>
import { defineComponent, Ref, ref, toRef } from 'vue'
import PhoneForm from './PhoneForm.vue'
import ResetPassword from './ResetPassword.vue'

import { PhoneFormModel } from './useLogin'
import { ResetFormModel } from './ResetPassword.vue'
import { ApiResponse } from '@/store/modules/login/index'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'

import { message } from 'ant-design-vue'
import { setToken, removeToken } from '@/utils/auth'
import { portalLogin, getUserInfo, resetPassword } from '@/api/login'

export default defineComponent ({
  name: 'ForgotPassword',
  components: {
    PhoneForm,
    ResetPassword
  },
  setup () {
    const visible = ref<Boolean>(false)
    const nextLoading = ref<Boolean>(false)
    const showPasswordForm = ref<Boolean>(false)
    const phoneFormRef = ref()
    const resetPswComp = ref()
    const userId = ref('')

    const setVisible = (value: boolean) => {
      visible.value = value
    }

    const fetchUserInfo = async () => {
      const res = await getUserInfo()

      if ((res as ApiResponse).code === 0) {
        if (res.data) {
          userId.value = res.data.id
        } else {
          message.error('用户信息为空')
        }
      } else {
        message.error('获取用户信息失败')
      }
    }

    const fetchTokenAndUserInfo = () => {
      nextLoading.value = true
      phoneFormRef.value.phoneFromRef.validate()
        .then(async (state: PhoneFormModel) => {
          const res = await portalLogin('zht_mobile', state.number, state.code)

          if ((res as ApiResponse).code === 0) {
            const { access_token } = res.data
            await setToken(`Bearer ${access_token}`)
            await fetchUserInfo()

            showPasswordForm.value = true
          } else {
            // @ts-ignore
            message.error(res.errmsg)
          }
        })
        .catch((err: ValidateErrorEntity<PhoneFormModel>) => {
          console.log('errr', err)
          // showPasswordForm.value = true
        })
        .finally(() => {
          nextLoading.value = false
        })
    }

    const toResetPassword = () => {
      // api params: password, id
      resetPswComp.value.form
        .validate()
        .then(async (state: ResetFormModel) => {
          console.log('success', state)
          try {
             const res = await resetPassword({
              id: userId.value,
              password: state.password
            })

            if ((res as ApiResponse).code === 0) {
              message.success('重置密码成功')
              removeToken()
              userId.value = ''
              visible.value = false
            } else {
              message.error('重置密码失败')
            }
          } catch (error) {
            console.log('catch error', error)
          }
        })
        .catch((err: ValidateErrorEntity)=> {
          console.log('err', err)
        })
    }

    const toNextStep = () => {
      if (showPasswordForm.value) {
        // 重置密码
        toResetPassword()
      } else {
        // 获取 token 以及 用户信息
        fetchTokenAndUserInfo()
      }
    }

    const handleModalCancel = () => {
      phoneFormRef.value?.phoneFromRef.resetFields()
      showPasswordForm.value = false
    }

    return {
      visible,
      nextLoading,
      setVisible,
      phoneFormRef,
      showPasswordForm,
      resetPswComp,

      handleModalCancel,
      toNextStep
    }
  },
})
</script>

<style lang='less' scoped>

</style>
