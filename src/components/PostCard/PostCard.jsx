import React from 'react'
import authService from '../../appwrite/database_storage'
import {Link} from 'react-router-dom'
import Container from '../Container/Container'
import { FaUser , FaHeart} from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { useSelector } from 'react-redux';

function PostCard({$id,title,featured_image,userName,userId}) {

  const userPostId = userId
  const isFollowing = useSelector((state)=>state.follow.followList.findIndex((userId) => userId === userPostId)!==-1)

  console.log(authService.getFilePreview(featured_image))

  return (
    
    <Link to={`/post/${$id}`} className='block w-fit mt-10'>
        <div className='w-fit bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={authService.getFilePreview(featured_image)} alt={title}
                className='rounded-xl w-80 h-80' />

            </div>
            <h2
            className='text-xl font-bold text-black'
            >{title}</h2>
            <div className='flex items-center gap-2 w-ful'>
            <FaUser className='text-black'/>
            <div><h2 className='text-xl font-bold text-black'>{userName?userName:"unknown"}</h2></div>
            {isFollowing && <div className='mt-2 ml-30 w-fit "text-white bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2 text-center me-2 mb-2 dark:bg-green-600 dark:focus:ring-green-800"'>Following</div>}
            </div>
            <div className='mt-3 text-red-600'><FaHeart/></div>
        </div>
    </Link>
    
  )
}

export default PostCard