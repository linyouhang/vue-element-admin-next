<script setup lang="ts">
import { reactive, ref } from "vue"
import useUserStore from "@/store/modules/user"
import { ElNotification } from "element-plus"
import router from "@/router"
import { getTime } from "@/utils/time"
import type { FormRules } from "element-plus"
interface LoginFrom {
  username: string
  password: string
}
const loginForm = reactive<LoginFrom>({
  username: "",
  password: "",
})
const loading = ref(false)
const time = getTime()
const rules = reactive<FormRules<LoginFrom>>({
  username: [
    { min: 3, max: 6, message: "Length should be 3 to 5", trigger: "blur" },
    { required: true, message: "Please input Activity name", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur", min: 5, max: 8 },
    {
      min: 5,
      max: 8,
      message: "请输入5-8位的密码",
      trigger: "blur",
    },
  ],
})
const userStore = useUserStore()
const loginHandle = async () => {
  try {
    loading.value = true
    await userStore.login(loginForm)
    ElNotification({
      type: "success",
      message: "hi, " + time + "好!",
    })
    router.push("/")
    loading.value = false
  } catch (error: any) {
    ElNotification({
      type: "error",
      message: error,
    })
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <el-form class="login-form" :model="loginForm" :rules="rules">
      <h1 class="title">admin</h1>
      <el-form-item prop="username">
        <el-input placeholder="username" v-model="loginForm.username">
          <template #prefix>
            <el-icon class="el-input__icon"><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="password"
          show-password
          v-model="loginForm.password"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="loginHandle">
          登入
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background-color: #ecf5ff;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 500px;
    background-color: #c6e2ff;
    padding: 20px;
    border-radius: 5px;
    .title {
      font-size: larger;
      margin-bottom: 20px;
      text-align: center;
      color: white;
    }
  }
}
</style>
