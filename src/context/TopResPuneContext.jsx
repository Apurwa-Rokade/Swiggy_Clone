import React, { createContext, useState } from 'react';

export const TopResPuneContext = createContext();

export const TopResPuneProvider = ({ children }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("India");
  const [foodItems, setFoodItems] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [pendingArea, setPendingArea] = useState('Indian');

  const fetchAreas = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await response.json();
      setAreas(data.meals); // Assuming API response structure provides meals array
    } catch (error) {
      console.error('Error fetching areas:', error);
    }
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

  const applyAreaSelection = () => {
    setSelectedArea(pendingArea);
    setShowDropdown(false); // Hide dropdown after selection
    fetchFoodItemsByArea(pendingArea); // Fetch food items based on selected area
  };

  return (
    <TopResPuneContext.Provider
      value={{
        showDropdown,
        setShowDropdown,
        areas,
        setAreas,
        selectedArea,
        setSelectedArea,
        foodItems,
        setFoodItems,
        sortOrder,
        setSortOrder,
        pendingArea,
        setPendingArea,
        fetchAreas,
        fetchFoodItemsByArea,
        toggleSortOrder,
        applyAreaSelection,
      }}
    >
      {children}
    </TopResPuneContext.Provider>
  );
};
