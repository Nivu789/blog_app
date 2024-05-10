import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import appWriteService from '../appwrite/database_storage'
import { PostForm } from '../components'

function EditPost() {
    const [post,setPost] = useState(null)
    const navigate = useNavigate()
    const {slug} = useParams()

    useEffect(()=>{
        if(slug){
            appWriteService.getPost(slug).then((doc)=>{
                if(doc){
                    setPost(doc)
                }
            })
        }else{
            navigate('/')
        }
        
    },[slug,navigate])

  return post ? (
    <PostForm post={post}/>
  ) : null
}

export default EditPost