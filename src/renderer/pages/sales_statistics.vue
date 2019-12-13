<template>
    <div>
        <el-card>
            <el-row type="flex" justify="center" :gutter="20">
                <el-col :span="6" v-for="item in statistics" class="flex-column just-between flex-align">
                    <h1>{{item.title}}</h1>
                    <h3 class="statistics-data">{{item.data}}</h3>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="m-t-sm">
            <Form :value="searchForm"
                  :formConfig="searchFormConfig"
                  refName="searchForm"
            ></Form>
        </el-card>
        <el-card class="m-t-lg">
            <div slot="header" class="clearfix">
                <span>订单列表</span>
            </div>
            <Table
                    :tableList="tableList"
                    :tableData="$store.state.Order.list"
                    expandTable="expandTable"
            >
                <div slot="expandTable">
                    <el-table-column
                            type="expand"
                    >
                        <template slot-scope="props">
                            <Table
                                    :tableList="expandTableList"
                                    :tableData="props.row.subOrder"
                            ></Table>
                        </template>
                    </el-table-column>
                </div>
            </Table>
            <el-row>
                <el-col>
                    <page-break :pageTotal="$store.state.Order.pagination.total" :pageSize="$store.state.Order.pagination.pageSize"
                                @pageChange="pageChange"></page-break>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import Form from '../components/Form';
    import Table from  '../components/Table'
    import PageBreak from '../components/Pagination'
    export default {
        data(){
            return{
                //统计
                statistics:[
                    {
                        title:'当月订单量',
                        data:'0',
                    },
                    {
                        title:'当月销售额',
                        data:'0',
                    },{
                        title:'当日订单量',
                        data:'0',
                    },
                    {
                        title:'当日销售额',
                        data:'0',
                    },
                ],
                //搜索
                searchForm:{
                    barCode:'',
                    name:'',
                    createTime:''
                },
                searchFormConfig:{
                    line_type: true,
                    formItemList: [
                        {
                            type: 'date',
                            prop: 'createTime',
                            label: '下单时间：',
                            dataType: 'daterange',
                            middleWord: '-',
                            startPlaceholder: '开始时间',
                            endPlaceholder: '结束时间',
                        },
                        {
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
                // 表格
                tableList:[
                    {
                        prop: 'name',
                        label: '用户名',
                    },{
                        prop: 'total',
                        label: '商品总价',
                    },{
                        prop: 'qtyTotal',
                        label: '数量',
                    },{
                        prop: 'createTime',
                        label: '下单时间',
                    },
                    ],
                tableData: [],
                expandTableList:[
                    {
                        prop:'barCode',
                        label:'商品条码'
                    },
                    {
                        prop:'name',
                        label:'商品名称',

                    },{
                        prop:'price',
                        label:'商品价格'
                    },
                    {
                        prop:'quantity',
                        label:'数量'
                    },
                    {
                        prop:'subTotal',
                        label:'总价'
                    },
                    {
                        prop:'stock',
                        label:'库存'
                    },

                ],
            }
        },
        components: {
            Form,
            Table,
            PageBreak
        },
        methods:{
            /**
             * 搜索
             */
            //查询
            search() {
            },
            //重置
            reset(refs) {
                refs['searchForm'].resetFields();
            },
            // 分页操作
            pageChange (item) {
                this.$store.dispatch("Order/getOrder",{
                    pagination: {
                        current: item,
                        pageSize: 10,
                    }});
            },
        },
        created() {
            //获取数据
            this.$store.dispatch("Order/getOrder",{
                pagination: {
                    current: 1,
                    pageSize: 10,
                }});
            this.$store.dispatch("OrderCensus/getTodayCensus")
            this.$store.dispatch("OrderCensus/getMouthCensus")
            this.statistics=[
                {
                    title:'当月订单量',
                    data:this.$store.state.OrderCensus.mouth.orderQuantity,
                },
                {
                    title:'当月销售额',
                    data:this.$store.state.OrderCensus.mouth.orderTotal,
                },{
                    title:'当日订单量',
                    data:this.$store.state.OrderCensus.today.orderQuantity,
                },
                {
                    title:'当日销售额',
                    data:this.$store.state.OrderCensus.today.orderTotal,
                },
            ]
        },

    }
</script>

<style scoped>
    .statistics-data{
        color:#409EFF
    }
</style>
