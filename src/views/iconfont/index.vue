<template>
  <div class="iconfont">
    <div>
      <h3>ant design icon</h3>
      <StepForwardOutlined style="fontSize: '24px'" />
    </div>

    <div class="icon-list">
      <icon-font type="icon-mugua"></icon-font>
      <icon-font type="icon-caomei"></icon-font>
      <icon-font type="icon-xigua"></icon-font>
      <icon-font type="icon-yingtao"></icon-font>
      <icon-font type="icon-douya"></icon-font>
      <icon-font type="icon-xianggu"></icon-font>
      <icon-font type="icon-angel"></icon-font>
    </div>
  </div>
</template>

<script lang="ts">
import { StepForwardOutlined } from '@ant-design/icons-vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Iconfont',
  components: {
    StepForwardOutlined
  },
  setup() {}
})
</script>

<style scoped lang="less">
.icon-list {
  padding: 2em 0;
  :deep(.anticon) {
    font-size: 36px;
    margin-right: .5em;
  }
}
</style>
