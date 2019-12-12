<template>
  <div id="app">
    <el-container id="el-container">
      <SideMenu
              :title="title"
              :itemList="itemList"
              :bgColor = "bgColor"
              :isCollapsed="isCollapsed"
              router
              v-show="isShow"
      ></SideMenu>
      <el-container id="header-main" direction="vertical">
        <Header :userName="userName"   v-show="isShow" @handleShow="handleShow" />
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
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
            type: 'menuItem',
            title: '库存管理',
            icon:"el-icon-s-shop",
            index: "/stock-management"
          },
          {
            type: 'menuItem',
            title: '销售统计',
            icon:'el-icon-s-data',
            index: "/sanding-page"
          },
          {
            type: 'menuItem',
            title: '类目管理',
            icon:'el-icon-notebook-2',
            index: "/category"
          },
          {
            type: 'menuItem',
            title: '打印',
            icon:'el-icon-notebook-2',
            index: "/printer"
          },
        ],
        userName:'admin',
        isShow:false
      }
    },
    methods:{
      handleShow(){
        this.isCollapsed=!this.isCollapsed;
      }
    },
    created(){
      if(this.$route.path !== '/'){
        this.isShow = true
      }
    },
    watch:{
      $route(to,from){
        console.log("当前路由",this.$route.path);
        if(this.$route.path !== '/'){
          this.isShow = true
        }
      }
    },
  }
</script>

<style>
  @import url('./main.css');
  /* CSS */
</style>
