<!--page name:'商品管理'-->
<template>
    <div class="container">
        <el-card class="searchForm">
            <Form :value="searchForm"
                    :formConfig="searchFormConfig"
                    refName="searchForm"
            ></Form>
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
                            :tableList="TableList"
                            :tableData="TableData"
                            @changeOpera="changeOpera"
                    ></package-table>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <page-break :pageTotal="pageTotal" :pageSize="PageSize"
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
                // loading:'false',
                /**
                 *form表单
                 **/
                searchForm: {
                    min:0,
                    max:0,
                },
                searchFormConfig: {
                    line_type: true,
                    formItemList: [
                        {
                            type: 'input',
                            label: '商品名称：',
                            prop: 'line_name',
                            placeholder: '请输入',
                            labelWidth:'120px',
                        },{
                            type: 'select',
                            label: '商品分类：',
                            prop: 'line_name',
                            labelWidth:'120px',
                            optList: [
                                {
                                    value: '选项1',
                                    label: '全部'
                                }, {
                                    value: '选项2',
                                    label: '已成托'
                                }]
                        },{
                            type: 'input',
                            label: '品牌：',
                            prop: 'line_name',
                            placeholder: '请输入',
                            labelWidth:'120px',
                        },{
                            type: 'rangeInput',
                            prop: 'price',
                            label: '商品价格：',
                            propList:['min','max'],
                            unit:'元',
                            numConfig:{
                                precision:2,
                                step:0.1,
                                min:0,
                            }},{
                            type: 'input',
                            label: '物理仓：',
                            prop: 'line_name',
                            placeholder: '请输入',
                            labelWidth:'120px',
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

                //所有记录
                TableList: [
                    {
                      type: 'selection',
                      width: '55',
                    },
                    {
                        prop: 'name',
                        label: '产品名',
                        // width: '180'
                    },
                    {
                        prop: 'image',
                        type: 'image',
                        label: '产品图',
                        width: '180'
                    },
                    {
                        prop: 'brandName',
                        label: '品牌',
                        // width: '180'
                    },
                    {
                        prop: 'sizeName1',
                        label: '规格名',
                        // width: '180'
                    },
                    {
                        prop: 'name1',
                        label: '规格值',
                        // width: '180'
                    },
                    {
                        prop: 'name2',
                        label: '规格值',
                        // width: '180'
                    },
                    {
                        prop: 'cloudPrice',
                        label: '运营价格',
                        // width: '180'
                    },
                    {
                        prop: 'price',
                        label: '售价',
                        // width: '180'
                    },
                    {
                        prop: 'storage',
                        label: '物理仓',
                        // width: '180'
                    },
                    {
                        prop: 'operation',
                        label: '操作',
                        type: 'operation',
                        isOperaText: 'isOperaText'
                        // width: '150',
                    }
                    ],
                TableData: [

                ],
                pageTotal: 1,
                PageSize: 10,
                currentPage:'1',
                //商品录入
                show:false,
                dialogConfig:{
                    title:'商品录入',
                    width:'500px',
                },
                addProductForm:{},
                addProductFormConfig: {
                    labelWidth:'120px',
                    formItemList: [
                        {
                            type: 'input',
                            label: '条形码：',
                            prop: 'barCode',
                            style:'width:246px',
                            placeholder: '请输入或通过扫码枪获取条形码',
                            slotBottom:'codeInput',
                            rules:[
                                {required: true, message: '请输入或通过扫码枪获取条形码', trigger: 'blur'}
                            ],
                        },{
                            type: 'input',
                            label: '商品名称：',
                            prop: 'productName',
                            style:'width:300px',
                            placeholder: '请输入商品名称',
                            rules:[
                                {required: true, message: '请输入商品名称', trigger: 'blur'}
                            ],
                        },{
                            type: 'input',
                            label: '单价：',
                            prop: 'productPrice',
                            style:'width:300px',
                            placeholder: '请输入单价',
                            rules:[
                                {required: true, message: '请输入单价', trigger: 'blur'}
                            ],
                        },{
                            type: 'input',
                            label: '数量：',
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
            //商品录入
            addProductSubmit(refs){
                refs['addProductForm'].validate((valid) => {
                    if (valid) {
                       console.log(this.addProductForm)
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
            changeOpera (item, action, type) {
                if (action === '下架') {
                    this.show = true
                }
                if (action === '查看详情') {
                }
            },
            changeEdit () {

            },

            /**
             * 订单搜索
             */
            search(searchForm) {
                console.log('搜索数据', this.searchForm)
            },
            /**
             * 重置
             */
            reset () {
                console.log('重置')
                console.log(this.$refs)
                this.$refs['search'].resetForm()
            },
            /**
             * 分页数据
             * @param item
             */
            pageChange (item) {
                this.currentPage = item;
                this.getTableMsg();
            },
            /**
             * 下架按钮
             * */
            submitRechargeForm () {
                this.show = false
            },
            getTableMsg(){

            },
        },
        mounted() {
            this.pageChange ()
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

