<template>
  <div class="login">
    <div class="login-box">
      <a-form
        layout="inline"
        :model="formState"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <a-form-item label="Username">
          <a-input v-model:value="formState.user" placeholder="Username">
            <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
          </a-input>
        </a-form-item>
        <a-form-item label="Password">
          <a-input v-model:value="formState.password" type="password" placeholder="Password">
            <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="formState.user === '' || formState.password === ''"
          >
            Log in
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <Test></Test>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { defineComponent, reactive, UnwrapRef  } from 'vue'

import Test from '@/views/test/index.vue'
import { portalLogin } from '@/api/login'

interface FormState {
  user: string,
  password: string
}

export default defineComponent({
  name: 'Login',
  components: {
    UserOutlined,
    LockOutlined,
    Test
  },
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      user: '',
      password: ''
    })

    const handleFinish = (values: FormState) => {
      console.log(values, formState);

      portalLogin('zht_password', formState.user, formState.password)
        // @ts-ignore
        .then(res => {
          console.log(res)
          // @ts-ignore
        }).catch(err => {
          console.log(err)
        })
    }
    const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
      console.log(errors);
    }

    return {
      formState,
      handleFinish,
      handleFinishFailed
    }
  }
})
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-color: aquamarine;
  .login-box {
    width: 400px;
    margin: 0 auto;
    background-color: #fff;
  }
}
</style>
