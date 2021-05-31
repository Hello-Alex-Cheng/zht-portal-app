<template>
  <div class="not-found">
    <error-comp :imgUrl="require('@/assets/404/404-03.png')"></error-comp>
  </div>
</template>

<script lang="ts">
import { getToken } from '@/utils/auth'
import { defineComponent } from 'vue'
import ErrorComp from './index.vue'

export default defineComponent({
  name: 'NotFound',
  components: { ErrorComp },
  // beforeRouteEnter (to, from, next) {
  //   getToken() ? next() : next({ path: '/login', replace: true })
  // }
})
</script>

<style lang="less" scoped>
</style>
