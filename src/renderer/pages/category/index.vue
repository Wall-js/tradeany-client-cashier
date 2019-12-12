<!--<template>-->
    <!--<div>-->
        <!--<el-row class="category">-->
            <!--<el-col :span="8">-->
                <!--<el-card class="category-card-one">-->
                    <!--<el-table-->
                            <!--:data="stairTableData"-->
                            <!--style="width: 100%">-->
                        <!--<el-table-column label="一级类目"-->
                                <!--align="left">-->
                            <!--<template slot="header" slot-scope="scope">-->
                               <!--<span>{{$t('primaryCategory')}}</span>-->
                                <!--<el-button size="mini" type="text" style="float: right;" @click="addStairCategory">{{$t('add')}}</el-button>-->
                            <!--</template>-->
                            <!--<template slot-scope="scope">-->
                                <!--<div @click="handleClickOne(scope.row)">-->
                                    <!--<el-image-->
                                            <!--style="width: 40px; height: 40px"-->
                                            <!--:src="scope.row.image"-->
                                    <!--&gt;</el-image>-->
                                    <!--<span style="margin-left: 10px;position: absolute;top: 20px;">{{ scope.row.name }}</span>-->
                                    <!--<div style="width: 46px;float: right;">-->
                                        <!--<el-button-->
                                                <!--type="text"-->
                                                <!--icon="el-icon-edit"-->
                                                <!--@click="editStairCategory">-->
                                        <!--</el-button>-->
                                        <!--<el-button-->
                                                <!--type="text"-->
                                                <!--icon="el-icon-close"-->
                                                <!--@click="delCategory(scope.row.id)">-->
                                        <!--</el-button>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                    <!--</el-table>-->
                <!--</el-card>-->
            <!--</el-col>-->
            <!--<el-col :span="8">-->
                <!--<el-card class="category-card-two">-->
                    <!--<el-table-->
                            <!--:data="twoTableData"-->
                            <!--style="width: 100%">-->
                        <!--<el-table-column label="二级类目"-->
                                         <!--align="left">-->
                            <!--<template slot="header" slot-scope="scope">-->
                                <!--<span>{{$t('secondaryCategory')}}</span>-->
                                <!--<el-button size="mini" type="text" style="float: right;"  @click="addTwoCategory">{{$t('add')}}</el-button>-->
                            <!--</template>-->
                            <!--<template slot-scope="scope">-->
                                <!--<div @click="handleClickTwo(scope.row)">-->
                                    <!--<el-image-->
                                            <!--style="width: 40px; height: 40px"-->
                                            <!--:src="scope.row.image"-->
                                    <!--&gt;</el-image>-->
                                    <!--<span style="margin-left: 10px;position: absolute;top: 20px;">{{ scope.row.name }}</span>-->
                                    <!--<div style="width: 46px;float: right;">-->
                                        <!--<el-button-->
                                                <!--type="text"-->
                                                <!--icon="el-icon-edit"-->
                                                <!--@click="editTwoCategory">-->
                                        <!--</el-button>-->
                                        <!--<el-button-->
                                                <!--type="text"-->
                                                <!--icon="el-icon-close"-->
                                                <!--@click="delCategory(scope.row.id)">-->
                                        <!--</el-button>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                    <!--</el-table>-->
                <!--</el-card>-->
            <!--</el-col>-->
            <!--<el-col :span="8">-->
                <!--<el-card class="category-card-three">-->
                    <!--<el-table-->
                            <!--:data="threeTableData"-->
                            <!--style="width: 100%">-->
                            <!--<el-table-column label="三级类目"-->
                                         <!--align="left">-->
                                <!--<template slot="header" slot-scope="scope">-->
                                    <!--<span>{{$t('tertiaryCategory')}}</span>-->
                                    <!--<el-button size="mini" type="text" style="float: right;" @click="addThreeCategory">{{$t('add')}}</el-button>-->
                                <!--</template>-->

                                <!--<template slot-scope="scope">-->
                                    <!--<el-image-->
                                            <!--style="width: 40px; height: 40px"-->
                                            <!--:src="scope.row.image"-->
                                    <!--&gt;</el-image>-->
                                    <!--<span style="margin-left: 10px;position: absolute;top: 20px;">{{ scope.row.name }}</span>-->
                                    <!--<div style="width: 46px;float: right;">-->
                                        <!--<el-button-->
                                                <!--type="text"-->
                                                <!--icon="el-icon-edit"-->
                                                <!--@click="editThreeCategory">-->
                                        <!--</el-button>-->
                                        <!--<el-button-->
                                                <!--type="text"-->
                                                <!--icon="el-icon-close"-->
                                                <!--@click="delCategory(scope.row.id)">-->
                                        <!--</el-button>-->
                                    <!--</div>-->
                                <!--</template>-->

                        <!--</el-table-column>-->

                    <!--</el-table>-->
                <!--</el-card>-->
            <!--</el-col>-->
        <!--</el-row>-->
<!--&lt;!&ndash;        一级分类&ndash;&gt;-->
        <!--&lt;!&ndash;<Dialogform&ndash;&gt;-->
                <!--&lt;!&ndash;:show.sync="show"&ndash;&gt;-->
                <!--&lt;!&ndash;:dialogConfig="dialogConfig"&ndash;&gt;-->
                <!--&lt;!&ndash;:formConfig="dialogFormConfig"&ndash;&gt;-->
                <!--&lt;!&ndash;:value="stairForm"&ndash;&gt;-->
                <!--&lt;!&ndash;refName="stairForm"&ndash;&gt;-->
                <!--&lt;!&ndash;ref="dialogRef"&ndash;&gt;-->
        <!--&lt;!&ndash;&gt;</Dialogform>&ndash;&gt;-->
        <!--&lt;!&ndash;        二级分类&ndash;&gt;-->
        <!--&lt;!&ndash;<Dialogform&ndash;&gt;-->
                <!--&lt;!&ndash;:show.sync="showTwo"&ndash;&gt;-->
                <!--&lt;!&ndash;:dialogConfig="dialogConfig"&ndash;&gt;-->
                <!--&lt;!&ndash;:formConfig="showTwoFormConfig"&ndash;&gt;-->
                <!--&lt;!&ndash;:value="twoForm"&ndash;&gt;-->
                <!--&lt;!&ndash;refName="twoForm"&ndash;&gt;-->
                <!--&lt;!&ndash;ref="twoDialogRef"&ndash;&gt;-->
        <!--&lt;!&ndash;&gt;</Dialogform>&ndash;&gt;-->
        <!--&lt;!&ndash;        三级分类&ndash;&gt;-->
        <!--&lt;!&ndash;<Dialogform&ndash;&gt;-->
                <!--&lt;!&ndash;:show.sync="showThree"&ndash;&gt;-->
                <!--&lt;!&ndash;:dialogConfig="dialogConfig"&ndash;&gt;-->
                <!--&lt;!&ndash;:formConfig="showThreeFormConfig"&ndash;&gt;-->
                <!--&lt;!&ndash;:value="threeForm"&ndash;&gt;-->
                <!--&lt;!&ndash;refName="threeForm"&ndash;&gt;-->
                <!--&lt;!&ndash;ref="threeDialogRef"&ndash;&gt;-->
        <!--&lt;!&ndash;&gt;</Dialogform>&ndash;&gt;-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--export default {-->
        <!--layout: 'home',-->
        <!--name: "category",-->
        <!--data() {-->
            <!--return {-->
                <!--/**-->
                 <!--* 一级类目-->
                 <!--* */-->
                <!--stairTableData:[],-->
                <!--show: false,-->
                <!--dialogConfig: {-->
                    <!--title: '修改产品类目',-->
                    <!--width: '600px'-->
                <!--},-->
                <!--dialogFormConfig: {-->
                    <!--labelWidth: '110px',-->
                    <!--formItemList: [-->
                        <!--{-->
                            <!--type: 'input',-->
                            <!--prop: 'name',-->
                            <!--label: this.$t('name')+'：',-->
                            <!--rules: {required: true, message: this.$t('placeholder'), trigger: 'blur'},-->
                            <!--placeholder: this.$t('placeholder'),-->
                            <!--style: 'width:200px',-->
                        <!--},-->
                        <!--{-->
                            <!--type: 'upload',-->
                            <!--prop: 'image',-->
                            <!--label: this.$t('image')+'：',-->
                            <!--rules: {required: true, message: 'upload', trigger: 'blur'},-->
                            <!--ref:"stairSingle",-->
                            <!--style: 'width:200px',-->
                            <!--filesList:{-->
                                <!--type:'single',-->
                                <!--limit:1,-->
                                <!--fileList:"",-->
                            <!--},-->
                        <!--},-->
                    <!--],-->
                    <!--operate: [-->
                        <!--{-->
                            <!--type: 'primary',-->
                            <!--name: this.$t('confirm'),-->
                            <!--handleClick: this.stairSubmitForm-->
                        <!--},-->
                        <!--{-->
                            <!--name: this.$t('cancel'),-->
                            <!--handleClick: this.onCancel,-->
                            <!--style: 'margin-left:10px'-->
                        <!--}-->
                    <!--]-->
                <!--},-->
                <!--stairForm:{-->
                    <!--name:"",-->
                    <!--image:"",-->
                <!--},-->
                <!--/**-->
                 <!--* 二级类目-->
                 <!--* */-->
                <!--twoTableData:[],-->
                <!--showTwo:false,-->
                <!--showTwoFormConfig: {-->
                    <!--labelWidth: '110px',-->
                    <!--formItemList: [-->
                        <!--{-->
                            <!--type: 'select',-->
                            <!--prop: 'pid',-->
                            <!--label: this.$t('primaryCategory')+'：',-->
                            <!--placeholder: '请选择一级类目',-->
                            <!--rules: {required: true, message: '请选择一级类目', trigger: 'blur'},-->
                            <!--style: 'width:200px',-->
                            <!--optList: []-->
                        <!--},-->
                        <!--{-->
                            <!--type: 'input',-->
                            <!--prop: 'name',-->
                            <!--label: this.$t('secondaryCategory')+'：',-->
                            <!--placeholder: '请输入二级类目',-->
                            <!--rules: {required: true, message: '请输入二级类目', trigger: 'blur'},-->
                            <!--style: 'width:200px',-->
                        <!--},-->
                        <!--{-->
                            <!--type: 'upload',-->
                            <!--prop: 'image',-->
                            <!--label: this.$t('image')+'：',-->
                            <!--rules: {required: true, message: 'upload', trigger: 'blur'},-->
                            <!--ref: "twoSingle",-->
                            <!--style: 'width:200px',-->
                            <!--filesList: {-->
                                <!--type: 'single',-->
                                <!--limit: 1,-->
                                <!--fileList: "",-->
                            <!--}-->
                        <!--}-->
                    <!--],-->
                    <!--operate: [-->
                        <!--{-->
                            <!--type: 'primary',-->
                            <!--name: this.$t('confirm'),-->
                            <!--handleClick: this.twoSubmitForm-->
                        <!--},-->
                        <!--{-->
                            <!--name: this.$t('cancel'),-->
                            <!--handleClick: this.onCancel,-->
                            <!--style: 'margin-left:10px'-->
                        <!--}-->
                    <!--]-->
                <!--},-->
                <!--twoForm:{-->
                    <!--pid:"",-->
                    <!--name:'',-->
                    <!--image:''-->
                <!--},-->
                <!--/**-->
                 <!--* 三级类目-->
                 <!--* */-->
                <!--threeTableData:[],-->
                <!--showThree:false,-->
                <!--showThreeFormConfig: {-->
                    <!--labelWidth: '110px',-->
                    <!--formItemList: [-->
                        <!--{-->
                            <!--type: 'select',-->
                            <!--prop: 'pid',-->
                            <!--label: this.$t('secondaryCategory')+'：',-->
                            <!--placeholder: '请选择二级类目',-->
                            <!--rules: {required: true, message: '请选择二级类目', trigger: 'blur'},-->
                            <!--style: 'width:200px',-->
                            <!--optList: []-->
                        <!--},-->
                        <!--{-->
                            <!--type: 'input',-->
                            <!--prop: 'name',-->
                            <!--label: this.$t('tertiaryCategory')+'：',-->
                            <!--placeholder: '请输入内容',-->
                            <!--rules: {required: true, message: '请输入三级分类', trigger: 'blur'},-->
                            <!--style: 'width:200px',-->
                        <!--},-->
                        <!--{-->
                            <!--type: 'upload',-->
                            <!--prop: 'image',-->
                            <!--label: this.$t('image')+'：',-->
                            <!--rules: {required: true, message: 'upload', trigger: 'blur'},-->
                            <!--ref: "threeSingle",-->
                            <!--style: 'width:200px',-->
                            <!--filesList: {-->
                                <!--type: 'single',-->
                                <!--limit: 1,-->
                                <!--fileList: "",-->
                            <!--}-->
                        <!--}-->
                    <!--],-->
                    <!--operate: [-->
                        <!--{-->
                            <!--type: 'primary',-->
                            <!--name: this.$t('confirm'),-->
                            <!--handleClick: this.threeSubmitForm-->
                        <!--},-->
                        <!--{-->
                            <!--name: this.$t('cancel'),-->
                            <!--handleClick: this.onCancel,-->
                            <!--style: 'margin-left:10px'-->
                        <!--}-->
                    <!--]-->
                <!--},-->
                <!--threeForm: {-->
                    <!--pid:"",-->
                    <!--name:'',-->
                    <!--image:''-->
                <!--},-->


            <!--}-->
        <!--},-->
        <!--components: {-->
            <!--// Dialogform-->
        <!--},-->
        <!--methods: {-->
            <!--search() {-->
                <!--console.log(this.form)-->
            <!--},-->

            <!--submitRechargeForm(){},-->
            <!--/**-->
             <!--* 取消冒泡-->
             <!--*/-->
            <!--stopPro() {-->
                <!--let e = window.event;-->
                <!--if (e && e.stopPropagation) {-->
                    <!--//W3C取消冒泡事件-->
                    <!--e.stopPropagation();-->
                <!--} else {-->
                    <!--//IE取消冒泡事件-->
                    <!--window.event.cancelBubble = true;-->
                <!--}-->
            <!--},-->
            <!--/**-->
             <!--* 新增一级类目-->
             <!--*/-->
            <!--addStairCategory(){-->
                <!--this.show = true;-->
                <!--this.dialogConfig['title'] =this.$t('addCategory')-->
            <!--},-->
            <!--/**-->
             <!--* 编辑一级类目-->
             <!--* */-->
            <!--editStairCategory(){-->
                <!--this.stopPro();-->
                <!--this.show = true;-->
                <!--this.dialogConfig['title'] =this.$t('editCategory')-->
            <!--},-->
            <!--/**-->
             <!--*一级类目提交-->
             <!--*/-->
            <!--stairSubmitForm(formName){-->
                <!--let title = this.dialogConfig['title'];-->
                <!--let image = this.$refs['dialogRef'].$refs['stairSingle'][0].getContext()-->
                <!--if(image !== false ){-->
                    <!--this.stairForm["image"] = this.$refs['dialogRef'].$refs['stairSingle'][0].getContext()-->
                <!--}-->
                <!--this.stairForm["pid"] = 0;-->
                <!--formName["stairForm"].validate((valid) => {-->
                    <!--if (valid) {-->
                        <!--console.log(JSON.stringify(this.stairForm));-->
                        <!--if(title === '新增产品类目'||title === 'Add a category'){-->

                        <!--}else if(title === '修改产品类目'){-->

                        <!--}-->
                    <!--} else {-->
                        <!--console.log('error submit!!');-->
                        <!--return false;-->
                    <!--}-->
                <!--});-->

            <!--},-->
            <!--/**-->
             <!--* 查询二级类目-->
             <!--* */-->
            <!--handleClickOne(item){-->
                <!--this.twoTableData =[];-->
                <!--this.threeTableData=[];-->
                <!--let requestType = "two";-->
                <!--this.getItemCat(item.id,requestType);-->
                <!--console.log(item)-->
            <!--},-->
            <!--/**-->
             <!--* 新增二级类目-->
             <!--* */-->
            <!--addTwoCategory(){-->
                <!--this.showTwo = true;-->
                <!--this.dialogConfig['title'] =this.$t('addCategory')-->
            <!--},-->
            <!--/**-->
             <!--* 编辑二级类目-->
             <!--* */-->
            <!--editTwoCategory(){-->
                <!--this.stopPro();-->
                <!--this.showTwo = true;-->
                <!--this.dialogConfig['title'] =this.$t('editCategory')-->
            <!--},-->
            <!--/**-->
             <!--*二级类目提交-->
             <!--*/-->
            <!--twoSubmitForm(formName){-->
                <!--let title = this.dialogConfig['title'];-->
                <!--let image = this.$refs['twoDialogRef'].$refs['twoSingle'][0].getContext()-->
                <!--if(image !== false ){-->
                    <!--this.twoForm["image"] = this.$refs['twoDialogRef'].$refs['twoSingle'][0].getContext()-->
                <!--}-->
                <!--formName["twoForm"].validate((valid) => {-->
                    <!--if (valid) {-->
                        <!--console.log(JSON.stringify(this.twoForm));-->
                        <!--if(title === '新增产品类目'){-->

                        <!--}else if(title === '修改产品类目'){-->

                        <!--}-->
                    <!--} else {-->
                        <!--console.log('error submit!!');-->
                        <!--return false;-->
                    <!--}-->
                <!--});-->

            <!--},-->
            <!--/**-->
             <!--* 查询三级类目-->
             <!--* */-->
            <!--handleClickTwo(item){-->
                <!--console.log(item)-->
                <!--let requestType = "three";-->
                <!--this.getItemCat(item.id,requestType)-->
            <!--},-->
            <!--/**-->
             <!--* 新增三级类目-->
             <!--*/-->
            <!--addThreeCategory(){-->
                <!--this.showThree = true;-->
                <!--this.dialogConfig['title'] =this.$t('addCategory')-->
            <!--},-->
            <!--/**-->
             <!--* 编辑三级类目-->
             <!--* */-->
            <!--editThreeCategory(){-->
                <!--this.showThree = true;-->
                <!--this.dialogConfig['title'] =this.$t('editCategory')-->
            <!--},-->
            <!--/**-->
             <!--*三级类目提交-->
             <!--*/-->
            <!--threeSubmitForm(formName){-->
                <!--let title = this.dialogConfig['title'];-->
                <!--let image = this.$refs['threeDialogRef'].$refs['threeSingle'][0].getContext();-->
                <!--if(image !== false ){-->
                    <!--console.log("执行")-->
                    <!--this.threeForm["image"] = this.$refs['threeDialogRef'].$refs['threeSingle'][0].getContext()-->
                <!--}-->
                <!--formName["threeForm"].validate((valid) => {-->
                    <!--if (valid) {-->
                        <!--console.log(JSON.stringify(this.threeForm));-->
                        <!--if(title === '新增产品类目'){-->

                        <!--}else if(title === '修改产品类目'){-->

                        <!--}-->
                    <!--} else {-->
                        <!--console.log('error submit!!');-->
                        <!--return false;-->
                    <!--}-->
                <!--});-->
            <!--},-->
            <!--// 关闭弹窗-->
            <!--onCancel(){-->
                <!--this.show = false;-->
                <!--this.showTwo = false;-->
                <!--this.showThree = false;-->
            <!--},-->
            <!--/**-->
             <!--* 删除类目-->
             <!--* */-->
            <!--delCategory(id) {-->
                <!--this.stopPro();-->
                <!--this.$confirm('确定要删除该类目?', '提示', {-->
                    <!--confirmButtonText: '确定',-->
                    <!--cancelButtonText: '取消',-->
                    <!--type: 'warning'-->
                <!--}).then(() => {-->

                <!--}).catch(() => {-->
                <!--});-->
            <!--},-->
            <!--/**-->
             <!--* 获取全部一级类目-->
             <!--*/-->
            <!--GetItemCatList(){-->


            <!--},-->
            <!--/**-->
             <!--*  用id获取类目通用函数-->
             <!--*/-->
            <!--getItemCat(id,requestType){-->

            <!--},-->
            <!--handleClick(){-->

            <!--}-->
        <!--},-->
        <!--created() {-->
            <!--this.GetItemCatList();-->
        <!--}-->
    <!--}-->
<!--</script>-->

<!--<style scoped>-->
    <!--/*.category{*/-->
        <!--/*height: 100vh;*/-->
    <!--/*}*/-->
    <!--.category-card-one-->
    <!--{-->
        <!--margin: 5px;-->
        <!--min-height: 100vh;-->
    <!--}-->
    <!--.category-card-two-->
    <!--{-->
        <!--margin: 5px;-->
        <!--min-height: 100vh;-->
    <!--}-->
    <!--.category-card-three-->
    <!--{-->
        <!--margin: 5px;-->
        <!--min-height: 100vh;-->
    <!--}-->
<!--</style>-->
<template>
    <div>
        <el-table
            :data="outeData"
        >
            <el-table-column align="left">
                <template slot="header" slot-scope="scope">
                    <div  class="flex-row just-between">
                        <span>一级类目</span>
                        <el-button size="mini" type="text" @click="add">新增</el-button>
                    </div>
                </template>
                <template slot-scope="scope">
                    <div @click="handleClick(scope.row)" class="flex-row just-between">
                        <div class="flex-row flex-align">
                            <el-image
                                    class="img"
                                    :src="scope.row.image"
                            ></el-image>
                            <span class="m-l-sm">{{ scope.row.name }}</span>
                        </div>
                        <div>
                            <el-button
                                    type="text"
                                    icon="el-icon-edit"
                                    @click="edit">
                            </el-button>
                            <el-button
                                    type="text"
                                    icon="el-icon-close"
                                    @click="del(scope.row.id)">
                            </el-button>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                outeData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333,
                    image:'http://tradeany.oss-cn-qingdao.aliyuncs.com/MjAxOTA5MDgxNDM2NTXlvq7kv6HmiKrlm75fMjAxOTA5MDgyMjM2NDM=.png'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333,
                    image:'http://tradeany.oss-cn-qingdao.aliyuncs.com/MjAxOTA5MDgxNDQ1MDLlvq7kv6HmiKrlm75fMjAxOTA5MDgyMjQ0MTY=.png'
                }]
            }
        },
        methods:{
            //新增
            add(){

            },
            //编辑
            edit(){

            },
            //删除
            del(id){

            },
            //表格列点击
            handleClick(){

            }
        }
    }
</script>

<style scoped>
    .img{
        width: 40px;
        height: 40px
    }
</style>
