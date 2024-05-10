<script>
import {mapActions} from "vuex";

export default {
  name: "vTask",
  props: {
    task: Object,
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    ...mapActions(['deletePost', 'donePost', 'loadPosts']),
    doneTask(id) {
      this.donePost(id)
    }
  }
}
</script>
<template>
  <div class="container">
    <div :class="{'bg-lime-500':task.done}"
         class="border-2 rounded-[20px] py-2 px-4 flex items-center justify-between shadow-xl">
      <div class="flex flex-col">
        <h1>Title: {{ task.title }}</h1>
        <p>Description: {{ task.description }}</p>
      </div>
      <div class="flex flex-col gap-1">
        <button v-if="!task.done"
                class="hover:bg-green-500 duration-100  border-amber-600 rounded-t-[15px] bg-green-700 text-white font-bold uppercase border-2 py-2 px-7"
                @click="doneTask(task.id)">completed
        </button>
        <button @click="$emit('openModal', task)"
                class="hover:bg-yellow-300 duration-100  border-amber-600 rounded-[5px] bg-yellow-400 text-white font-bold border-2 uppercase py-2 px-7">Update
        </button>
        <button class="hover:bg-red-700 ease-in duration-100  border-amber-600 bg-red-600 rounded-b-[15px] text-white font-bold border-2 uppercase py-2 px-7"
                @click="deletePost(task.id)">Delete
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}
</style>