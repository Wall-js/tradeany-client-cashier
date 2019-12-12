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
        <Header :userName="userName"  v-show="isShow" @handleShow="handleShow" />
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
            title: '收 银 台',
            icon:'el-icon-full-screen',
            index: "/home"
          },
          {
            type: 'submenu',
            title: '商品管理',
            index: "1",
            icon:"el-icon-s-goods",
            routers: [
              {
                type: 'itemGroup',
                title: '商品管理',
                index: "/",
                routers: [
                  {
                    labelName: '在售产品',
                    index: "/selling-goods"
                  },
                  {
                    labelName: '云仓产品',
                    index: "/"
                  },
                ],
              },
            ],
          },
          {
            type: 'menuItem',
            title: '库存管理',
            icon:"el-icon-s-shop",
            // index: "/"
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
        ],
        userName:'admin',
        isShow:false
      }
    },
    methods:{
      handleShow(){
        this.isCollapsed=!this.isCollapsed;
      },
    },
    created(){
      if(this.$route.path !== '/'){
        this.isShow = true
      }else {
        this.isShow = false
      }
    },
    watch:{
      $route(to,from){
        console.log("当前路由",this.$route.path);
        if(this.$route.path !== '/'){
          this.isShow = true
        }else {
          this.isShow = false
        }
      }
    },
  }
</script>

<style>
  @import url('./main.css');
  /* CSS */
</style>
