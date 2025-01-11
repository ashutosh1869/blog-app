import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import React from 'react'
import authservice from './appwrite/auth'
import './App.css'
import { login, logout } from './store/authSlice'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    authservice.getCurrentUser()
      .then((userData) => {
        if (userData)
          dispatch(login({ userData }))
        else dispatch(logout())
      })
      .finally(() => setLoading(false))

  }, [])
  return !loading ? (

    <div className='min-h-screen w-screen flex flex-wrap content-between justify-center bg-gray-400'>
      <div className=' block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
