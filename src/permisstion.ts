import router from '@/router';
import setting from './setting';
import nprogress from 'nprogress';
import "nprogress/nprogress.css";

//获取用户相关的小仓库内部token数据，去判断用户是否登录成功
import useUserStore from './store/modules/user';
import pinia from './store';


let userStore = useUserStore(pinia);





//全局守卫:项目当中任意路由切换都会触发的钩子

//全局前置守卫
router.beforeEach(async (to: any, _from: any, next: any) => {
    document.title = `${setting.title}-${to.meta.title}`
    
    //访问某一路由之前的守卫
    //to:你将要访问那个路由
    //from：你从哪个路由而来
    //next:路由的放行函数
    nprogress.start()
    //获取token，去判断用户登录、还是未登录
    let token = userStore.token;
    //获取用户名字
    let username = userStore.username;
    //用户登录判断
    if (token) {
        if (to.path == '/login') {
            //登录成功，如果再登录，会到首页
            next({ path: '/' })
            
        } else {
            if (username) {
                //放行
                next();
            } else {

                try {
                    //如果没有用户信息,在守卫这里发请求获取到用户信息再放行
                    await userStore.userInfo();
                    next()
                } catch (error) {
                    //token过期
                    //用户手动修改了本地token
                    //退出登录，用户相关的数据清空
                    await userStore.userLogout();
                    next({path:'/login',query:{redirect:to.path}})

                }

            }

        }

    } else {
        //用户未登录
        // if (to.path == '/login') {
        //     next();
        // } else {
        //     next({ path: '/login', query: { redirect: to.path } })
        // }
        next();
    }
    //next()
})

//全局后置守卫
router.afterEach(() => {
    // to and from are both route objects.
    nprogress.done();
})