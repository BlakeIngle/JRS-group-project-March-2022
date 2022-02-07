import React from 'react';
import dishIcons from '../../assets/dishEmoji.json'


export default function DishPage({ dishId, name, meal, cuisine }) {

    dishId = 1;

    const dishIcon = dishIcons[(dishId - 1)].emoji;


    return (
        <div className='dish-page-root'>
            <h1>The Forking Best {name}</h1>
            {/* RestaurantCards go here */}
        </div>
    );
}
