import React from 'react'
import { Link } from 'react-router-dom';
import { LuArrowRight } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png"
function Navbar() {
  const navigate = useNavigate();
  return (
    <div>
      <div className=" flex justify-between items-center p-4">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="w-14 inline-block"
          />
          <h1 className='inline-block text-2xl font-bold ml-1'>Apex Ai</h1>
        </Link>
        <button onClick={()=>navigate("/Login")}
          className="bg-gradient-to-t from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-4xl cursor-pointer">
          Login <LuArrowRight className="inline-block ml-2" />
        </button>
      </div>
      <div></div>
    </div>
  );
}

export default Navbar


