<template>
  <div class='account-wrapper'>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="账号登录" style="padding-top: 12px;">
        <a-form
          ref="accountFromRef"
          layout="vertical"
          :model="accountFormState"
          :rules="accountRules"
          @finishFailed="handleFinishFailed"
        >
          <a-form-item label="" name="user">
            <a-input
              type="text"
              v-model:value="accountFormState.user"
              placeholder="账号名/邮箱地址"
              autocomplete="off">
              <template #prefix><UserOutlined class="icon" /></template>
            </a-input>
          </a-form-item>
          <a-form-item label="" name="password">
            <a-input
              :type="isShowPassword ? 'text' : 'password'"
              v-model:value="accountFormState.password"
              placeholder="输入密码"
              autocomplete="off">
              <template #prefix><LockOutlined class="icon" /></template>
              <template #suffix>
                <EyeOutlined class="icon" v-if="isShowPassword" @click="toggleShowPassword" />
                <EyeInvisibleOutlined class="icon" v-else @click="toggleShowPassword" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-checkbox v-model:accountChecked="accountChecked">记住账号</a-checkbox>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="手机号登录" style="height: 168px;">
        <PhoneForm ref="phoneFormCompRef"></PhoneForm>
      </a-tab-pane>
    </a-tabs>

    <div class="footer">
      <a-button
        block
        type="primary"
        @click="handleFinish"
        :loading="loginLoading"
      >
        登 录
      </a-button>

      <div class="register-and-forgot-password">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, toRef } from 'vue'

import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons-vue'

import {
  AccountFormModel,
  useChooseLoginLogic,
  setFormRules,
  FormRuleKeys,
} from './useLogin'

import PhoneForm from './PhoneForm.vue'

export default defineComponent ({
  name: 'LoginAndPhone',
  components: {
    UserOutlined,
    LockOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    PhoneForm
  },
  setup () {
    const activeKey = ref('1')
    const accountFromRef = ref()
    const phoneFormCompRef = ref()
    const isShowPassword = ref(false)
    const accountChecked = ref(false)
    const loginLoading = ref(false)

    const accountFormState: AccountFormModel = reactive({
      user: '',
      password: ''
    })

    const { accountLogin, phoneLogin } = useChooseLoginLogic(loginLoading)

    // 表单验证通过，登录
    const handleFinish = async () => {
      loginLoading.value = true
      if (activeKey.value === '1') {
        accountLogin(accountFormState, accountFromRef)
      } else {
        phoneLogin(phoneFormCompRef.value.formState, toRef(phoneFormCompRef.value, 'phoneFromRef'))
      }
    }

    // 提交表单验证失败回调
    const handleFinishFailed = (errors: AccountFormModel) => {
      console.log(errors)
    }

    // 是否显示密码
    const toggleShowPassword = () => {
      isShowPassword.value = !isShowPassword.value
    }

    const handleTabChanged = (key: string) => {
      activeKey.value = key
    }

    // 清空表单，或者清空表单提示
    watch(activeKey, () => {
      accountFromRef.value?.resetFields()
      phoneFormCompRef.value?.phoneFromRef?.resetFields()
    })


    return {
      activeKey,
      accountFromRef,
      phoneFormCompRef,
      accountFormState,
      isShowPassword,
      accountChecked,
      loginLoading,
      accountRules: setFormRules(FormRuleKeys.AccountRules),

      handleFinish,
      handleFinishFailed,
      toggleShowPassword,
      handleTabChanged
    }
  },
})
</script>

<style lang='less' scoped>
.account-wrapper {
  .register-and-forgot-password {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 24px;
  }

  .icon {
    color: rgba(0, 0, 0, 0.25)
  }

  :deep .ant-form-item {
    padding-bottom: 0;
  }
  :deep .ant-input-affix-wrapper {
    border-top: none;
    border-left-color: #fff;
    border-right-color: #fff;
  }
  :deep .ant-input-affix-wrapper-focused {
    box-shadow: 0 0 0 2px #fff;
  }
  :deep .ant-checkbox-wrapper {
    font-size: 12px;
    color: #333333;
  }
  :deep .ant-input {
    border-top: none;
    border-left-color: #fff;
    border-right-color: #fff;
    box-shadow: 0 0 0 2px #fff;
  }
}
</style>
