<template>
  <div class="home">
    <h1>store value {{globalCount}}</h1>
    <a-button @click="crementStoreCount">create count</a-button>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'Home',
  setup() {
    const store = useStore()

    const crementStoreCount = () => {
      store.commit('increment')
    }

    return {
      globalCount: computed(() => store.state.count),
      crementStoreCount
    }
  }
})
</script>

<style>
</style>
