<template>
    <div id='Home'>
        <!-- 顶部导航条 -->
         <div id="topNavBar">
            <ul>
                <li v-for="(item,index) in myData" @click="jumpView(index)">
                    {{item.opt_name}}
                </li>
            </ul>
        </div>

        <!-- 导航条跳转页面 -->

        <HomeList v-if='showHome'></HomeList>
        <HomeOtherView v-else :paseData='paseData' :paseIndex='paseIndex'></HomeOtherView>

    </div>
</template>


<script>
    import HomeList from '@/components/Home/HomeList';
    import HomeOtherView from '@/components/Home/HomeOtherView';

    export default{
        data(){
            return{
                myData:[],
                showHome:true,
                paseData:[],
                paseIndex:0
            }
        },
        components:{
            HomeList,
            HomeOtherView

        },
        created(){
            var _this = this;
            var aip=this.baseApi+'/api/home/topNavBar'
            this.$http.get(aip)
            .then(function(response){
                if(response.data){
                    _this.myData=response.data;
                    _this.myData.unshift({opt_name:'首页'});
                }
            })
            .catch(function(error){
                console.log(error);
            })
        },
        methods:{
            onScroll(){     
                var scollHeight=this.getScrollY();
                console.log(scollHeight);
                if(scollHeight>=4403 && scollHeight<6762){
                    this.nowPage=2;
                }else if(scollHeight>=6762 && scollHeight<10207){
                    this.nowPage=3;
                }else if(scollHeight>=10207 && scollHeight<13652){
                    this.nowPage=4;
                }else if(scollHeight>=13652 && scollHeight<17097){
                    this.nowPage=5;
                }else if(scollHeight>=17097 && scollHeight<20542){
                    this.nowPage=6;
                }else if(scollHeight>=20542 && scollHeight<21576){
                    this.nowPage=7;
                }else if(scollHeight>=21576 && scollHeight<215762){
                    this.nowPage=8;
                }
                
            }, 
            //获取滚动高度
			getScrollY(){
                var box=document.getElementById('center');
				return box.pageYOffset || box.scrollTop;
            },
            jumpView(index){
                if(index==0){
                    this.showHome=true;
                }else{
                    this.paseData=this.myData[index].children,
                    this.paseIndex=index;
                    this.showHome=false;
                }
                   
            }

        },
        watch:{
            nowPage(){
                console.log('ddd');
            }
        }
        

    }
</script>


<style scoped lang='scss'>
   #Home{
        width: 90%;
        text-align: center;
        margin: 0 auto;
        #topNavBar{
            width: 100%;
            height: 50px;
            overflow-x: scroll;
            top: 0px;
            ul{
                width: 200%;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
            
                li{
                    width: 20%;
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    background: #ffffff;    
                }
            }
        }    
    }
</style>


