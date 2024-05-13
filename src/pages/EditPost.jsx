import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import appWriteService from '../appwrite/database_storage'
import { Container, PostForm } from '../components'

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
    <Container>
    <PostForm post={post}/>
    </Container>
  ) : null
}

export default EditPost