<template>
  <div class="error">
    <div>
      <img :src="imgUrl" alt="error" />
      <a-button type="danger" @click="goBack">去首页</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { getToken } from '@/utils/auth'
import { message } from 'ant-design-vue'

export default defineComponent({
  name: 'Error',
  props: {
    imgUrl: String
  },
  setup() {
    const router = useRouter()
    const goBack = () => {
      if (!getToken()) {
        message.warn('用户未登录，请登录!')
        router.push('/login')
      } else {
        router.push('/')
      }
    }

    return {
      goBack
    }
  }
})
</script>

<style lang="less" scoped>
.error {
  font-size: 18px;
  background-color: #fff;
  width: 100%;
  padding-top: 4em;
  height: calc(100vh - 8.5em);
  div {
    display: flex;
    flex-direction: column;
    width: 400px;
    margin: 0 auto;
  }
  img {
    width: 400px;
    margin-bottom: 2em;
  }
}
</style>
