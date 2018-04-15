<template>
    <div id="NavBar">
        <ul>
            <li v-for="(item,index) in myData" @click="selectIndex(index)">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="item.icon"></use>
                </svg>
                    {{item.title}}
            </li>
        </ul>
    </div>
</template>

<script>
    import ic1 from './../../res/js/icon/iconfont.js'
    export default{
        data(){
            return{
                myData:[
                    {title:'首页',path:'/home',name:'home',icon:'#icon-shouye'},
                    {title:'新品',path:'/new',name:'new',icon:'#icon-xinpin'},
                    {title:'搜索',path:'search',name:'search',icon:'#icon-sousuo'},
                    {title:'聊天',path:'chat',name:'chat',icon:'#icon-liaotian'},
                    {title:'个人中心',path:'person',name:'person',icon:'#icon-gerenzhongxin'}
                ]
            }
        },
        methods:{
            selectIndex(index){
                this.$router.push({name:this.myData[index].name,params:{index:index}})
            }
        }

    }
</script>

<style scoped>

    .icon {
        width: 1em; height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        font-size: 20px;
        /* height: 50px; */
    }
    #NavBar{
        width: 100%;
        height: 50px;
        position: fixed;
        bottom: 0px;
        border-top:1px solid rgb(230, 224, 224);
    }
    #NavBar ul{
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    #NavBar ul li{
        width: 20%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background: #ffffff;
    }
</style>

