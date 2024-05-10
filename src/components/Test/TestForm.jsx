import React, { useEffect } from 'react'
import { useForm , useFieldArray } from 'react-hook-form'


export const TestForm = () => {
    const {register,handleSubmit,formState,control,watch} = useForm({
        defaultValues:{
            social:{
                twitter:"nived nambiar"
            },
            phone:[]
        }
    })
    const {errors} = formState

    const {fields,append,remove} = useFieldArray({
        name:"phone",
        control
    })

    const submit = (data) =>{
        console.log("Form submitted", data)
        console.log(errors)
    }

    useEffect(()=>{
        const subscribe = watch((value)=>{
            if(value.password.length>=8){
                console.log("Password is getting long")
            }
        })

        return () => subscribe.unsubscribe()
    },[watch])

  return (
    <div>
        <form onSubmit={handleSubmit(submit)} noValidate>
        <div>
        <label htmlFor="email">Email:</label>
        <input {...register("email",{
            required:"Email is required",
            pattern:{
                value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message:"Email is not valid"
            },
            validate:(fieldValue)=>{
                return fieldValue !== "admin@example.com" || "enter a different email address"
            }
        })} type='text' id='email' placeholder='enter your email'></input>
        <p>{errors.email?.message}</p>
        </div>

        <div>
        <label htmlFor="email">Password:</label>
        <input {...register("password",{
            required:{
                value:true,
                message:"Password is required"
            }
        })} type='password' id='email' placeholder='enter your email'></input>
        <p>{errors.password?.message}</p>
        </div>

        <div>
        <label htmlFor="twitter">Twitter:</label>
        <input {...register("social.twitter",{
        })} type="text"></input> 
        </div>

        <div>
        <label htmlFor="primary-phone">Primary Phone:</label>
        {fields.map((field,index)=>{
            return <div><input key={field.id} {...register(`phone[${index}]`,{required:"canot be empty"})} type="text"></input> {fields.length>2 && <button type="button" onClick={()=>remove(index)}>Remove</button>}</div>      
        })}
        <button type="button" onClick={()=>append()}>Add Phone</button>
        </div>

        <div>
        <button type='submit'>Submit</button>
        </div>
        </form>
        
    </div>
  )
}
