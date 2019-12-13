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
                    <el-table
                            :data="$store.state.OutboundDetails.list"
                            :header-cell-style="{color:'#333333',fontWeight: 'normal',textAlign:'center',background: '#f3f3f3',borderColor:'#d7d7d6'}"
                            :cell-style="{textAlign:'center'}"
                            style="width: 100%">
                        <el-table-column :prop="item.prop" :label="item.label" v-for="item in tableList"></el-table-column>
                        <!--<el-table-column  label="操作" >-->
                            <!--<template slot-scope="scope">-->
                                <!--<el-button @click="tableChange(scope.row,'change')" type="text" size="mini">修改</el-button>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                    </el-table>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <page-break :pageTotal="$store.state.OutboundDetails.pagination.total" :pageSize="$store.state.OutboundDetails.pagination.pageSize"
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
                        // {
                        //     type: 'input',
                        //     label: '条形码：',
                        //     prop: 'barCode',
                        //     style:'width:246px',
                        //     placeholder: '请输入或通过扫码枪获取条形码',
                        //     slotBottom:'codeInput',
                        // },
                        {
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
                    },
                    {
                        label: '状态',
                        prop: 'typeName',
                    },

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
            Dialog,
        },
        methods: {
            /**
             * 搜索
             */
            //查询
            search() {
                this.$store.dispatch("Goods/filterGoods",{
                    pagination: {
                        current: 1,
                        pageSize: 10,
                    },
                    name:this.searchForm.name
                })
            },
            //重置
            reset(refs) {
                refs['searchForm'].resetFields();
                this.$store.dispatch("Goods/getGoods",{
                    pagination: {
                        current: 1,
                        pageSize: 10,
                    }});
            },
            //修改库存
            editStockSubmit(refs){
                refs['editStockForm'].validate((valid) => {
                    if (valid) {
                        let editStockForm = this.editStockForm;
                        let payload = {
                            _id:editStockForm['_id'],
                            data:{...editStockForm}
                        };
                        this.$store.dispatch("Goods/updateGoods",payload);
                        this.$message.success('修改成功');
                        this.show=false;
                        this.searchForm.name="";
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
            tableChange(item,action) {
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
                //分查询分
                if(this.searchForm.name === ''){
                    this.$store.dispatch("Goods/getGoods",{
                        pagination: {
                            current: item,
                            pageSize: 10,
                        },
                    });
                }else {
                    this.$store.dispatch("Goods/filterGoods",{
                        pagination: {
                            current: item,
                            pageSize: 10,
                        },
                        name:this.searchForm.name
                    })
                }
            },
        },
        created() {
            //获取出入库明细
            this.$store.dispatch("OutboundDetails/getOutboundDetails",{
                pagination: {
                    current: 1,
                    pageSize: 10,
                }});
            console.log("zhii")
        },

    }
</script>

<style scoped>
</style>

