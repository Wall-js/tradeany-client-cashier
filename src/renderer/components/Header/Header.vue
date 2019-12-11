<template>
  <div id="Header">
    <el-header style="font-size: 12px;height: 56px">
      <div class="side-button">
        <i class="el-icon-s-fold" style="font-size: 20px;padding: 0 0 0 20px" @click="showTrigger"></i>
      </div>
      <div class="header-right-operation">
        <div class="bell">
          <el-badge :value="0" class="item">
            <a class="el-icon-bell"></a>
          </el-badge>
        </div>
        <div class="setting">
          <a class="el-icon-setting"></a>
        </div>
        <el-dropdown @command="handleCommand">
          <div class="user-avatar">
            <!--<el-avatar :src="avatar"></el-avatar>-->
          </div>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item>个人详情</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div style="display: inline-block; line-height: 60px;">
          <div class="user-name">{{userName}}</div>
        </div>
      </div>
    </el-header>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods:{
      showTrigger () {
        this.$emit('handleShow')
      },
      handleCommand(command) {
        this.$emit('handleHeadOpt',command)
      }
    },
    // props: ['avatar','userName']
    props: ['userName']
  }
</script>

<style scoped>
  #Header{
    width:100%;
  }
  .el-header {
    display: flex;
    justify-content:space-between;
    background-color: #fff;
    color: #333;
    line-height: 60px;
    border-bottom: solid 1px #eee;
  }
  .header-right-operation{
    display: inline-flex;
    justify-content:center ;
    padding: 0 20px 0 0 ;
  }
  .user-avatar {
    height: 60px;
    /*padding: 10px 0 0 0;*/
  }
  .user-avatar .el-avatar{
   margin-top: 6px;
  }

  .el-submenu .el-menu-item {
    min-width: 195px;
  }
  .bell{
    display: inline-block;
    padding:  0 20px 0 0;
  }
  .bell .el-icon-bell{
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }
  .el-badge>>>sup{
    top: 13px;
  }
  .setting{
    display: inline-block;
    padding:  0 10px 0 0;
  }

  .setting .el-icon-setting{
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }
  .user-name{
    font-size: 14px;
    font-weight: bold;
    padding: 0 0 0 10px;
  }

</style>
