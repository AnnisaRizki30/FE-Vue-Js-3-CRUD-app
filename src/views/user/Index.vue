<template>
  <div class="container mt-5 mb-5">
      <div class="row">
          <div class="col-md-12">
              <div class="card border-0 rounded shadow">
                  <div class="card-body">
                      <h4>DATA USER</h4>
                      <hr>
                      <div class="table-scrollable">
                        <table class="table table-striped table-bordered table-responsive mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">EMAIL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(user, index) in users" :key="index">
                                    <td>{{ user.id }}</td>
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email }}</td>
                                </tr>
                            </tbody>
                        </table>
                      </div>
                  </div>
                  <v-pagination
                    class="mt-2 mb-5 d-flex justify-content-center"
                    :container-class="'pagination'"
                    v-model="store.state.auth.user_cp"
                    :pages="5"
                    :range-size="store.state.auth.user_pp"
                    active-color="primary"
                    @update:modelValue="hpaginate"
                  />
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
    components: {
      VPagination
    },
    setup() {
        //store vuex
        const store = useStore()
        //onMounted akan menjalankan action "getUser" di module "auth"
        onMounted(() => {
            store.dispatch('auth/getUsers',{page: 1, per_page: 5}) 
        })
        //computed properti digunakan untuk get data users dari state di module auth
        const users = computed(() => {
            return store.state.auth.users
        })
        const hpaginate = (pe) => {
          store.dispatch('auth/getUsers',{page:pe,per_page: 5})
          console.log(pe)
        }
        return {
            store,
            users,
            hpaginate
        }
    }
}
</script>

<style scoped>
.table-scrollable {
  overflow-x: auto;
  box-shadow: inset 0 0 5px rgba(150, 150 ,150,0.35);
  margin: auto;
}
</style>