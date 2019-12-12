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
            <Table
                    :tableList="tableList"
                    :tableData="tableData"
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
                tableList:[

                ],
                tableData:[

                ],
                expandTableList:[],
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
        }
    }
</script>

<style scoped>
    .statistics-data{
        color:#409EFF
    }
</style>
