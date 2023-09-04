import type { RouteRecordRaw } from "vue-router"

export interface UserState {
  token: string | undefined
  menuList: RouteRecordRaw[]
  username: string
  avatar: string
  roles: string[]
}
