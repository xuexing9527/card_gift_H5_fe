/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {POST, baseUrl} from 'config/index'

// 登录接口
export function login(params) {
  return POST(`${baseUrl}users/login`, params)
}
