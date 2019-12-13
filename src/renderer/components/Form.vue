<!--<Form-->
<!--:value="searchForm"-->
<!--:formConfig="formConfig"-->
<!--&gt;-->
<!--  <el-form-item slot="sex" label="活动名称">-->
<!--    <el-input ></el-input>-->
<!--  </el-form-item>-->
<!--</Form>-->

{
type:'checkbox',
label:'提醒方式：',
prop:'warnType',
colStyle:'colStyle',
optList:[
{
label:true,
name:'通过App推送通知我'
},
{
label:true,
name:'通过短信通知我'
}
],
},


searchForm: {
line_type:'',
},
formConfig: {
line_type:true,
formItemList: [
{
type: 'input',
label: '分销商账号：',
prop: 'line_name',
placeholder: '请输入'
}, { slot: "sex"},{
type: 'select',
label: '分销商等级：',
prop: 'line_name',
labelWidth:'150px',
optList: [
{
value: '选项1',
label: '已付款'
}, {
value: '选项2',
label: '已成托'
}, {
value: '选项3',
label: '已发出'
}, {
value: '选项4',
label: '已收货'
}
]
},{
type: "date",
prop: "creatTime",
label: '注册时间：',
style:"width:200px",
dataType:"daterange",
middleWord:"-",
startPlaceholder:"开始时间",
endPlaceholder:"结束时间",
labelWidth:"100px",
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



formConfig:{
labelWidth:'160px',
elCard:[
{
title:'基础信息',
style:'margin-top:10px',
formItemList: [
{
type: 'input',
label: '计划名称：',
prop: 'line_name',
placeholder: '请输入',
style:'width:300px',
rules:[
{ required: true, message: '请输入', trigger: 'blur' },
]

},
{
type:'slot',
slotName:'planCrowd',
label:'计划人群：',
prop:'planCrowd',
rules:[
{ required: true, message: '请输入', trigger: 'blur' },
]
},
{
type:'slot',
slotName:'planType',
label:'计划方式：',
prop:'planCrowd',
rules:[
{ required: true, message: '请选择', trigger: 'blur' },
]
}
],
type:'flex',
justify:'center',
span:15
},
{
title:'权益礼包',
style:'margin-top:10px',
formItemList: [
{
type:'checkbox',
label:'优惠券设置：',
prop:'youhuiSetting',
optList:[
{
label:true,
name:'发放优惠券'
}
],
message:'发放优惠券能有效刺激转化（优惠券将直接发放给客户，不需要领取）',
}
],
type:'flex',
justify:'center',
span:15
},
],

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





<template>
  <el-form
    :inline="formConfig.line_type"
    :model="value"
    label-position="right"
    :label-width="formConfig.labelWidth"
    size='small'
    :ref="refName"
  >
    <el-card v-if='formConfig.elCard' v-for="(cardItem) in formConfig.elCard" :style="cardItem.style" :class="cardItem.paddingBottom">
      <div slot="header" v-if="cardItem.title">{{cardItem.title}}</div>
      <el-row :type="cardItem.type" :justify="cardItem.justify">
        <el-col :span="cardItem.span">
          <template v-for="(item,index) in cardItem.formItemList">
            <!--  slot 添加自定义配置项-->
            <slot
                    v-if="item.slot"
                    :name="item.slot"
            ></slot>
            <el-form-item
                    :key="index"
                    :label="item.label"
                    :prop="item.prop"
                    :label-width="item.labelWidth"
                    :rules="item.rules"
            >
              <slot
                      v-if="item.type==='slot'"
                      :name="item.slotName"
              ></slot>
              <span v-if="item.type==='text'">{{item.text}}</span>
              <el-input
                      v-if="item.type==='input'"
                      v-model="value[item.prop]"
                      :disabled="item.disabled"
                      :type="item.inputType"
                      :rows="item.rows"
                      :clearable="true"
                      :placeholder="item.placeholder"
                      :style="item.style"
              ></el-input>
              <el-select
                      :clearable="true"
                      v-else-if="item.type==='select'"
                      v-model="value[item.prop]"
                      :disabled="item.disabled"
                      :placeholder="item.placeholder"
              >
                <el-option
                        v-for="(optItem,index) in item.optList"
                        :key="index"
                        :label="optItem.label"
                        :value="optItem.value"
                ></el-option>
              </el-select>
              <div  v-else-if="item.type==='checkbox'" :class="item.colStyle">
                <el-checkbox
                        v-for="(boxItem,index) in item.optList"
                        v-model="value[boxItem.label]"
                        :key="index"
                        :disabled="boxItem.disabled"
                >
                  {{boxItem.name}}
                  <el-button :type="boxItem.type" @click="boxItem.checkBoxClick(index)" v-show="boxItem.checkBoxBtn" :style="boxItem.style">{{boxItem.btnName}}</el-button>
                </el-checkbox>
              </div>
              <el-cascader
                      v-else-if="item.type==='cascader'"
                      :placeholder="item.placeholder"
                      :options="item.optList"
                      :props="item.props"
                      clearable
                      filterable
              ></el-cascader>
              <el-radio-group
                      v-model="value[item.prop]"
                      v-else-if="item.type==='radio'">
                <div :class="item.colStyle?'radioStyle':''">
                  <el-radio
                          v-for="(optItem,index) in item.optList"
                          :key="index"
                          :label="optItem.label"
                          :value="optItem.value">
                  </el-radio>
                </div>
              </el-radio-group>
              <div  v-else-if="item.type==='btnGroup'">
                <el-button
                        v-for="(operateItem, index) in item.operate"
                        :key="index"
                        size="mini"
                        :style="operateItem.style"
                        :type="operateItem.type"
                        :icon="operateItem.icon"
                        @click="operateItem.handleClick($refs)"
                >{{operateItem.name}}
                </el-button>
              </div>
              <el-date-picker
                      v-else-if="item.type==='date'"
                      v-model="value[item.prop]"
                      :range-separator="item.middleWord"
                      :start-placeholder="item.startPlaceholder"
                      :end-placeholder="item.endPlaceholder"
                      :type="item.dataType"
                      :disabled="item.disabled"
                      :clearable="true"
                      :placeholder="item.label"
              ></el-date-picker>
              <div style="color:#999;font-size: 12px" v-html="item.message"></div>
            </el-form-item>
          </template>
        </el-col>
      </el-row>
    </el-card>
    <template v-for="(item,index) in formConfig.formItemList">
      <!--  slot 添加自定义配置项-->
      <slot
              v-if="item.slot"
              :name="item.slot"
      ></slot>
      <el-form-item
              :key="index"
              :label="item.label"
              :prop="item.prop"
              :label-width="item.labelWidth"
              :rules="item.rules"
      >
        <slot
                v-if="item.type==='slot'"
                :name="item.slotName"
        ></slot>
        <div class="flex-row">
          <span v-if="item.type==='text'">{{item.text}}</span>
          <el-input
                  v-if="item.type==='input'"
                  v-model="value[item.prop]"
                  :disabled="item.disabled"
                  :type="item.inputType"
                  :rows="item.rows"
                  :clearable="true"
                  :placeholder="item.placeholder"
                  :style="item.style"
                  :controls="item.controls"
          ></el-input>
          <el-input-number
                  v-else-if="item.type === 'numberInput'"
                  v-model="value[item.prop]"
                  :precision="item.precision"
                  :step="item.step"
                  :min="item.min"
                  :max="item.max"
                  :style="item.style"
          ></el-input-number>
          <div v-else-if="item.type==='rangeInput'">
            <el-input-number
                    size="mini"
                    v-model="value[item.propList[0]]"
                    :precision="item.numConfig.precision"
                    :step="item.numConfig.step"
                    :min="item.numConfig.min"
                    :max="item.numConfig.max"
                    :style="item.style"
            ></el-input-number>
            -
            <el-input-number
                    size="mini"
                    v-model="value[item.propList[1]]"
                    :precision="item.numConfig.precision"
                    :step="item.numConfig.step"
                    :min="item.numConfig.min"
                    :max="item.numConfig.max"
                    :style="item.style"
            ></el-input-number>
            {{item.unit}}
          </div>
          <el-select
                  :clearable="true"
                  v-else-if="item.type==='select'"
                  v-model="value[item.prop]"
                  :disabled="item.disabled"
                  :placeholder="item.placeholder"
          >
            <el-option
                    v-for="(optItem,index) in item.optList"
                    :key="index"
                    :label="optItem.label"
                    :value="optItem.value"
            ></el-option>
          </el-select>
          <div  v-else-if="item.type==='checkbox'" :class="item.colStyle">
            <el-checkbox
                    v-for="(boxItem,index) in item.optList"
                    v-model="value[boxItem.label]"
                    :key="index"
                    :disabled="boxItem.disabled"
            >
              {{boxItem.name}}
              <el-button :type="boxItem.type" @click="boxItem.checkBoxClick(index)" v-show="boxItem.checkBoxBtn" :style="boxItem.style">{{boxItem.btnName}}</el-button>
            </el-checkbox>
          </div>
          <el-radio-group

                  v-model="value[item.prop]"
                  v-else-if="item.type==='radio'">
            <div :class="item.colStyle?'radioStyle':''">
              <el-radio
                      v-for="(optItem,index) in item.optList"
                      :key="index"
                      :label="optItem.label"
              >
                {{optItem.value}}
              </el-radio>
            </div>
          </el-radio-group>
          <el-cascader
                  v-else-if="item.type==='cascader'"
                  :placeholder="item.placeholder"
                  :options="item.optList"
                  :props="item.props"
                  @change="cascaderChange"
                  clearable
                  filterable
          ></el-cascader>
          <div
                  v-else-if="item.type==='btnGroup'"
                  :style="item.model === 'right' ? 'text-align: right;padding-right:15px' : ''">
            <el-button
                    v-for="(operateItem, index) in item.operate"
                    :key="index"
                    size="mini"
                    :style="operateItem.style"
                    :type="operateItem.type"
                    :icon="operateItem.icon"
                    @click="operateItem.handleClick($refs)"
            >{{operateItem.name}}
            </el-button>
          </div>
          <el-date-picker
                  v-else-if="item.type==='date'"
                  v-model="value[item.prop]"
                  :range-separator="item.middleWord"
                  :start-placeholder="item.startPlaceholder"
                  :end-placeholder="item.endPlaceholder"
                  :type="item.dataType"
                  :disabled="item.disabled"
                  :clearable="true"
                  :placeholder="item.placeholder"
                  :style="item.style"
          ></el-date-picker>
          <slot :name="item.slotBottom"></slot>
        </div>
      <div style="color:#999;font-size: 12px" :class="item.messageInline?'messageInline':''" v-html="item.message"></div>
    </el-form-item>
    </template>
  </el-form>
</template>
<script>
  export default {
    data(){
      return {
      }
    },

    components: {},
    props: {
      formConfig: {
        type: Object,
        required: true
      },
      value: {
        type: Object,
        required: true
      },
      rules: {
        type: Object
      },
      refName:{
        type: String
      },
    },
    computed: {},
    methods: {
      // setDefaultValue() {
      //   const formData = { ...this.value };
      //   // 设置默认值
      //   this.formConfig.formItemList.forEach(({ key, value }) => {
      //     if (formData[key] === undefined || formData[key] === null) {
      //       formData[key] = value;
      //     }
      //   });
      //   this.$emit("input", formData);
      // },
      resetForm() {
        // console.log("内部resetForm")
        console.log(this.refName)
        this.$refs[this.refName].resetFields();
      },
      cascaderChange(values){
        this.$emit('cascaderChange',values)
      }
    },
    mounted() {
      // this.setDefaultValue();
    },
  };
</script>

<style scoped>
  .colStyle{
    display: flex;
    flex-direction: column;
  }
  .radioStyle{
    display: flex;
    flex-direction: column;
    margin-top: 8px;
  }
  .radioStyle label:nth-child(1){
    margin-bottom: 15px;
  }
  .messageInline{
    display: inline;
  }


  .paddingBottom >>>.el-card__body{
    padding-bottom:0
  }
</style>
