import React, { useEffect, useState } from 'react'
import TopResPuneNav from './TopResPuneNav';
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';

const TopResPune = () => {

  const [showDropdown, setShowDropdown] = useState(false);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("India");
  const [foodItems, setFoodItems] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [pendingArea, setPendingArea] = useState('Indian');
  useEffect(() => {
    fetchAreas();
    fetchFoodItemsByArea('Indian'); 
  }, []);

  const fetchAreas = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await response.json();
      setAreas(data.meals); // Assuming API response structure provides meals array
    } catch (error) {
      console.error('Error fetching areas:', error);
    }
  };

 
  const applyAreaSelection = () => {
    setSelectedArea(pendingArea);
    setShowDropdown(false); // Hide dropdown after selection
    fetchFoodItemsByArea(pendingArea); // Fetch food items based on selected area
  };

  const fetchFoodItemsByArea = async (area) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
      const data = await response.json();
      const foodItemsWithRatings = data.meals.map(meal => ({
        ...meal,
        rating: (Math.random() * 5).toFixed(1) // Generate random rating between 0 and 5
      }));
      setFoodItems(foodItemsWithRatings);
    } catch (error) {
      console.error(`Error fetching food items for area ${area}:`, error);
    }
  };
  const sortFoodItems = () => {
    const sortedItems = [...foodItems].sort((a, b) => a.strMeal.localeCompare(b.strMeal));
    setFoodItems(sortedItems);
    console.log(selectedArea,"is the selected area")
  };


  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sortedItems = [...foodItems].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a.strMeal.localeCompare(b.strMeal);
      } else {
        return b.strMeal.localeCompare(a.strMeal);
      }
    });

    setFoodItems(sortedItems);
  };


  return (
    <div className="max-w-[1200px] md:mx-auto gap-5 mx-2">
    

       <div className="text-4xl md:text-left text-center my-5 font-bold leading-12 tracking-tight text-gray-700">Restaurants with online food delivery in {selectedArea}</div>
      <TopResPuneNav 
      showDropdown={showDropdown} 
      setShowDropdown={setShowDropdown}
      sortFoodItems={sortFoodItems}
      areas={areas}
      toggleSortOrder={toggleSortOrder}
      setPendingArea={setPendingArea}
      applyAreaSelection={applyAreaSelection}
      />
      {foodItems.length ==0 &&<div className=' text-center text-4xl font-bold leading-6 tracking-tight text-gray-700'>Loading...........</div>}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mt-4'>
        {foodItems.map((foodItem) => (
          <div key={foodItem.idMeal} className='bg-white  shadow-md rounded-lg p-4'>
          <Link to={`/Deatils/${foodItem.idMeal}`}>
            <img
              src={foodItem.strMealThumb}
              alt={foodItem.strMeal}
              className='w-full h-auto rounded-lg mb-2'
            />
            <p className='flex text-lg  tracking-tight justify-center items-center text-gray-700 gap-1'>Rating: {foodItem.rating} <FaStar /></p>
            <h3 className=' font-bold text-lg leading-6 text-center tracking-tight text-gray-700 mb-2'>{foodItem.strMeal}</h3>
            </Link>
          </div>
        ))}
      </div>
  
    </div>
  )
}

export default TopResPune