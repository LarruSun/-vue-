<template>
    <div id="Person" >

       <div id="PersonTitle" v-if='showTitle'>
           个人中心
       </div>
            <!-- 滚动的外层盒子 -->
            <div id="PersonBody"  @scroll.passive="onScroll">
                <!-- 滚动的内层盒子 -->
                <div id="PersonBodyScroll">
                    <div id="PersonTop">
                        <div class="count">
                            <p class="phone">1397******</p>
                            <p class="bang">已绑定手机</p>
                            <p @click="Exit()" class="exit">退出登陆</p>
                        </div>
                    </div>
                    <div id="myOrder">
                        <p class="order">
                            我的订单
                        </p>
                        <p class="look">查看全部></p>
                    </div>

                    <ul id="Backlog">
                        <li v-for="(item,index) in backlogData">
                            <svg class="icon" aria-hidden="true">
                                <use v-bind:xlink:href="item.icon"></use>
                            </svg>    
                            {{item.title}}
                            
                        </li>
                    </ul>

                    <ul id="PersonCenter">
                        <li v-for="(item,index) in PersonCenterData">
                            <svg class="icon" aria-hidden="true">
                                <use v-bind:xlink:href="item.icon"></use>
                            </svg>  
                            {{item.title}}
                        </li>
                    </ul>

                    <div id="Bargin">
                        <div>
                            <p class="free">砍价免费拿</p>
                            <p class="withFriend">和好友一起砍价</p>
                        </div>
                        <p class="goto">前往砍价  ></p>
                    </div>

                    
                    <ul id="setting">
                  
                        <li>
                            <svg class="icon" aria-hidden="true" style="color:red">
                                <use xlink:href="#icon-huiyuanlibao"></use>
                            </svg> 
                            &nbsp 邀请好友免费领红包
                        </li>
                        
                        <li>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-209"></use>
                            </svg> 
                             &nbsp 收货地址
                        </li>
                        <li>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-wodekefu"></use>
                            </svg>     
                             &nbsp 官方客服
                        </li>
                        <li>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-shezhi"></use>
                            </svg>     
                             &nbsp 设置
                        </li>
                    </ul>
                    <!-- 为你推荐标题 -->
                    <div id="PersonRecommentTitl">
                        为你推荐
                    </div>
                    <!-- 商品列表 -->
                    <ul id="PersongoodList">
                        <li v-for="(item,index) in myData" @click="selectIndex(item,index)">
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
    </div>
</template>




<script>
    import ic from './res/js/iconfont.js';
    import ic1 from './res/js/icon/iconfont.js'
    export default{
        data(){
            return{
                myData:[],
                myNowPage:0,
                showTitle:false,
                isDate:[false,true],//第零号元素用于是否到头
                show:false,
                showText:'.........................数据加载中..............................',
                backlogData:[
                    {title:'代付款',icon:'#icon-ziyuan1'},
                    {title:'代分享',icon:'#icon-plus-share'},
                    {title:'代发货',icon:'#icon-ziyuan'},
                    {title:'代收货',icon:'#icon-daishouhuo'},
                    {title:'代评价',icon:'#icon-daipingjia01'}
                ],
                PersonCenterData:[
                    {title:'我的优惠券',icon:'#icon-youhuiquan'},
                    {title:'我的收藏',icon:'#icon-icowodeshoucang'},
                    {title:'历史浏览',icon:'#icon-lishi'},
                    {title:'退款售后',icon:'#icon-shouhoutuikuan'}
                ]
            }
        },

        created(){
            // this.index = this.$route.params.index;//吧传递来的数取出来
            this.getDate();
        },
        methods:{
            getDate(){
                var _this = this;
                var api=`${this.baseApi}/api/Person?page=${this.myNowPage}`;
                this.$http.get(api)               
                .then(function(response){
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
            onScroll(){  
                var bigBox=document.getElementById('PersonBody');
                var smallBox=document.getElementById('PersonBodyScroll');
        
                var scollHeight=bigBox.pageYOffset || bigBox.scrollTop;//获取滚动高度(大盒子)
                var smallBoxHeight=smallBox.offsetHeight;//获取大盒子的高度
                var bigBoxHeight=bigBox.offsetHeight;//获取小盒子的高度
                console.log(smallBoxHeight-bigBoxHeight)
                console.log(scollHeight);
                if(smallBoxHeight-bigBoxHeight==scollHeight){
                    this.myNowPage+=20;
                }

                if(scollHeight>=100){
                    this.showTitle=true;
                }else{
                    this.showTitle=false;
                }
               
                
            }, 
            //获取滚动高度
			getScrollY(){
                var box=document.getElementById('PersonBody');
				return box.pageYOffset || box.scrollTop;
            },
            Exit(){
                this.$confirm('确认退出?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                })
                .then(() => {
                    sessionStorage.removeItem("user");
                    this.$message.success('退出成功成功!');
                    this.$router.push('/person');
                })
                .catch(() => {
                    this.$message.info('已取消退出');          
                });
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

    .icon {
        width: 1em; height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }

    #Person{
        width: 100%;

        #PersonTitle{
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-weight: 700;
        }
        #PersonBody{
            width: 100%;
            height: 500px;
            overflow: scroll;
            // background: yellow;
            #PersonTop{
                width: 100%;
                height: 200px;
                background:rgb(223,43,46);
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                .count{
                    width: 60%;
                    height: 200px;
                    position: relative;
                    margin: 0 auto;
                    .phone{
                        background: url(./img/isLogin.png) no-repeat 20% 110%;
                        height: 120px;
                        line-height: 160px;
                        text-indent: 40%;
                    }
                    .bang{
                        position: absolute;
                        left: 42%;
                        top: 45%;
                        font-size: 12px;
                        color: rgb(156, 148, 148)
                    }
                    .exit{
                        width: 30%;
                        height: 30px;
                        line-height: 30px;
                        margin-left: 25%;
                        border-radius: 30px;
                        background: red;
                        text-align: center;
                        font-size: 12px;
                    }

                }
            }
            #myOrder{
                width: 100%;
                height: 70px;
                line-height: 70px;
                display: flex;
                flex-direction: row;
                border-bottom: 1px solid rgb(245, 239, 239);
                .order{
                    width: 45%;
                    margin-left:5%;
                }
                .look{
                    width: 45%;
                    margin-right:5%;
                    text-align: right;
                    color: rgb(119, 114, 114);
                    font-size: 15px;
                }
            }
            #Backlog{
                width: 100%;
                height: 50px;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                margin-bottom: 20px;
                li{
                    width: 20%;
                    height: 50px;
                    text-align: center;
                    line-height: 50px;
                    border-bottom: 10px solid rgb(245, 239, 239);
                }
            }
            #PersonCenter{
                width: 100%;
                height: 50px;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                margin-bottom: 10px;
                li{
                    width: 25%;
                    height: 50px;
                    text-align: center;
                    line-height: 50px;
                    border-bottom: 10px solid rgb(245, 239, 239);
                }
            }
            #Bargin{
                width: 100%;
                height: 50px;
                border-bottom: 10px solid rgb(245, 239, 239);
                display: flex;
                flex-direction: row;
                .free{
                    width: 100%;
                    height: 25px;
                    line-height: 25px;
                    margin-left: 45%;
                }
                .withFriend{
                    width: 105%;
                    height: 25px;
                    line-height: 25px;
                    margin-left: 45%;
                    font-size: 10px;
                    color:rgba(122, 119, 119, 0.616)


                }
                .goto{
                    width: 15%;
                    text-align: center;
                    margin-left: 65%;
                    margin-top: 10px;
                    height: 30px;
                    line-height: 30px;
                    background: rgb(223,43,46);
                    border-radius: 10px;
                }

            }
            #setting{
                width: 100%;
                border-bottom: 10px solid rgb(245, 239, 239);
                li{
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    border-bottom: 1px solid rgb(245, 239, 239);
                    margin-left: 6%;
   

                }

            }
            #PersonRecommentTitl{
                width: 100%;
                height: 50px;
                text-align: center;
                line-height: 50px;
                color: red;
                font-weight: 700;
            }
            #PersongoodList{
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
