import React from "react";
import { FaHome, FaPlus, FaUser } from "react-icons/fa";

import { MdInventory } from "react-icons/md";
import { Link } from "react-router-dom";
export default function Header() {
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
            <Link to={"login"}>
              {" "}
              <li className="flex items-center gap-2">
                {" "}
                Login <FaUser />{" "}
              </li>{" "}
            </Link>
          </ul>
        </nav>
      </header>
    </>
  );
}
