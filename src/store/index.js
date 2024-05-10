import {createStore} from "vuex";
import axios from "axios";
import router from "../router/index.js";

export default createStore({
    state() {
        return {
            userData: {},
            taskList: []
        }
    },
    mutations: {
        updateUserData(state, data) {
            state.userData = data
        },
        updateTaskList(state, data) {
            state.taskList = data
        }
    },
    getters: {
        getUserData(state) {
            return state.userData
        },
        getTaskList(state) {
            return state.taskList
        }
    },
    actions: {
        registrationUser({commit}, info) {
            axios.post('https://test.ai-softdev.com/auth/register', info)
                .then(response => {
                    // commit('updateUserData', response.data.data)
                    localStorage.setItem('access_token', response.data.access_token)
                    router.push({name: 'main_page'})
                })
        },
        signInUser({commit}, info) {
            axios.post('https://test.ai-softdev.com/auth/login', info)
                .then(response => {
                    commit('updateUserData', response.data.data)
                    localStorage.setItem('access_token', response.data.access_token)
                    router.push({name: 'main_page',})
                }).catch(error => {
                error.response.request.status === 401 ? alert('Invalid email or password') : null
            })
        },
        logoutUser({commit}) {
            axios.post('https://test.ai-softdev.com/auth/logout', {
                headers: {
                    Authorization: localStorage.getItem('access_token')
                }
            })
                .then(response => {
                    commit('updateUserData', {})
                    if(response.data.detail === "success") {
                        localStorage.removeItem('access_token')
                    }
                })
        },
        validateUserByLogin({commit}) {
            axios.get('https://test.ai-softdev.com/auth/current-user', {
                headers: {
                    Authorization: localStorage.getItem('access_token')
                }
            })
                .then(response => {
                    commit('updateUserData', response.data)
                })
                .catch(error => {
                    error.response.status === 401 ? router.push({name: 'authorization_page'}) : null
                })
        },

        loadProfile({commit}, image) {
            axios.patch('https://test.ai-softdev.com/auth/user', image, {
                headers: {
                    Authorization: localStorage.getItem('access_token'),
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    // console.log(response)
                })
        },

        loadPosts({commit}, {page, limit}) {
            axios.get(`https://test.ai-softdev.com/tasks/?page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: localStorage.getItem('access_token')
                }
            })
                .then(response => {
                    commit('updateTaskList', response)
                })
        },
        addPosts({dispatch}, data) {
            console.log(data.params)
            axios.post(`https://test.ai-softdev.com/tasks/?page=${data.params.page}&limit=${data.params.limit}`, data.taskData, {
                headers: {
                    Authorization: localStorage.getItem('access_token')
                }
            })
                .then(response => {
                    dispatch('loadPosts', data.params)
                })
        },
        deletePost({dispatch}, id) {
            axios.delete(`https://test.ai-softdev.com/tasks/${id}?page=1&limit=15`, {
                headers: {
                    Authorization: localStorage.getItem('access_token')
                }
            })
                .then(response => {
                    dispatch('loadPosts', {page: 1, limit: 5})
                })
        },
        donePost({dispatch}, id) {
            axios.patch(`https://test.ai-softdev.com/tasks/done/${id}?page=1&limit=15`, null, {
                headers: {
                    Authorization: localStorage.getItem('access_token')
                }
            })
                .then(response => {
                    dispatch('loadPosts', response)
                })
        },
        updatePost({dispatch}, {data}) {
            axios.put(`https://test.ai-softdev.com/tasks/${data.id}?page=1&limit=15`, data.taskData, {
                headers: {
                    Authorization: localStorage.getItem('access_token')
                }
            })
                .then(response => dispatch('loadPosts', {page: 1, limit: 5}))
        },
        changePassword(_, password) {
            const fd = new FormData()
            fd.append('new_password', password)
            axios.post(`https://test.ai-softdev.com/auth/change-password`, fd,{
                headers: {
                    Authorization: localStorage.getItem('access_token')
                }
            })
        }
    }
})