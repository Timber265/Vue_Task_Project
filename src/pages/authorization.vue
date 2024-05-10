<template>
  <form @submit.prevent="signInUser(userInfo)" class="bg-blue-500 absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 border-4 border-blue-900 p-40 rounded-[10px]">
    <div class="flex flex-col gap-8">
      <h1 class="text-center text-[25px] text-white">Войти</h1>
      <input type="text" placeholder="mail" class="border-2 border-green-400 py-2 px-4" v-model="userInfo.email">
      <input type="text" placeholder="password" class="border-2 border-green-400 py-2 px-4" v-model="userInfo.password">
      <button class="border-2 border-yellow-400 bg-blue-200 py-2 px-4 shadow-xl">Submit</button>
    </div>
  </form>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "authorization",
  data() {
    return {
      userInfo: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
   ...mapActions(['signInUser']),
  }
}
</script>

<style scoped>

</style>