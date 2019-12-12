import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
      //登陆
    {
      path: '/',
      name: 'login',
      component: require('@/pages/Login').default
    },
    //收银台
    {
      path: '/home',
      name: 'cash-register',
      component: require('@/pages/CashRegister').default
    },
    //商品管理
    {
      path: '/goods-management',
      name: 'goods-management',
      component: require('@/pages/GoodsManagement').default
    },
    //销售统计
    {
      path: '/sanding-page',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    //库存管理
    {
      path: '/stock-management',
      name: '/stock-management',
      component: require('@/pages/StockManagement').default
    },
      //类目管理
    {
      path: '/category',
      name: 'category',
      component: require('@/pages/category').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})


