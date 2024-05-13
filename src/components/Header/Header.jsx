import React from 'react'
import {Button, LogoutButton} from '../index'
import authService from '../../appwrite/auth'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

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
            status:activeUser
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
        {
            name:'Add Post',
            slug:'/create',
            status:activeUser
        },

    ]

  return (
    // <div classNameName='w-full bg-slate-800 h-14 flex items-center'>
    //     <div>
    //         Logo
    //     </div>
    //     <div>
    //         <ul classNameName='flex gap-20 justify-around p-4'>
    //             {navLinks.map((item)=>(
    //                 item.status ? <NavLink classNameName={({isActive})=>isActive?"text-gray-500":"text-white"} key={item.name} to={item.slug}><li classNameName='text-white text-xl'>{item.name}</li></NavLink> : null
    //             ))}
    //         </ul>
    //     </div>
    //     <div classNameName='mr-7 text-white'>
    //         {activeUser && <LogoutButton/>}
    //     </div>
    // </div>

    

<nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
  <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo"/>
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
  </a>
  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      {activeUser && <LogoutButton type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/>}
      <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      {navLinks.map((item)=>(
        item.status ? <NavLink to={item.slug} key={item.name}><a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">{item.name}</a></NavLink>:null
      ))}
    </ul>
  </div>
  </div>
</nav>

  )
}

export default Header