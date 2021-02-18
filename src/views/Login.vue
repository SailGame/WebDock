<template>
  <div class="login">
    <el-row>
      <el-col :span="8"/>
      <el-col :span="8">
        <el-input v-model="userName" placeholder="用户名"></el-input>
        <el-input v-model="password" placeholder="密码"></el-input>
        <el-button @click="login" >登录</el-button>
      </el-col>
      <el-col :span="8"/>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

@Options({
  components: {
    HelloWorld
  },
  data: function () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', { userName: this.userName, password: this.password })
      this.$store.dispatch('listen')
      this.$router.push({ name: 'Home' })
    }
  }
})
export default class Login extends Vue {}
</script>

<style lang="less">
  .login .el-input {
    margin-bottom: 20px;
  }

</style>
