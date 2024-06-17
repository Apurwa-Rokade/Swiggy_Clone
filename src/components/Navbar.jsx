import React from 'react';
import swiggyLogo from '/assets/swiggy.svg';
import { IoSearch } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="flex md:flex-row items-center flex-col shadow-xl p-4 justify-between">
      <img src={swiggyLogo} alt="swiggy logo" style={{ width: '150px' }} />
      <div className="flex items-center relative h-100%">
        <input
          type="search"
          placeholder="Search for restaurant and food"
          className="h-10 w-72 p-2 focus:outline-none border-2 border-gray-300 bg-gray-200
           rounded-lg text-sm"
        />
        {/* Example of using an icon for search */}
        <IoSearch className="absolute right-2  text-slate-500 h-full" />
      </div>
    </nav>
  );
};

export default Navbar;
