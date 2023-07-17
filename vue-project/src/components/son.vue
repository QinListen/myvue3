<script setup>
import { ref } from "vue";
import sonItem from "./sonItem.vue";

const props = defineProps({
  Massage: String,
});
// 注意子传第一个字符别大写不然会有警告
const emit = defineEmits(["send"]);
const sendMsg = () => {
  emit("send", "这是我传给父组件的呀");
};


const name = ref("张三");

// vue3默认会把组件内部封闭起来,想要访问需要用defineExpose函数导出 
defineExpose({
    name,
    sendMsg,
})
</script>
<template>
  <div>
    俺是子组件
    {{ Massage }}
    <button @click="sendMsg">senMsg</button>
    <sonItem></sonItem>
  </div>
</template>



<style>
</style>