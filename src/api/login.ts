import request from '../utils/request';
import { RegistryFormProps } from '../views/Registry';

// 校验账号是否已注册
interface UserName {
  account: string
}

export function checkUserAccount(params: UserName) {
  return request("/registry/username", params, "POST")
}

// 注册
export function userRegistry(params: RegistryFormProps) {
  return request("/registry", params, "POST")
}