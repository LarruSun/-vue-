<template>
    <div id="SearchHome">
        <div id="SearchHomeTop">
            <div>搜索</div>
            <p><input type="search"></p>
        </div>


        <div id="SearchHomeBody">
                <ul id="left">
                    <li v-for="(item,index) in myData" @click="chooseShow(index)">
                        {{item.opt_name}}
                    </li>
                </ul>
                <ul id="right">
                   <p class="title">{{title}}</p>
                    <li v-for="(item,index) in myDataChildren">
                            <img :src="item.image_url" alt="未显示">
                            <p>{{item.opt_name}}</p>
                    </li>
                </ul>
        </div>
    </div>
</template>



<script>
    export default{
        data(){
            return{
                title:'服装',
                myData:[],
                myDataChildren:[]

         
            }
        },

        created(){
            this.getDate();
        },
         methods:{
            getDate(){
                var _this = this;
                var api=`${this.baseApi}/api/Search`
                this.$http.get(api)               
                .then(function(response){
                    _this.myData=response.data;
                   _this.myDataChildren=_this.myData[0].children;
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            chooseShow(index){
                this.title=this.myData[index].opt_name
                this.myDataChildren=this.myData[index].children;                
            }


        }
    }
</script>

<style scoped lang='scss'>
    #SearchHome{
        width: 100%;
        #SearchHomeTop{
            width: 100%;
            div{
                width: 100%;
                height: 50px;
                line-height: 50px;
                text-align: center;

            }
            p{
                width: 100%;
                text-align: center;
                background: gray;
                height: 30px;
                line-height: 25px;
                input{
                    width:90%;
                    height: 28px;
                }
            }
        }
        #SearchHomeBody{
            width: 100%;
            margin-top: 20px;
            display: flex;
            flex-direction: row;
            #left{
                height: 420px;
                overflow: scroll;
                width: 10%;

                li{
                    background: rgb(238, 233, 233);
                    width: 100%;
                    text-align: center;
                    margin-top: 10px;
                    height: 30px;
                    line-height: 30px;

                }
            }
            #right{
                height: 420px;
                overflow: scroll;
                width: 85%;
                margin-left: 5%;
                p{
                    height: 30px;
                    width: 100%;
                    line-height: 30px;
                    text-align: center;
                }
                 .title{
                    text-align: left ;
                    font-weight: 700;
                }
                li{
                    float: left;
                    width: 30%;
                }
                
            }
        }
    }
</style>
