import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import noimage from '../assets/images/No-Image.png'
import { toast } from 'react-toastify';
export default function SingleProduct() {
  const {slug}  = useParams() 
  const [product, setProduct] = useState({});
  console.log(slug);
  let token = localStorage.getItem("token");
useEffect(() => {
  axios
    .get(
      "http://localhost:3000/api/products/"+slug,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
     // console.log(res.data.data);
      setProduct(res.data.data);
      console.log("product:",product);
    })
    .catch(err =>{
      console.log(err);
      toast.error("something went wrong. try again later.")
    })
}, []);

  return <>
  <div className='flex justify-center mt-10'>
  <div className='flex items-center justify-center gap-3 h-auto w-auto md:h-[600px] md:w-[1000px] border shadow-lg shadow-orange-700'> 
  <img src={`http://localhost:3000${product.image}` || noimage} alt="" className='h-auto md:h-96 w-80'/>
  <div className='text-lg grid grid-cols-1 gap-5 font-serif text-orange-800'> 
  <h1 className='text-3xl font-semibold'> {product.title} </h1>
  <p> Price: {product.price}</p>
  <p> Category: {product.category}</p>
  <p> In-stock: {product.quantity}</p>
  <p> Description: {product.description}</p>
  </div>
  </div> 
  </div>
  
  </>
}
