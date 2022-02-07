import React, { useEffect, useState } from "react";
import { useApi } from "../../services/axios.services";

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
      <input
        type="text"
        placeholder="Search Dishes"
        value={dishText}
        onChange={(e) => {
          setDishText(e.target.value);
        }}
      />
      {dishes
        ?.filter((d) => isSimilar(dishText, d.name))
        .map((d, i) => (
          <p key={i}>{d.name}</p>
        ))}
    </div>
  );
}
