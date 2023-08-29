export interface LoginForm {
  username: string
  password: string
}

interface DataType {
  token: string
}
export interface LoginResponseData {
  code: number
  data: DataType
}

interface UserInfoType {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
interface User {
  checkUser: UserInfoType
}
export interface UserInfoResponseData {
  code: number
  data: User
}