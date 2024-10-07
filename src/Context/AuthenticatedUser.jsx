import { createContext, useEffect, useState } from 'react'
export const authenticatedUser =  createContext();

export default function AuthenticatedUser({children}) {
    const [token, setToken] = useState(localStorage.getItem('token'))
    
  return (
    <authenticatedUser.Provider value={{token , setToken}} >
        {children}
    </authenticatedUser.Provider>
  )
}
