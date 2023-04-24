import { createRouter, createWebHashHistory } from 'vue-router'

// 配置路由表
const routes = [
  {
    path: "/login",
    component: () => import("./pages/login.vue")
  },
  {
    path: "/layout",
    component: () => import("./layout/layout.vue"),
    children: [
      {
        path: "/home",
        component: () => import("./pages/home.vue")
      },
      {
        path: "/customer-service",
        component: () => import("./pages/customer-service.vue")
      },

    ]
  }
];

// 创建路由
const router = createRouter({
  history: createWebHashHistory(), //设置路由模式为Hash模式
  routes //注册路由表
})

export default router