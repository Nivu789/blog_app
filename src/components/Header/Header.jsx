import React from 'react'
import {LogoutButton} from '../index'
import authService from '../../appwrite/auth'
import { useSelector } from 'react-redux'

const Header = () => {

    const activeUser = useSelector((state)=>state.auth.status)
    console.log(activeUser)

    const navLinks = [
        {
            name:'Home',
            slug:'/',
            status:true
        },
        
        {
            name:'All Post',
            slug:'/all-post',
            status:activeUser
        },
        {
            name:'About',
            slug:'/about',
            status:true
        },
        {
            name:'Login',
            slug:'/login',
            status:!activeUser
        },
        {
            name:'Signup',
            slug:'/signup',
            status:!activeUser
        },

    ]

  return (
    <div className='w-full bg-slate-800 h-14 flex items-center justify-between'>
        <div>
            Logo
        </div>
        <div>
            <ul className='flex gap-20 justify-around p-4 mr-40'>
                {navLinks.map((item)=>(
                    item.status ? <li className='text-white text-xl' key={item.name}>{item.name}</li> : null
                ))}
            </ul>
        </div>
    </div>
  )
}

export default Header