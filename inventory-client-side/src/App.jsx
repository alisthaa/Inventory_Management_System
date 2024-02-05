import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Products from './pages/Products'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom'
import Header from './components/common/Header'
import AddProduct from './pages/AddProduct'

export default function App() {
  return <>
  <Header/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='login' element={<Login/>}/>
    <Route path='signup' element={<Signup/>}/>
    <Route path='products' element={<Products/>}/>
    <Route path='addProduct' element={<AddProduct/>}/>
    </Routes>
    <ToastContainer/>
  </>
}
