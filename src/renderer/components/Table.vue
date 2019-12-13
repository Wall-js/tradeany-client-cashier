<!--<el-table-column slot="sex" label="性别">-->
<!--    <template slot-scope="scope">-->
<!--        <el-input :v-model='scope.row.sex === 0 ? "男" : "女"' :value='scope.row.sex === 0 ? "男" : "女"'></el-input>-->
<!--    </template>-->
<!--</el-table-column>-->

<!--{ slot: "sex",type: 'slot',},-->

dialogTableList: [
{
type:'radio',
width:'55',
prop:'id',
},
{
type: 'selection',
width: '55',
},
{
prop: 'a',
label: '产品',
// width: '180'
}, {
prop: 'b',
label: '规格',
// width: '180'
}, {
prop: 'c',
label: '状态',
width: '180'
}, {
slot:'stock',
type:'slot',
prop: 'stock',
label: '库存数量',
// width: '180'
},

{
prop: 'operation',
label: '操作',
isOperaText: 'isOperaText'
// width: '150',
}],

<template>
    <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            :header-cell-style="{color:'#333333',fontWeight: 'normal',textAlign:'center',background: '#f3f3f3',borderColor:'#d7d7d6'}"
            :cell-style="cellStyle?cellStyle:{textAlign:'center'}"
            @selection-change="selectChange"
            @current-change="handleCurrentChange"
            :show-header="showHeader"
            :border="border"
            :max-height="maxHeight"
            :v-loading="loading"
            :class="className"
            element-loading-text="给我一点时间"
            stripe
            fit
            highlight-current-row

    >
        <div v-if='empty' slot="empty">
            <slot name="emptyText">

            </slot>
        </div>
        <el-table-column
                v-for="(tableColumn,index) in tableList"
                :key="index"
                :type="tableColumn.type"
                :width="tableColumn.width"
                v-if="tableColumn.type === 'selection'"
        ></el-table-column>
        <!--//扩展表格-->
        <slot :name="expandTable"></slot>

        <template v-for="(tableColumn,index) in tableList">
            <el-table-column
                    :label="tableColumn.label"
                    :type="tableColumn.type"
                    :prop="tableColumn.prop"
                    :width="tableColumn.width"
                    :fixed="tableColumn.fixed "
                    :sortable="tableColumn.sortable"
                    v-if="(tableColumn.type !== 'selection')"
            ></el-table-column>
        </template>
        <slot name="operate"></slot>
    </el-table>
</template>

<script>

    export default {
        name: 'single-select',
        data() {
            return {
                radioValue: ''
            }
        },
        methods: {
            toggle(event) {
                console.log(event)
                this.toggled = !this.toggled;
                this.$emit("update:value", this.toggled);
                this.$emit("change", event);
            },
            selectChange(values) {
                this.$emit('selectChange', values)
            },
            // changeOpera(item,action,type){
            //     this.$emit('changeOpera',item,action,type)
            // },
            radioChange(index, row) {
                this.$emit('radioChange', index, row)
            },
            handleCurrentChange() {
                this.$emit('handleCurrentChange', index, row)
            }
        },
        props: {
            tableList: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            tableData: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            showHeader: {
                type: Boolean,
                default: true
            },
            border: {
                type: Boolean,
                default: false
            },
            maxHeight: {
                type: [String, Number],
                default: null
            },
            loading: {
                type: Boolean,
                default: false
            },
            className: {
                type: String,
                default: ""
            },
            tableRowClassName: {
                type: String,
                default: ""
            },
            cellStyle: {
                type: String,
                default: ""
            },
            empty: {
                type: Boolean,
                default: false
            },
            tableType: {
                type: String,
                default: ""
            },
            expandType: {
                type: String,
                default: ""
            },
            expandTable: {
                type: String,
                default: ""
            }
        }
    }
</script>
<style scoped>
    .isOpera {
        display: flex;
    }

    .block {
        margin: 0 auto;
    }

    .imgBox {
        display: flex;
        justify-content: space-around;
    }

    .imgSize {
        width: 50px;
        height: 50px;
    }
</style>

