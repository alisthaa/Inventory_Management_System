import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function Signup() {
    const navigate = useNavigate()
    const [validationError, setValidationError] = useState({});

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post("http://localhost:3000/api/signup",{       
          name:e.target.name.value,
          email:e.target.email.value,
          password:e.target.password.value,
        })
          .then((res)=>{
            console.log(res.data);
            toast('signup succesful')
            navigate('/login')
          })
          .catch((err)=>{
            console.log(err);
            let errorMsg = ""
            err.response.data.errors.forEach(el =>{
                errorMsg+= `${el.field}: ${el.message},`
            }) 
            if (err.response?.status == 400) {
              let errObj = {};
              err.response.data.errors.forEach((el) => {
                errObj[el.field] = el.message;
              });
              console.log(errObj);
              setValidationError(errObj);
            }
          toast.error("Something Went Wrong")
          })
      } 
  return <>
   <div className='flex items-center justify-center  h-[500px] md:w-96 mx-auto md:mt-24 shadow-lg shadow-orange-900'> 
    <form action="" className='grid grid-cols-1 gap-6 font-serif' onSubmit={handleSubmit}>
<div className='grid grid-cols-1 gap-3'> 
        <label for="email">Enter your Name</label>
        <input className='border border-orange-800 h-12 w-72 focus:outline-none py-2 px-2'
        type="text" 
        placeholder='name'
        name='name'
        />
        { 
      validationError && 
      <> <span className="text-sm text-red-500">{validationError.name}</span>
       </>
       }
</div>              
<div className='grid grid-cols-1 gap-3'> 
        <label for="email">Enter your Email</label>
        <input className='border border-orange-800 h-12 w-72 focus:outline-none py-2 px-2'
        type="text" 
        placeholder='email'
        name='email'
        />
        { 
      validationError && 
      <> <span className="text-sm text-red-500">{validationError.email}</span>
       </>
       }
</div>      
<div className='grid grid-cols-1 gap-3'> 
        <label for='password'>Enter Your Password</label>
        <input className='border border-orange-800 h-12 w-72 focus:outline-none py-2 px-2'
        type="text" 
        name="password"
        placeholder='password'/>
       { 
      validationError && 
      <> <span className="text-sm text-red-500">{validationError.password}</span>
       </>
       }
</div>
        <button type='submit' className='btn h-12 mx-auto'>SignUp</button>
          
    </form>
  </div>
  </>
}
