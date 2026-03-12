import React from 'react'
import { createBrowserRouter,RouterProvider } from "react-router-dom";


import Login from './pages/auth/Login';
import VerifyEmail from './pages/auth/VerifyEmail';
import Verify from './pages/auth/Verify';
import ForgotPassword from './pages/auth/ForgotPassword';
import ChangePassword from './pages/auth/ChangePassword';
import VerifyOTP from './pages/auth/VerifyOTP';
import LandingPage from './pages/LandingPage';

const router= createBrowserRouter([
  {
  path:'/',
  element:<LandingPage/>
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
  
  // {
  //   path: "/landing",
  //   element: <LandingPage />,
  // }
])

const App = () => {
  return (
    <div >
     <RouterProvider router={router}/>
    </div>
  )
}

export default App;