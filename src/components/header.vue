<template>
<div style="background: rgb(255, 255, 255);">
  <div class="container">
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none" style="font-weight:600;font-size:30px;">
        Annisa
      </a>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0" style="font-size:18px;">
        <li><router-link :to="{name: 'user.index'}" class="nav-link px-2 link-secondary">User</router-link></li>
        <li><router-link :to="{name: 'post.index'}" class="nav-link px-2 link-dark">Post</router-link></li>
      </ul>

      <div class="col-md-3 text-end">
        <button type="button" class="btn btn-light me-2">{{ user.name }}</button>
        <button @click="logout" type="button" class="btn btn-primary">LOGOUT</button>
      </div>
    </header>
  </div>
</div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    //store vuex
    const store = useStore()
    //vue router
    const router = useRouter()

    //mounted
    onMounted(() => {
      //panggil action "getUser" dari module "auth" vuex
      store.dispatch('auth/getUser')
    })
    //computed
    const user = computed(() => {
      //panggil getters dengan nama "currentUser" dari module "auth"
      return store.getters['auth/currentUser']
    })

    //method logout
    function logout() {
      //panggil action "logout" di dalam module "auth"
      store.dispatch('auth/logout')
      .then(() => {
        //jika berhasil, akan di arahkan ke route login
        router.push({
        name: 'login'
        })
      })
    }
 
    //return a state and function
    return {
      store,
      user,
      logout
    }
  }
}
</script>

<style>

</style>