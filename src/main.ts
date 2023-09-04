import { createApp } from "vue"
import App from "./App.vue"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
// @ts-expect-error忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
import "element-plus/theme-chalk/dark/css-vars.css"
import "virtual:svg-icons-register"
import gloablComponent from "./components/index"
import "./styles/index.scss"
import router from "./router"
import pinia from "./store"
import "@/router/permisson"
const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})
app.use(gloablComponent)
app.use(router)
app.use(pinia)
app.mount("#app")
