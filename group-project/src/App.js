import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import HomePage from './components/HomePage/HomePage';
import RestaurantCard from './components/RestaurantCard/RestaurantCard';
import FoodMap from './components/Map/FoodMap';
import DishPage from './components/DishPage/DishPage';
import UserPage from './components/UserPage/UserPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<HomePage />}>
            <Route path="/" element={<DishPage />}></Route>
            <Route path="login" element={<LoginPage />}></Route>
            <Route path="review" element={<RestaurantCard />}></Route>
            <Route path="signup" element={<SignUpPage />}></Route>
            <Route path="map" element={<FoodMap />}></Route>
            <Route path="user" element={<UserPage />}></Route>
          </Route>
          <Route path="*" element={<div>404 - page does not exist</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;