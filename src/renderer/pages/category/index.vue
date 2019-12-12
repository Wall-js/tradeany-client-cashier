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
        <!--<Dialogform-->
                <!--:show.sync="show"-->
                <!--:dialogConfig="dialogConfig"-->
                <!--:formConfig="dialogFormConfig"-->
                <!--:value="stairForm"-->
                <!--refName="stairForm"-->
                <!--ref="dialogRef"-->
        <!--&gt;</Dialogform>-->
        <!--&lt;!&ndash;        二级分类&ndash;&gt;-->
        <!--<Dialogform-->
                <!--:show.sync="showTwo"-->
                <!--:dialogConfig="dialogConfig"-->
                <!--:formConfig="showTwoFormConfig"-->
                <!--:value="twoForm"-->
                <!--refName="twoForm"-->
                <!--ref="twoDialogRef"-->
        <!--&gt;</Dialogform>-->
        <!--&lt;!&ndash;        三级分类&ndash;&gt;-->
        <!--<Dialogform-->
                <!--:show.sync="showThree"-->
                <!--:dialogConfig="dialogConfig"-->
                <!--:formConfig="showThreeFormConfig"-->
                <!--:value="threeForm"-->
                <!--refName="threeForm"-->
                <!--ref="threeDialogRef"-->
        <!--&gt;</Dialogform>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--import Dialogform from '~/components/Dialogform'-->
    <!--import operat from "~/store/modules/operat";-->
    <!--import utils from "~/utils/utils";-->
    <!--import { corecloudItemCat } from '~/url_config'-->

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
            <!--Dialogform-->
        <!--},-->
        <!--methods: {-->
            <!--search() {-->
                <!--console.log(this.form)-->
            <!--},-->

            <!--submitRechargeForm(){},-->

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
                <!--utils.stopPro();-->
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
                            <!--this.$axios.post(corecloudItemCat,JSON.stringify(this.stairForm)).then((res)=>{-->
                                <!--if(res.data.code === 200){-->
                                    <!--this.$message({-->
                                        <!--message: '新建成功',-->
                                        <!--type: 'success'-->
                                    <!--});-->
                                    <!--this.show =false-->
                                    <!--location.reload()-->
                                <!--}else{-->
                                    <!--this.$message.error('新建异常');-->
                                <!--}-->
                            <!--})-->
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
                <!--utils.stopPro();-->
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
                            <!--this.$axios.post(corecloudItemCat,JSON.stringify(this.twoForm)).then((res)=>{-->
                                <!--if(res.data.code === 200){-->
                                    <!--this.$message({-->
                                        <!--message: '新建成功',-->
                                        <!--type: 'success'-->
                                    <!--});-->
                                    <!--this.showTwo =false;-->
                                    <!--this.GetItemCatList()-->
                                <!--}else{-->
                                    <!--this.$message.error('新建异常');-->
                                <!--}-->
                            <!--})-->
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
                            <!--this.$axios.post(corecloudItemCat,JSON.stringify(this.threeForm)).then((res)=>{-->
                                <!--if(res.data.code === 200){-->
                                    <!--this.$message({-->
                                        <!--message: '新建成功',-->
                                        <!--type: 'success'-->
                                    <!--});-->
                                    <!--this.showThree =false-->
                                    <!--this.GetItemCatList()-->
                                <!--}else{-->
                                    <!--this.$message.error('新建异常');-->
                                <!--}-->
                            <!--})-->
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
                <!--utils.stopPro();-->
                <!--this.$confirm('确定要删除该类目?', '提示', {-->
                    <!--confirmButtonText: '确定',-->
                    <!--cancelButtonText: '取消',-->
                    <!--type: 'warning'-->
                <!--}).then(() => {-->
                    <!--this.$axios.delete(`${corecloudItemCat}/${id}`).then((res)=>{-->
                        <!--if(res.data.code === 200){-->
                            <!--this.$message.success('删除成功')-->
                            <!--location.reload()-->
                        <!--}-->
                    <!--}).catch((Error)=>{-->
                        <!--console.log(Error.response)-->
                        <!--if(Error.response.data.code === 40003){-->
                            <!--this.$alert('该类目已被占用，不可删除', '提示', {-->
                                <!--confirmButtonText: '确定',-->
                            <!--});-->
                        <!--}-->
                    <!--})-->
                <!--}).catch(() => {-->
                <!--});-->
            <!--},-->
            <!--/**-->
             <!--* 获取全部一级类目-->
             <!--*/-->
            <!--GetItemCatList(){-->

                <!--this.$axios.get(corecloudItemCat)-->
                    <!--.then(res => {-->
                        <!--console.log("类目信息",res.data.data)-->
                        <!--let data = res.data.data-->
                        <!--// 获取一级类目-->
                        <!--let stairData  = utils.DelTwoLevel(utils.ModifyCategory(data));-->
                        <!--this.showTwoFormConfig["formItemList"][0]["optList"] = stairData;-->
                        <!--// 获取二级类目-->
                        <!--let twoData  = utils.DelThreeLevel(utils.ModifyCategory(data));-->
                        <!--let twoDataList = [];-->
                        <!--twoData.forEach((item)=>{-->
                            <!--let children = item['children']-->
                            <!--if(children){-->
                                <!--children.forEach((item2)=>{-->
                                    <!--twoDataList.push(item2)-->
                                <!--})-->
                            <!--}-->
                        <!--})-->
                        <!--console.log("最终数据",twoDataList)-->
                        <!--this.showThreeFormConfig["formItemList"][0]["optList"] = twoDataList;-->
                        <!--/****获取每级列表****/-->
                        <!--// 一级-->
                        <!--this.stairTableData = data;-->
                        <!--let twoList = [];-->
                        <!--let threeList = [];-->
                        <!--data.forEach((item)=>{-->
                            <!--let children = item.children-->
                            <!--if(children){-->
                                <!--children.forEach((item2)=>{-->
                                    <!--twoList.push(item2)-->
                                    <!--console.log("as",twoList)-->
                                    <!--let children2 = item2.children;-->
                                    <!--if(children2){-->
                                        <!--children2.forEach((item3)=>{-->
                                            <!--threeList.push(item3)-->
                                        <!--})-->
                                    <!--}-->
                                <!--})-->
                            <!--}-->
                        <!--})-->
                        <!--// this.twoTableData = twoList;-->
                        <!--// this.threeTableData = threeList;-->
                    <!--});-->
            <!--},-->
            <!--/**-->
             <!--*  用id获取类目通用函数-->
             <!--*/-->
            <!--getItemCat(id,requestType){-->
                <!--console.log(`${corecloudItemCat}/${id}`)-->
                <!--this.$axios.get(`${corecloudItemCat}/${id}`).then((res)=>{-->
                    <!--console.log("类目信息",res.data.data[0].children)-->
                    <!--let data  = res.data.data[0].children;-->
                    <!--console.log("最终数据",data)-->
                    <!--if(requestType === 'two'){-->
                        <!--this.twoTableData = data;-->
                    <!--}else if(requestType === 'three'){-->
                        <!--this.threeTableData = data;-->
                    <!--}-->

                <!--})-->
            <!--},-->
            <!--handleClick(){-->
                <!--console.log(111)-->
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
