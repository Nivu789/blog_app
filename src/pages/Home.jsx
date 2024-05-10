import React from 'react'
import { useState,useEffect } from 'react'
import appWriteService from '../appwrite/database_storage'
import { PostCard } from '../components'

function Home() {
    const [posts,setPosts] = useState(null)

    useEffect(()=>{
        appWriteService.getAllPosts().then((data)=>{
            if(data){
                setPosts(data.documents)
            }
        })
    },[])

  if(posts?.length === 0){
    return <div>Nothing has been posted yet... </div>
  }

  return (
    <div>{posts.map((post)=>(
        <PostCard key={post.$id} post={post} />
    ))}</div>
  )
}

export default Home