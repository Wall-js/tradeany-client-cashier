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
                    <el-button type="primary" size="small" @click="()=>{this.show=true}">商品录入</el-button>
                </el-col>
            </el-row>
            <el-row class="m-t-sm">
                <el-col>
                    <el-table
                            :data="$store.state.Goods.list"
                            :header-cell-style="{color:'#333333',fontWeight: 'normal',textAlign:'center',background: '#f3f3f3',borderColor:'#d7d7d6'}"
                            :cell-style="{textAlign:'center'}"
                            style="width: 100%">
                        <el-table-column :prop="item.prop" :label="item.label" v-for="item in tableList"></el-table-column>
                        <el-table-column  label="操作" >
                            <template slot-scope="scope">
                                <el-button @click="tableChange(scope.row,'change')" type="text" size="mini">修改</el-button>
                                <el-button @click="tableChange(scope.row,'del')" type="text" size="mini">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
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
                    }
                ],
                //商品录入
                show:false,
                dialogConfig:{
                    title:'商品录入',
                    width:'500px',
                },
                addProductForm:{
                    barCode:'',
                    name:'',
                    price:'',
                    stock:''
                },
                addProductFormConfig: {
                    labelWidth:'120px',
                    formItemList: [
                        {
                            type: 'input',
                            label: '条形码：',
                            autofocus:true,
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
                            prop: 'name',
                            style:'width:300px',
                            placeholder: '请输入商品名称',
                            rules:[
                                {required: true, message: '请输入商品名称', trigger: 'blur'}
                            ],
                        },{
                            type: 'input',
                            label: '单价：',
                            prop: 'price',
                            style:'width:300px',
                            placeholder: '请输入单价',
                            rules:[
                                {required: true, message: '请输入单价', trigger: 'blur'}
                            ],
                        },{
                            type: 'number',
                            label: '库存数量：',
                            prop: 'stock',
                            style:'width:300px',
                            placeholder: '请输入数量',
                            rules:[
                                { type: 'number', message: '库存数量必须为数字值'}
                            ],
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
                isEdit:false,
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
            //商品录入
            //判断字符串是否是数字
            addProductSubmit(refs){
                refs['addProductForm'].validate((valid) => {
                    if (valid) {
                        this.searchForm.name = '';
                        let addProductForm = {...this.addProductForm};
                        //价格数字
                        let price = addProductForm['price'];
                        var reg = /^[0-9]+.?[0-9]*$/;
                        if (!reg.test(price)) {
                            this.$message.error("价格必须为数字值");
                            return
                        }
                        price = (price*1).toFixed(2);
                        addProductForm['price'] = price;
                        if(this.isEdit){
                            let payload = {
                                _id:addProductForm['_id'],
                                data:{...addProductForm}
                            };
                            this.$store.dispatch("Goods/updateGoods",payload);
                            this.$message.success('修改成功');
                            let formItemList = this.addProductFormConfig['formItemList'];
                            formItemList[formItemList.length-2]['disabled'] = false;
                            refs['addProductForm'].resetFields();
                            this.show=false;
                            this.isEdit=false;
                        }else {
                            this.$store.dispatch("Goods/createGoods",addProductForm).then(res=>{
                                this.$message.success('录入成功')
                                this.show=false;
                                refs['addProductForm'].resetFields();
                            },err=>{
                                if(err === 'isRepeat'){
                                    this.$message.error("条形码不可重复")
                                }else {
                                    this.$message.error("录入失败")
                                }
                            })
                        }

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //关闭弹窗
            closeDialog(refs){
                let formItemList = this.addProductFormConfig['formItemList'];
                formItemList[formItemList.length-2]['disabled'] = false;
                this.isEdit=false;
                if(refs){
                    this.show=false;
                    refs['addProductForm'].resetFields();
                }else {
                    this.$refs['dialogForm']['$refs']['addProductForm'].resetFields();
                }
            },
            //商品操作
            tableChange(item,action) {
                if (action === 'change') {
                    this.isEdit = true;
                    this.show = true;
                    let formItemList = this.addProductFormConfig['formItemList'];
                    formItemList[formItemList.length-2]['disabled'] = true;
                    this.addProductForm = {...item};
                }else if(action === 'del'){
                    this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.searchForm.name = '';
                        this.$store.dispatch("Goods/deleteGoods",{_id:item._id})
                    })

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
            //获取数据
            this.$store.dispatch("Goods/getGoods",{
                pagination: {
                    current: 1,
                    pageSize: 10,
                }});
            console.log(this.$store.state.Goods.list)
        },

    }
</script>

<style scoped>
</style>

