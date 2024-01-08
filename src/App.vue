<script setup lang="ts">
import {ref} from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Notification from './components/Notification.vue'
import Axios from './components/Axios.vue'
import { userlogin } from './api/LoginService'


const data = ref({
  type:'',
  message: ''
})

const success = () => {
  data.value = {
    type: 'success',
    message:'成功了'
  }
 }
const info = () => {
  data.value = {
    type: 'info',
    message:'确定删除吗？'
  }
 }
const error = () => {
  data.value = {
    type: 'error',
    message:'操作异常'
  }
 }
const close = () => {
  data.value = {
    type: '',
    message:''
  }
}


const login = () => {
  userlogin({
    ptCode: 'CP004',
    username: 'admin',
    password: 'Aa@123456',
  }).then(res => {
    console.log('登录：',res)
  })
}
</script>

<template>
  <header>
    <Axios></Axios>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <button @click="login">登录接口</button>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <button @click="success">success</button>
      <button @click="info">info</button>
      <button @click="error">error</button>
      <button @click="close">close</button>
   
      <Notification msg="You did it!" :type="data.type" :message="data.message" @clear-notification="close"/>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
