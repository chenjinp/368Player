//创建用户相关的小仓库
import {defineStore} from 'pinia'
//引入接口
import { reqLogin,reqUserInfo,reqLogout } from '@/api/user';
import type { loginFormData,loginResponseData,userInfoReponseData } from "@/api/user/type";

//引入数据类型

import type { UserState } from './types/type';
//引入本地存储的方法
import { SET_TOKEN,GET_TOKEN,REMOVE_TOKEN } from '@/utils/token';
//引入路由(常量路由)
import { constantRoute } from '@/router/routes';

//创建用户小仓库
let useUserStore = defineStore('User',{
    //小仓库存储数据的地方
    state:():UserState => {
        return {
            token:GET_TOKEN(),//用户唯一标识
            menuRoutes:constantRoute,//仓库存储生成菜单需要的数组
            username:'',
            avatar:'',
        }
    },
    //异步|逻辑的地方
    actions:{
        //用户登录的方法
        async userLogin(data:loginFormData){
            //登录请求
            let result:loginResponseData = await reqLogin(data)
            //登录请求：成功200 ---》token
             //登录请求：失败201 ---》登录失败错误的信息
            if(result.code === 200){
                //pinia仓库存储一下token
                //由于pinia | vuex 存储数据其实利用js对象，不会持久化保存
                this.token = (result.data as string);
                //本地存储持久化存储一份
                SET_TOKEN(result.data as string)
                
                
                //能保证当前async函数返回一个成功的promise
                return 'ok';
            } else {
                return 'ok';
                //return Promise.reject(new Error(result.data))
            }   
        },
        //获取用户信息方法
        async userInfo(){
            //获取用户信息进行存储仓库当中(用户头像、名字)
            let result:userInfoReponseData = await reqUserInfo()
            //如果获取用户信息成功，存储一下用户信息
            if(result.code==200){
                this.username = result.data.name;
                this.avatar = result.data.avatar;
                return 'ok';
            }else {
                return Promise.reject(new Error(result.data as any))
            }
            
        },
        //退出登录
        async userLogout(){
            let result:any = await reqLogout();
            if(result.code == 200) {
                this.token = '';
                this.username = '';
                this.avatar = '';
                REMOVE_TOKEN();
                return 'ok';
            }else {
                return  Promise.reject(new Error(result.message))
            }
            
        }
    },
    getters:{

    }
})

//对外暴露获取小仓库方法
export default useUserStore;