import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home/Home';
import New from '@/components/New/New';
import Search from '@/components/Search/Search';
import Chat from '@/components/Chat/Chat';
import Person from '@/components/Person/Person';


import LoginMethodView from '@/components/public/Login/LoginMethodView';
import LoginHome from '@/components/public/Login/LoginHome';
import LoginWithId from '@/components/public/Login/LoginWithId';




import EnrollById from '@/components/public/enroll/EnrollById';


import GoodList from '@/components/public/GoodLists';





Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'home',component: Home},
    {path: '/home',name: 'home',component: Home},
    {
        path: '/loginhome',name: 'loginhome',component: LoginHome,
        children:[
            {path:'',component:LoginMethodView},
            {path:'loginMethodView',name:"loginMethodView",component:LoginMethodView},
            {
                path:'loginWithId',name:'loginWithId',component:LoginWithId,
            },
            
        ]  
    },
    { path:'/EnrollById',name:'EnrollById',component:EnrollById,},

    {path: '/new',name: 'new',component: New},
    {path: '/chat',name: 'chat',component: Chat},
    {path: '/search',name: 'search',component: Search},
    {
      path: '/person',name: 'person',component: Person,
      /*
      设置路由守卫,判断用户是否已登录
      */
      beforeEnter: (to, from, next) =>{
        //如果进入的是登录页面,代表你已经退出.重新进入登录页面则需要将之前的信息删除掉
        if(to.path=="/loginhome"){
            sessionStorage.removeItem("user");
        }
        //如果不是登录页面,则获取用户登录信息
        var user = sessionStorage.getItem("user");
        if(!user && to.path!="/loginhome"){
            next({path:'/loginhome',query:{goToPath:to.path}})
        }else{
            next();
        }
        }
  
    
    
    },
    {path: '/goodlist',name: 'goodlist',component: GoodList},


  ]
})
