import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login-SignUp/LoginPage';
import SignUpPage from './components/Login-SignUp/SignUpPage';
import HomePage from './components/HomePage/HomePage';
import ReviewCard from './components/ReviewCard/ReviewCard';
import FoodMap from './components/Map/FoodMap';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<HomePage />}>
            <Route path="/" element={<p>main page</p>}></Route>
            <Route path="login" element={<LoginPage />}></Route>
            <Route path="review" element={<ReviewCard />}></Route>
            <Route path="signup" element={<SignUpPage />}></Route>
            <Route path="map" element={<FoodMap />}></Route>
          </Route>
          <Route path="*" element={<div>404 - page does not exist</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;