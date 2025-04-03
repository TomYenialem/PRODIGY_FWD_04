import axios from "axios"

const Api=axios.create({
    // baseURL: 'https://prodigy-fwd-04.onrender.com',
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    })

export default Api