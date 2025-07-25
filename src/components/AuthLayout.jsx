import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AuthLayout({children,authentication=true}) {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const authStatus =useSelector(state=>state.auth.status)
    useEffect(()=>{
        if(authentication && authStatus!==true){
            navigate('/login')
        }else if(!authentication && authStatus===true){
            navigate('/')
        }
        setLoading(false)
    },[authStatus,authentication])
  return loading ? <div>Loading...</div> : <div>{children}</div>
}

