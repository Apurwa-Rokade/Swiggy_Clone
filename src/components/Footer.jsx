import React from 'react';
import { SiSwiggy } from "react-icons/si";
import { FaCopyright } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="relative leading-12 tracking-tight bottom-0 w-full bg-black h-20 text-white flex flex-col items-center justify-center">
      <div className="flex items-center gap-2">
        <SiSwiggy className="text-red-500 text-3xl" />
        <span className="font-bold text-xl">Swiggy</span>
      </div>
      <div className='flex items-center gap-2 '><FaCopyright /> 2024 Apurva echnology Pvt Ltd</div>
    </footer>
  );
};

export default Footer;
