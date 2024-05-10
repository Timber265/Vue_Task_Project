<script>
import VHeader from "./components/vHeader.vue";
import {mapActions, mapGetters} from "vuex";
export default {
  components: {VHeader},

  methods: {
    ...mapActions(['validateUserByLogin'])
  },
  created() {
    this.validateUserByLogin()
  }
}
</script>

<template>
  <v-header />
  <router-view />
</template>

<style scoped>

</style>
