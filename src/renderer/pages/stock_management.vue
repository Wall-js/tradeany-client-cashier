<!--page name:'商品管理'-->
<template>
    <div>
        <el-card>
            <Form :value="searchForm"
                  :formConfig="searchFormConfig"
                  refName="searchForm"
            >
                <div slot="codeInput" class="float-right m-l-sm">
                    <el-button  icon="el-icon-full-screen" size="small" ></el-button>
                </div>
            </Form>
        </el-card>
        <el-card class="m-t-sm min-height-lg">
            <el-row>
                <el-col>
                    <package-table
                            :tableList="tableList"
                            :tableData="$store.state.Goods.list"
                            @changeOpera="changeOpera"
                    >
                        <el-table-column slot="operate" label="操作">
                            <template slot-scope="scope">
                                <div>
                                    <el-button  @click="changeOpera(scope.row,'change')" type="text">修改</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </package-table>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <page-break :pageTotal="$store.state.Goods.pagination.total" :pageSize="$store.state.Goods.pagination.pageSize"
                                @pageChange="pageChange"></page-break>
                </el-col>
            </el-row>
        </el-card>
        <!--修改库存弹窗-->
        <Dialog
                :show.sync="show"
                :dialogConfig="dialogConfig"
                @handleClose="closeDialog"
        >
            <el-row slot="content">
                <el-col>
                    <Form
                            :value="editStockForm"
                            :formConfig="editStockFormConfig"
                            refName="editStockForm"
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
                    name:''
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
                            prop: 'name',
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
                        prop: 'name',
                    },{
                        label: '单价',
                        prop: 'price',
                    },{
                        label: '库存数量',
                        prop: 'stock',
                    },{
                        slot:'operate',
                        type: 'slot'
                    }
                    // {
                    //     type:'operation',
                    //     prop: 'operation',
                    //     label:'操作',
                    //     isOperaText: 'isOperaText'
                    // }
                ],
                //商品录入
                show:false,
                dialogConfig:{
                    title:'修改库存',
                    width:'500px',
                },
                editStockForm:{
                    barCode:'',
                    name:'',
                    price:'',
                    stock:''
                },
                editStockFormConfig: {
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
                            label: '库存数量',
                            prop: 'stock',
                            style:'width:300px',
                            placeholder: '请输入数量',
                        }, {
                            type: 'btnGroup',
                            operate: [
                                {
                                    name: '确认',
                                    type: 'primary',
                                    handleClick: this.editStockSubmit
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
            //修改库存
            editStockSubmit(refs){
                refs['editStockForm'].validate((valid) => {
                    if (valid) {
                        let editStockForm = this.editStockForm
                        let payload = {
                            _id:editStockForm['_id'],
                            data:{...editStockForm}
                        }
                        this.$store.dispatch("Goods/updateGoods",payload)
                        this.$message.success('修改成功')
                        this.show=false;
                        refs['editStockForm'].resetFields();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //关闭弹窗
            closeDialog(refs){
                if(refs){
                    this.show=false;
                    refs['editStockForm'].resetFields();
                }else {
                    this.$refs['dialogForm']['$refs']['editStockForm'].resetFields();
                }
            },
            //商品操作
            changeOpera (item, action, type) {
                if (action === 'change') {
                    this.show = true;
                    let formItemList = this.editStockFormConfig['formItemList'];
                    formItemList[0]['disabled'] = true;
                    this.editStockForm = {...item}
                }
            },
            /**
             * 分页数据
             * @param item
             */
            pageChange (item) {
                this.$store.dispatch("Goods/getGoods",{
                    pagination: {
                        current: item,
                        pageSize: 10,
                    },
                });
            },
        },
        created() {
            //获取数据
            this.$store.dispatch("Goods/getGoods",{
                pagination: {
                    current: 1,
                    pageSize: 10,
                }});
        },
    }
</script>

<style scoped>
</style>

