import router from "./index"
import useUserStore from "@/store/modules/user"
router.beforeEach(async (to) => {
  const userStore = useUserStore()
  if (userStore.token) {
    //token存在
    try {
      if (userStore.roles.length === 0) {
        //根据路由表动态加载路由
        await userStore.getUserInfo()
        userStore.generateRoutes().forEach((route) => {
          router.addRoute(route)
        })
        //触发重定向
        return to.fullPath
      }
      if (to.path === "/login") {
        return { name: "Home" }
      }
    } catch (error) {
      return { name: "login" }
    }
  } else {
    //token不存在
    if (to.path === "/login") {
      return true
    }
    return { name: "login" }
  }
})
