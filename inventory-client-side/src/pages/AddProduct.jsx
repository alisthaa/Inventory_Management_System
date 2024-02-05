import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddProduct() {
  const navigate= useNavigate()
  let initialValue = {
    title: "",
    price: "",
    category: "",
    description: "",
    quantity: "",
    image: null,
  };
const [data, setData] = useState(initialValue);
const [isAdding, setIsAdding] = useState(false);
const [errors,setErros]= useState({})
const handleSubmit=(e)=>{
  e.preventDefault();
  let token = localStorage.getItem("token");
  let formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("quantity", data.quantity);
    formData.append("image", data.image);
setIsAdding(true)
axios.post("http://localhost:3000/api/products",formData,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    .then((res) => {
      setIsAdding(false);
        toast("new product added.");
        setData(initialValue)  
         navigate('/products')
    })
    .catch((err) => {
      setIsAdding(false);
      if (err.response?.status == 400) {
        let errObj = {};
        err.response.data.errors.forEach((el) => {
          errObj[el.field] = el.message;
        });
        console.log(errObj);
        setErros(errObj);
      }
      console.log(err.response.data);
      toast.error("something went wrong");
    });
}

const handleChange = (e) => {
  setData({
    ...data,
    [e.target.name]:
      e.target.type == "file" ? e.target.files[0] : e.target.value,
  });
};

  return <>

  <h1 className='text-5xl text-center font-serif text-orange-800 my-2'> Add Item + </h1>

  <form action="" className='flex justify-center' onSubmit={handleSubmit} >

<div className='form-group grid grid-cols-1 shadow-lg shadow-orange-900 p-10 '> 

<label htmlFor="" className="form-label required-field">Title</label>
<input 
value={data.title}
type="text" 
className="form-control"
name='title'
onChange={handleChange}
/>
{errors.title && (
            <span className="text-sm text-red-500">
              {errors.title}
            </span>
          )}
<label htmlFor="" className="form-label required-field">Price</label>
<input 
type="number" 
value={data.price}
className="form-control" 
onChange={handleChange}
name='price'
/>

{errors.price && (
            <span className="text-sm text-red-500">
              {errors.price}
            </span>
          )}


<label htmlFor="" className="form-label ">Category</label>
<input 
type="text" 
value={data.category}
className="form-control" 
name='category'
onChange={handleChange}
/>

<label htmlFor="" className="form-label required-field">Description</label>
<textarea 
type="text" 
value={data.description}
className="form-control" 
name='description'
onChange={handleChange}
/>
{errors.description && (
            <span className="text-sm text-red-500">
              {errors.description}
            </span>
          )}

<label htmlFor="" className="form-label required-field">Quantity</label>
<input 
type="number" 
name="quantity"
value={data.quantity}
onChange={handleChange}
className="form-control" 
/>

<label htmlFor="" className="form-label ">Image</label>
<input 
type="file" 
name="image" 
onChange={handleChange}
className="form-control" 
/>


<div className='flex justify-center mt-4'> 
<button type='submit' className='btn h-12 text-lg w-40'> {isAdding ? "Adding.." : "Add"} </button>
</div>
</div>

  </form>
  </>
}

