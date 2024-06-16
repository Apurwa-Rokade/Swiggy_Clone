import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FoodItemModal from './components/FoodItemModal';
import TopResPune from './components/TopResPune';
import Footer from './components/Footer';
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <div className='font-sans'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/FoodMenue" element={<Home/>}/>
        <Route path="/Deatils/:id"element={<FoodItemModal/>}  />
      </Routes>
     <Footer/>
    </div>
  </BrowserRouter>
  )
}

export default App
