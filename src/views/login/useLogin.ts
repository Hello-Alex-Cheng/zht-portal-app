import store from '@/store'
import { ref } from 'vue'
import { Ref } from '@vue/reactivity'
import { ActionTypes } from "@/store/modules/login/index"
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { message } from 'ant-design-vue'
import { AxiosResponse } from 'axios'

import {
  portalSendCodeSms
} from '@/api/login'

export interface AccountFormModel {
  user: string,
  password: string
}
export interface PhoneFormModel {
  number: string,
  code: string
}

export enum FormRuleKeys {
  AccountRules = 'AccountRules',
  PhoneRules = 'PhoneRules'
}

interface PhoneApiResponse extends AxiosResponse {
  code: number
  data: boolean
  errmsg: string
}

// 账号密码  或者 手机号登录
export function useChooseLoginLogic (loading: Ref) {

  function accountLogin(form: AccountFormModel, ref: Ref) {
    ref.value
      .validate()
      .then(async () => {
        await store.dispatch(`loginModule/${ActionTypes.Login}`, {
          user: form.user,
          psw: form.password,
          type: 'zht_password'
        })
      })
      .catch((err: ValidateErrorEntity<AccountFormModel>) => {
        console.log('err ', err)
      })
      .finally(() => {
        loading.value = false
      })
  }

  function phoneLogin(form: PhoneFormModel, ref: Ref) {
    ref.value
      .validate()
      .then(async () => {
        await store.dispatch(`loginModule/${ActionTypes.Login}`, {
          user: form.number,
          psw: form.code,
          type: 'zht_mobile'
        })
      })
      .catch((err: ValidateErrorEntity<PhoneFormModel>) => {
        console.log('err ', err)
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    accountLogin,
    phoneLogin
  }
}

// 手机号码登录逻辑处理
export function usePhoneCodeLogic() {

  const phoneCodeTimer = ref<number>()
  const timeNumber = ref(60)

  const fetchPhoneCode = async function (phoneNumber: string) {
    if (!phoneNumber) return message.error('请输入手机号')
    if (phoneCodeTimer.value) return

    const res = await portalSendCodeSms(phoneNumber)
    if ((res as PhoneApiResponse).code === 0) {
      phoneCodeTimer.value = setInterval(() => {
        resetTimer()
        timeNumber.value--
      }, 1000)

      message.success('请求发送成功，请在手机查看验证码 !')
    } else {
      message.error(`请求发送失败，${(res as PhoneApiResponse).errmsg} !`)
    }
  }

  const resetTimer = function () {
    if (timeNumber.value === 0) {
      clearInterval(phoneCodeTimer.value)
      phoneCodeTimer.value = undefined
      timeNumber.value = 60
    }
  }

  return {
    fetchPhoneCode,
    phoneCodeTimer,
    timeNumber
  }
}

// 设置表单规则
export function setFormRules(formKey: FormRuleKeys) {
  switch(formKey) {
    case FormRuleKeys.AccountRules:
      return {
        user: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    case FormRuleKeys.PhoneRules:
      return {
        number: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }
        ]
      }
  }
}
