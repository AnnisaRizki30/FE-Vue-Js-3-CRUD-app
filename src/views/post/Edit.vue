<template>
   <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow-none">
                    <div class="card-body">
                        <h4>EDIT POST</h4>
                        <hr>

                        <form @submit.prevent="update">
                            <div class="form-group">
                                <label for="title" class="font-weight-bold">TITLE</label>
                                <input type="text" class="form-control shadow-none" v-model="post.title" placeholder="Masukkan Judul Post">
                                <!-- validation -->
                                <div v-if="validation.title" class="mt-2 alert alert-danger">
                                    {{ validation.title[0] }}
                                </div>
                            </div>
                            <div class="mt-2 form-group">
                                <label for="content" class="font-weight-bold">DESCRIPTION</label>
                                <textarea class="form-control shadow-none" rows="4" v-model="post.desc" placeholder="Masukkan Konten Post"></textarea>
                                <!-- validation -->
                                <div v-if="validation.content" class="mt-2 alert alert-danger">
                                    {{ validation.desc[0] }}
                                </div>
                            </div>
                            <button type="submit" class="mt-4 btn btn-primary">SIMPAN</button>
                        </form>                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Api from '../../api/Api'

export default {
setup() {

    //state posts
    const post = reactive({
        title: '',
        desc: '',
    })

    //state validation
    const validation = ref([])

    //vue router
    const router = useRouter()

    //vue router
    const route = useRoute()

    //mounted
    onMounted(() => {
        const token = localStorage.getItem('token')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        //get API from Laravel Backend
        Api.get(`/posts/${route.params.id}`)
        .then(response => {
          
          //assign state posts with response data
          post.title    = response.data.data.title  
          post.desc  = response.data.data.desc  

        }).catch(error => {
            console.log(error.response.data)
        })

    })

    //method update
    function update() {

        let title   = post.title
        let desc = post.desc

        const token = localStorage.getItem('token')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        Api.put(`/posts/${route.params.id}`, {
            title: title,
            desc: desc
        }).then(() => {

            //redirect ke post index
            router.push({
                name: 'post.index'
            })

        }).catch(error => {
            //assign state validation with error 
            validation.value = error.response.data
        })

    }

    //return
    return {
        post,
        validation,
        router,
        update
    }

    }

}
</script>

<style>

</style>