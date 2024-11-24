// src/App.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Messi_Img from '../assets/profile.png'
import { NavLink } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
  return (
     
    <div>
      <div className=''>
        <div className='h-screen w-screen p-2 sm:p-9 flex sm:flex-row justify-between flex-col gap-1'>
            <img className="rounded-xl w-full h-1/2 sm:h-full " src={Messi_Img} alt="img" />
            <div className='border flex flex-col justify-center p-6 sm:p-52 gap-5 border-gray-200 rounded-xl '>
              <h1 className='text-black text-4xl font-bold font-poppins'>Productive Mind</h1>
              <p className='text-gray-600 font-semibold text-sm'>with only the features you need , Organic mind is customized for individual seeking a stress free way to stay focused on their goal , projects and tasks. </p>
              <button
               className='bg-yellow-400 text-black text-center sm:px-40 px-20  border rounded-lg p-3 text-sm font-semibold'
               onClick={
                ()=>{
                  navigate('/signup')
                }
               }
              >Get Started</button>
            </div>
        </div>
      </div>
    </div>

  );
}

export default Home;
