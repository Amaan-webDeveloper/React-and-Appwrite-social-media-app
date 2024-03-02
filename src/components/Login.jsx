import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/appwriteAuth'
import { login as authLogin } from '../features/authSlice'



const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPass] = useState("")
  const [error, setError] = useState("")
  const navigat = useNavigate();
  const dispatch = useDispatch()


  const submitHandler = async (e) => {




    e.preventDefault()
    setError("")
    try {
      const user = await authService.login({ email, password })

      if (user) {
        const userData = await authService.getCurrentUser()

        console.log(userData)
        if (userData) {
          navigat("/")
          return dispatch(authLogin(userData))
        }

      } else if (!user) {
        // user already exist

        console.log(user)
      }
    } catch (error) {
      setError(error.massage)
      console.log(error)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => submitHandler(e)} >
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input value={password} onChange={(e) => setPass(e.target.value)} type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm7-6a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
        <div className="text-sm mt-4">
          <p className="text-center text-gray-600">Dont have an account yet? <Link to={"/register"} className="font-medium text-indigo-600 hover:text-indigo-500">Register</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login
