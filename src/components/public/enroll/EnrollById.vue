<template>

<div id="EnrollById">


    
    <el-form ref="form" :model="form" label-width="80px" status-icon :rules="rules2">
        <el-form-item label="手机号" style="margin-top:100px"  prop="Id" auto-complete="off">
            <el-input v-model="form.Id" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" auto-complete="off">
            <el-input v-model="form.pass"  type='password'  placeholder="请输入密码"></el-input>
        </el-form-item>


        <el-form-item label="确认密码" prop="surePass" auto-complete="off">
            <el-input v-model="form.surePass"  type='password'  placeholder="请再次输入密码"></el-input>
        </el-form-item>







        <el-form-item label="出生年月">
            <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
        </el-form-item>


        <el-form-item label="性别" prop="resource">
            <el-radio-group v-model="form.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
            </el-radio-group>
        </el-form-item>


        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即注册</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
    </el-form>
</div>
</template>



<script>
export default {

    data() {
        var validatePass = (rule, value, callback) => {
            if (value.length<6) {
                callback(new Error('密码长度不能少于6位'));
            } else if(parseInt(value)==value) {                
                callback(new Error('密码不能为纯数字'));
            }else {
                callback();
            }
        };


        var validateSurePass = (rule, value, callback) => {
            if (value != this.form.pass) {
                callback(new Error('两次密码不一致'));
            }else {
                callback();
            }
        };
         var validateId = (rule, value, callback) => {
            if (parseInt(value)!=value || value.length!=11) {
                callback(new Error('手机号码格式有误'));
            }else {
                callback();
            }
        };



        return {
            form: {
                Id: '',
                pass:'',
                surePass:'',
                sex:'男',


            },
            rules2:{
                pass: [{ validator: validatePass, trigger: 'blur' }],
                surePass: [{ validator: validateSurePass, trigger: 'blur' }],
                Id:[{ validator: validateId, trigger: 'blur' }]

            }
        }
    },



    methods: {

        getDate(){
            var _this = this;
            var api=`${this.baseApi}/api/Enroll?Id=${this.form.Id}&pass=${this.form.pass}`;
            this.$http.get(api)               
            .then(function(response){
                var data=response
                // console.log(data.data);
                if(data.data){
                    _this.$message.success('注册成功');
                    _this.$router.push({name:'person'});
                }else{
                    _this.$message.error('该用户名已经被注册');
                }
            })
            .catch(function(error){
                console.log(error);
            })
        },



        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
            if (!valid) {
                    console.log('error submit!!');
                    return;
            }
                this.getDate();
            });

        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
    
}
</script>


<style lang="scss" scoped>
    #EnrollById{
        height: 520px;
        .el-form{
            width: 100%;
            height: 520px;
            overflow: hidden;

            .el-form-item{
                width: 80%;
                margin: 0 auto;
                margin-top: 20px;
              
            }
        }
    }
</style>


