<template>
  <button @click="statusModalForAddTask=true"
          class="rounded-b-[50px] text-black-400 font-bold border-2 p-2 bg-amber-400 w-full">Add Task
  </button>

  <div class="fixed left-[50%] top-[50%] -translate-y-1/2 -translate-x-1/2" v-if="statusModal">
    <div class="border-4 w-[700px] h-[500px] border-blue-600 bg-red-600">
      <p @click="statusModal = false; this.newTaskData.title=''; this.newTaskData.description=''"
         class="absolute right-4 text-2xl border-amber-400 border-2 py-2 px-4 cursor-pointer rounded-[30%]">X</p>
      <h1 class="text-center font-bold text-3xl text-white mt-10">Update Task</h1>
      <div class="flex flex-col mt-20 px-7 gap-5">
        <input class="py-2 px-4 h-[50px]" type="text" placeholder="title" v-model="newTaskData.title">
        <input class="py-2 px-4 h-[50px]" type="text" placeholder="description" v-model="newTaskData.description">
        <button @click="updateTask({data: {id: taskId, taskData: newTaskData}})"
                class="py-2 px-4 h-[50px] bg-green-700 text-white font-black text-2xl">Change
        </button>
      </div>
    </div>
  </div>

  <div v-if="statusModalForAddTask" class="fixed left-[50%] top-[50%] -translate-x-2/4 -translate-y-2/4 w-[50%]">
    <div class="w-full border-[5px] border-yellow-300 shadow-xl rounded-[50px]	flex flex-col justify-between">
      <div
          class="absolute right-6 top-3 border-2 border-red-400 flex justify-center items-center w-[40px] h-[40px] rounded-[50%] cursor-pointer">
        X
      </div>
      <div class="bg-green-400 rounded-t-[50px] h-[50px] flex flex-col justify-center">
        <h1 class="text-center font-bold text-white text-[20px]">Form add Task</h1>
      </div>
      <div class="flex flex-col ">
        <input class="inline-flex border-2 border-amber-600 p-2 rounded-[5px]" placeholder="title"
               v-model="taskData.title">
        <input class="inline-flex border-2 border-amber-600 p-2 rounded-[5px]" placeholder="description"
               v-model="taskData.description">
      </div>
      <div>
        <button class="rounded-b-[50px] text-black-400 font-bold border-2 p-2 bg-amber-400 w-full" @click="sendPost">
          Добавить пост
        </button>
      </div>
    </div>
  </div>


  <div class="w-full">
    <h1 class="text-center font-bold text-[30px]">Task Lists</h1>
    <div>
      <v-task-list>
        <v-task v-for="task in getTaskList.data?.data" :task="task" @openModal="openModal"/>
      </v-task-list>
    </div>
  </div>

  <vue-awesome-paginate
      :total-items="getTaskList?.data?.count"
      :items-per-page="5"
      :max-pages-shown="5"
      v-model="params.page"
      :on-click="onClickHandler"
  />
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import VTaskList from "../components/vTaskList.vue";
import VTask from "../components/vTask.vue";


export default {
  name: "index",
  components: {VTask, VTaskList},

  data() {
    return {
      taskData: {
        title: '',
        description: '',
      },
      newTaskData: {
        title: '',
        description: '',
      },
      params: {
        page: 1,
        limit: 5,
      },
      statusModalForAddTask: false,

      taskId: null,
      statusModal: false
    }
  },
  computed: {
    ...mapGetters(['getTaskList'])
  },
  methods: {
    ...mapActions(['loadPosts', 'loadProfile', "addPosts", "updatePost"]),
    sendPost() {
      if (this.taskData.title && this.taskData.description) {
        this.addPosts({
          params: {
            page: this.params.page,
            limit: this.params.limit
          },
          taskData: this.taskData,
      })
        this.statusModalForAddTask = false
        this.taskData.title = ''
        this.taskData.description = ''
        if (this.getTaskList.data.count > 5) {
          this.params.page++
        }
      }
    },
    openModal({id}) {
      if (!this.statusModal) {
        this.statusModal = true
        this.taskId = id
      } else {
        this.statusModal = false
        this.taskId = null
      }
    },
    updateTask(data) {
      this.statusModal = false
      this.updatePost(data)
      this.newTaskData.title = ''
      this.newTaskData.description = ''
    },
    onClickHandler(page) {
      this.params.page = page
      this.loadPosts(this.params)
    }
  },
  created() {
    this.loadProfile()
    this.loadPosts(this.params)
  }
}
</script>

<style scoped>

</style>