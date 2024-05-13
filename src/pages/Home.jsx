import React from 'react'
import { useState,useEffect } from 'react'
import appWriteService from '../appwrite/database_storage'
import { PostCard } from '../components'
import { useSelector } from 'react-redux'
import authService from '../appwrite/auth'

function Home() {
    const [posts,setPosts] = useState(null)
    const isUserActive = useSelector((state)=>state.auth.status)
    console.log("user active",isUserActive)
    useEffect(()=>{
        const currentUser = authService.getCurrentUser()
        console.log(currentUser)
        if(isUserActive){
          appWriteService.getAllPosts().then((data)=>{
            if(data){
                setPosts(data.documents)
            }
        })
        }
        
    },[isUserActive])
  if(!posts && posts?.length === 0){
    return <div>Nothing has been posted yet... </div>
  }

  return (
    <div className='flex w-full flex-wrap p-12 gap-12'>{posts && posts.map((post)=>(
        <PostCard key={post.$id} {...post} />
    ))}</div>
  )
}

export default Home