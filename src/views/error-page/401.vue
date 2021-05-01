<template>
  <div class="not-auth">
    <error-comp :imgUrl="require('@/assets/401/401-01.png')"></error-comp>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ErrorComp from './index.vue'

export default defineComponent({
  name: 'NotAuth',
  components: {
    ErrorComp
  }
})
</script>

<style>
</style>
