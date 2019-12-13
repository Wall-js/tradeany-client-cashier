<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="min-height-lg">
          <!--<el-row>-->
            <!--&lt;!&ndash;<el-col class="flex-row">&ndash;&gt;-->
              <!--&lt;!&ndash;<el-input placeholder="请输入会员编号" v-model="membershipCode">&ndash;&gt;-->
                <!--&lt;!&ndash;<template slot="prepend"><el-button  icon="el-icon-full-screen" size="small"></el-button></template>&ndash;&gt;-->
                <!--&lt;!&ndash;<template slot="append"><el-button  type="primary" icon="el-icon-search" size="small"></el-button></template>&ndash;&gt;-->
              <!--&lt;!&ndash;</el-input>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
          <!--</el-row>-->
          <el-row class="m-t-lg">
            <el-col class="flex-row just-between">
              <!--<span>会员登陆</span>-->
              <!--<div>-->
                <!--<el-button type="primary" size="small">二维码</el-button>-->
                <!--<el-button type="primary" size="small" @click="clearOrder">清除</el-button>-->
              <!--</div>-->
            </el-col>
          </el-row>
          <!--<el-divider></el-divider>-->
          <!--<Panel-->
                  <!--:array="membershipArray"-->
          <!--&gt;</Panel>-->
          <!--<el-divider></el-divider>-->
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
                  <el-table
                          :data="getGoods"
                          :header-cell-style="{color:'#333333',fontWeight: 'normal',textAlign:'center',background: '#f3f3f3',borderColor:'#d7d7d6'}"
                          :cell-style="{textAlign:'center'}"
                          style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="名称"

                            >
                    </el-table-column>
                    <el-table-column
                            prop="price"
                            label="单价"
                           >
                    </el-table-column>
                    <el-table-column
                            label="数量"
                            width="150">
                      <template slot-scope="scope">
                          <el-input-number v-model="scope.row.quantity" :min="1" :max="100"  size="mini" @change="handleChange(scope)"></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            >
                      <template slot-scope="scope">
                        <el-button @click="changeOpera(scope.$index)" type="text" size="small">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-divider></el-divider>
                  <el-row type="flex" justify="center">
                    <el-col  class="flex-row just-between flex-align" :span="18" >
                      <div>
                        <span>总价</span>
                        <h4>￥{{$store.state.Cashier.order.total}}</h4>
                      </div>
                      <div>
                        <el-button type="primary" size="small" @click="Category">
                          结算
                        </el-button>
                      </div>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="挂单区" name="second">
                  <el-table
                          :data="getOrder"
                          :header-cell-style="{color:'#333333',fontWeight: 'normal',textAlign:'center',background: '#f3f3f3',borderColor:'#d7d7d6'}"
                          :cell-style="{textAlign:'center'}"
                          style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="名称"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="total"
                            label="总价"
                          >
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                      <template slot-scope="scope">
                        <el-button @click="getCacheOrder(scope.$index)" type="text" size="small">挂单</el-button>
                        <el-button @click="deleteCacheOrder(scope.$index)" type="text" size="small">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
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
              <el-input placeholder="请输入商品条码或用扫码枪扫码" v-model="barCode" @keyup.enter.native="createSubOrder">
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
                          :header-cell-style="{color:'#333333',fontWeight: 'normal',textAlign:'center',background: '#f3f3f3',borderColor:'#d7d7d6'}"
                          :cell-style="{textAlign:'center'}"
                          highlight-current-row
                          @row-click="handleCurrentChange"
                          style="width: 100%">
                    <el-table-column
                            label="序号"
                            type="index"
                            width="100"
                          >
                    </el-table-column>
                    <el-table-column
                            property="barCode"
                            label="条形码"
                           >
                    </el-table-column>
                    <el-table-column
                            property="name"
                            label="商品名称"
                            >
                    </el-table-column>
                    <el-table-column
                            property="price"
                            label="单价"
                           >
                    </el-table-column>
                    <el-table-column
                            property="stock"
                            label="库存数量"
                            >
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
      <el-main slot="content">
        <el-row>
          <el-col :span="10">
            <el-col>
              <h3 style="text-align: center">------欢迎光临------</h3>
            </el-col>
            <el-col class="flex-row flex-align">
              <h3>会员名称：</h3>
              <span>{{$store.state.Cashier.order.consumer.name}}</span>
            </el-col>
            <el-col style="border-top: 1px solid #dddddd;overflow: hidden;">
              <el-table
                      :data="$store.state.Cashier.order.subOrder"
                      :header-cell-style="{textAlign: 'center'}"
                      :cell-style="{textAlign: 'center'}"
                      style="width: 100%">
                <el-table-column
                        prop="name"
                        label="商品名称"

                >
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="单价"
                >
                </el-table-column>
                <el-table-column
                        prop="quantity"
                        label="数量"
                >
                </el-table-column>
                <!--<el-table-column-->
                <!--prop="subtotal"-->
                <!--label="小计"-->
                <!--&gt;-->
                <!--</el-table-column>-->
              </el-table>
            </el-col>
            <el-col class="flex-row just-end m-t-lg">
              <div class="flex-row just-between flex-align">
                <h4>数量：</h4>
                <h2 style="color:#409EFF">{{totalQty}}</h2>
              </div>
              <div class="flex-row just-between flex-align m-l-lg">
                <h4>总金额：</h4>
                <h2 style="color:#409EFF">{{$store.state.Cashier.order.total}}</h2>
              </div>
            </el-col>
          </el-col>
          <el-col :span="14" class="flex-column just-between flex-align">

            <el-form :model="accountForm" ref="accountForm" label-width="100px" class="demo-ruleForm" size="small">
              <el-form-item label="实收金额：">
                <el-input type="text" autofocus v-model="accountForm.payment" @input="paymentChange" @change="looseChange"></el-input>
              </el-form-item>
              <el-form-item label="找零：" prop="looseChange" >
                <el-input type="text" autofocus v-model="accountForm.looseChange" disabled></el-input>
              </el-form-item>
              <div>
                <KeyBoard></KeyBoard>
              </div>
              <el-form-item>
                <el-checkbox v-model="accountForm.isPrinter" class="m-l-sm">是否打印小票</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="settlementForm('ruleForm')" :disabled="isSettlement">确认结算</el-button>
              </el-form-item>

            </el-form>
          </el-col>
        </el-row>
      </el-main>
    </Dialog>
      <webview :src="fullPath" nodeintegration></webview>
  </div>
</template>

<script>
  import Panel from '../components/Panel';
  import Table from '../components/Table';
  import Dialog from '../components/Dialog';
  import Form from '../components/Form';
  import KeyBoard from '../components/KeyBoard';

  import path from 'path'
  const ipcRenderer = require("electron").ipcRenderer;
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
        rightActiveName:'first',
        membershipCode:'',
        barCode:'',
        // 商品结算
        show:false,
        dialogConfig:{
          title:'商品结算',
          width:'1000px',
        },
        accountTableData:[{}],
        accountForm:{
          payment:'',
          looseChange:'',
          isPrinter:''
        },
        accountFormRules:{

        },
        isSettlement:true,
        totalQty:0,
        total:this.$store.state.Cashier.order.total,

        //打印小票
        fullPath: path.join(__static, 'print.html'),
        printerList: [],
        printer: "",
        //小键盘
        option:'',
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
         // this.barCode=''

      },
        // 商品删除
      changeOpera(index){
        console.log(index)
        this.$store.dispatch("Cashier/deleteSubOrder",{index:index})
      },
        // 编辑商品数量
      handleChange(scope){
        this.$store.dispatch("Cashier/updateSubOrder", {index: scope.$index, quantity: scope.row.quantity});
      },
        // 挂单
      setCacheOrder(){
          this.$store.dispatch("Cashier/setCacheOrder");
      },
        // 提单
      getCacheOrder(index){
        this.$store.dispatch("Cashier/getCacheOrder",{index:index});
      },
      // 删除挂单
      deleteCacheOrder(index){
        this.$store.dispatch("Cashier/deleteCacheOrder",{index:index});
      },
      // 计算提交
      Category(){
        let total = this.$store.state.Cashier.order.total;
        if(total === 0){
          this.$message.error("暂无结算商品")
        }else {
          this.show=true;
          this.$store.state.Cashier.order.subOrder.forEach(item =>{
              this.totalQty+=item.quantity
          })


        }
      },
      SubmitDialog(){
       console.log( this.categoryForm)

      },
      closeDialog(){
        this.show=false;
      },
      // 添加购物车
      handleCurrentChange(val){
        this.barCode=val.barCode
        this.createSubOrder();
      },
      //结算
      paymentChange (value){
        console.log(value)
        if(!this.checkNumber(value)){
          this.$message.error("请输入数字")
        }else {
          this.accountForm['looseChange'] = '';
        }
      },
      //计算找零
      looseChange(value){
        value *= 1;
        let total = this.$store.state.Cashier.order.total;
        if(value>=total){
          this.isSettlement = false;
          this.accountForm['looseChange'] = (value - total).toFixed(2)
        }else {
          this.$message.error('请输入正确金额');
          this.isSettlement = true
        }
      },
      //确认结算
      settlementForm(){
        if(this.accountForm.isPrinter){
          this.$store.dispatch("Cashier/createOrder",this.$store.state.Cashier.order);
          // this.$router.push("/printer")
            //打印订单
            console.log(this.$store.state.Cashier.order);
            this.getPrinterList(this.$store.state.Cashier.order)
        }else{
          this.$store.dispatch("Cashier/createOrder",this.$store.state.Cashier.order);
        }
        this.show = false
      },
        //打印
        print(order) {
            const webview = document.querySelector("webview");
            console.log(webview);
            // webview.addEventListener("dom-ready", () => {
                console.log("dom-ready");
                //dom-ready---webview加载完成
                // webview.openDevTools();  //这个方法可以打开print.html的控制台
                // var order = {
                //     "username": "张萌",
                //     "uid": "213456768765342",
                //     "orderNo": "234657687645342",
                //     "subOrderList": [
                //         {
                //             "itemName": "卫龙辣条 大包装",
                //             "skuName": "20根",
                //             "price": "5.00",
                //             "qty": "2",
                //             "payFee": "10.00"
                //         },
                //     ],
                //     "totalQty": "2",
                //     "payFee": "10.00",
                //     "payTime": "2019-12-11 12:12",
                // };
                //在send时将arr传递过去
                webview.send("ping", order); //向webview嵌套的页面响应事件
            // });
            webview.addEventListener("ipc-message", event => {
                console.log(event.channel); // Prints "pong" 在此监听事件中接收webview嵌套页面所响应的事件
                if (event.channel == "pong") {
                    console.log("通信成功");
                    console.log(this.printer);
                    webview.print(
                        {
                            //是否是静默打印,true 为静默打印，false 会弹出打印设置框
                            silent: true,
                            printBackground: true,
                            //打印机的名称，this.print1为在getPrinterList()方法中获取到的打印机名字。
                            //注意在demo中这是我打印机的设备，在使用本demo时，先去getPrinterList()中找到你使用的打印机
                            deviceName: this.printer
                        },
                        data => {
                            //这个回调是打印后的回调事件，data为true就是打印成功，为false就打印失败
                            console.log("webview success", data);
                            // this.$router.push('/home')
                        }
                    );
                }
            });
        },
        getPrinterList(order) {
            ipcRenderer.send("getPrinterList");
            //监听主线程获取到打印机列表后的回调
            ipcRenderer.once("getPrinterList", (event, data) => {
                //data就是打印机列表
                // 过滤可用打印机
                this.printerList = data.filter(element => element.status === 0);
                for (let i in this.printerList) {
                    if (data[i].isDefault) {
                        this.printer = data[i].name;
                        console.log(this.printer)
                    }
                }
                console.log(this.printerList);
                // 判断是否有打印服务
                console.log(this.printerList.length);
                if (this.printerList.length <= 0) {
                    this.$message({
                        message: '打印服务异常,无法找到打印机服务',
                        type: 'error'
                    })
                } else {
                    this.print(order);
                }
            });
        },


    },
    components: {
      Panel,
      Table,
      Dialog,
      Form,
      KeyBoard
    },
      computed: {
          // 获取商品
          getGoods(){
              let data=[];
              this.$store.state.Cashier.order.subOrder.slice().forEach((item,index)=>{
                  let obj={name:item.name,price:item.price,quantity:item.quantity}
                  // item['quantity'] = item.quantity;
                  data.push(obj)
              });
              return data
          },
          // 获取挂单
          getOrder(){
              let data=[];
              this.$store.state.Cashier.cacheOrder.forEach((item)=>{
                  item['name'] = item.consumer.name;
                  item['subOrderQty'] = item.subOrder.length;
                  data.push(item)
              });
              return data
          }
      },
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  .flex-row>>>.el-input-group__append{
    background-color: #409EFF !important;
    color: #fff;
  }
  .noteTitle{
    text-align: center;
  }
  .payment{
    width: 200px;
  }
  .label{
    width:100px;
    text-align: right;
    margin-right: 10px;
  }
</style>
