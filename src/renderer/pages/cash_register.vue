<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="min-height-lg">
          <el-row>
            <el-col class="flex-row">
              <el-input placeholder="请输入会员编号" v-model="membershipCode">
                <template slot="prepend"><el-button  icon="el-icon-full-screen" size="small"></el-button></template>
                <template slot="append"><el-button  type="primary" icon="el-icon-search" size="small"></el-button></template>
              </el-input>
            </el-col>
          </el-row>
          <el-row class="m-t-lg">
            <el-col class="flex-row just-between">
              <span>会员登陆</span>
              <div>
                <el-button type="primary" size="small">二维码</el-button>
                <el-button type="primary" size="small" @click="clearOrder">清除</el-button>
              </div>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <Panel
                  :array="membershipArray"
          ></Panel>
          <el-divider></el-divider>
          <el-row>
            <el-col class="flex-row just-around">
              <el-button type="primary" size="small">会员</el-button>
              <el-button type="primary" size="small" @click="setCacheOrder">挂单</el-button>
              <el-button type="primary" size="small" @click="cleanSubOrder">清空</el-button>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-col>
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="购物区" name="first">
                  <Table
                          :tableList="shopTableList"
                          :tableData="$store.state.Cashier.order.subOrder"
                          @changeOpera="changeOpera"
                  >
                    <el-table-column slot="stock" label="数量">
                        <template slot-scope="scope">
                          <el-input-number v-model="scope.row.quantity" :min="0" :max="10000"  size="mini" @change="handleChange"></el-input-number>
                        </template>
                    </el-table-column>
                  </Table>
                  <el-divider></el-divider>
                  <el-row type="flex" justify="center">
                    <el-col  class="flex-row just-between flex-align" :span="18" >
                      <div>
                        <span>总价</span>
                        <h4>￥{{$store.state.Cashier.total}}</h4>
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
                          :tableData="$store.state.Cashier.cacheOrder"
                          @changeOpera="changeCacheOrder"
                  >
                  </Table>
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
              <el-input placeholder="请输入商品条码或用扫码枪扫码" v-model="barCode">
                <template slot="prepend"><el-button  icon="el-icon-full-screen" size="small"></el-button></template>
                <template slot="append"><el-button  type="primary" icon="el-icon-search" size="small" @click="createSubOrder"></el-button></template>
              </el-input>
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
        membershipArray:[
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
                prop:'No',
                label:'序号'
            },
          {
            prop:'productName',
            label:'名称'
          }, {
            prop:'productPrice',
            label:'单价'
          }, {
            slot:'stock',
            type:'slot',
            prop: 'quantity',
            label: '库存数量',
          }, {
            prop: 'operation',
            label: '操作',
            type: 'operation',
            isOperaText: 'isOperaText'
          }
        ],
        shopTableData:[],
        ordersTableList:[
           {
            prop:'No',
            label:'序号'
            },{
            prop:'name',
            label:'名称'
          }, {
            prop:'price',
            label:'总价'
          }, {
            type:'operation',
            prop:'time',
            label:'操作',
            isOperaText: 'isOperaText'
          }
        ],
        ordersTableData:[
            {
                type:'22',
                name:'33',
                price:'1',
                isOperaText:['提单','删除']
            }
        ],
        rightActiveName:'first',
        membershipCode:'',
        barCode:'',

      }
    },
    methods: {
      handleClick(){},
      rightHandleClick(){
      },
      // 清空order
      clearOrder() {
        this.$store.dispatch("Cashier/clearOrder",);
      },
      // 清空商品
      cleanSubOrder(){
        this.$store.dispatch("Cashier/cleanSubOrder",);
      },
        // 添加商品
       createSubOrder() {
        this.$store.dispatch("Cashier/createSubOrder",{"barCode":this.barCode});
         // let subOrder=this.$store.state.Cashier.order.subOrder;
         // console.log(11,subOrder)
         // this.shopTableData=subOrder;
        //  subOrder.forEach((item,index)=>{
        //    item['No'] = index+1;
        //   item['isOperaText']=['删除'];
        // });
      },
        // 商品删除
      changeOpera(item,action,type){
        if(action==='删除'){
            let payload={
                "_id":item.No
            };
          this.$store.dispatch("Cashier/deleteSubOrder",payload);
        }
      },
        // 编辑商品数量
      handleChange(value){
        console.log(value)
        this.$store.dispatch("Cashier/updateSubOrder",payload);
      },
        // 挂单
      setCacheOrder(){
          this.$store.dispatch("Cashier/setCacheOrder");
          console.log(this.$store.getters.total)
        console.log(this.$store.state.Cashier.cacheOrder)
      },
        // 挂单操作
      changeCacheOrder(item,action,type){
          if(action==='提单'){
              this.$store.dispatch("Cashier/getCacheOrder",item.No);
          }else if(action==='删除'){
              this.$store.dispatch("Cashier/deleteCacheOrder",item.No);
          }
        }

    },
    components: {
      Panel,
      Table
    },
    computed: {

    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  .flex-row>>>.el-input-group__append{
    background-color: #409EFF !important;
    color: #fff;
  }
</style>
