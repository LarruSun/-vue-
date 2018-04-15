<template>
    <div id="LoginHome">
        <!-- <Login></Login> -->
        <p class="close">关闭</p>
        <div id="LoginHomeLogin">
            <p class="title">选择登陆方式</p>
            <el-button type="primary" class="LoginUseId" @click="$router.push({name:'loginWithId'})">账号密码登陆</el-button>
            <p class="title1">已在手机QQ或者微信买过?</p>
            <p class="LoginUseOther" @click="show3 = !show3">使用其他方式登陆</p>
            <p class="checkAgreement">查看拼多多协议</p>
        </div>
        
        <el-collapse-transition>
            <div v-show="show3"  class="transition-box">
                    <div style="margin-top: 370px;">使用QQ登陆</div>
                    <div>使用微信登陆</div>
                    <div @click="show3 = !show3">取消</div>
            </div>
        </el-collapse-transition>
    
    </div>
</template>

<script>
import Login from "@/components/public/Login/LoginWithId";

export default {
    data(){
        return{
            myGoToPath:'',
             show3: false
        }
    },
    created(){
        // console.log(this.$router.query)
        this.myGoToPath=this.$route.query.goToPath;
        console.log(this.myGoToPath);
    },
    components:{
        Login
    }
  
}
</script>


<style scoped lang='scss'>
    #LoginHome{
        position: relative;
        width: 100%;
        .close{
            width: 100%;
            color: rgb(53, 53, 236);
            height: 50px;
            line-height: 50px;
            text-indent: 5%;
        }
        #LoginHomeLogin{
            width: 80%;
            margin: 0 auto;
            height: 420px;
            text-align: center;
            .title{
                width: 100%;
                text-align: center;
                font-weight: 700;
                height: 50px;
                line-height: 50px;
                margin-top: 50px;
            }
            .LoginUseId{
                width: 80%;
                margin-top: 50px;
            }
            .title1{
                margin-top: 50px;
                font-size: 12px;
                color: rgb(163, 153, 153);
            }
            .LoginUseOther{
                margin-top: 40px;
                color: rgb(53, 53, 236);
            }
            .checkAgreement{
                margin-top: 100px;
                font-size: 12px;
                color: rgb(163, 153, 153);
            }
        }
        .transition-box{
            position: absolute;
            top: 0px;
            left: 0px;;
            height: 520px;
            line-height: 500px;
            width: 100%;
            text-align: center;
            background: rgba(76, 68, 68 , .9);
            overflow:hidden;
            div{
                width: 100%;
                height: 50px;
                line-height: 50px;
                background: #ffffff;
                border-bottom: 1px solid rgb(212, 196, 196);
            }
        }
    }
</style>



