// 导入pinia的defineStore方法
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";
const API_URL = 'http://geek.itheima.net/v1_0/channels'
export const useCounterStore = defineStore('conuter',()=>{
    // 定义数据
    const count = ref(0)
    // 定义修改数据的方法
    const increment = ()=>{
        count.value++
    }

    // 计算属性写法差不多getters
    const doubleCount = computed(()=>{
        return count.value * 2
    })

    // 异步调用
    const list = ref([])
    const getlist = async ()=>{
        const res = await axios.get(API_URL)
        console.log(res);
        list.value = res.data.data.channels
    }
    // 以对象的方式返回供外部使用
    return {count,increment,doubleCount,list,getlist}
})