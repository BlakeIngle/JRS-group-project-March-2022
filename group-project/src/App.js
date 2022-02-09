import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import HomePage from "./components/HomePage/HomePage";
import RestaurantCard from "./components/RestaurantCard/RestaurantCard";
import FoodMap from "./components/Map/FoodMap";
import DishPage from "./components/DishPage/DishPage";
import { createContext, useState, useEffect } from "react";
import { useLocalStorage } from "./services/localStorage.service";
import UserPage from "./components/UserPage/UserPage";

export const Context = createContext();

function App() {
  const storage = useLocalStorage();

  const [state, setState] = useState({
    user: undefined,
  });

  useEffect(() => {
    var activeUser = storage.getActiveUser();
    //TODO: check if token is expired,
    //    if yes, get a new token (log in again, optional)

    if (activeUser) {
      setState({ ...state, user: activeUser });
    }
  }, []);

  return (
    <Context.Provider
      value={{
        state,
        setState,
      }}
    >
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="" element={<HomePage />}>
              <Route path="/" element={<DishPage />}></Route>
              <Route path="login" element={<LoginPage />}></Route>
              <Route
                path="review/:reviewId"
                element={<RestaurantCard />}
              ></Route>
              <Route path="signup" element={<SignUpPage />}></Route>
              <Route path="map" element={<FoodMap />}></Route>
              <Route path="user/:userId" element={<UserPage />}></Route>
            </Route>
            <Route
              path="*"
              element={<div>404 - page does not exist</div>}
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Context.Provider>
  );
}

export default App;
