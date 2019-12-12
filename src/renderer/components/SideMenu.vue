<template>
  <div id="SideMenu" >
    <el-menu :default-active="defaultActive"
             class="el-menu-vertical-demo"
             text-color="#fff"
             router
             active-text-color="#409EFF"
             background-color="#001529"
             :collapse="isCollapsed"
             @select="handleSelect"
             element-loading-background = "rgba(0, 0, 0, 0.3)"
    >
      <!--v-loading="isLoading"-->
      <el-menu-item class="title" style=".el-menu-item:hover{background:#001529 !important }">
        <span id="home-image">收银系统</span>
      </el-menu-item>
      <div>
        <div v-for="item in itemList" :key="item.index" style="display: block">
        <el-submenu :index="item.index" v-if="item.type === 'submenu'">
          <template slot="title">
            <i :class="['iconfont',item.icon]"></i>
            <span :style="isCollapsed ? 'display:none':''">{{item.title}}</span>
          </template>
          <div v-if="item.routers" v-for="group in item.routers" :key="group.index">
            <el-menu-item-group v-if="group.type === 'itemGroup'">
              <el-menu-item :index="groupChildList.index" v-for="groupChildList in group.routers"
                            :key="groupChildList.index">
                {{groupChildList.labelName}}
              </el-menu-item>
            </el-menu-item-group>
          </div>
        </el-submenu>
          <el-submenu :index="item.index" v-if="item.type === 'secondLev-submenu'">
            <template slot="title">
              <i :class="['iconfont',item.icon]"></i>
              <span :style="isCollapsed ? 'display:none':''">{{item.title}}</span>
            </template>
            <div v-if="item.routers" v-for="group in item.routers" :key="group.index">
              <el-menu-item
                v-show="!group.routers"
                :index="group.index"
               >
                {{group.title}}
              </el-menu-item>
              <el-submenu :index="group.index" v-show="group.type === 'itemGroup' && group.routers">
                <template slot="title">{{group.title}}</template>
                  <el-menu-item
                            :index="groupChildList.index"
                            v-for="groupChildList in group.routers"
                            :key="groupChildList.index">
                  {{groupChildList.labelName}}
                </el-menu-item>
              </el-submenu>
            </div>
          </el-submenu>
        <el-menu-item :index="item.index" v-if="item.type === 'menuItem'">
          <i :class="['iconfont',item.icon]"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
  export default {
    created(){
      let that = this
      this.timer = setTimeout(function (){that.isLoading=false}, 1500);
    },
    data () {
      return {
        isLoading:true,
      }
    },
    methods:{
      handleSelect(key, keyPath){
        this.$emit('handleChange',key)
      }
    },
    props: ['isCollapsed','defaultActive', 'title', 'itemList', 'bgColor']
  }
</script>

<style scoped>
  .title{
   text-align: center;
    font-size: 22px;
    font-weight: bold;
    color: #1564AF!important;
  }
  .el-menu-item-group__title {
    padding: 0;
    height: 0;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 205px;
    height: 100%;
    min-height: 100vh;
  }

  .el-menu--collapse {
    width: 64px;
    height: 100%;
    min-height: 100vh;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }
  .el-menu-item:focus, .el-menu-item:hover{
    color: #ef5b6d!important;
  }
  .el-menu-item.is-active{
    background-color: #ef5b6d!important;
    color: #FFFFFF!important;
  }
  .el-submenu__title:hover{
    background-color: #ef5b6d!important;
  }
 .iconfont{
   color: #FFFFFF;
 }
</style>
