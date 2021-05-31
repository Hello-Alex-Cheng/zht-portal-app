<template>
  <div class="home">
    <a-pagination :default-current="1" :total="50" show-size-changer />

    <div class="test">
      CSS Variables
    </div>

    <a-button block @click="changeColor">
      <template #icon>
        <SearchOutlined />
      </template>
      change
    </a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'Home',
  components: {
    SearchOutlined
  },
  setup() {
    const changeColor = function() {
      const dom = document.documentElement

      dom.style.setProperty('--test-bg-color', 'green')
    }

    return {
      changeColor
    }
  }
})
</script>

<style scoped lang="less">
  @import './index.less';
</style>
