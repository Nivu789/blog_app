import React from 'react'
import authService from '../../appwrite/database_storage'
import {Link} from 'react-router-dom'
import Container from '../Container/Container'
import { FaUser , FaHeart} from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";

function PostCard({$id,title,featured_image,userName}) {
  console.log(userName)
  return (
    
    <Link to={`/post/${$id}`} className='block w-fit mt-10'>
        <div className='w-fit bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={authService.getFilePreview(featured_image)} alt={title}
                className='rounded-xl w-80 h-80' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
            <div className='flex items-center gap-2 w-ful'>
            <FaUser />
            <div><h2 className='text-xl font-bold'>{userName?userName:"unknown"}</h2></div>
            <div className='ml-40 w-fit'><IoMdPersonAdd className='text-4xl'/></div>
            </div>
            <div className='mt-3 text-red-600'><FaHeart/></div>
        </div>
    </Link>
    
  )
}

export default PostCard