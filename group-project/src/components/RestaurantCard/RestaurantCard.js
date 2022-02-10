import React from 'react';
import './RestaurantCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faMapMarkerAlt, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Emojis } from '../../assets/DishIcon';

export default function RestaurantCard(review) {

  review = {
    userId: "1",
    userName: "Greg",
    body: "It's simply the best, better than all the rest",
    restaurantId: "fd7843wnk393",
    restaurantName: "Poe's Tavern",
    dishId: 1,
    dishName: "burger"
  };


  const dishIcon = Emojis[review.dishName];

  return (
    <div className='restaurant-card-root'>
      <div className='top-row'>
        <span className='dish-icon'>{dishIcon}</span>
        <span><h2>{review.restaurantName}</h2></span>
        <span className='links'>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <FontAwesomeIcon icon={faExternalLinkAlt} />
        </span>
      </div>

      <p>{review.userName} says: "{review.body}"</p>
      <div className='agree-icon'><FontAwesomeIcon icon={faThumbsUp} />
      </div>
    </div>
  );
}
