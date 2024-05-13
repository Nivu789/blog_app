import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

const LogoutButton = ({className}) => {

    const dispatch = useDispatch()
    
    const handleLogout = async() =>{
        await authService.logoutUser()
        .then(()=>dispatch(logout()))
        .catch((err)=>console.log(err))
    }

  return <button className={`${className}`} onClick={handleLogout}>Logout</button>
}

export default LogoutButton