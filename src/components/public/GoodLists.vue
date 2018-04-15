<template>
    <div id="GoodLists">
        <div id="Imgs">
            <img :src='myData.image_url' alt="saassd">
        </div>
        <div id="GoodListsTitle">
            <p class="price">
                ￥{{myData.max_group_price/100}}
                <del class="marPrice">{{myData.market_price/100}}</del>
                <span class="sales">已拼{{myData.sales}}件-{{myData.tag}}人拼单</span>
             
            </p>
            <p class="name">{{myData.goods_name}}</p>
        </div>



        <div id="GoodListsCenter">
            <p>
                <span class="sp1">品牌清仓</span>
                <span class="sp2">放心品质 低价清仓</span>
            </p>

            <p>
                <span class="sp3">全场包邮</span>
                <span class="sp4">7天退货</span>
                <span class="sp5">48小时发货></span>
            </p>
        </div>


        <div id='GoodListsPJ'>
            <p class="title">
                <span>商品评价{{pjData.number}}</span>
                <span class="lookAll">查看全部商品></span>
            </p>
            <div v-for="item in pjData.data">
                <p class="top">
                    <span class="name">{{item.name}}</span>
                    <span class="time">{{item.time}}</span>
                </p>
                <p class="PJ">
                    {{item.comment}}
                </p>
                <!-- <p class="bottom">
                    <span v-for='items in item.specs'>{{items}}</span>
                    {{item.specs[1].spec_key}} {{item.specs[1].spec_value}}
                    {{item.specs[0].spec_key}} {{item.specs[0].spec_value}}
                    {{item.specs[1].spec_key}} {{item.specs[1].spec_value}}
                </p> -->
                
            </div>

        </div>




        <div id="ListImg">
            <img v-for='item in myData.gallery' :src="item.url" alt='未显示'/>
        </div>


        <div id='addCar'>
            <span class="sy" @click="navBarClick(0)">首页</span>
            <span class="sy" @click="navBarClick(1)">收藏</span>
            <span class="sy" @click="navBarClick(2)">客服</span>
            <span class="du" @click="navBarClick(3)">单独购买</span>
            <span class="pd" @click="navBarClick(4)">发起拼单</span>



        </div>

    </div>
</template>


<script>
// props:['goodsId']
export default {
    data(){
        return{
            myData:[],
            pjData:[]
        }
    },
    created(){
        this.getData('GoodList');
        this.getData('GoodListPJ');
    },
    methods:{
        getData(str){
            var _this = this;
            //接受传递过来的数据
            var goodsId=this.$route.params.goodsId;
            if(goodsId==undefined) goodsId=704174997;
            // console.log(goodsId);
            var api='';
            switch(str){
                case 'GoodList':
                     api=`${this.baseApi}/api/GoodList?goodId=${goodsId}`;
                break;
                case 'GoodListPJ':
                    api=`${this.baseApi}/api/GoodListPJ?goodId=${goodsId}&page=1`;
                break;
                default:
                    throw new error(`LarrySun_:the api : "${str}" is not find`);
                break;
            };
            this.$http.get(api)
            .then(function(response){
                switch(str){
                case 'GoodList':
                    _this.myData=response.data;
                    // console.log( _this.myData);
                break;
                case 'GoodListPJ':
                    _this.pjData= response.data;   
                    // console.log( _this.pjData);
                break;
                default:
                    throw new error(`LarrySun_:the api : "${str}" is not find`);
                break;
            };
            })
            .catch(function(error){
                console.log(error);
            })

        },
        navBarClick(index){
            // console.log(index);
            switch (index){
                case 0:
                    this.$router.push({name:'home',params:{index:index}})
                break;
                case 1:
                    console.log('1')
                break;
                case 2:
                    console.log('2')
                break;
                case 3:
                    console.log('3')
                break;
                case 4:
                    console.log('4')
                break;
                deflate:
                    alert('选择有误')
                break;
            }
        }
    }
}
</script>


<style scoped lang='scss'>
    #GoodLists{
        background: #fff;
        position:absolute;
        z-index: 4;
        height: 590px;
        overflow: scroll;
        #Imgs{
            width: 100%;
            height: 200px;
            margin-top: 20px;
            img{
                width: 100%;
                height: 200px;
            }
        }
        #GoodListsTitle{
            width: 100%;
            height: 100px;
            .price{
                color:red;
                height: 40px;
                line-height: 40px;
                margin-left: 5%;
                font-size: 20px;
                .marPrice{
                    color: black;
                    font-size: 12px;
                }
                .sales{
                    margin-left: 50%;
                    font-size: 12px;
                    color:black;
                }
            }
            .name{
                width: 95%;
                margin: 0 auto;
                font-weight: 700;
                height: 60px;
                line-height: 20px;
            }
        }
        #GoodListsCenter{
            width: 95%;
            margin: 0 auto;
            height: 80;
            background: rgb(245, 221, 225);
            span{
                display: inline-block;
                height: 40px;
                line-height: 40px;
                font-size: 12px;
            }
            p{
                width: 100%;
                height: 40px;
                margin-left: 10px;
                .sp1{
                    // width: 17%;
                    font-size: 18px;
                    color: red;
                }
                .sp2{
                    // width: 80%;
                    margin-left: 20px;
                }
                .sp3{
                    width: 30%
                }
                .sp4{
                    width: 30%
                }
                .sp5{
                    width: 30%
                }
            }
        }
        #GoodListsPJ{
            width: 95%;
            margin:  0 auto;
            min-height: 200px;
            .title{
                width: 100%;
                height: 30px;
                line-height: 30px;
                .lookAll{
                    margin-left: 45%;
                }
            }
            .top{
                width: 100%;
                height: 30px;
                span{
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                    font-size: 12px;
                }
                .name{
                    width: 70%;
                    // margin-top: 10px;
                    // margin-bottom: 10px;
                }
            }
            .PJ{
                font-size: 15px;
                width: 100%;
                margin-bottom: 20px;
            }

        }




        #ListImg{
            width: 100%;
            height: auto;
            img{
                width: 100%;
                height: auto;
            }
        }
        #addCar{
            width: 100%;
            height: 50px;
            position: fixed;
            left: 0;
            bottom: 0;
            background: #Fff; 
            span{
                display: inline-block;
                height: 50px;
                line-height: 50px;
            }
            .sy{
                width: 15%;
                text-align: center;
                font-size: 12px;
            }
            .du{
                width: 25%;
                text-align: center;
            
            }
            .pd{
                width: 25%;
                text-align: center;
            }          
        }
    }
</style>
