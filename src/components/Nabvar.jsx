import React from 'react'
import { Link } from "react-router-dom";

const Nabvar = () => {
  return (
   <>
  
     <nav style={{ height: "120px", background: "linear-gradient(135deg, #74ebd5, #ACB6E5)"}} className="sticky top-0 z-50 bg-blue-600 text-white px-6 py-4 shadow-lg flex justify-between items-center">
       <h1 className="text-2xl font-bold">🧠 Smart Entry System</h1>
       <ul className="flex gap-6 text-lg">
         <li>
           <Link to="/" className=" cursor-pointer">Home</Link>
         </li>
         <li>
         <Link to="/History" className=" cursor-pointer">History</Link>

         </li>
         <li>
           <Link to="/AutofaceAuthentygation" className=" cursour-pointer">Auto face Authentygation</Link>
         </li>
       </ul>
     </nav>
   </>
  )
}

export default Nabvar