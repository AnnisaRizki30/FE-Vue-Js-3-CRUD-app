//import global API
import Api from '../../api/Api'

const post = { 
  //set namespace true
  namespaced: true,
  //state
  state: {
    //index post
    posts: [],
    post_cp: 0,
    post_tp: 0,
    post_pp: 8,
    post_ppurl: '',
    post_npurl: '',
  },
  //mutations
  mutations: {
    //set state post dengan data dari response
    GET_POSTS(state, posts) {
    state.posts = posts.data
    state.post_cp = posts.current_page
    state.post_tp = posts.total
    state.post_pp = posts.per_page
    state.post_ppurl = posts.prev_page_url
    state.post_npurl = posts.next_page_url
    },
  },
  //actions
  actions: {
    //action getPosts
    getPosts({ commit }, payload={page:1, per_page: 5} ) {
      //ambil data token dari localStorage
      const token = localStorage.getItem('token')
      Api.defaults.headers.common['Authorization'] = "Bearer " +token
      //get data product ke server
      console.log(payload)
      Api.get('/posts?page='+payload.page + '&limit='+payload.per_page)
      .then(response => {
        console.log(response) 
        //commit ke mutation GET_POSTS dengan response data
        commit('GET_POSTS', response.data.data)
        }).catch(error => {
          //show error log dari response
          console.log(error)
        })
    },
    //action destroy post
    destroyPost({ commit }, id) {
      //get data token dan user
      const token = localStorage.getItem('token')
      //set axios header dengan type Authorization + Bearer token
      Api.defaults.headers.common['Authorization'] = "Bearer " + token
      Api.delete(`/posts/${id}`)
      .then(() => {
        //get posts
        Api.get('/posts')
        .then(response => {
        commit('GET_POSTS', response.data.data)
        })
      })
    },
  },
  //getters
  getters: {
    //get posts
    getPostsData(state) {
    return state.posts
    },


  }
}
export default post