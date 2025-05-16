import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Typography } from '@mui/material'
import Register from './pages/Register/Register'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import ProtectedRoute from './components/ProtectRoute/ProtectRoute'

function App() {
  const router = createBrowserRouter([{
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "",
    element: <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }

  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
