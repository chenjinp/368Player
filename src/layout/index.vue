<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider" :class="{fold:LayOutSettingStore.fold?true:false}">
            <Logo></Logo>
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件 -->
                <el-menu :collapse="LayOutSettingStore.fold?true:false" :default-active="$route.path" background-color="#001529" text-color="#fff" >
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
            <div class="menu_bottom">
                    <div class="menu_about">友情链接</div>
                    <div class="menu_href">
                        <a href="https://tonzhon.com/" target="_blank">
                            网页音乐资源来自铜钟(点击打开)
                        </a>
                    </div>
                    
            </div>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar" :class="{fold:LayOutSettingStore.fold?true:false}">
            <!-- layout组件的顶部导航tabbar -->
            <Tabbar></Tabbar>
        </div>
        <!-- 内容展示区域 -->
        <div class="layout_main" :class="{fold:LayOutSettingStore.fold?true:false}">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
//获取路由对象
import { useRoute } from 'vue-router'
//引入左侧菜单logo子组件

import Logo from './logo/index.vue'
//引入菜单组件
import Menu from './menu/index.vue'
//引入内容展示区域
import Main from './main/index.vue'
//引入顶部tabbar组件
import Tabbar from './tabbar/index.vue'
//获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
import useLayOutSettingStore from '@/store/modules/setting'
let userStore = useUserStore()
let LayOutSettingStore = useLayOutSettingStore()
//获取路由对象
let $route = useRoute()
</script>
<script lang="ts">

    export default {
        name: 'Layout'
    }
</script>
<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    

    .layout_slider {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;
        color: rgb(167, 196, 224);
        transition: all 0.3s;
        .menu_bottom{
            margin-bottom: 20px;
            .menu_about{
                margin-bottom: 5px;
                color: #a3cef8;
                font-size: 16px;
                
            }
            .menu_href a{
                color: #a3cef8;
                font-size: 15px;
            }
            
        }
        .scrollbar{
            
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);
            .el-menu{
                border-right: none;
            }
        }
        &.fold{
            width: $base-menu-min-width;
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        top: 0;
        left: $base-menu-width;
        transition: all 0.3s;
        &.fold{
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        left: $base-menu-width;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;
        &.fold{
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }
}
</style>