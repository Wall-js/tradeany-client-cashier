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
                    @changeOpera="changeOpera"
                    expandTable="expandTable"
            >
                <div slot="expandTable">
                    <el-table-column
                            type="expand"
                    >
                        <template slot-scope="props">
                            <Table
                                    :tableList="expandTableList"
                                    :tableData="props.row.expandData"
                            ></Table>
                        </template>
                    </el-table-column>
                </div>
            </Table>
        </el-card>
    </div>
</template>

<script>
    import Form from '../components/Form';
    import Table from  '../components/Table'

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
                        type: 'selection',
                        width: '55',
                    },{
                        prop: 'name',
                        label: '商品名称',
                    },{
                        prop: 'price',
                        label: '商品价格',
                    },{
                        prop: 'quantity',
                        label: '数量',
                    },{
                        prop: 'time',
                        label: '下单时间',
                    },{
                        prop: 'state',
                        label: '订单状态',
                    } ,{
                        type:'operation',
                        prop: 'operation',
                        label: '操作',
                        isOperaText:'isOperaText'
                    }],
                tableData: [
                    {   name: '542452424',
                        price: '13216556165132156156',
                        quantity: '￥0.00',
                        time: '45245242422',
                        state:'已下单',
                        isOperaText: ['查看','发货'],
                        expandData:[
                            {
                                time:'121212',
                                img:['https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1573005451&di=33b5bb8deb665c9f32fe63ee6ee2c593&src=http://www.hlj.gov.cn/pic/0/10/16/40/10164098_926904.jpg']
                            },
                        ],
                    },
                    {   name: '542452424',
                        price: '13216556165132156156',
                        quantity: '￥0.00',
                        time: '45245242422',
                        state:'已下单',
                        isOperaText: ['查看','发货'],
                        expandData:[
                            {
                                time:'121212',
                                img:['https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1573005451&di=33b5bb8deb665c9f32fe63ee6ee2c593&src=http://www.hlj.gov.cn/pic/0/10/16/40/10164098_926904.jpg']
                            },
                        ],

                    },
                ],
                expandTableList:[
                    {
                        prop:'time',
                        label:'商品规格'
                    },
                    {
                        prop:'time',
                        label:'商品条码',

                    },{
                        type:'array',
                        prop:'img',
                        label:'图片'
                    },
                    {
                        prop:'time',
                        label:'数量'
                    },
                    {
                        prop:'time',
                        label:'单价'
                    },
                ],
            }
        },
        components: {
            Form,
            Table
        },
        methods:{
            /**
             * 搜索
             */
            //查询
            search() {
                // this.$store.dispatch("Goods/filterGoods",{
                //     pagination: {
                //         current: 1,
                //         pageSize: 10,
                //     },
                //     form:this.searchForm
                // })
            },
            //重置
            reset(refs) {
                refs['searchForm'].resetFields();
            },
            // 操作
            changeOpera(item,action){

            }
        },
        computed: {
            // 获取订单
            getOrder(){
                let data=[];
                console.log(this.$store.state.Order.list)
                this.$store.state.Order.list.forEach((item)=>{
                    console.log(item);
                    data.push(item)
                });
                return this.$store.state.Order.list
            }
        },
    }
</script>

<style scoped>
    .statistics-data{
        color:#409EFF
    }
</style>
