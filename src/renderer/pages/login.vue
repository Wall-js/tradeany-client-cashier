<template>
    <div class="container flex-row">
        <div class="pageLeft pageHeight">
            <div class="pageLeftCon titleBox">
                <h1>收银台系统</h1>
                <h3>欢迎来到【收银台】</h3>
            </div>
            <img class="logimg pageLeftCon" src="~@/assets/images/cashier.jpg" alt="electron-vue">
        </div>
        <div class="pageRight pageHeight">
            <el-form ref="loginForm" :model="loginForm" :rules="rules" class="loginForm">
                <div class="label">账号：</div>
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="请输入您的账号" size="mini"></el-input>
                </el-form-item>
                <div class="label">密码：</div>
                <el-form-item prop="password" style="margin-bottom: 10px">
                    <el-input type="password" v-model="loginForm.password"  placeholder="请输入您的密码" size="mini"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox>记住我</el-checkbox>
                    <a style="float: right;" href="#" class="checkBox">忘记密码？</a>
                </el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')" class="login-button" size="mini">登陆</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
           return {
               loginForm: {
                   username: '',
                   password: '',
               },
               rules: {
                   username: [
                       {required: true, message: '请输入您的账号', trigger: 'blur'}
                   ],
                   password: [
                       {required: true, message: '请输入密码', trigger: 'blur'}
                   ]
               },
           }
        },
        methods:{
            submitForm(loginForm){
                this.$refs[loginForm].validate((valid) => {
                    if (valid) {
                        if(this.loginForm.username === 'admin' || this.loginForm.password === '1234qwer'){
                            this.$router.push('/home')
                        }else {
                            this.$message.error('用户名或密码错误')
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .el-main{
        padding: 0 !important;
    }
    .pageHeight{
        height: 100%;
    }
    .container{
        width: 100%;
        height: 100vh;
    }
    .pageLeft{
        width:60%;
        position: relative;
    }
    .pageRight{
        width:40%;
    }
    .pageLeftCon{
        position: absolute;
        color:#ffffff;
    }
    .logimg{
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    .titleBox{
        top:30%;
        width: 100%;
        text-align: center;
    }
    .loginForm{
        width:80%;
        margin:40% auto 0;
    }
    .label {
        display: inline-block;
        height: 30px;
        font-size: 14px;
        font-weight: normal;
    }

    .login-button {
        width: 100%;
        font-size: 18px;
    }
    .checkBox{
        color:#999999;
    }
</style>
