import React from "react";

export default function FoodMap() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
    },
    (error) => {
      console.error(error);
    }
  );


  return (
    <div>
      <p>map page works</p>
    </div>
  );
}
