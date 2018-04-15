<template>
  <div id="HomeCenter">
      <ul>
          <li v-for="(item,index) in myData" @click="selectIndex(index)">
               {{item.title}} 
          </li>
      </ul>



  </div>
</template>

<script>
    export default{
        data(){
            return{
                myData:[
                    {title:'限时秒杀'},
                    {title:'品牌折扣'},
                    {title:'天天领现金'},
                    {title:'民品折扣'},
                    {title:'天天领现金'},
                    {title:'助力享单'},
                    {title:'手机充值'},
                    {title:'转盘领现金'},
                    {title:'爱逛街'},
                    {title:'9块9特卖'},
                    {title:'现金签到'},
                    {title:'食品超市'},
                    {title:'新人转享'},
                    {title:'时尚穿搭'},
                    {title:'海涛'},
                ]
            }
        },
        created(){

        },
        methods:{
            selectIndex(index){
                console.log(index);
            }
        }
    }
</script>

<style scoped >
    #HomeCenter{
        width: 100%;
        height: 140px;
    }
     #HomeCenter ul{
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap:wrap;
            overflow: scroll;
            margin-top:10px; 
        }
        #HomeCenter ul li{
                width: 11%;
                height: 50px;
                border-radius: 50%;
                margin: 2% 0 0 9%;
                font-size: 10px;
                text-align: center;
        
                line-height: 50px;
                background:linear-gradient(#ddb3c1,rgb(231, 157, 200),rgb(248, 60, 91))
        }


        
</style>

