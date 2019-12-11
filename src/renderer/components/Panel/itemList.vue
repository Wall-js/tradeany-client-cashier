array:[
{
label:'入库时间：',
value:'2018-08-03至2019-09-01',
span:'24'

},
{
label:'仓库/门店：',
value:'全部',
span:'8'

}, {
label:'产品名称：',
value:'产品1',
span:'8'
}, {
label:'密码：',
value:'1111',
span:'8'
},
],
<template>
  <el-form label-position="right" inline class="demo-table-expand" label-width="150px">
  <el-row>
    <div v-for="(arrayItem,index) in array" :key="index">
      <el-col :span="arrayItem.span">
        <el-form-item :label=arrayItem.label>
          <span>{{ arrayItem.value }}</span>
        </el-form-item>
      </el-col>
    </div>
  </el-row>
  </el-form>
</template>

<script>


  export default {

    data () {
      return {

      }
    },
    methods: {


      },
    props:['array'],
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 150px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
</style>
