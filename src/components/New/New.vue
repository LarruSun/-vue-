<template>
    <div id="New" @scroll.passive="onScroll">
        <div id="NewTop">
            <div>新品</div>
            <p>精选新品</p>
        </div>

        
        <ul id="NewList">
            <li v-for="(item,index) in myData" @click="selectIndex(item,index)"> 
                <img :src="item.thumb_url" alt="未显示 ">
                <div>
                    <p class="title">{{item.goods_name}}</p>
                    <p class="price">{{item.group.price/100}}</p>
                </div>
            </li>
            <div v-show="show" class="Lazzshow">{{showText}}</div>
        </ul>
    </div>
</template>



<script>
    export default{
        data(){
            return{
                indexs:'',
                myData:[],
                myNowPage:1,
                isDate:[false,true],//第零号元素用于是否到头
                show:false,
                showText:'.........................数据加载中..............................'
            }
        },

        created(){
            this.index = this.$route.params.indexs;//吧传递来的数取出来
            this.getDate();



        },
        methods:{
            getDate(){
                    var _this = this;
                    var api=`${this.baseApi}/api/New?page=${this.myNowPage}`
                    this.$http.get(api)               
                    .then(function(response){
                    if(response.data.goods_list.length==0){
                        _this.isDate[0]=true;
                        _this.showText='.........................我是有底线的..............................'
                        return false;
                    };
                    for(var i=0;i<response.data.goods_list.length;i++){
                        _this.myData.push(response.data.goods_list[i]);
                    };
                    return true;     
                    })
                    .catch(function(error){
                        console.log(error);
                    })
            },

            onScroll(){ 
                var bigBox=document.getElementById('New');
                var smallBox=document.getElementById('NewList');
        
                var scollHeight=bigBox.pageYOffset || bigBox.scrollTop;//获取滚动高度(大盒子)
                var smallBoxHeight=smallBox.offsetHeight;//获取大盒子的高度
                var bigBoxHeight=bigBox.offsetHeight;//获取小盒子的高度
                // console.log(smallBoxHeight-bigBoxHeight+103)
                // console.log(scollHeight);
                if(smallBoxHeight-bigBoxHeight+103==scollHeight){
                    this.myNowPage++;
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
    #New{
        width: 100%;
        height: 610PX;
        overflow: scroll;

        #NewTop{
            div{
                width: 100%;
                height: 50px;
                text-align: center;
                line-height: 50px;
                border-bottom: 1px solid grey;
            }
            p{
                width: 100%;
                height: 40px;
                text-align: center;
                line-height: 40px;
                color: red;
                font-weight: 700;
                margin-bottom: 10px;
            }
        }
        ul{
            // height: 515PX;
            // overflow: scroll;
            background: rgb(238, 233, 233);
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            li{
                width: 35%;
                margin-top: 20px;
                margin-left: 10%;
                img{
                    width: 100%;
                }
                div{
                    width: 100%;
                    .title{
                        width: 90%;
                        height: 30px;
                        font-size: 15px;
                        overflow: hidden;
                        margin-bottom:10px;
                        margin-top: 10px; 
                    }
                    .price{
                        color: red;
                        font-weight: 700;
                    }
                }

            }
            .Lazzshow{
                margin-top: 20px;
                width: 100%;
                height: 100px;
                text-align: center;
                margin-bottom: 40px;
                /* line-height: 5; */
                color: red;
            }
        }

    }
</style>
