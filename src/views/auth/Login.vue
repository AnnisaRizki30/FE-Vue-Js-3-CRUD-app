<template>
  <div class="container mt-4 mb-5">
    <div class="row justify-content-center">  
      <div class="col-md-6">
        <div v-if="validation.message" class="mt-2 alert alertdanger">{{ validation.message }} </div>        
        <div class="card border-0 shadow rounded">            
            <div class="card-body">           
              <h4 class="text-center">LOGIN</h4>           
              <hr>
              <form @submit.prevent="login">
                <div class="form-group">              
                  <label>Email Address</label>
                  <input type="email" v-model="user.email" class="form-control" placeholder="Email Address">
                </div>
                <div v-if="validation.email" class="mt-2 alert alert-danger">{{ validation.email[0] }}</div>
                <div class="mt-2 form-group">
                  <label>Password</label>
                  <input type="password" v-model="user.password" class="form-control" placeholder="Password">
                </div>
                <div v-if="validation.password" class="mt-2 alert alert-danger">{{ validation.password[0] }}</div>
                <button type="submit" class="mt-4 btn btn-primary shadow-none btn-block">LOGIN</button>
              </form>
            </div>
          </div>      
        </div>
    </div>  
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup() {
    //user state
    const user = reactive({
      email: '',
      password: ''
    })
    //validation state
    const validation = ref([])
    //store vuex
    const store = useStore()
    //route
    const router = useRouter()
    //method login
    function login() {
    //define variable
    let email = user.email
    let password = user.password
    //panggil action "login" dari module "auth" di vuex
    store.dispatch('auth/login', {
      email,
      password
    })
    .then(() => {
      //redirect ke dashboard
      router.push({name: 'home'})
      }).catch(error => {
      //assign validaation message
      validation.value = error
      })
    }
    //return object
    return {
      user,
      validation,
      login
    }
  }   
}
</script>


<style scoped>
textarea:focus, input[type="text"]:focus, input[type="password"]:focus, input[type="datetime"]:focus, input[type="datetime-local"]:focus, input[type="date"]:focus, input[type="month"]:focus, input[type="time"]:focus, input[type="week"]:focus, input[type="number"]:focus, input[type="email"]:focus, input[type="url"]:focus, input[type="search"]:focus, input[type="tel"]:focus, input[type="color"]:focus, .uneditable-input:focus {
  box-shadow: none;
}
</style>