import {createRouter, createWebHistory} from "vue-router";
import index from '../pages/index.vue'
import registration from "../pages/registration.vue";
import authorization from "../pages/authorization.vue";
import profile from "../pages/profile.vue";

const routes = [
    {path: '/', component: index, name: 'main_page'},
    {path: '/profile', component: profile, name: 'profile_page'},
    {path: '/auth', component: authorization, name: 'authorization_page'},
    {path: '/reg', component: registration, name: 'registration_page'},
]

export default createRouter({
    history: createWebHistory(),
    routes,
})