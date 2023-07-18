<script setup>
import { provide, reactive } from "vue";
import { ref } from "vue";
import { computed, watch } from "vue";
// 引入v3生命周期
import { onMounted } from "vue";
import SON from "./components/son.vue";
// 导入pinia
import { useCounterStore } from "@/stores/counter.js";
import { storeToRefs } from "pinia";
// reactive是引用类型
const state = reactive({
  count: 0,
});
// ref 是简单类型的响应数据
const addCount = () => {
  state.count++;
};
const counts = ref(0);
const addCount1 = () => {
  counts.value++;
};

// 计算属性
const list = ref([1, 2, 3, 4, 5]);
const jisuan = computed(() => {
  return list.value.filter((item) => item > 2);
});

// 如果要监听reactive里面的属性拿就要把第一个参数写成一个函数
watch(
  () => state.count,
  (newVal, oldVal) => {
    console.log(newVal, oldVal);
  }
);

const info = ref({
  name: "zs",
  age: 18,
});
// 单独监听某一个属性，写两个回调
watch(
  () => info.value.name,
  () => console.log("name change")
);

const addCount2 = () => {
  info.value.name = "ls";
};

// 生命周期
// 可以传入多个一样的生命周期,用于如果写别人项目在onMounted1大量逻辑不好动那就可以在onMounted2写
onMounted(() => {
  console.log("onMounted1");
});
onMounted(() => {
  console.log("onMounted2");
});
onMounted(() => {
  console.log("onMounted3");
});

// 子传父
const GetMsg = () => {
  console.log("我是子组件传过来的");
};

// 模板引用
const h1Ref = ref(null);
const sonRef = ref(null);
// 组件挂载完成后才能获取
onMounted(() => {
  console.log(h1Ref.value);
  console.log(sonRef.value);
});

// 跨层传递普通数据
// 顶层组件通过PROVIDE提供数据，底层组件通过INJECT注入数据（小写）
const binddata = ref(0);
provide("name", "张三");
// 传响应式数据
provide("bindname", binddata);
// 底层组件想要修改顶层的数据，可以把顶层组件的方法也传进去，再由底层组件调用
const addbinddata = () => {
  binddata.value++;
};
provide("setbinddata", addbinddata);

// 获取pinia的数据
const counterStore = useCounterStore();
console.log(counterStore.count);
onMounted(() => {
  counterStore.getlist();
});

// 这样写会丢失响应式
// const { count, doubleCount } = counterStore;
// 这样写才能保留响应式
const { count, doubleCount } = storeToRefs(counterStore);
</script> 

<template>
  <div>
    {{ state.count }}
    {{ counts }}
    {{ jisuan }}
    {{ info.name }}
    <button @click="addCount">log</button>
    <button @click="addCount1">log</button>
    <button @click="addCount2">修改张三</button>
    <h1 ref="h1Ref">我是DOM标签h1</h1>
    <SON Massage="我是父组件传进来的哦" @send="GetMsg" ref="sonRef"></SON>
    <button @click="addbinddata">bindname++</button>
    <h2>{{ counterStore.count }}</h2>
    <h2>{{ counterStore.doubleCount }}</h2>
    <button @click="counterStore.increment">增加pinia的数据</button>

    <ul>
      <li v-for="item in counterStore.list" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>
