import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Home() {
  const reduxStore = useSelector((store) => store);
  const user = reduxStore.user.value;
  return <>

  <div className="bg-[url('./assets/images/inventory-bg.jpg')] bg-cover bg-center h-screen">
  <h1 className='text-lg md:text-5xl pt-24 text-center text-orange-900 font-bold font-serif '>INVENTORY MANAGEMENT SYSTEM</h1>
  <p className='text-center text-base font-serif md:text-xl mt-2'>Because, "The inventory goes down the elevator every night."</p>
  


<div className='flex items-center justify-center mt-28'> 
{user? 
<>
<Link to={'products'}> <button className='btn hover:text-orange-800 hover:bg-white w-auto md:w-60 text-2xl' type='button'>View My Products</button> </Link>
</>
:
<> 
<div className='grid grid-cols-1 gap-5'>
    <Link to={'login'}> <button className='btn hover:text-orange-800 hover:bg-white' type='button'>Log In</button> </Link>
    <Link to={'signup'}> <button type='button ' className='btn hover:text-orange-800 hover:bg-white'>Sign Up</button>  </Link>
</div>
</>
}


</div>



  </div>
  </>
}
