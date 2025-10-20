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
          className="bg-gradient-to-t from-pink-500 to-orange-400 text-white px-4 py-2 rounded-4xl cursor-pointer">
          Login <LuArrowRight className="inline-block ml-2" />
        </button>
      </div>
      <div></div>
    </div>
  );
}

export default Navbar


//https://developer-acme-api.apiwiz.io/image/acme-api/637740a9/group-2-2x-6-zg-sv-ar-b7-s-ijlf-q2-nk-TXfBC0_c5OO7L4m5NTnE_.png?type=s3