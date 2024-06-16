import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const TopRes = () => {
  const[ slide, setSlide] = useState(0);
  const [ data, seData] = useState();
  const nextSlide = () => {
    if (slide < Category.length - 5) {
      setSlide(slide + 1);
    } else {
      setSlide(0); // Loop back to the beginning
    }
  };

  const prevSlide = () => {
    if (slide > 0) {
      setSlide(slide - 1);
    } else {
      setSlide(Category.length - 1); // Loop to the last slide
    }
  };
  return (
    <div className="max-w-[1200px] md:mx-auto gap-5 mx-2">
      <div className="flex flex-col my-5 items-center justify-between md:flex-row ">
        <div className="text-4xl font-bold">Top restaurant chains in Pune</div>
        <div className="flex">
        <div className=" cursor-pointer w-[30px] h-[30px] flex justify-center items-center bg-[#e2e2e7] rounded-full mx-2" onClick={prevSlide}>
            <FaArrowLeft />
          </div>
          <div className=" cursor-pointer w-[30px] h-[30px] flex justify-center items-center bg-[#e2e2e7] rounded-full mx-2" onClick={nextSlide}>
            <FaArrowRight />
          </div>
         
        </div>
      </div></div>
  )
}

export default TopRes



