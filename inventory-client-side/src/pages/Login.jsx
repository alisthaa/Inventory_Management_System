import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setUser } from '../app/slice/userSlice'
export default function Login() {
  const [validationError, setValidationError] = useState({});
    const navigate = useNavigate()
    const dispatch = useDispatch()
const handleSubmit=(e)=>{
    e.preventDefault()
    console.log("submitted");
    axios.post("http://localhost:3000/api/login",{
      email:e.target.email.value,
      password:e.target.password.value,})
      .then((res)=>{
        console.log(res.data.user);
        toast('succesfully logged in')
        navigate("/")
        dispatch(setUser(res.data.user))
        localStorage.setItem("token",res.data.token)
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
          toast.error("Invalid Credentials")
      })
}

  return <>
  <div className='flex items-center justify-center  h-[450px] md:w-96 mx-auto md:mt-20 shadow-lg shadow-orange-900'> 
    <form action="" className='grid grid-cols-1 gap-6 font-serif' onSubmit={handleSubmit}>
<div className='grid grid-cols-1 gap-3'> 
        <label for="email">Enter your Email</label>
        <input className='border border-orange-800 h-12 w-72 focus:outline-none py-2 px-2'
        type="text" 
        placeholder='email'
        id='email'
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
        <input className='border border-orange-800  md:h-12 md:w-72 focus:outline-none py-2 px-2'
        type="text" 
        name="password"
        id='password'
        placeholder='password'/>
        { 
      validationError && 
      <> <span className="text-sm text-red-500">{validationError.password}</span>
       </>
       }
</div>
        <button type='submit' className='btn h-12 mx-auto'>LogIn</button>

        <p>Don't have an Account? 
          <Link to={"/signup"} className='text-orange-900'> Create account </Link> 
        </p>
          
    </form>
  </div>
  </>
}
