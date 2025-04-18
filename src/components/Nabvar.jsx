import React from 'react'
import { Link } from "react-router-dom";

const Nabvar = () => {
  return (
   <>
  
     <nav className="bg-blue-600 text-white px-6 py-4 shadow-lg flex justify-between items-center">
       <h1 className="text-2xl font-bold">🧠 Smart Entry System</h1>
       <ul className="flex gap-6 text-lg">
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