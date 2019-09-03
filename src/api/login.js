import request from '../utils/request';

// 校验用户名是否已注册
export function checkUserName(params) {
  return request("/registry/username", params, "POST")
}

// 注册
export function userRegistry(params) {
  return request("/registry", params, "POST")
}