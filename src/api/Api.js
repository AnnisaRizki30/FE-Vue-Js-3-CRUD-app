//import axios
import axios from 'axios'
const Api = axios.create({
 //set default endpoint API
 baseURL: 'http://127.0.0.1:8000/api/admin'


})
export default Api
