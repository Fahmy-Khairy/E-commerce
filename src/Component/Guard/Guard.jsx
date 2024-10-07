import React from 'react'
import Login from '../Login/Login'
import { Navigate } from 'react-router-dom'

export default function Guard({children}) {
  if (localStorage.getItem('token') == null) {
    return <Navigate to='/login'/>
  }
    return (
    <>
    {children}
    </>
  )
}
