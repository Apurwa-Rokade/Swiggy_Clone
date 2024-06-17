import React, { useState } from 'react'
import { MdFilterAlt } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { FaSort } from "react-icons/fa";

const TopResPuneNav = ({setShowDropdown,showDropdown,toggleSortOrder, areas,setPendingArea,applyAreaSelection}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAreas = areas.filter(area =>
    area.strArea.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(areas)
  const items= [
  {
    name:"Filter",
    icon:<MdFilterAlt />,
  },
  {
    name:"Sort By",
    icon:<FaSort />,
    icon1:<IoIosArrowDown />,
  },
  {
    name:"Fast Delivery",
    icon:"",
  }
  ,{
    name:"New On Swiggy",
    icon:"",
  },
  {
    name:"Ratings 4.5+",
    icon:"",
  },
  {
    name:"Pure Veg",
    icon:"",
  },
  {
    name:"Rs.300-Rs.600",
    icon:"",
  }
  ,{
    name:"Less Than Rs.300",
    icon:"",
  }


]
  return (
    <div className='max-w-[1200px] flex flex-wrap  my-5 md:mx-auto gap-5 mx-2 relative'>
      
        <div className='flex gap-4 flex-wrap items-center justify-center'>
         {items.map(
          (item,index)=>{
            return(
              <div key={index}>
                <div className='flex font-medium items-center gap-2 border-2 rounded-xl bg-#ffffff border-[#e2e2e7] p-2 cursor-pointer'
                onClick={() => {
                  if (item.name === 'Filter') {
                    setShowDropdown(!showDropdown);
                  } else if (item.name === 'Sort By') {
                    toggleSortOrder();
                  }
                }}
                >{item.name}{item.icon}</div>
              </div>
            )
          })}
           
        </div>

        {showDropdown && (
      <div className='absolute top-12 left-0 bg-white shadow-lg rounded-md p-4 transition-transform transform origin-top-left z-50' style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <p className='text-lg font-semibold mb-2'>Filter By Area</p>
        <input
          type='text'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='mb-2 p-2 w-full border rounded-md'
        />
        <ul>
          {filteredAreas.map((area) => (
            <li key={area.strArea}>
              <label className='flex items-center cursor-pointer'>
                <input
                  type='radio'
                  name='area'
                  value={area.strArea}
                  onChange={() => setPendingArea(area.strArea)}
                  className='mr-2'
                />
                {area.strArea}
              </label>
            </li>
          ))}
        </ul>
        <button
          onClick={applyAreaSelection}
          className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-md'
        >
          Apply
        </button>
      </div>
    )}
    </div>
  )
}

export default TopResPuneNav