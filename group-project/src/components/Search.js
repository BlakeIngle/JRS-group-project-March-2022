import React, { useContext } from "react";
// import { Context } from "../App";

export default function Search() {

//   var { http } = useContext(Context);

  function getDish() {
    // http.getDishesByQuery
    //   .then((res) => {
    //     console.log(res.data.dishes);
    //     // setBooks(res.data.dishes);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }

  return (
    <div className="search">
      <form>
        <input type="text" placeholder="Search Dishes"></input>
        <button type="submit" onClick={getDish}>
          Search
        </button>
      </form>
    </div>
  );
}
