<template>
  <div class='img-toggle' @click="toggle">
    <img v-if="is === 1" src="../../assets/computer.png" alt="" />
    <img v-if="is === 2" src="../../assets/QRCode.png" alt="" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent ({
  name: 'ImgToggle',
  components: {},
  props: {
    showComputerOrQRCodeComp: Function
  },
  setup (props, { emit }) {
    const is = ref(1)

    const toggle = function() {
      is.value === 1 ? is.value = 2 : is.value = 1

      emit('showComputerOrQRCodeComp', is.value === 1)
    }

    return {
      is,
      toggle
    }
  },
})
</script>

<style lang='less' scoped>
.img-toggle {
  position: absolute;
  top: 0;
  right: 0;
  width: 16.05%;
  height: 14.88%;
  cursor: pointer;
  // img {
  //   width: 45px;
  // }
}
</style>
