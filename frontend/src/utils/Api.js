import axios from "axios"

const Api=axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    })

export default Api