import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {

  return (
    <div className="w-full h-max bg-gray-700 flex flex-row items-center justify-start p-2 px-4">
      <div className="p-3 py-1 text-gray-100 text-lg rounded-md font-medium cursor-pointer hover:text-gray-200 hover:bg-slate-800 transition ease-in"><Link to="/login">Login</Link></div>
      <div className="p-3 py-1 text-gray-100 text-lg rounded-md font-medium cursor-pointer hover:text-gray-200 hover:bg-slate-800 transition ease-in"><Link to="/register">Register</Link></div>
    </div>
  );
};

export default Navbar;
