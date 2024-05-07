import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protector({children,authentication=true}) {
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
    const authStatus = useSelector((state)=>state.auth.stats)

    useEffect(()=>{
        if(authentication && authStatus){
            navigate('/')
        }else{
            navigate('/login')
        }
        setLoading(false)
    },[navigate,authStatus,authentication])

  return loading ? <h1>Loading....</h1> : <>{children}</>
}

export default Protector