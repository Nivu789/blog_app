import React from 'react'
import authService from '../../appwrite/database_storage'
import {Link} from 'react-router-dom'
import Container from '../Container/Container'

function PostCard({$id,title,featured_image}) {
  console.log(featured_image)
  return (
    
    <Link to={`/post/${$id}`} className='block w-fit mt-20'>
        <div className='w-fit bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={authService.getFilePreview(featured_image)} alt={title}
                className='rounded-xl w-80 h-80' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
    
  )
}

export default PostCard