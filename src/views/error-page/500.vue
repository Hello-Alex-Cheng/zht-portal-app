<template>
  <div class="server-error">
    <error-comp :imgUrl="require('@/assets/500/500-01.png')"></error-comp>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ErrorComp from './index.vue'

export default defineComponent({
  name: 'ServerError',
  components: {
    ErrorComp
  }
})
</script>

<style>
</style>
