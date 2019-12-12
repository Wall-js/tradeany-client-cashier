<template>
    <div class="container">
        <el-card class="searchForm">
            <Search :value="searchForm"
                    :formConfig="searchFormConfig"
                    refName="searchForm"
            ></Search>
        </el-card>
        <el-card class="mainBox">
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
    </div>
</template>

<script>

    import PageBreak from '../components/Pagination'
    import Search from '../components/Form'
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
                            prop: 'a',
                            label: '品牌：',
                            placeholder: '请输入内容',
                            labelWidth: '100px',
                        },
                        {
                            type: 'input',
                            prop: 'b',
                            label: '商品名称：',
                            placeholder: '请输入内容',
                            labelWidth: '100px',
                        },
                        {
                            type: 'select',
                            label: '状态',
                            prop: 'c ',
                            labelWidth: '80px',
                            optList: [
                                {
                                    value: '选项1',
                                    label: '已付款'
                                }, {
                                    value: '选项2',
                                    label: '已成托'
                                }
                            ]
                        },
                        {
                            type: 'rangeInput',
                            prop: 'price',
                            propList:['min','max'],
                            unit:'元',
                            numConfig:{
                                precision:2,
                                step:0.1,
                                min:0,
                                // max:'',
                            },
                            style:"width:100px",
                            label: '商品价格：',
                            placeholder: '请输入内容',
                            labelWidth: '100px',
                        },
                        {
                            type: "date",
                            prop: "d",
                            label: '发布时间：',
                            dataType:"daterange",
                            middleWord:"-",
                            startPlaceholder:"开始时间",
                            endPlaceholder:"结束时间",
                            style:"width:200px",
                            labelWidth:"100px",
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
            }
        },
        components: {
            PageBreak,
            Search,
            PackageTable,
            Dialog,
        },
        methods: {
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
            search (searchForm) {
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

