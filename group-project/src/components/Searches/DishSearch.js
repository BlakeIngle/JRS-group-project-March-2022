import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Emojis } from "../../assets/DishIcon";
import { useApi } from "../../services/api.service";
import { useLocation } from 'react-router';
import '../DishPage/Dishes.css'

export default function DishSearch() {

  const location = useLocation();

  var api = useApi();
  var [dishText, setDishText] = useState("");
  const [dishes, setDishes] = useState([]);

  function isSimilar(subString, mainString, meal, cuisine) {
    if (!subString) {
      return true;
    }
    subString = formatStr(subString);
    mainString = formatStr(mainString);
    meal = formatStr(meal);
    cuisine = formatStr(cuisine);

    const matchesName = mainString.includes(subString);
    const matchesMeal = meal.includes(subString);
    const matchesCuisine = cuisine.includes(subString);

    if (matchesName) {
      return matchesName
    } else if (matchesMeal) {
      return matchesMeal
    } else {
      return matchesCuisine
    }
  }

  function formatStr(s) {
    return s
      .toString()
      .toLowerCase()
      .replace(/[~`!@ #$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_]/g, "")
      .replace("-", "");
  }

  useEffect(() => {
    // get the dishes
    api
      .getAllDishes()
      .then((res) => {
        setDishes(res.data.dishes);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    // clear search bar when logo is clicked from homepage
    setDishText('')
  }, [location])

  return (
    <div className="search">
      <div className="search-bar">
        <FontAwesomeIcon className="icon" icon={faSearch} />
        <input
          type="text"
          placeholder="Search Dishes"
          value={dishText}
          onChange={(e) => {
            setDishText(e.target.value);
          }} />
      </div>
      <div className="dish-container">
        {dishes
          ?.filter((d) => isSimilar(dishText, d.name, d.meal, d.cuisine))
          .map((d, i) => (
            <div key={i}>
              <Link to={`dish/${d.name}`}>
                <div className="dish-item"
                >{Emojis[d.name]} {d.name}
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
