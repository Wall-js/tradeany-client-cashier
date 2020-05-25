<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="min-height-lg">
          <el-row>
          <el-col class="flex-row">
          <el-input placeholder="请输入会员编号" v-model="membershipCode">
          <template slot="prepend"><el-button  icon="el-icon-full-screen" size="small"></el-button></template>
          <template slot="append"><el-button  type="primary" icon="el-icon-search" size="small" @click="getUser"></el-button></template>
          </el-input>
          </el-col>
          </el-row>
          <el-row>
            <el-divider></el-divider>
            <Panel
                    :array="getUserData"
            ></Panel>
            <el-divider></el-divider>
          </el-row>
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
                        <el-input-number v-model="scope.row.quantity" :min="1" :max="scope.row.stock"  size="mini" @change="handleChange(scope)"></el-input-number>
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
                        <h4>￥{{$store.state.cashierOnline.order.total}}</h4>
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
                    <el-table-column  label="操作" >
                      <template slot-scope="scope">
                        <el-button @click="getCacheOrder(scope.$index)" type="text" size="small">提单</el-button>
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
              <el-input placeholder="请输入商品条码或用扫码枪扫码" v-model="barCode" @keyup.enter.native="createSubOrder" clearable v-focus>
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
                          :data="getAllGoods"
                          :header-cell-style="{color:'#333333',fontWeight: 'normal',textAlign:'center',background: '#f3f3f3',borderColor:'#d7d7d6'}"
                          :cell-style="{textAlign:'center'}"
                          highlight-current-row
                          @row-click="handleCurrentChange"
                          style="width: 100%">
                    <el-table-column :prop="item.prop" :label="item.label" v-for="item in tableList"></el-table-column>
                  </el-table>
                  <el-row>
                    <el-col>
                      <page-break :pageTotal="$store.state.cashierOnline.pagination.total" :pageSize="$store.state.cashierOnline.pagination.pageSize"
                                  @pageChange="pageChange"></page-break>
                    </el-col>
                  </el-row>
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
              <span>{{$store.state.cashierOnline.order.consumer.name}}</span>
            </el-col>
            <el-col style="border-top: 1px solid #dddddd;overflow: hidden;">
              <el-table
                      :data="$store.state.cashierOnline.order.subOrder"
                      :header-cell-style="{textAlign: 'center'}"
                      :cell-style="{textAlign: 'center'}"
                      style="width: 100%">
                <el-table-column
                        prop="name"
                        label="商品名称"

                >
                </el-table-column>
                <el-table-column
                        prop="goodsPrice"
                        label="单价"
                >
                </el-table-column>
                <el-table-column
                        prop="quantity"
                        label="数量"
                >
                </el-table-column>
                <el-table-column
                        prop="subTotal"
                        label="价格"
                >
                </el-table-column>
              </el-table>
            </el-col>
            <el-col class="flex-row just-end m-t-lg">
              <div class="flex-row just-between flex-align">
                <h4>数量：</h4>
                <h2 style="color:#409EFF">{{$store.state.cashierOnline.order.qtyTotal}}</h2>
              </div>
              <div class="flex-row just-between flex-align m-l-lg">
                <h4>总金额：</h4>
                <h2 style="color:#409EFF">{{$store.state.cashierOnline.order.total}}</h2>
              </div>
            </el-col>
          </el-col>
          <el-col :span="14" class="flex-column just-between flex-align">

            <el-form :model="accountForm" ref="accountForm" label-width="100px" class="demo-ruleForm" size="small">
              <el-form-item label="实收金额：">
                <el-input type="text" autofocus v-model="accountForm.payment" @input="paymentChange" :readonly="true"  ></el-input>
              </el-form-item>
              <el-form-item label="找零：" prop="looseChange" >
                <el-input type="text" autofocus v-model="accountForm.looseChange" disabled></el-input>
              </el-form-item>

              <div>
                <KeyBoard   @keyval="setPayment" ></KeyBoard>
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
    <webview :src="fullPath" nodeintegration v-show="isShowPrinter"></webview>
  </div>
</template>

<script>
    import Panel from '../components/Panel';
    import Table from '../components/Table';
    import Dialog from '../components/Dialog';
    import Form from '../components/Form';
    import KeyBoard from '../components/KeyBoard';
    import PageBreak from '../components/Pagination'

    import path from 'path'
    const ipcRenderer = require("electron").ipcRenderer;
    export default {
        name: "CashRegister",
        data () {
            return {
                activeName:'first',
                rightActiveName:'first',
                membershipCode:'',
                barCode:'',
              //商品列表
               tableList: [
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
                },
                //  {
                //   label: '库存数量',
                //   prop: 'stock',
                // }
              ],
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
                    isPrinter:true
                },
                isSettlement:true,
                totalQty:0,
                total:this.$store.state.cashierOnline.order.total,

                //打印小票
                fullPath: path.join(__static, 'print.html'),
                printerList: [],
                printer: "",
                isShowPrinter:true,
                //小键盘
                option:'',
            }
        },
        //自定义指令
        directives: {
          // 注册一个局部的自定义指令 v-focus
          focus: {
            // 指令的定义
            inserted: function (el) {
              // 聚焦元素
              el.querySelector('input').focus()
            }
          },
        },
        methods: {
          // 获取会员信息
          getUser(){
            this.$store.dispatch("cashierOnline/getUser",{userUid:this.membershipCode});
          },
          //获取数据;
          getMsg(){
            this.$store.dispatch("cashierOnline/getGoods",{
              pagination: {
                current: 1,
                pageSize: 10,
              }});
          },
            handleClick(){},
            rightHandleClick(){
            },
            // 清空order
            clearOrder() {
                this.$store.dispatch("cashierOnline/clearOrder",);
            },
            // 清空商品
            cleanSubOrder(){
                this.$store.dispatch("cashierOnline/cleanSubOrder",);
            },
            // 添加商品
            createSubOrder() {
                this.$store.dispatch("cashierOnline/createSubOrder",{"barCode":this.barCode});
                this.barCode=''

            },
            // 商品删除
            changeOpera(index){
                this.$store.dispatch("cashierOnline/deleteSubOrder",{index:index})
            },
            // 编辑商品数量
            handleChange(scope){
                this.$store.dispatch("cashierOnline/updateSubOrder", {index: scope.$index, quantity: scope.row.quantity,subTotal: scope.row.subTotal});
            },
            // 挂单
            setCacheOrder(){
                this.$store.dispatch("cashierOnline/setCacheOrder");
            },
            // 提单
            getCacheOrder(index){
                this.$store.dispatch("cashierOnline/getCacheOrder",{index:index});
            },
            // 删除挂单
            deleteCacheOrder(index){
                this.$store.dispatch("cashierOnline/deleteCacheOrder",{index:index});
            },
            // 计算提交
            Category(){
                let total = this.$store.state.cashierOnline.order.total;
                if(total === 0){
                    this.$message.error("暂无结算商品")
                }else {
                    this.show=true;
                    this.accountForm.payment = '';
                    this.accountForm.isPrinter = true;
                    this.$store.state.cashierOnline.order.subOrder.forEach(item =>{
                        this.totalQty+=item.quantity
                    })
                }
            },
            closeDialog(){
                this.show=false;
            },
            // 添加购物车
            handleCurrentChange(val){
                this.barCode=val.barCode;
                this.createSubOrder();
            },
            //结算
            paymentChange (value){
                var reg = /^[0-9]+.?[0-9]*$/;
                if (!reg.test(value)) {
                    this.$message.error("请输入数字");
                    return;
                }else {
                    this.accountForm['looseChange'] = '';
                }
            },
            //小键盘触发
            setPayment(val){
                if (val === 'del' ) {
                    this.accountForm.payment = this.accountForm.payment.toString().substr(0, this.accountForm.payment.toString().length - 1);
                } else {
                    if(this.accountForm.payment.indexOf(".") >=0){
                        if(val ==".") return ;
                        let start=this.accountForm.payment.indexOf("."),end=start+2;
                        this.accountForm.payment=this.accountForm.payment.slice(0,start)+this.accountForm.payment.slice(start,end);
                    }
                    this.accountForm.payment += val
                }

            },
            //计算找零
            looseChange(value){
                this.accountForm.looseChange='';
                value *= 1;
                let total = this.$store.state.cashierOnline.order.total;
                if(value>=total){
                    this.isSettlement = false;
                    this.accountForm['looseChange'] = (value - total).toFixed(2)
                }else {
                    // this.$message.error('请输入正确金额');
                    this.isSettlement = true
                }
            },
            //确认结算
            settlementForm(){
              console.log(8881,this.$store.state.cashierOnline.order)
              let subOrder = this.$store.state.cashierOnline.order.subOrder;
              let sellerSubOrderSet = [];
              let formData = {};
              if(subOrder){
                subOrder.forEach(item=>{
                  sellerSubOrderSet.push({
                    goodsItemSkuCode:item.itemSkuCode,
                    quantity:item.quantity,
                  })
                })
                formData.userUid =this.$store.state.cashierOnline.order.consumer.userUid;
                formData.sellerSubOrderSet =sellerSubOrderSet;
              }
                if(this.accountForm.isPrinter){
                    this.$store.dispatch("cashierOnline/createOrder",formData).then(res=>{
                      this.$message.success("结算成功");
                      //打印订单
                      this.getPrinterList(res);
                      //更新页面
                      this.getMsg();
                      this.clearOrder()
                    },err=>{
                      console.log(11,err);
                      this.$message.error(err);
                    });
                }else{
                    this.$store.dispatch("cashierOnline/createOrder",formData).then(res=>{
                      this.$message.success("结算成功");
                      //更新页面
                      this.getMsg();
                      this.clearOrder()
                    },err=>{
                      console.log(11,err);
                      this.$message.error(err);
                    });
                }
                this.show = false
            },
            //打印
            print(order) {
                console.log('订单',order);
                const webview = document.querySelector("webview");
                console.log(webview);
                // webview.addEventListener("dom-ready", () => {
                console.log("dom-ready");
                //dom-ready---webview加载完成
                // webview.openDevTools();  //这个方法可以打开print.html的控制台
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
                                this.isShowPrinter = false;
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
          //分页
          pageChange(item){
            this.$store.dispatch("cashierOnline/getGoods",{
              pagination: {
                current: item,
                pageSize: 10,
              }});
          }



        },
        components: {
            Panel,
            Table,
            Dialog,
            Form,
            KeyBoard,
            PageBreak
        },
      created() {
        this.getMsg();
      },
        computed: {
          // 获取商品
            getGoods(){
                let data=[];
                this.$store.state.cashierOnline.order.subOrder.slice().forEach((item,index)=>{
                    data.push({...item})
                });
                return data
            },
           // 获取会员
            getUserData(){
              console.log(this.$store.state.cashierOnline.userList)
              let membershipArray= [
                {
                  label:'名称：',
                  value:this.$store.state.cashierOnline.order.consumer.nickName,
                  span:12

                },
                {
                  label:'编号：',
                  value:this.$store.state.cashierOnline.order.consumer.userUid,
                  span:12

                },
              ];
              return  membershipArray
            },
         // 获取挂单
            getOrder(){
                let data=[];
                this.$store.state.cashierOnline.cacheOrder.forEach((item)=>{
                    item['name'] = item.consumer.nickName;
                    item['subOrderQty'] = item.subOrder.length;
                    data.push(item)
                });
                return  data
            },
         // 获取全部商品
           getAllGoods(){
              return this.$store.state.cashierOnline.list
           }
        },
        watch:{
            'accountForm.payment'(val){
                this.looseChange(val)
            }

        }
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
