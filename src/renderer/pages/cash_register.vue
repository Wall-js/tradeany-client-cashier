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
                    <el-table-column slot="stock" label="数量" min-width="120">
                        <template slot-scope="scope">
                          <el-input-number v-model="scope.row.quantity" :min="1" :max="100"  size="mini" @change="handleChange"></el-input-number>
                        </template>
                    </el-table-column>
                  </Table>
                  <el-divider></el-divider>
                  <el-row type="flex" justify="center">
                    <el-col  class="flex-row just-between flex-align" :span="18" >
                      <div>
                        <span>总价</span>
                        <h4>￥{{$store.state.Cashier.order.total}}</h4>
                      </div>
                      <div>
                        <el-button type="primary" size="small" @click="Category()">
                          结算
                        </el-button>
                      </div>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="挂单区" name="second">
                  <Table
                          :tableList="shopTableList"
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
                <el-tab-pane label="全部" name="first">
                  <el-table
                          ref="singleTable"
                          :data="$store.state.Goods.list"
                          highlight-current-row
                          @current-change="handleCurrentChange"
                          style="width: 100%">
                    <el-table-column
                            label="序号"
                            type="index"
                            width="50">
                    </el-table-column>
                    <el-table-column
                            property="barCode"
                            label="条形码"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            property="name"
                            label="商品名称"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            property="price"
                            label="单价"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            property="stock"
                            label="库存数量"
                            width="120">
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <!--<el-tab-pane label="个人洗护" name="second">未定样式</el-tab-pane>-->
                <!--<el-tab-pane label="母婴专区" name="third">未定样式</el-tab-pane>-->
                <!--<el-tab-pane label="家居生活" name="fourth">未定样式</el-tab-pane>-->
                <!--<el-tab-pane label="零食/饮品" name="fifth">未定样式</el-tab-pane>-->
                <!--<el-tab-pane label="美容美妆" name="sixth">未定样式</el-tab-pane>-->
                <!--<el-tab-pane label="保健养生" name="seventh">未定样式</el-tab-pane>-->
              </el-tabs>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!--结算弹窗-->
    <Dialog
            :show.sync="show"
            :dialogConfig="dialogConfig"
            @handleClose="closeDialog"
    >
      <el-row slot="content">
        <el-col>
          <Form
                  :value="categoryForm"
                  :formConfig="FormConfig"
                  ref="FormConfig"
          >
          </Form>
        </el-col>
      </el-row>
      <el-row slot="footer">
        <div class="float-right">
          <el-button type="primary" size="mini" @click="SubmitDialog">提交</el-button>
          <el-button size="mini">取消</el-button>
        </div>
      </el-row>
    </Dialog>
  </div>
</template>

<script>
  import Panel from '../components/Panel';
  import Table from '../components/Table';
  import Dialog from '../components/Dialog';
  import Form from '../components/Form';
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
            prop:'name',
            label:'名称'
          }, {
            prop:'price',
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
        //商品列表
        allTableList: [
          {
            label: '序号',
            prop: 'No',
          },
          {
            label: '条形码',
            prop: 'barCode',
          },{
            label: '商品名称',
            prop: 'name',
          },{
            label: '单价',
            prop: 'price',
          },{
            label: '库存数量',
            prop: 'stock',
          },
        ],
        rightActiveName:'first',
        membershipCode:'',
        barCode:'',
        // 商品结算
        show:false,
        dialogConfig:{
          title:'商品结算',
          width:'500px',
        },
        categoryForm:{
          price:''
        },
        FormConfig: {
          labelWidth:'120px',
          formItemList: [
           {
              type: 'input',
              label: '实收金额',
              prop: 'amount',
              style:'width:300px',
              placeholder: '请输入金额',
            },{
              type: 'input',
              label: '找零',
              prop: 'price',
              style:'width:300px',
              placeholder: '请输入价格',
            },{
              type: 'btnGroup',
              // operate: [
              //   {
              //     name: '确认',
              //     type: 'primary',
              //     handleClick: this.SubmitDialog
              //   },
              //   {
              //     name: '取消',
              //     handleClick: this.closeDialog,
              //     style: 'margin-left:10px'
              //   }
              // ]
            }
          ],
        },
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
          // console.log(this.$store.getters.total)
        // console.log(this.$store.state.Cashier.cacheOrder)
      },
        // 挂单操作
      changeCacheOrder(item,action,type){
          if(action==='提单'){
              this.$store.dispatch("Cashier/getCacheOrder",item.No);
          }else if(action==='删除'){
              this.$store.dispatch("Cashier/deleteCacheOrder",item.No);
          }
        },
      // 计算提交
      Category(){
        this.show=true;
      },
      SubmitDialog(){
       console.log( this.categoryForm)

      },
      closeDialog(){
        this.show=false;
      },
      // 添加购物车
      addGoods(item,action,type){
        console.log(item)
        // this.$store.dispatch("Cashier/createSubOrder",{"barCode":this.barCode});
      },
      handleCurrentChange(val){
        console.log(val)
      }

    },
    components: {
      Panel,
      Table,
      Dialog,
      Form
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
