import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        // {
        //   path: '/',
        //   name: 'landing-page',
        //   component: require('@/Pages/CashRegister').default
        // },
        {
            path: '/',
            name: 'landing-page',
            component: require('@/Pages/ProductManagement/SellingGoods').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
