import Api from '../utils/Api'

import { useNavigate } from 'react-router-dom'

import React from 'react'

function UseLogout() {

    const logout=async()=>{
        try {
        await Api.post('/logout',{
            withCredentials:true
            
            })
    
            localStorage.removeItem('token')
            const navigate=useNavigate()
            navigate('/login')
            
        } catch (error) {
            console.log(error)
        }
    
    }
    return logout
}

export default UseLogout

