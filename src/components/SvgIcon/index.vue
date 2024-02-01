<template>
    <!-- svg：图标外层容器，内部需要与use标签结合使用 -->
    <svg :style="{width,height}">
     <!-- 
       xlink：href执行用哪一个图标
       属性值无比

       use标签的fill属性设置颜色

       style可以设置宽高
      -->
     <use :xlink:href="prefix+'phone'" :fill="color"></use>
   </svg>
</template>

<script setup lang="ts">
defineProps({
   prefix:{
       type:String,
       default:'#icon-'
   },
   name:String,
   color:{
    type:String,
    default:''
   },
   width:{
    type:String,
    default:'16px'
   },
   height:{
    type:String,
    default:'16px'
   }
})
</script>

<style scoped>

</style>