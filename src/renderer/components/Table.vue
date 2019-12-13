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
<!--            slot 添加自定义配置项-->
        <slot
                v-if="tableColumn.slot"
                :name="tableColumn.slot"
        ></slot>
 <!--            component 特殊处理某一项-->
        <component
                    v-else-if="tableColumn.component"
                    :is="config.component"
                    :col-config="tableColumn"
        ></component>
        <el-table-column
                :key="index"
                :label="tableColumn.label"
                :type="tableColumn.type"
                :prop="tableColumn.prop"
                :width="tableColumn.width"
                :fixed="tableColumn.fixed "
                :sortable="tableColumn.sortable"
                v-if="(tableColumn.type !== 'selection')&&(tableColumn.type !== 'slot')"
        >

            <template slot-scope="scope">
                <div v-if="tableColumn.type=== 'operation'" class="isOpera">
                    <div class="block">
                        <el-button type="text" size="small" @click="changeOpera(scope.row,item,'isText')"
                                   v-for="(item,itemIndex) in scope.row[tableColumn.isOperaText]"
                                   :key="itemIndex"
                        >{{item}}</el-button>
                    </div>
                </div>
                <!--<el-button type="primary" size="small" @click="changeOpera(scope.row,'isButton')"-->
                           <!--v-for="(item,itemIndex) in scope.row[tableColumn.isButton]"-->
                           <!--:key="itemIndex">{{item}}-->
                <!--</el-button>-->
                <el-button type="primary" size="small" @click="changeOpera(scope.row,'isButton')"
                           v-if="tableColumn.isButton">{{tableColumn.isButton}}
                </el-button>
                <div class="block" v-if="tableColumn.type === 'state'">
                    <el-tag :type="scope.row[tableColumn.tagStyle]">{{scope.row[tableColumn.prop]}}</el-tag>
                </div>
                <div v-else-if="tableColumn.type=== 'array'" class="imgBox">
                    <div v-for="url in scope.row[tableColumn.prop]" class="divSize">
                        <el-image :src='url' alt="" class="imgSize">
                        </el-image>
                    </div>
                </div>
                <div v-else-if="tableColumn.type=== 'image'">
                    <el-image :src=scope.row[tableColumn.prop] alt="" class="imgSize">
                    </el-image>
                </div>
                <div v-else-if="tableColumn.type=== 'input'">
                    <span style="margin-right: 20px;width: 100px;text-align: right;display: inline-block;">{{scope.row[tableColumn.prop]}}</span>
                    <el-input v-model=scope.row[tableColumn.prop] style="width: 150px;"></el-input>
                </div>
                <div v-else-if="tableColumn.type=== 'switch'">
                    <el-switch
                            @change="toggle"
                            v-model=scope.row[tableColumn.prop]
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </div>
                <div v-else-if="tableColumn.type=== 'radio'">
                    <el-radio  :label="scope.row[tableColumn.prop]" v-model="radioValue" @change.native="radioChange(scope.$index,scope.row)">&nbsp;</el-radio>
                </div>
                <div v-else>{{scope.row[tableColumn.prop]}}</div>
            </template>
        </el-table-column>
     </template>
    </el-table>
</template>

<script>

    export default {
        name:'single-select',
        data(){
            return{
                radioValue:''
            }
        },
        methods:{
            toggle(event){
                console.log(event)
                this.toggled = !this.toggled;
                this.$emit("update:value", this.toggled);
                this.$emit("change", event);
            },
            selectChange(values){
                this.$emit('selectChange',values)
            },
            changeOpera(item,action,type){
                this.$emit('changeOpera',item,action,type)
            },
            radioChange(index,row){
                this.$emit('radioChange',index,row)
            },
            handleCurrentChange(){
                this.$emit('handleCurrentChange',index,row)
            }
        },
        props: {
            tableList: {
                type: Array,
                default: function() {
                    return [];
                }
            },
            tableData: {
                type: Array,
                default: function() {
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
            tableType:{
                type: String,
                default: ""
            },
            expandType:{
                type: String,
                default: ""
            },
            expandTable:{
                type: String,
                default: ""
            }
        }
    }
</script>
<style scoped>
    .isOpera{
        display: flex;
    }
    .block{
        margin: 0 auto;
    }
    .imgBox{
        display: flex;
        justify-content: space-around;
    }
    .imgSize{
        width: 50px;
        height: 50px;
    }
</style>

