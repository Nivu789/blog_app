import React, { useEffect, useState } from 'react'
import { PostCard } from '../components'
import appWriteService from '../appwrite/database_storage'

function AllPost() {
    const [posts,setPosts] = useState([])
    
    useEffect(()=>{
         appWriteService.getAllPosts().then((posts)=>setPosts(posts.documents))
    },[])

    console.log(posts)
  return (
    <>
    {posts && posts.map((post,index)=>(
        <PostCard key={post.$id} {...post}/>
    ))}
    </>
  )
}

export default AllPost