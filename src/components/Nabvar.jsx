import React from 'react'
import { Link } from "react-router-dom";
import logo from '../../public/images/logo.jpg'

const Nabvar = () => {
  return (
   <>
  
     <nav className="bg-[#09b2c5] text-white px-6 py-4 shadow-lg flex justify-between items-center">
       <h1 className="text-2xl font-bold flex items-center gap-4 cursor-pointer"><img src={logo} alt="logo" className='h-[50px] w-[50px] rounded-full' /> <span className=' hidden md:block text-[24px]'>Smart Entry System</span></h1>
       <ul className="flex gap-6 text-[22px] font-semibold">
         <li>
           <Link to="/" className="hover:underline cursor-pointer">Home</Link>
         </li>
         <li>
         <Link to="/History" className="hover:underline cursor-pointer">History</Link>

         </li>
         <li>
           <Link to="/AutofaceAuthentygation" className="hover:underline cursour-pointer">Auto face Authentygation</Link>
         </li>
       </ul>
     </nav>
   </>
  )
}

export default Nabvar