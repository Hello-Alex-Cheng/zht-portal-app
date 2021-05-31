<template>
  <ConfigProvider :locale="locale">
    <router-view></router-view>
  </ConfigProvider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import moment from 'moment'
moment.locale('en')

export default defineComponent({
  name: 'App',
  data() {
    return {
      locale: enUS,
      zhCN,
      enUS,
      moment
    }
  },
  components: {
    ConfigProvider
  }
})
</script>

<style lang="less">
:root {
  font-size: 14px;
  --test-bg-color: red;
}
</style>
