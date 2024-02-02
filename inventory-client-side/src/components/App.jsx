import { useState } from 'react'
import {createBrowserRouter,RouterProvider } from 'react-router-dom'


import '../styles/App.css'

/* react routes */
const router = ([
  {
    path: '/',
    element: <div> Root Element </div>
},
{
  path: '/Test',
  element: <div> Test Component </div>
},
{
  path: '/Result',
  element: <div> Result Component </div>
}
])

function App() {

  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
