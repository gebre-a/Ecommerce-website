import React, { useContext } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../context/AuthContextProvider'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const navigate = useNavigate()
  const [mode, setMode] = useState("signup")
  const [error , setError] = useState(null)
  const { signup,user, logout, login } = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = (data) => {
    setError(null)
    let result;
    if(mode === "signup") {
      result = signup(data.email, data.password)
    } else {
      result = login(data.email, data.password)
    }
    if(result.success) {
      navigate("/")
    } else {
      setError(result.error)
    }

  } 
  return (
    <div className='page'>
      <div className='container'>
        <div className='auth-container'>
          {user && <p>User Logged in, {user.email}!</p>}
          <button className='btn btn-secondary' onClick={logout}>Logout</button>
          <h1 className='page-title'>{mode === "signup" ? "Sign Up" : "Login"}</h1>
          <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
            {error && <div className='error-message'>{error}</div>}
            <div className='form-group'>
              <label className='form-label' htmlFor='email'>Email</label>
              <input className='form-input' type="email" id='email' {...register("email", { required: "Email is required" })} />
              {errors.email && <p className='form-error'>{errors.email.message}</p>}
            </div>
            <div className='form-group'>
              <label className='form-label' htmlFor='password'>Password</label>
              <input className='form-input' type="password" id='password' {...register("password", { required: "Password is required" , minLength: { value: 6, message: "Password must be at least 6 characters long" } })} />
              {errors.password && <p className='form-error'>{errors.password.message}</p>}
            </div>
            <button className='btn btn-primary btn-large' type="submit">{mode === "signup" ? "Sign Up" : "Login"}</button>
          </form>
          <div className='auth-switch'>
            {mode === "signup" ? (
              <p>Already have an account?{" "} <span className='auth-link' onClick={()=>setMode("login")}>Login</span></p>
            ) : (
              <p>Don't have an account?{" "} <span className='auth-link' onClick={()=>setMode("signup")}>Sign Up</span></p>
            )}
          </div>
        </div>
      </div>
      
    </div>
  ) 
}

export default Auth
