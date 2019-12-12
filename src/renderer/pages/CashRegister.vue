<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="min-height-lg">
          <el-row>
            <el-col class="flex-row">
              <el-button  icon="el-icon-full-screen" size="small"></el-button>
              <el-input type="text" placeholder="请输入会员编号"></el-input>
              <el-button  type="primary" icon="el-icon-search" size="small"></el-button>
            </el-col>
          </el-row>
          <el-row class="m-t-lg">
            <el-col class="flex-row just-between">
              <span>会员登陆</span>
              <div>
                <el-button type="primary" size="small">二维码</el-button>
                <el-button type="primary" size="small">清除</el-button>
              </div>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <Panel
                  :array="array"
          ></Panel>
          <el-divider></el-divider>
          <el-row>
            <el-col class="flex-row just-around">
              <el-button type="primary" size="small">会员</el-button>
              <el-button type="primary" size="small">挂单</el-button>
              <el-button type="primary" size="small">清空</el-button>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-col>
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="购物区" name="first">
                  <Table
                          :tableList="shopTableList"
                          :tableData="shopTableData"
                  ></Table>
                  <el-divider></el-divider>
                  <el-row type="flex" justify="center">
                    <el-col  class="flex-row just-between flex-align" :span="18" >
                      <div>
                        <span>总价</span>
                        <h4>￥0</h4>
                      </div>
                      <div>
                        <el-button type="primary" size="small">
                          结算
                        </el-button>
                      </div>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="挂单区" name="second">
                  <Table
                          :tableList="ordersTableList"
                          :tableData="ordersTableData"
                  ></Table>
                </el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="min-height-lg">
          <el-row>
            <el-col class="flex-row">
              <el-button  icon="el-icon-full-screen" size="small"></el-button>
              <el-input type="text" placeholder="请输入商品条码或用扫码枪扫码"></el-input>
              <el-button  type="primary" icon="el-icon-search" size="small"></el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-tabs v-model="rightActiveName" @tab-click="rightHandleClick">
                <el-tab-pane label="全部" name="first">未定样式</el-tab-pane>
                <el-tab-pane label="个人洗护" name="second">未定样式</el-tab-pane>
                <el-tab-pane label="母婴专区" name="third">未定样式</el-tab-pane>
                <el-tab-pane label="家居生活" name="fourth">未定样式</el-tab-pane>
                <el-tab-pane label="零食/饮品" name="fifth">未定样式</el-tab-pane>
                <el-tab-pane label="美容美妆" name="sixth">未定样式</el-tab-pane>
                <el-tab-pane label="保健养生" name="seventh">未定样式</el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Panel from '../components/Panel';
  import Table from '../components/Table';
  export default {
    name: "CashRegister",
    data () {
      return {
        array:[
          {
            label:'名称：',
            value:'',
            span:12

          },
          {
            label:'编号：',
            value:'',
            span:12

          }, {
            label:'等级：',
            value:'',
            span:12
          }, {
            label:'积分：',
            value:'',
            span:12
          },
        ],
        activeName:'first',
        shopTableList:[
          {
            prop:'time',
            label:'名称'
          }, {
            prop:'time',
            label:'单价'
          }, {
            prop:'time',
            label:'数量'
          }, {
            type:'operation',
            prop:'time',
            label:'删除',
            isOperaText: 'isOperaText'
          }
        ],
        shopTableData:[],
        ordersTableList:[
          {
            prop:'time',
            label:'类型'
          }, {
            prop:'time',
            label:'名称'
          }, {
            prop:'time',
            label:'总价'
          }, {
            type:'operation',
            prop:'time',
            label:'操作',
            isOperaText: 'isOperaText'
          }
        ],
        ordersTableData:[],
        rightActiveName:'first',
      }
    },
    methods: {
      handleClick(){},
      rightHandleClick(){

      }
    },
    components: {
      Panel,
      Table
    },

  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

</style>
