<template>
  <div class='reset-password'>
    <a-form
      ref="form"
      layout="vertical"
      :rules="rules"
      :model="formState"
    >
      <a-form-item label="" name="password">
        <a-input
          type="password"
          v-model:value="formState.password"
          placeholder="输入密码"
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item label="" name="confirmPass">
        <a-input
          type="password"
          v-model:value="formState.confirmPass"
          placeholder="确认密码"
          autocomplete="off"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue'
import { RuleObject } from 'ant-design-vue/es/form/interface'

export interface ResetFormModel {
  password: string
  confirmPass: string
}

export default defineComponent ({
  name: 'ResetPassword',
  components: {},
  setup () {
    const form = ref()
    const formState: ResetFormModel = reactive({
      password: '',
      confirmPass: ''
    })

    const validatePassword = (rule: RuleObject, value: string) => {
      const val = value ? value.trim() : ''
      if (!val) return Promise.reject('请输入密码')
      if (formState.confirmPass) {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
        if (!reg.test(val)) return Promise.reject('6~16位字母、数字混合密码')
      }
      return Promise.resolve()
    }
    const validateRepass = (rule: RuleObject, value: string) => {
      const val = value ? value.trim() : ''
      if (!val) return Promise.reject('请确认密码')
      if (formState.password && formState.password !== val) {
        return Promise.reject('两次输入的密码不一致')
      }
      return Promise.resolve()
    }

    const rules = {
      password: [
        { required: true, validator: validatePassword, trigger: 'blur' }
      ],
      confirmPass: [
        { required: true, validator: validateRepass, trigger: 'blur' }
      ]
    }

    return {
      rules,
      form,
      formState
    }
  },
})
</script>

<style lang='less' scoped>

</style>
