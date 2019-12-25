/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import { POST, GET, baseUrl } from 'config/index'
// import axios from 'axios'

// 登录接口
export function login(params) {
  return POST(`${baseUrl}users/login`, params)
}

// 查看详情接口
export function detail() {
  return GET(`${baseUrl}users/detail`, {})
}

// 编辑详情接口
export function add(params) {
  return POST(`${baseUrl}users/add`, params)
}
