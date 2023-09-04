import { defineStore } from "pinia"
import { requestLogin, requestUserInfo } from "@/api/user/index"
import { LoginForm } from "@/api/user/type"
import { UserState } from "../type/type"
import { GET_TOKEN, SET_TOKEN, RM_TOKEN } from "@/utils/token"
import { routers, asyncRouterMap } from "@/router/router"

const hasPermission = (roles: string[], route: any) => {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role))
  } else {
    return true
  }
}
const filterAsyncRoutes = (routes: any[], roles: string[]) => {
  const res: any[] = []
  routes.forEach((route) => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}
const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuList: [],
      username: "",
      avatar: "",
      roles: [],
    }
  },
  getters: {},
  actions: {
    async login(data: LoginForm) {
      const result = await requestLogin(data)
      //处理请求错误
      if (result.code === 200) {
        const token = result.data.token || ""
        this.token = token
        SET_TOKEN(token)
        return result.data
      } else {
        return Promise.reject(result.data.message)
      }
    },
    async getUserInfo() {
      const result = await requestUserInfo()
      if (result.code === 200) {
        const { checkUser: userInfo } = result.data
        this.username = userInfo.username
        this.avatar = userInfo.avatar
        this.roles = userInfo.roles
        return userInfo
      } else {
        return Promise.reject(result.data.message)
      }
    },
    async logout() {
      this.token = ""
      RM_TOKEN()
      this.username = ""
      this.roles = []
    },
    generateRoutes() {
      // console.log(this.roles)
      let accessedRoutes
      if (this.roles.includes("系统管理员")) {
        accessedRoutes = asyncRouterMap
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRouterMap, this.roles)
      }
      this.menuList = routers.concat(accessedRoutes)
      // console.log(this.menuList)
      return accessedRoutes
    },
  },
})

export default useUserStore
