<!--page name:'商品管理'-->
<template>
    <div class="container">
        <el-card class="searchForm">
            <Form :value="searchForm"
                    :formConfig="searchFormConfig"
                    refName="searchForm"
            >
                <div slot="codeInput" class="float-right m-l-sm">
                    <el-button  icon="el-icon-full-screen" size="small" ></el-button>
                </div>
            </Form>
        </el-card>
        <el-card class="mainBox">
            <el-row>
                <el-col>
                    <el-button type="primary" size="small" @click="()=>{this.show=true}">商品录入</el-button>
                </el-col>
            </el-row>
            <el-row style="padding-top: 14px">
                <el-col>
                    <package-table
                            :tableList="tableList"
                            :tableData="tableData"
                            @changeOpera="changeOpera"
                    ></package-table>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <page-break :pageTotal="$store.state.Goods.pagination.total" :pageSize="$store.state.Goods.pagination.pageSize"
                                @pageChange="pageChange"></page-break>
                </el-col>
            </el-row>
        </el-card>
        <!--商品录入弹窗-->
        <Dialog
            :show.sync="show"
            :dialogConfig="dialogConfig"
            @handleClose="closeDialog"
        >
            <el-row slot="content">
                <el-col>
                    <Form
                            :value="addProductForm"
                            :formConfig="addProductFormConfig"
                            refName="addProductForm"
                            ref="dialogForm"
                    >
                        <div slot="codeInput" class="float-right m-l-sm">
                            <el-button  icon="el-icon-full-screen" size="small"></el-button>
                        </div>
                    </Form>
                </el-col>
            </el-row>
        </Dialog>
    </div>
</template>

<script>

    import PageBreak from '../components/Pagination'
    import Form from '../components/Form'
    import PackageTable from '../components/Table'
    import Dialog from '../components/Dialog';

    export default {
        layout: 'home',
        data () {
            return {
                /**
                 *搜索
                 **/
                searchForm: {
                    barCode:'',
                    productName:''
                },
                searchFormConfig: {
                    line_type: true,
                    formItemList: [
                        {
                            type: 'input',
                            label: '条形码：',
                            prop: 'barCode',
                            style:'width:246px',
                            placeholder: '请输入或通过扫码枪获取条形码',
                            slotBottom:'codeInput',
                        },{
                            type: 'input',
                            label: '商品名称：',
                            prop: 'productName',
                            style:'width:300px',
                            placeholder: '请输入商品名称',
                        }, {
                            type: 'btnGroup',
                            operate: [
                                {
                                    name: '查询',
                                    type: 'primary',
                                    handleClick: this.search
                                },
                                {
                                    name: '重置',
                                    handleClick: this.reset,
                                    style: 'margin-left:10px'
                                }
                            ]
                        }
                    ],
                },
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
                        prop: 'productName',
                    },{
                        label: '单价',
                        prop: 'productPrice',
                    },{
                        label: '库存数量',
                        prop: 'productQty',
                    },
                    {
                        type:'operation',
                        prop: 'operation',
                        label:'操作',
                        isOperaText: 'isOperaText'
                    }
                ],
                tableData: [
                    {
                        productQty:12121212,
                        isOperaText:['修改']
                    }
                ],
                pageTotal: this.$store.state.Goods.pagination.total,
                pageSize: 10,
                currentPage:'1',
                //商品录入
                show:false,
                dialogConfig:{
                    title:'商品录入',
                    width:'500px',
                },
                addProductForm:{
                    barCode:'',
                    productName:'',
                    productPrice:'',
                    productQty:''
                },
                addProductFormConfig: {
                    labelWidth:'120px',
                    formItemList: [
                        {
                            type: 'input',
                            label: '条形码',
                            prop: 'barCode',
                            style:'width:246px',
                            placeholder: '请输入或通过扫码枪获取条形码',
                            slotBottom:'codeInput',
                            rules:[
                                {required: true, message: '请输入或通过扫码枪获取条形码', trigger: 'blur'}
                            ],
                        },{
                            type: 'input',
                            label: '商品名称',
                            prop: 'productName',
                            style:'width:300px',
                            placeholder: '请输入商品名称',
                            rules:[
                                {required: true, message: '请输入商品名称', trigger: 'blur'}
                            ],
                        },{
                            type: 'input',
                            label: '单价',
                            prop: 'productPrice',
                            style:'width:300px',
                            placeholder: '请输入单价',
                            rules:[
                                {required: true, message: '请输入单价', trigger: 'blur'}
                            ],
                        },{
                            type: 'input',
                            label: '库存数量',
                            prop: 'productQty',
                            style:'width:300px',
                            placeholder: '请输入数量',
                        }, {
                            type: 'btnGroup',
                            operate: [
                                {
                                    name: '确认',
                                    type: 'primary',
                                    handleClick: this.addProductSubmit
                                },
                                {
                                    name: '取消',
                                    handleClick: this.closeDialog,
                                    style: 'margin-left:10px'
                                }
                            ]
                        }
                    ],
                },
            }
        },
        components: {
            PageBreak,
            Form,
            PackageTable,
            Dialog,
        },
        methods: {
            /**
             * 搜索
             */
            //查询
            search() {
                console.log('搜索数据', this.searchForm)
            },
            //重置
            reset(refs) {
                refs['searchForm'].resetFields();
            },
            //商品录入
            async addProductSubmit(refs){
                refs['addProductForm'].validate((valid) => {
                    if (valid) {
                        console.log("dsfdsfsd")
                        // this.$db.goods.insert(this.addProductForm,(err,newDocs) => {
                        //     if(newDocs){
                        //         this.$message.success('录入成功')
                        //         this.show=false
                        //     }else {
                        //         this.$message.success('录入失败，请重试')
                        //     }
                        // })
                        this.$store.dispatch("createGoods",this.addProductForm)
                        this.$message.success('录入成功')
                        this.tableData = this.$store.state.Goods.list;
                        this.show=false;
                        refs['addProductForm'].resetFields();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //关闭弹窗
            closeDialog(refs){
                if(refs){
                    this.show=false
                    refs['addProductForm'].resetFields();
                }else {
                    this.$refs['dialogForm']['$refs']['addProductForm'].resetFields();
                }
            },
            //商品操作
            changeOpera (item, action, type) {
                if (action === '修改') {
                    this.show = true;
                    let formItemList = this.addProductFormConfig['formItemList'];
                    formItemList[0]['disabled'] = true;
                    formItemList[formItemList.length-2]['disabled'] = true;
                    this.addProductForm = item
                }
            },
            changeEdit () {

            },

            /**
             * 分页数据
             * @param item
             */
            async pageChange (item) {
                let params = {
                    pageSize:10,
                    current:item
                }
                this.$store.dispatch('setGoodsPagination',params);
            },
            /**
             * 下架按钮
             * */
            submitRechargeForm () {
                this.show = false
            },
            //获取数据
            async getGoods(){
                this.$store.dispatch("getGoods");
                const list = this.$store.state.Goods.list;
                console.log(this.$store.state.Goods.list)
                console.log(this.$store.state.Goods.pagination)
                if(list){
                    list.forEach((item,index)=>{
                        item['No'] = index+1;
                        item['isOperaText'] = [`修改`,`删除`]
                    })
                }
                this.tableData = list;
            }
        },
        created() {
            this.getGoods()
        }
    }
</script>

<style scoped>
    .container {
        margin: 0 auto;
    }

    .mainBox {
        margin: 10px 0 30px !important;
        min-height: 100vh;
    }

    .searchForm {
        margin-top: 10px;
    }

    .mainBox-btn {
        margin-bottom: 8px;
        margin-top: 5px;
        float: right;
    }

</style>

