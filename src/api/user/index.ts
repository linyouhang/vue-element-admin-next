import request from "@/utils/request"
import type {
  LoginForm,
  LoginResponseData,
  UserInfoResponseData,
} from "@/api/user/type"
enum API {
  LOGIN_URL = "/user/login",
  USERINFO_URL = "/user/info",
}
export const requestLogin = function (data: LoginForm) {
  return request.post<any, LoginResponseData>(API.LOGIN_URL, data)
}

export const requestUserInfo = function () {
  return request.get<any, UserInfoResponseData>(API.USERINFO_URL)
}
