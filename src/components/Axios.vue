<script setup lang="ts">
import { ref } from 'vue'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { userlogin } from '../api/LoginService'


const name = ref('李四')
const mock = new MockAdapter(axios)
const resulst = { name: '张三', age: 18 }

mock.onGet('/user').reply(200, resulst)
const handleRequestChange = () => {
  // 模拟接口
  axios.get('/user').then(res => {
    name.value = res.data.name
  })
  // // 真接口
  // userlogin({
  //   ptCode: 'CP004',
  //   username: 'admin',
  //   password: 'Aa@123456',
  // }).then(res => {
  //   console.log('真接口：',res)
  // })
}
</script>

<template>
  <span>{{ name }}</span>
  <button @click="handleRequestChange">get</button>
</template>