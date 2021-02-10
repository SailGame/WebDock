<template>
  <div class="about">
    <el-input v-model="userName" placeholder="用户名"></el-input>
    <el-input v-model="password" placeholder="密码"></el-input>
    <el-button @click="login" >登录</el-button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

@Options({
  components: {
    HelloWorld
  }
})
export default class Login extends Vue {}
</script>
