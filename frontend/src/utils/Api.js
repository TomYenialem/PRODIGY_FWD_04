import axios from "axios"

const Api=axios.create({
    baseURL: 'https://prodigy-fwd-04.onrender.com',
    withCredentials: true,
    })

export default Api