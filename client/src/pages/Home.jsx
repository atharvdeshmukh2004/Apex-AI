import React from 'react'
import Navbar from '../components/Navbar'
import Features from '../components/Features';
import { LuArrowRight } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';


  function Home() {
    const navigate = useNavigate();
    
  return (
    <div className="min-h-screen bg-gradient-to-br  from-blue-100 to-purple-100 p-4">
      <Navbar />
      <div className="text-center">
        <h1
          className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl max-w-8xl mt-5 
               bg-gradient-to-b from-blue-600 to-purple-600 text-transparent bg-clip-text mx-auto
               "
        >
          Find Your Ideal Career With AI
          <span className="text-black">✨</span>
        </h1>

        <p className="text-3xl mt-4 md:text-base font-bold text-gray-800 mb-8 max-w-8xl">
          Advance your career with personalized guidance, roadmap generator and
          AI tools for Professional success.
        </p>

        <button
          onClick={() => navigate("/Login")}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-4 rounded cursor-pointer"
        >
          Get Started <LuArrowRight className="inline-block ml-2" />
        </button>

        <Features />
      </div>
    </div>
  );
}


export default Home