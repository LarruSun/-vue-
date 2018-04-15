<template>
    <div id="Login">
        <h2 style="text-align:center;margin-bottom:20px">系统登录</h2>
		<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2"  class="demo-ruleForm">
            <el-form-item prop="Id">
                <el-input type="text" v-model="ruleForm2.Id" auto-complete="off" placeholder="用户名">
                    {{ruleForm2.Id}}
                </el-input>
            </el-form-item>
            <el-form-item prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="remember">
                    记住密码
                </el-checkbox >
            </el-form-item>

            <el-form-item>
                <el-button type="text" @click="$router.push({name:'EnrollById'})">注册账号</el-button>
                <el-button type="text" style="margin-left:0px">找回密码</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')" :loading="logining">提交</el-button>
            </el-form-item>
		</el-form>
    </div>
</template>

<script>
    export default {
        data(){
            var validatorPassword = (rule, value, callback)=>{
                if(value.length <6){
                    callback(new Error("密码不能少于6位"));
                }else{
                    callback();
                }
            }
            var validatorUsername = (rule, value, callback)=>{
                if(value.length==0){
                    callback(new Error("用户名不能为空"));
                }else{
                    callback();
                }
            }
            return {
                logining: false,
                //验证规则
                rules2: {
                    pass: [{validator:validatorPassword}],
                    Id: [{validator:validatorUsername}]
                },
                //表单数据对象
                ruleForm2: {pass: '',Id:'13970714121'},
                remember: false,
                loginFalse:5,
            }
        },
        methods: {
            submitForm(ruleForm){
                this.logining=true;
                var Id=this.ruleForm2.Id;
                var pass=this.ruleForm2.pass;
                var api=`${this.baseApi}/api/Login?Id=${Id}&pass=${pass}`
                var _this = this;
                this.$http.get(api)
                .then(function(response){
                    _this.checkPass(response,_this);
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            checkPass(obj,_this){
                var flag=obj.data.flag;
                if(flag!=-1){//用户名正确
                    if(flag==1){//密码中正确
                        _this.$message.success('登陆成功');
                        sessionStorage.setItem("user",true);//添加本地记录
                        //页面转跳
                        if(_this.$route.query.redirectPath){
                            _this.$router.push(_this.$route.query.redirectPath);
                        }else{
                            _this.$router.push("/person")
                        }
                    }else{//密码错误
                        var change=obj.data.change;
                        if(change!=0){//密码次数没完
                            _this.$message.error(`用户名密码错误,您还有 ${change} 机会`);
                        }else{//密码次数用完了
                            _this.$message.error('密码输入错误次数过多,今日该账户已经被锁定,请明日在试');
                        }
                    }
                }else{//账号错误
                    _this.$message.error(`该用户名不存在!!!!!`);
                }
                this.logining=false;
            }

        }
    }
</script>

<style lang="scss" scoped>
    #Login {
		margin:0 auto;
		width: 400px;
		margin-top: 80px;
		border: 1px solid lightgray;
		box-shadow: 0px 0px 20px lightgray;
		padding: 40px;
		border-radius: 10px;
		.el-button {
			width:100%;
		}
	}
</style>