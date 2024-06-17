import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const FoodItemModal = () => {
  const { id } = useParams();
  console.log(useParams())
  
  const [foodItem, setFoodItem] = useState(null);

  useEffect(() => {
    const fetchFoodItemDetails = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        if (data.meals && data.meals.length > 0) {
          setFoodItem(data.meals[0]);
        } else {
          // Redirect to home if food item not found
         
        }
      } catch (error) {
        console.error('Error fetching food item details:', error);
      }
    };

    fetchFoodItemDetails();
  }, [id]);



  return (
    <>
    
    {foodItem ? (
      <div className='relative top-0 left-0 w-full h-full  flex justify-center items-center z-50 overflow-auto max-w-[1200px] md:mx-auto  my- gap-5 mx-2'>
      <div className='bg-white p-4 rounded-md shadow-lg max-w-3xl w-full'>
        <h2 className='text-2xl font-semibold mb-4'>{foodItem.strMeal}</h2>
        <img
          src={foodItem.strMealThumb}
          alt={foodItem.strMeal}
          className='w-full h-auto rounded-lg mb-4'
          style={{ maxHeight: '500px'}} // Adjust the maximum height of the image
        />
        <div className='mb-4'>
          <h3 className='text-lg font-semibold mb-1'>Category</h3>
          <p>{foodItem.strCategory}</p>
        </div>
        <div className='mb-4'>
          <h3 className='text-lg font-semibold mb-1'>Area</h3>
          <p>{foodItem.strArea}</p>
        </div>
        <div className='mb-4'>
          <h3 className='text-lg font-semibold mb-1'>Instructions</h3>
          <p>{foodItem.strInstructions}</p>
        </div>
        <div className='mb-4'>
          <h3 className='text-lg font-semibold mb-1'>Ingredients</h3>
          <ul>
            {Object.keys(foodItem)
              .filter((key) => key.startsWith('strIngredient') && foodItem[key])
              .map((key, index) => (
                <li key={index}>
                  {foodItem[key]} - {foodItem[`strMeasure${key.slice(13)}`]}
                </li>
              ))}
          </ul>
        </div>
        <Link to='/FoodMenue'
          className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none'
        >
          Close
        </Link>
      </div>
    </div>
    
      ): ""}
    </>
  );
};

export default FoodItemModal;
