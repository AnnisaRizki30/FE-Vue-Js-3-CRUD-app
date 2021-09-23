//import vuex
import { createStore } from 'vuex'
//import module auth
import auth from './module/auth'
//import module post
import post from './module/post'

//create store vuex
export default createStore({
  modules: {
    auth, // <-- module auth
    post // <-- module post
  }
})
