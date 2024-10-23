import React from "react"
import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/home/Home"
import Signin from "../pages/auth/signin/Signin"
import Auth from "../pages/auth/Auth"
import Signup from "../pages/auth/signup/Signup"

export const BASE_URL = '/main_window'

export const route_pages = {
  home: `${BASE_URL}`,
  auth: `${BASE_URL}/auth`,
  singin: `${BASE_URL}/auth/signin`,
  signup: `${BASE_URL}/auth/signup`,
}

export const router = createBrowserRouter([
  {
    path: route_pages.home,
    element: <Home />
  },
  {
    path: route_pages.auth,
    element: <Auth />,
    children: [
      {
        path: route_pages.singin,
        element: <Signin />
      },
      {
        path: route_pages.signup,
        element: <Signup />
      },
    ]
  },
])