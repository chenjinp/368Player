<template>
    <div class="logo" v-if="setting.logoHidden">
        <p>{{ setting.title }}</p>
    </div>
</template>

<script setup lang="ts">
//引入设置标题与logo的配置文件
import setting from '@/setting';
</script>
<script lang="ts">

    export default {
        name: 'Logo'
    }
</script>
<style scoped lang="scss">
.logo{
    width: 100%;
    height: $base-menu-logo-height;
    color: white;
    display: flex;
    align-items: center;
    padding: 10px;
    p{
        font-size: $base-logo-title-fontSize;
    }
}
</style>