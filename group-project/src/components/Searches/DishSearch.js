import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Emojis } from "../../assets/DishIcon";
import { useApi } from "../../services/api.service";
import '../DishPage/DishPage.css'

export default function DishSearch() {

  var api = useApi();
  var [dishText, setDishText] = useState("");
  const [dishes, setDishes] = useState([]);

  function isSimilar(subString, mainString) {
    if (!subString) {
      return true;
    }
    subString = formatStr(subString);
    mainString = formatStr(mainString);

    return mainString.includes(subString);
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

  return (
    <div className="search">
      <FontAwesomeIcon className="icon" icon={faSearch} />
      <input
        type="text"
        placeholder="Search Dishes"
        value={dishText}
        onChange={(e) => {
          setDishText(e.target.value);
        }}
      />
      <div className="dishes-list">
        {dishes
          ?.filter((d) => isSimilar(dishText, d.name))
          .map((d, i) => (
            <div className="dish-item"
              key={i}>{Emojis[d.name]}{d.name}</div>
          ))}
      </div>
    </div>
  );
}
