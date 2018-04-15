<template>
    <div id="HomeOtherView">
        <ul id='otherViewTop'>
            <li v-for="(item,index) in paseData">
                <img :src="item.image_url" alt="未显示">
                <span>{{item.opt_name}}</span>
            </li>
        </ul>
    </div>
</template>


<script>
export default {
    props:['paseData','paseIndex'],

   data(){
       return{
           myData:[]
       }
   }

  
}
</script>

<style scoped lang='scss'>
    #HomeOtherView{
        margin-top: 65px;
        #otherViewTop{
            width: 100%;
            height: 200px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            li{
                width: 20%;
                text-align: center;
                img{
                    width: 100%;
                    height: 90px;
                }
                span{
                    display: inline-block;
                    width: 100%;
                    margin-top: 5px;
                    margin-bottom: 20px;
                }
            }
        }

    }

</style>


