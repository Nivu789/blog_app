import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { useCallback } from 'react'
import appWriteService from '../../appwrite/database_storage'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {InputBox,Select,Button,RTE} from '../index'

const PostForm = ({post}) => {
    const {register,handleSubmit,watch,setValue,getValues,control} = useForm({
        defaultValues:{
            title:post?.title || "",
            slug:post?.slug || "",
            content:post?.content || "",
            status:post?.status || 'active'
        }})

    const navigate = useNavigate()
    const userData = useSelector((state)=>state.auth.userData)
    
    const submit = (data) =>{
        if(post){
            const file = data.image[0] ? appWriteService.uploadFile(data.image[0]) : null
            if(file){
                appWriteService.deleteFile(post.featured_image)
            }
            const dbPost = appWriteService.updatePost(post.$id,{...data,featured_image:file?file.$id : undefined})
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }else{
            const file = data.image[0] ? appWriteService.createFile(data.image[0]) : undefined
            const userId = userData.$id
            const dbPost = appWriteService.createPost({
                featured_image:file,
                userId:userId,
                ...data,
            })
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }
    }

    const slugTransform = useCallback((value)=>{
        if(value && typeof value === 'string') return value.trim().toLowerCase().replace(/^[a-zA-Z\d\s]+g/,'-')
        return ''
    },[])

    useEffect(()=>{

        const subscription = watch((value,{name})=>{
            if(name==='title'){
                setValue('slug',slugTransform(value.title), { shouldValidate: true })
            }
        })

        return (()=>{
            subscription.unsubscribe()
        })

    },[watch,setValue,slugTransform])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <InputBox
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <InputBox
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <InputBox
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appWriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm