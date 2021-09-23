//import global API
import Api from '../../api/Api'

const auth = {
    //set namespace true
    namespaced: true,
    //state
    state: {
      //state untuk token, pakai localStorage, untuk menyimpan informasi tentang token JWT
      token: localStorage.getItem('token') || '',
      //state user, pakai localStorage, untuk menyimpan data user yang sedang login
      user: JSON.parse(localStorage.getItem('user')) || {},
      //index users
      users: [],
      user_cp: 0,
      user_tp: 0,
      user_pp: 8,
      user_ppurl: '',
      user_npurl: '',
    },
    //mutations
    mutations: {//update state token dan state user dari hasil response
      AUTH_SUCCESS(state, token, user) {
        state.token = token // <-- assign state token dengan response token
        state.user = user // <-- assign state user dengan response data user
      },
      //update state user dari hasil response register / login
      GET_USER(state, user) {
        state.user = user // <-- assign state user dengan response data user
      },
      GET_USERS(state, users) {
        state.users = users.data
        state.user_cp = users.current_page
        state.user_tp = users.total
        state.user_pp = users.per_page
        state.user_ppurl = users.prev_page_url
        state.user_npurl = users.next_page_url
      },
      //fungsi logout
      AUTH_LOGOUT(state) {
        state.token = '' // <-- set state token ke empty
        state.user = {} // <-- set state user ke empty array
      }
    },
    //actions
    actions: {
      //action getUser
      getUser({ commit }) {
          //ambil data token dari localStorage
          const token = localStorage.getItem('token')
          Api.defaults.headers.common['Authorization'] = "Bearer " +token
          Api.get('/user')
            .then(response => {
            //commit ke mutatuin GET_USER dengan hasil response
            commit('GET_USER', response.data.user)
          })
      },
      //action getUsers
      getUsers({ commit }, payload={page:1, per_page: 5} ) {
          //ambil data token dari localStorage
          const token = localStorage.getItem('token')
          Api.defaults.headers.common['Authorization'] = "Bearer " +token
          console.log(payload)
          Api.get('/users?page='+payload.page + '&limit='+payload.per_page)
            .then(response => {
            //commit ke mutatuin GET_USERS dengan hasil response
            commit('GET_USERS', response.data.data)
          })
      },
      //action logout
      logout({ commit }) {
        //define callback promise
        return new Promise((resolve) => {
            //commit ke mutation AUTH_LOGOUT
            commit('AUTH_LOGOUT')
            //remove value dari localStorage
            localStorage.removeItem('token')
            localStorage.removeItem('user')

            //delete header axios
            delete Api.defaults.headers.common['Authorization']
            //return resolve ke component
            resolve()
        })
      },
      //action login
      login({ commit }, user) {
          //define callback promise
        return new Promise((resolve, reject) => {
            Api.post('/login', {
            //data yang dikirim ke server
            email: user.email,
            password: user.password,
          })
          .then(response => {
          //define variable dengan isi hasil response dari server
          const token = response.data.token
          const user = response.data.user
          //set localStorage untuk menyimpan token dan data user
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))
          //set default header axios dengan token
          Api.defaults.headers.common['Authorization'] =
          "Bearer " + token
          //commit auth success ke mutation
          commit('AUTH_SUCCESS', token, user)
          //commit get user ke mutation
          commit('GET_USER', user)
          
          //resolve ke component dengan hasil response
          resolve(response)
          }).catch(error => {
          //jika gagal, remove localStorage dengan key token
          localStorage.removeItem('token')
          //reject ke component dengan hasil response
          reject(error.response.data)
          })
        })
      }
    },
    //getters
    getters: {
        //get current user
        currentUser(state) {
        return state.user // <-- return dengan data user
      },
        //loggedIn
        isLoggedIn(state) {
        return state.token // return dengan data token
      },
    }
}
export default auth