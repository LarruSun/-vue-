<template>
  <div id="HomeList" @scroll.passive="onScroll">
        <div id="HomeListbody">
            <ScollAD :focusURL='focusURL'></ScollAD>
            <HomeCenter></HomeCenter>
                
            <ul>
                <li v-for="(item,index) in myData" @click="selectIndex(item,index)">
                        <img :src="item.image_url" alt="">
                        <p>{{item.goods_name}}</p>
                        <div>
                            <span class="price">{{item.group.price/100}}</span>
                            <span class="haveP">已拼{{item.cnt}}件</span>
                            <span class="goToPingDan"> 去拼单> </span>
                        </div>
                </li>
                <div v-show="show" class="Lazzshow">{{showText}}</div>
            </ul>
        </div>


  </div>
</template>

<script>
    import ScollAD from '@/components/public/scollAd';
    import HomeCenter from '@/components/Home/HomeCenter';
    import HomeList from '@/components/Home/HomeList';


    export default{
        data(){
            return{
                myData:[],
                focusURL:this.baseApi +"/api/home/scrollAD",
                myNowPage:1,
                isDate:[false,true],//第零号元素用于是否到头
                show:false,
                showText:'.........................数据加载中..............................'
            }
        },
        created(){
            this.getDate();
        },
        // mounted(){
        //     window.addEventListener('scroll', this.onScroll)
        // },
        methods:{
            getDate(){
                var _this = this;
                var api=`${this.baseApi}/api/home/home?page=${this.myNowPage}`
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
            selectIndex(item,index){
                console.log(item.goods_id);
                console.log(index);
                this.$router.push({name:'goodlist',params:{goodsId:item.goods_id}})
            },
            onScroll(){     
                var bigBox=document.getElementById('HomeList');
                var smallBox=document.getElementById('HomeListbody');
       
                var scollHeight=bigBox.pageYOffset || bigBox.scrollTop;//获取滚动高度(大盒子)
                var smallBoxHeight=smallBox.offsetHeight;//获取大盒子的高度
                var bigBoxHeight=bigBox.offsetHeight;//获取小盒子的高度
                console.log(smallBoxHeight-bigBoxHeight+80)
                console.log(scollHeight);
                if(smallBoxHeight-bigBoxHeight+80-scollHeight>-5 && smallBoxHeight-bigBoxHeight+80-scollHeight<5){
                    this.myNowPage++;
                    console.log(this.myNowPage)
                }
                
            }, 



        },
        watch:{
            myNowPage(newValue,oldValue){
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
        },
        components:{
            ScollAD,
            HomeCenter,
        },
    }
</script>

<style scoped >
   #HomeList{
       width: 100%;
        height: 620px;
        overflow: scroll;

   }
    #HomeList ul{
        width: 100%;
        margin-top: 20%;
    }
    #HomeList ul .Lazzshow{
        margin-top: 20px;
        width: 100%;
        height: 100px;
        text-align: center;
        margin-bottom: 40px;
        /* line-height: 5; */
        color: red;
    }
    #HomeList ul li{
        margin-bottom: 30px;
        width: 100%;
        height: 315px;
        border-bottom:2px solid rgb(223, 213, 213) 
    }
    #HomeList ul li img{
        width: 80%;
        height: 190px;
    }
    #HomeList ul li p{
        width: 100%;
        height: 40px;
        text-align: left;
        line-height: 20px;
        font-size: 15px;
        margin-top: 20px;
        margin-bottom: 20px;
        overflow: hidden;
    }
     #HomeList ul li div{
         width: 100%;
         height: 30px;
         line-height: 30px;
    }
    #HomeList ul li div span{
        display: inline-block;
    }
    #HomeList ul li div .price{
         min-width:5%;
         color: red;
         font-weight: 700; 
     }
    #HomeList ul li div .haveP{
         min-width:5%;
         color: gray;
         font-size: 5px;
     }
     #HomeList ul li div .goToPingDan{
         margin-left: 50%;
         width: 15%;
         text-align: center;
         border-radius: 2px;
         height: 100%;
         color: #ffffff;
         background: red;
     }
        
</style>

