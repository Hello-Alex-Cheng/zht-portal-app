<template>
  <div class="login">
    <div class="login-box">
      <h1>hello_AlexCc</h1>
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
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { defineComponent, reactive, UnwrapRef  } from 'vue'
import { AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'

import { portalLogin } from '@/api/login'

interface FormState {
  user: string,
  password: string
}

interface ApiResponse extends AxiosResponse {
  code: number,
  msg: string,
  data: any
}

export default defineComponent({
  name: 'Login',
  components: {
    UserOutlined,
    LockOutlined
  },
  setup() {
    // export declare type UnwrapRef<T> = T extends Ref<infer V> ? UnwrapRefSimple<V> : UnwrapRefSimple<T>;
    const formState: UnwrapRef<FormState> = reactive({
      user: 'ztadmin',
      password: 'aa123456'
    })

    const handleFinish = async (values: FormState) => {
      console.log(values, formState)

      const res: AxiosResponse = await portalLogin('zht_password', formState.user, formState.password)
      if ((res as ApiResponse).code === 0) {
        message.success('登录成功!')
        console.log(res.data)
      } else {
        console.log('业务代码报错', res)
      }
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
  background-color: #ccc;
  background-image: url('../../assets/senlin.png');
  background-size: 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    overflow: hidden;
    display: inline-block;
    padding: 50px 20px;
    background-color: rgba(225, 225, 225, .5);
    margin-top: -240px;
  }
  .login-box > h1 {
    letter-spacing: -0.02;
    text-transform: capitalize;
    color: #333;
  }
}
</style>
