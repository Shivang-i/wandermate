import React from 'react'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import VerifyEmail from './pages/auth/VerifyEmail';
import Verify from './pages/auth/Verify';
import ForgotPassword from './pages/auth/ForgotPassword';
import ChangePassword from './pages/auth/ChangePassword';
import VerifyOTP from './pages/auth/VerifyOTP';
const router= createBrowserRouter([
  {
  path:'/',
  element:<Home/>
  },
  {
  path:'/signup',
  element:<Signup/>
  },
  {
  path:'/login',
  element:<Login/>
  },
   {
    path:'/verify',
    element:<VerifyEmail/>
  },
   {
    path:'/verify/:token',
    element:<Verify/>
  },
  {
    path:'/forgot-password',
    element:<ForgotPassword/>
  },
   {
    path:'/change-password/:email',
    element:<ChangePassword/>
  },
   {
    path:'/verify-otp/:email',
    element:<VerifyOTP/>
  }
])

const App = () => {
  return (
    <div >
     <RouterProvider router={router}/>
    </div>
  )
}

export default App