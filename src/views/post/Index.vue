<template>
  <div class="container mt-5 mb-5">
      <div class="row">
          <div class="col-md-12">
              <div class="card border-0 rounded shadow">
                  <div class="card-body">
                      <h4>DATA POST</h4>
                      <hr>
                      <router-link :to="{name: 'post.create'}" class="btn btn-md btn-success" style="color:#fff;">TAMBAH POST</router-link>
                      <div class="mt-3 icon input" style="width: 100%">
                        <input v-model="searchQuery" type="text" placeholder="Search..." />
                      </div>
                      <div class="table-scrollable">
                        <table class="table table-striped table-bordered table-responsive mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">USER NAME</th>
                                    <th scope="col">TITLE</th>
                                    <th scope="col">DESC</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(post, index) in searchedPost" :key="index">
                                    <td>{{ post.id }}</td>
                                    <td>{{ post.user.name }}</td>
                                    <td>{{ post.title }}</td>
                                    <td>{{ post.desc }}</td>
                                    <td class="text-center">
                                        <router-link :to="{name: 'post.edit', params:{id: post.id }}" class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                        <button @click.prevent="destroyPost(post.id)" class="mt-2 btn btn-sm btn-danger ml-1">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                      </div>
                  </div>
                  <v-pagination
                    class="mt-2 mb-5 d-flex justify-content-center"
                    :container-class="'pagination'"
                    v-model="store.state.post.post_cp"
                    :pages="5"
                    active-color="primary"
                    :range-size="store.state.post.post_pp"
                    @update:modelValue="hpaginate"
                  />
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
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
        //onMounted akan menjalankan action "getPosts" di module "post"
        onMounted(() => {
            store.dispatch('post/getPosts',{page: 1, per_page: 5}) 
        })
        const searchQuery = ref("");
        //computed properti digunakan untuk get data posts dari state di module post
        const posts = computed(() => {
            return store.state.post.posts
        })
        const hpaginate = (pe) => {
          store.dispatch('post/getPosts',{page:pe,per_page: 5})
          console.log(pe)
        }
        const searchedPost= computed(() => {
              return posts.value.filter((post) => {
                return (
                  post.title
                    .toLowerCase()
                    .indexOf(searchQuery.value.toLowerCase()) != -1
                );
              });
        });
        /**
        * destroy post
        */
        function destroyPost(id) {
        //panggil actions "destroyPost" di module "post" dengan parameter "id"
        store.dispatch('post/destroyPost', id)
        }
        return {
            store,
            posts,
            searchQuery,
            searchedPost,
            hpaginate,
            destroyPost,
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