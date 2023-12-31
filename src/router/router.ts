import type { RouteRecordRaw } from "vue-router"
export const routers: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    name: "Home",
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/view/home/index.vue"),
        meta: {
          title: "首页",
          icon: "House",
        },
      },
    ],
    meta: {},
  },
  {
    path: "/login",
    component: () => import("@/view/login/index.vue"),
    name: "login",
    meta: {
      title: "login",
      hidden: true,
    },
  },
  {
    path: "/404",
    component: () => import("@/view/404/index.vue"),
    name: "404",
    meta: {
      title: "404",
      hidden: true,
    },
  },
  {
    path: "/:pathMatch",
    redirect: "/404",
    name: "any",
    meta: {
      title: "any",
      hidden: true,
    },
  },
]
export const asyncRouterMap: RouteRecordRaw[] = [
  {
    path: "/acl",
    component: () => import("@/layout/index.vue"),
    name: "Acl",
    redirect: "/acl/user",
    meta: {
      // hidden: false,
      icon: "Setting",
      title: "权限管理",
      roles: ["超级管理员"],
    },
    children: [
      {
        path: "/acl/user",
        component: () => import("@/view/user/index.vue"),
        name: "User",
        meta: {
          title: "用户管理",
          icon: "User",
          roles: ["超级管理员"],
        },
      },
      {
        path: "/acl/role",
        component: () => import("@/view/role/index.vue"),
        name: "Role",
        meta: {
          title: "角色管理",
          icon: "UserFilled",
          roles: ["超级管理员"],
        },
      },
    ],
  },
]
