<template>
    <div id="Char"  @scroll.passive="onScroll">
        <p class="CharTitle">聊天</p>
        <div class="CharBody" id="CharScrollBody">

            <!-- 聊天 -->
            <div id="hadLoginView">
                <!-- 已登录 -->
                <div v-if="isLogin" class="isLogin">
                    <p>还没有聊天消息哦</p>
                    <p>与商家的聊天消息将会显示在这里</p>
                    <p>联系官方客户></p>
                </div>
                <!-- 未登录 -->
                <div v-else class="noLogin">
                    <p>还没有登陆哦</p>
                     <p>登陆后才能够接受商家,官方客服的聊天消息</p>
                    <el-button type="danger" class="ChatLogin" @click="goToLogin()">登陆</el-button>

                </div>
            </div>
            <!-- 为你推荐 -->
            <div id="RecommentTitl">为你推荐</div>
            <!-- 商品列表 -->
            <ul id="goodLists">
                <li v-for="(item,index) in myData" @click='selectIndex(item,index)'> 
                    <img :src="item.image_url" alt="未显示">
                    <p class="name">
                        {{item.goods_name}}
                    </p>
                    <p class="price">
                        {{item.price/100}}
                        
                    </p>
                </li>
                <div v-show="show" class="Lazzshow">{{showText}}</div>
            </ul>
             
            
        </div>
    </div>
</template>



<script>
    export default{
        data(){
            return{
                isLogin:true,
                myData:[],
                myNowPage:0,
                isDate:[false,true],//第零号元素用于是否到头
                show:false,
                showText:'.........................数据加载中..............................'
            }
        },

        created(){
            if(sessionStorage.getItem("user")) this.isLogin=true
            else this.isLogin=false;
            this.getDate();


            // this.index = this.$route.params.index;//吧传递来的数取出来
        },
        methods:{  
              getDate(){
                var _this = this;
                var api=`${this.baseApi}/api/Chat?page=${this.myNowPage}`;
                this.$http.get(api)               
                .then(function(response){
                    // _this.myData=response.data.data;
                     if(response.data.data.length==0){
                        _this.isDate[0]=true;
                        _this.showText='.........................我是有底线的..............................'
                        return false;
                    };
                    for(var i=0;i<response.data.data.length;i++){
                        _this.myData.push(response.data.data[i]);
                    };
                    return true;     
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            goToLogin(){
                this.$router.push('/loginhome');
            },
            
            onScroll(){ 
                var bigBox=document.getElementById('Char');
                var smallBox=document.getElementById('CharScrollBody');
        
                var scollHeight=bigBox.pageYOffset || bigBox.scrollTop;//获取滚动高度(大盒子)
                var smallBoxHeight=smallBox.offsetHeight;//获取大盒子的高度
                var bigBoxHeight=bigBox.offsetHeight;//获取小盒子的高度
                // console.log(smallBoxHeight-bigBoxHeight+50)
                // console.log(scollHeight);
                if(smallBoxHeight-bigBoxHeight+50==scollHeight){
                    this.myNowPage+=20;
                    // console.log(this.myNowPage)
                }
            
            },
            selectIndex(item,index){
                console.log(item.goods_id);
                console.log(index);
                this.$router.push({name:'goodlist',params:{goodsId:item.goods_id}})
            },
            
        },
        watch:{
            myNowPage(newValue,oldValue){
                console.log('CHANGE')
                this.show=true; 
                if(newValue>oldValue && !this.isDate[newValue] & !this.isDate[0]){        
                    this.getDate()
                    this.isDate.push(true);
                }else if(this.isDate[0]){
                        this.showText='.........................我是有底线的..............................'
                        this.myNowPage=1;
                }else{
                    this.showText='.........................数据加载中..............................'
                }
                

            }
        }   
    }
</script>

<style scoped lang='scss'>
    #Char{
        width: 100%;
        height: 500px;
        overflow: scroll;
        .CharTitle{
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-weight: 700;
        }
        .CharBody{
            width: 100%;

            // 登陆
            #hadLoginView{
                width: 100%;
                height: 445px;
                .isLogin{
                    background: rgb(238, 234, 234);
                    p{
                        width: 100%;
                        height: 150px;
                        line-height: 160px;
                        text-align: center;
                    }
                }
                .noLogin{
                    text-align: center;
                    p{
                        width: 100%;
                        height: 80px;
                        line-height: 80px;
                        text-align: center;
                    }
                    .ChatLogin{
                        width: 80%;
                        margin-top: 110px;
                    }
                }
            }
            // 为你推荐
            #RecommentTitl{
                width: 100%;
                height: 50px;
                text-align: center;
                line-height: 50px;
                color: red;
                font-weight: 700;
            }
            #goodLists{
                width: 100%;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                li{
                
                    width: 50%;
                    margin-bottom: 50px;
                    img{
                        width: 100%;
                    }
                    .name{
                        width: 80%;
                        height: 33px;
                        margin-top: 20px;
                        overflow: hidden;
                        // line-height: 10px;
                    }
                    .price{
                        width: 100%;
                        height: 40px;
                        line-height: 40px;
                        color: red;
                        font-weight: 700;
                    }
                }
                .Lazzshow{
                    margin-top: 20px;
                    width: 100%;
                    height: 100px;
                    text-align: center;
                    /* line-height: 5; */
                    color: red;
                }
            }

        }
    }
</style>
