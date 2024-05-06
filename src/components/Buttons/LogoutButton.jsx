import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

const LogoutButton = () => {

    const dispatch = useDispatch()
    
    const handleLogout = () =>{
        authService.logoutUser()
        .then(()=>dispatch(logout()))
        .catch((err)=>console.log(err))
    }

  return <button onClick={handleLogout}>Logout</button>
}

export default LogoutButton