import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const AuthContext = createContext(null)

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("currentUserEmail") ? { email: localStorage.getItem("currentUserEmail") } : null)

  function signup(email, password) {
    // Implement signup logic here
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    if(users.find(user => user.email === email)) {
      return {success: false, error: "User already exists"}
    }
    const newUser = { email, password }
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("currentUserEmail", email)

    setUser({ email })
    
    return { success: true }
  }
  function login(email, password) {
    // Implement login logic here
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const existingUser = users.find(user => user.email === email && user.password === password)
    if(!existingUser) {
      return { success: false, error: "Invalid email or password" }
    }
    localStorage.setItem("currentUserEmail", email)
    setUser({ email })
    return { success: true }
  }
  function logout() { 
    // Implement logout logic here
    localStorage.removeItem("currentUserEmail")
    setUser(null)
  }
  
  return (
    <AuthContext.Provider value={{ signup,user, logout, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider 