<template>
  <div class='phoneForm'>
    <a-form
      ref="phoneFromRef"
      layout="vertical"
      :rules="rules"
      :model="formState"
    >
      <a-form-item label="" name="number">
        <a-input v-model:value="formState.number" placeholder="手机号" autocomplete="off">
        </a-input>
      </a-form-item>
      <a-form-item label="" name="code">
        <a-input v-model:value="formState.code" placeholder="验证码" autocomplete="off">
          <template #suffix>
            <a-button size="small" @click="handleCodeBtnClick">
              {{phoneCodeTimer ? `${timeNumber} s` : '获取验证码'}}
            </a-button>
          </template>
        </a-input>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue'

import {
  usePhoneCodeLogic,
  PhoneFormModel,
  setFormRules,
  FormRuleKeys
} from './useLogin'

export default defineComponent ({
  name: 'PhoneForm',
  setup (props, { emit }) {
    const phoneFromRef = ref(null)

    const phoneFormState: PhoneFormModel = reactive({
      number: '',
      code: ''
    })

    const { phoneCodeTimer, timeNumber, fetchPhoneCode } = usePhoneCodeLogic()

    const handleCodeBtnClick = async (e: Event) => {
      const { number } = phoneFormState
      fetchPhoneCode(number)
    }

    return {
      phoneFromRef,
      phoneCodeTimer,
      timeNumber,
      rules: setFormRules(FormRuleKeys.PhoneRules),
      formState: phoneFormState,

      handleCodeBtnClick
    }
  }
})
</script>

<style lang='less' scoped>

</style>
