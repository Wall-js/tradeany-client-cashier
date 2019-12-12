<template>
  <div class="pagenation">
    <el-pagination
      small
      background
      class="text-center"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      layout="prev, pager, next,total"
      :total="pageTotal">
    </el-pagination>
  </div>
</template>

<script>
  export default {

    props: {
      pageTotal: {
        type: Number
      }, // 总条数
      pageSize:{
        type: Number
      },
      currentPage:{
        type: Number
      }
    },
    data() {
      return {

      };
    },
    methods: {
      // 当前页码变化
      handleCurrentChange(val) {
        // console.log("当前页",val);
        this.$emit('pageChange',val);
      }
    },
  }
</script>

<style scoped>
  .pagenation{
    margin: 20px 0;
    float: right;
  }
</style>

