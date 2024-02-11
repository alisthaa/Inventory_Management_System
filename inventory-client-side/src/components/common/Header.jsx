import React from "react";
import { FaHome, FaPlus, FaUser } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/slice/userSlice";
import { toast } from "react-toastify";
export default function Header() {
  const reduxStore = useSelector((store) => store);
  const user = reduxStore.user.value;
  const dispatch = useDispatch();
  const navigate= useNavigate()
  const handleLogout =()=>{
    dispatch(logout())
  }
  return (
    <>
      <header>
        <nav className="bg-orange-800 h-auto md:h-14 items-center flex ">
          <ul className=" container text-base md:text-xl  font-serif text-white md:flex  md:gap-28 ">
            <Link to={"/"}>
              {" "}
              <li className="flex items-center gap-2">
                {" "}
                Home <FaHome />{" "}
              </li>{" "}
            </Link>
           
              <li onClick={(event)=>{
                event.preventDefault()
                user? navigate('/products'): toast.error('login required')
              }} className="flex items-center gap-2 cursor-pointer">
                {" "}
                View Items <MdInventory />{" "}
              </li>{" "}
          
              {" "}
              <li onClick={(event)=>{
                event.preventDefault()
                user? navigate('/products/add'): toast.error('login required')
              }}
              className="flex items-center gap-2 cursor-pointer">
                {" "}
                Add Item <FaPlus />{" "}
              </li>
            
           

              {user? <> 
              <li> User : {user.name} </li>
              <li className="flex items-center gap-2 cursor-pointer" onClick={handleLogout} >             
                Logout <IoMdLogOut />
              </li> 
              </>
              : 
              <>
               <Link to={"login"}>
              <li className="flex items-center gap-2">             
                Login <FaUser />
              </li>
              </Link>
              </>
              }

           

          </ul>
        </nav>
      </header>
    </>
  );
}
