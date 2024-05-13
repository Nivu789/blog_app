import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { login } from '../store/authSlice'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { InputBox,Button } from '../components'
import { useNavigate , Link } from 'react-router-dom'

function Signup() {
    const [error,setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register,handleSubmit} = useForm()

    const createAccount = async(data) =>{
      
        setError("")
        try {
            const account = await authService.createAccount(data)
            // console.log(account)
            if(account){
                // const currentUser = await authService.getCurrentUser()
                // console.log(currentUser)
                // dispatch(login(currentUser))
                navigate("/login")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(createAccount)}>
    <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
        <div className="mt-2">
            <InputBox {...register("name",{required:true})}name="name" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
            <InputBox {...register("email",{required:true})}name="email" type="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div className="mt-2">
            <InputBox {...register("password",{required:true})}id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <Button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log in</Button>
      </div>
    </form>

    {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
    <p className="mt-10 text-center text-sm text-gray-500">
      Got an account?
      <Link to={`/login`} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login here</Link>
    </p>
  </div>
</div>
  )
}

export default Signup