import { defineStore } from "pinia"
import { requestLogin } from "@/api/user/index"
import { LoginForm } from "@/api/user/type"
import { UserState } from "../type/type"
import { GET_TOKEN, SET_TOKEN } from "@/utils/token"
const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
    }
  },
  getters: {},
  actions: {
    async login(data: LoginForm) {
      const result = await requestLogin(data)
      //处理请求错误
      if (result.code === 200) {
        const token = result.data.token || ""
        this.$state.token = token
        SET_TOKEN(token)
        return result.data
      } else {
        return Promise.reject(result.data.message)
      }
    },
  },
})

export default useUserStore
