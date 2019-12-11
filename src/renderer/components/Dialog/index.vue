
<template>
  <el-dialog
    :title="dialogConfig.title"
    :visible="show"
    :width="dialogConfig.width"
    :append-to-body="dialogConfig.appendToBody"
    close-on-press-escape
    :close-on-click-modal="false"
    @close="handleClose"
  >
      <div slot="title" v-if="!dialogConfig.title">
          <slot name="title"></slot>
      </div>
      <div v-if="dialogConfig.subTitle" class="subTitle">
          <p v-for="item in dialogConfig.subTitle">{{item}}</p>
      </div>
    <slot name="content"></slot>
    <slot name="footer"></slot>
  </el-dialog>
</template>

<script>

  export default {
    // data() {
    //   return {
    //     visible: false
    //   };
    // },
    props: {
        show: {
            type: Boolean,
            default: false
      },

      dialogConfig:{
        type: Object,
      },
    },
    methods:{
      handleClose(){
        console.log("handleClose")
          this.$emit('update:show', false)
        },
    },

  };
</script>
<style scoped>
    .subTitle{
        width: 90%;
        margin: 0 auto;
        background: #f2f2f2;
        padding:23px;
        color:#333333;
        font-size: 12px;
        border-radius: 3px;
    }
</style>
