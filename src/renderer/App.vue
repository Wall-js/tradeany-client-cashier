<template>
  <div id="app">
    <el-container id="el-container"  v-if="isShow">
      <SideMenu
              :title="title"
              :itemList="itemList"
              :bgColor = "bgColor"
              :isCollapsed="isCollapsed"
              router
      ></SideMenu>
      <el-container id="header-main" direction="vertical">
        <Header :userName="userName" @handleShow="handleShow" />
        <el-main class="elMain">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <router-view v-else></router-view>
  </div>
</template>

<script>
  import Header from './components/Header'
  import SideMenu from './components/SideMenu'
  export default {
    components: { Header,SideMenu},
    name: 'tradeany-client-cashier',
    data () {
      return {
        isCollapsed:false,
        bgColor:'#1564AF',
        title: 'TRADEANY',
        itemList: [
          {
            type: 'menuItem',
            title: '收银台',
            icon:'el-icon-full-screen',
            index: "/home"
          },
          {
            type: 'menuItem',
            title: '商品管理',
            icon:"el-icon-s-goods",
            index: "/goods-management"
          },
          {
            type: 'submenu',
            title: '库存管理',
            icon:"el-icon-s-shop",
            routers: [
              {
                type: 'itemGroup',
                title: '库存管理',
                index: "/stock-management"
                // routers: [
                //   {
                //     labelName: '库存管理',
                //     index: "/os/member_service/member_admin"
                //   },
                //   {
                //     labelName: '出入库明细',
                //     index: "/os/member_service/consume"
                //   },
                // ],
              },
            ],
          },
          {
            type: 'menuItem',
            title: '库存管理',
            icon:"el-icon-s-shop",
            index: "/stock-management"
          },
          {
            type: 'menuItem',
            title: '销售统计',
            icon:'el-icon-s-data',
            index: "/sales-statistics"
          },
          // {
          //   type: 'menuItem',
          //   title: '类目管理',
          //   icon:'el-icon-notebook-2',
          //   index: "/category"
          // },
          {
            type: 'menuItem',
            title: '出入库明细',
            icon:'el-icon-notebook-2',
            index: "/stock_out_put"
          },
          // {
          //   type: 'menuItem',
          //   title: '打印',
          //   icon:'el-icon-notebook-2',
          //   index: "/printer"
          // },
          //   {
          //       type: 'menuItem',
          //       title: 'DEMO',
          //       icon: 'el-icon-notebook-2',
          //       index: "/demo"
          //   },

        ],
        userName:'admin',
        isShow:true
      }
    },
    methods:{
      handleShow(){
        this.isCollapsed=!this.isCollapsed;
      }
    },
    created(){
      // if(this.$route.path !== '/'){
      //   this.isShow = true
      // }
    },
    // watch:{
    //   $route(to,from){
    //     console.log("当前路由",this.$route.path);
    //     if(this.$route.path !== '/'){
    //       this.isShow = true
    //     }
    //   }
    // },
  }
</script>

<style>
  @import url('./main.css');
  /* CSS */
  .elMain{
    background: #f6f6f6;
  }
</style>
