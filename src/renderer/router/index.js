import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    //登陆
    // {
    //   path: '/',
    //   name: 'login',
    //   component: require('@/pages/login').default
    // },
    //收银台
    {
      // path: '/home',
      path: '/',
      name: 'cash-register',
      component: require('@/pages/cash_register').default
    },
    //商品管理
    {
      path: '/goods-management',
      name: 'goods-management',
      component: require('@/pages/goods_management').default
    },
    //销售统计
    {
      path: '/sales-statistics',
      name: 'sales-statistics',
      component: require('@/pages/sales_statistics').default
    },
    //库存管理
    {
      path: '/stock-management',
      name: '/stock-management',
      component: require('@/pages/stock_management').default,
    },
      //出入库明细
    {
      path: '/stock_out_put',
      name: '/stock_out_put',
      component: require('@/pages/stock_out_put').default
    },
    //类目管理
    {
      path: '/category',
      name: 'category',
      component: require('@/pages/category').default
    },
    {
      path: '/demo',
      name: 'demo',
      component: require('@/pages/demo').default
    },
    {
      path: '/printer',
      name: 'printer',
      component: require('@/components/Printer').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})


