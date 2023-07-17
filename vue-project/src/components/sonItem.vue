<script setup>
import { inject } from "vue";

// 接收顶层的数据
const data = inject("name");
const bindnamedata = inject("bindname");
const setbinddata = inject("setbinddata");
</script>


<template>
  <div>
    底层组件
    <div>来自顶层组件的数据为:{{ data }}</div>
    <div>来自顶层组件的响应式数据为:{{bindnamedata}}</div>
    <button @click="setbinddata">修改顶层的组件的数据</button>
  </div>
</template>



<style>
</style>