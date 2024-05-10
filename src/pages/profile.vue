<template>
  <div class="container flex justify-center">
    <div class="border-amber-400 max-w-full">
      <div class="border-amber-400 border-2 p-[20px] rounded-2xl min-w-[500px]">
        <div class="border-2 border-amber-600 w-[80px] h-[80px] rounded-[50%]"><img
            class="w-full h-full object-cover rounded-[50%]" :src="'https://test.ai-softdev.com/'+getUserData.avatar"
            alt=""></div>
        <div class="flex flex-col gap-2 my-10">
          <h2>Name: {{ getUserData.role?.name }}</h2>
          <p>Email: {{ getUserData?.email }}</p>
          <p>ID: {{ getUserData.role?.id }}</p>
        </div>
        <div class="mb-5">
          <input type="file" @change="handleAvatarChange">
        </div>
        <div class="mb-2">
          <button @click="!modalChange ? modalChange=true : modalChange=false" class="py-2 px-4 border-2">Change
            password
          </button>
        </div>
        <button class="border-amber-600 w-full h-10 border-2" @click="saveProfile">Save</button>
      </div>
    </div>
  </div>

  <div v-if="modalChange" class="absolute -translate-y-1/2 -translate-x-1/2 left-[50%] top-[50%] flex flex-col border-2">
    <input class="border-b border-red-400 py-2 px-4" placeholder="Изменить пароль" v-model="new_password">
    <button @click="changePassword(new_password); modalChange=false; new_password=''">Изменить</button>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "profile",
  data() {
    return {
      avatar: '',
      modalChange: false,
      new_password : '',
    }
  },
  methods: {
    ...mapActions(['validateUserByLogin', 'loadProfile', 'changePassword']),

    saveProfile() {
      const formData = new FormData()
      formData.append('avatar', this.avatar)
      this.loadProfile(formData)
    },
    handleAvatarChange(event) {
      this.avatar = event.target.files[0];
    },
  },
  computed: {
    ...mapGetters(['getUserData'])
  },
  created() {
    this.validateUserByLogin()
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}
</style>