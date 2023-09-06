import { defineStore } from "pinia"
import { reqLogin, reqUserInfo } from "@/api/user/index"
import { loginFormData } from "@/api/user/type"
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
    async login(data: loginFormData) {
      const result = await reqLogin(data)
      console.log(result)
      //处理请求错误
      if (result.code === 200) {
        const token = result.data || ""
        this.token = token
        SET_TOKEN(token)
        return result.data
      } else {
        return Promise.reject(result.message)
      }
    },
    async getUserInfo() {
      const result = await reqUserInfo()
      console.log(result)
      if (result.code === 200) {
        const { data: userInfo } = result
        this.username = userInfo.name
        this.avatar = userInfo.avatar
        this.roles = userInfo.roles
        return userInfo
      } else {
        return Promise.reject(result.message)
      }
    },
    async logout() {
      this.token = ""
      RM_TOKEN()
      this.username = ""
      this.roles = []
    },
    generateRoutes() {
      let accessedRoutes
      //根据角色权限生成路由表
      if (this.roles.includes("")) {
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
