import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { Navigate, useNavigate } from 'react-router-dom';

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler=()=>{
      console.log("loggedout")
         authservice.logout()
         .then(()=>dispatch(logout()))
        
    }

  return (
    <div><button 
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}>
        Logout
        </button></div>
  )
}

export default LogoutBtn