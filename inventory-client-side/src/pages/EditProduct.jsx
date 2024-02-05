import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
export default function EditProduct() {

  const { _id } = useParams();
const navigate = useNavigate()
  let initialValue = {
    title: "",
    price: "",
    category: "",
    description: "",
    quantity: "",
    image: null,
  };

  const [data, setData] = useState(initialValue);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [validationError, setValidationError] = useState({});

  console.log(_id);

  useEffect(() => {   
      axios.get(`http://localhost:3000/api/products/${_id}`)
        .then((res) => {
         setData(res.data.data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          toast.error("something went wrong please try again.");
        });
    
  },[]);


  const handleSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("quantity", data.quantity);
    formData.append("image", data.image);

    setisSubmitting(true);
console.log(formData);
     axios.put(`http://localhost:3000/api/products/${_id}`,formData,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setisSubmitting(false);
        console.log(res.data);
        toast("product updated.");
        navigate('/products')
      })
      .catch((err) => {
        setisSubmitting(false);
        if (err.response?.status == 400) {
          let errObj = {};
          err.response.data.errors.forEach((el) => {
            errObj[el.field] = el.message;
          });
          console.log(errObj);
          setValidationError(errObj);
        }
        console.log(err.response);
        toast.error("something went wrong");
      }); 
  };
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]:
        e.target.type == "file" ? e.target.files[0] : e.target.value,
    });
  };


  return <>
   <h1 className='text-5xl text-center font-serif text-orange-800 my-2'> Update Item </h1>

<form action="" className='flex justify-center' onSubmit={handleSubmit} >

<div className='form-group grid grid-cols-1 shadow-lg shadow-orange-900 p-10 '> 

<label htmlFor="" className="form-label required-field">Title</label>
<input 
value={data.title}
onChange={handleChange}
type="text" 
className="form-control"
name='title'
/>
{validationError.title && (
          <span className="text-sm text-red-500">
            {validationError.title}
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

{validationError.price && (
          <span className="text-sm text-red-500">
            {validationError.price}
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
{validationError.description && (
          <span className="text-sm text-red-500">
            {validationError.description}
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
<button type='submit' className='btn h-12 text-lg w-40'> {isSubmitting ? "Updating.." : "Update"} </button>
</div>
</div>

</form> 
  </>
}
