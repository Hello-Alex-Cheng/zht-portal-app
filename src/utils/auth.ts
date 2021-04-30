import Cookies from 'js-cookie'

const TokenKey = 'Zht-Admin-Token'

export const getToken = () => Cookies.get(TokenKey)
export const setToken = (token: string) => Cookies.set(TokenKey, token)
export const removeToken = () => Cookies.remove(TokenKey)

// export const setToken = (token, expiresIn, refreshToken) => {
//   const inFifteenMinutes = new Date(new Date().getTime() + 12 * 60 * 60 * 1000) // 有效时间 12hours
//   // const inFifteenMinutes = new Date(new Date().getTime() + expiresIn * 2) // 有效时间 2min
//   // Cookies.set(TokenKey, token, { expires: inFifteenMinutes })
//   // Cookies.set('refresh-token', refreshToken, { expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000) }) // 一个月
// }
