import { createRouter, createWebHistory } from "vue-router"
import { routers } from "./router"
const router = createRouter({
  history: createWebHistory(),
  routes: routers,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
