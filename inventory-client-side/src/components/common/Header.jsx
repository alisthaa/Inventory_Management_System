import React from "react";
import { FaHome, FaPlus, FaUser } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../app/slice/userSlice";
export default function Header() {
  const reduxStore = useSelector((store) => store);
  const user = reduxStore.user.value;
  const dispatch = useDispatch();
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
            <Link to={"products"}>
              <li className="flex items-center gap-2">
                {" "}
                View Items <MdInventory />{" "}
              </li>{" "}
            </Link>
            <Link to={"addProduct"}>
              {" "}
              <li className="flex items-center gap-2">
                {" "}
                Add Item <FaPlus />{" "}
              </li>
            </Link>
           

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
