import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { CiEdit, CiShoppingCart, CiViewList } from "react-icons/ci";
import { TbMoneybag } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";
import { FaEye, FaRupeeSign, FaShoppingBasket, FaShoppingCart, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';
export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .get('http://localhost:3000/api/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setProducts(res.data.data);
      });
  }, []);

  const totalProducts = products.length;
  console.log(totalProducts);

  const totalStoreValue = products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
  console.log("storeValue",totalStoreValue);

  const outOfStockProducts = products.filter((product) => product.quantity === 0);
  console.log("outOfStock",outOfStockProducts.length);
  let outOfStockCount = outOfStockProducts.length

  const handleDelete=(props)=>{
    //e.preventDefault();
    let token = localStorage.getItem("token");
console.log(props._id);
axios.delete(`http://localhost:3000/api/products/${props._id}`,{
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
.then((res) => {
  toast('Item Deleted')
 })
 .catch((err) => {
   console.log(err);
   toast.error("something went wrong please try again.");
 });

  }


  return <>
  <div className='flex gap-3 md:gap-32 justify-center text-white text-lg my-5'>

    <div className=' md:h-20 md:w-52 border bg-orange-400 '> 
    <div className='flex items-center justify-center gap-2 text-xl'> 
    <CiShoppingCart/> 
    Total Products 
    </div>
    <div className='flex items-center justify-center text-3xl'> 
    ({totalProducts})
    </div>
    </div>


    <div className=' md:h-20 md:w-52 border  bg-green-500 '> 
    <div className='flex items-center justify-center gap-2 text-xl'> 
    <TbMoneybag/> 
    Total Store Value 
    </div>
    <div className='flex items-center justify-center text-3xl'> 
    ({totalStoreValue}) 
    </div>
    </div>


    <div className=' md:h-20 md:w-52 border bg-red-500 '> 
    <div className='flex items-center justify-center gap-2 text-xl'> 
    <RxCross1/> 
    Out of Stock 
    </div>
    <div className='flex items-center justify-center text-3xl'> 
    ({outOfStockCount}) 
    </div>
    </div>


  </div>
<div className="container">
      <table className="w-full">
        <thead>
          <tr>
            <th className="border-2 md:px-4 md:py-2">Name</th>
            <th className="hidden md:block md:border-2 md:px-4 md:py-2">Category</th>
            <th className="border-2 px-4 py-2">Price</th>
            <th className="border-2 px-4 py-2">Quantity</th>
            <th className="hidden md:block md:border-2 md:px-4 md:py-2">Value</th>
            <th className="border-2 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr>
                <td className="border-2 px-1 py-1 md:px-4 md:py-2">{product.title}</td>
                <td className="border-2 hidden md:block px-1 py-1 md:px-4 md:py-2">{product.category}</td>
                <td className="border-2 px-1 py-1 md:px-4 md:py-2">{product.price}</td>
                <td className="border-2 px-1 py-1 md:px-4 md:py-2">{product.quantity}</td>
                <td className="md:border-2 hidden md:block px-1 py-1 md:px-4 md:py-2">{product.price*product.quantity}</td>
                <td className="border-2 px-1 py-1 md:px-4 md:py-2 ">
                  <div className='flex items-center justify-center gap-2 md:gap-8'> 
                  <div>
                    <Link to={`/products/${product._id}`}>
                    <FaEye/>
                    </Link>
                  </div>
                   <div> 
                    <Link to={`/products/edit/${product._id}`}>
                    <CiEdit/>
                    </Link>
                    </div>
                    <div> 
                     <FaTrash onClick={()=>{
                      handleDelete(product)
                     }}/>
                     </div>
                     </div>
                    </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </>
}
