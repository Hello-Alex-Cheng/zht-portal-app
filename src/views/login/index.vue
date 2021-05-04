<template>
  <div class="login">
    <div class="login-box">
      <h1>
        hello_AlexCc
        <icon-font type="icon-yingtao"></icon-font>
      </h1>
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
            html-type="submit"
            :disabled="formState.user === '' || formState.password === ''"
          >
            登 录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, reactive, inject } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { useRouter, useRoute } from "vue-router"
import store from '@/store'

interface FormState {
  user: string,
  password: string
}

export default defineComponent({
  name: 'Login',
  components: {
    UserOutlined,
    LockOutlined
  },
  mounted() {
    // @ts-ignore
    // this.$message.success('mounted: this.$message.success')
  },
  setup(props, ctx) {
    const $message = inject('message')
    const router = useRouter()
    const route = useRoute()

    // export declare type UnwrapRef<T> = T extends Ref<infer V> ? UnwrapRefSimple<V> : UnwrapRefSimple<T>;
    const formState: FormState = reactive({
      user: 'ztadmin',
      password: 'aa123456'
    })


    const handleFinish = async (values: FormState) => {

      store.dispatch('loginModule/fetchAppLists', {
        user: formState.user,
        psw: formState.password
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
  background-color: #ccc;
  background-image: url('../../assets/whiteSnow.png');
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
    border-radius: 1em;
    box-shadow: 1em .5em 4em pink;
    -webkit-box-shadow: 1em .5em 4em #ccc;
  }
  .login-box > h1 {
    letter-spacing: -0.02;
    color: #333;
    text-transform: capitalize;
    &:nth-child(1) {
      color: rgb(104, 16, 16);
    }
  }
}
</style>
