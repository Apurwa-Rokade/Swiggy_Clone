import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Category = () => {
  const [Category, setCategory] = useState([]);
  const [error, seterror] = useState(null);
  const[ slide, setSlide] = useState(0)
  const fetchcatergory = async () => {
    try {const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const data = await response.json();
    setCategory(data.categories);
  }
  catch(error){
    seterror(error);
    console.log("Error in fetch API", error)
  }
  };
  useEffect(() => {
    fetchcatergory();
    console.log("data is ", Category);
  }, []);

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
        <div className="text-4xl md:text-left text-center my-5 font-bold leading-12 tracking-tight text-gray-700">what's on your mind?</div>
        <div className="flex">
        <div className=" cursor-pointer w-[30px] h-[30px] flex justify-center items-center bg-[#e2e2e7] rounded-full mx-2" onClick={prevSlide}>
            <FaArrowLeft />
          </div>
          <div className=" cursor-pointer w-[30px] h-[30px] flex justify-center items-center bg-[#e2e2e7] rounded-full mx-2" onClick={nextSlide}>
            <FaArrowRight />
          </div>
         
        </div>
      </div>
      
      {error && <div className="text-red-500">Error: {error}</div>}
        <div className="flex overflow-hidden  my-9">
        {Category.map((item, index) => {
          return (
          <div key= {item.idCategory} className="w-[200px] shrink-0 flex items-center justify-center mx-4"
          style={
            {transform :`translateX(-${slide * 100}%)`}
          }>
          {/* <Link to={``}> */}
          <div className="flex-col flex items-center ">
          <div className="flex rounded-full w-full items-center">
          <img src={item.strCategoryThumb}  alt={item.strCategory}/>
          </div>
           <div className="text-2xl text-stone-500 font-medium">{item.strCategory}</div>
           </div>
          {/* </Link> */}
          </div>
          );
        })}
        </div>
        <hr className="my-4 border-2"/>
      </div>
  
  );
};

export default Category;
