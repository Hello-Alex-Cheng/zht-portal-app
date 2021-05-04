<template>
  <div class="store">
    <h1>store value {{globalCount}}</h1>
    <a-button @click="crementStoreCount">create count</a-button>

    <div class="app">
      <ul>
        <li v-for="app in appList" :key="app.id">{{app.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'Store',
  components: {},
  setup() {
    const store = useStore()

    const crementStoreCount = () => {
      store.commit('increment')

      const appList = [
        {
          id: 1,
          name: 'test'
        },
        {
          id: 2,
          name: 'test1'
        },
        {
          id: 3,
          name: 'test2'
        },
        {
          id: 4,
          name: 'test3'
        },
        {
          id: 5,
          name: 'test4'
        }
      ]

      store.commit('loginModule/Update_Applications', appList)
    }

    console.log('???', store.state.loginModule.applitions)

    return {
      globalCount: computed(() => store.state.count),
      crementStoreCount,
      appList: computed(() => store.state.loginModule.applitions)
    }
  }
})
</script>

<style scoped lang="less">
</style>
