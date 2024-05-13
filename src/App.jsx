import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Header,Footer } from './components'
import { TestForm } from './components/Test/TestForm'
import AllPost from './pages/AllPost'

function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])

  return (
    <>
    {/* <Header/> */}
      {loading ? <div>Loading Data...</div>:<div>Welcome user</div>}
      {/* <AllPost/> */}
      {/* <TestForm/> */}
      {/* <Footer/> */}
    </>  
  )
}

export default App
