<template>
  <header class="h-[80px] bg-gray-600">
    <div class="container">
      <div class="h-full flex items-center justify-between ">
        <div class="text-white font-medium text-[30px]">Logo</div>
        <ul class="flex gap-5 items-center">
          <li class="text-white font-medium text-[20px]">
            <router-link :to="{name: 'main_page'}">Main</router-link>
          </li>
          <li class="text-white font-medium text-[20px]">
            <router-link :to="{name: 'profile_page'}">Profile</router-link>
          </li>
          <li>
            <input type="date">
          </li>
          <li v-if="!check" class="text-white font-medium text-[20px] uppercase border-2 py-2 px-4">
            <router-link :to="{name: 'registration_page'}">Sign UP</router-link>
          </li>
          <li v-if="!check" class="text-white font-medium text-[20px] uppercase border-2 py-2 px-4 bg-green-400">
            <router-link :to="{name: 'authorization_page'}">Sign IN</router-link>
          </li>
          <li v-else class="text-white font-medium text-[20px] uppercase border-2 py-2 px-4 bg-green-400">
            <router-link :to="{name: 'authorization_page'}" @click="logoutUser">Logout</router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "vHeader",
  computed:{
    ...mapGetters(['getUserData']),

    check(){
      return this.getUserData?.id
    }
  },
  methods: {
    ...mapActions(['logoutUser']),
  },
}
</script>

<style scoped>
.container {
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}
</style>