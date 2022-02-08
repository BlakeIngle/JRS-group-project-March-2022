import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Emojis } from '../../assets/DishIcon';
import { useApi } from '../../services/api.service';
import '../DishPage/Dishes.css'
import DishSearch from '../Searches/DishSearch';
import RestaurantSearch from '../Searches/RestaurantSearch';


export default function DishPage() {

    const {dishId} = useParams();
    const api = useApi();

    const [dish, setDish] = useState([]);


    function getDish(dishId) {
        api.getDishById(dishId)
            .then(res => {
                setDish(res.data.dish)
            })
            .catch(err => {
                console.error(err)
            })
    };

    useEffect(() => {
        getDish(dishId);
    }, []);

console.log(dish);

    return (
        <div>
            <div className='dish-page-root'>
                <h2> {Emojis[dish.name] }{dish.name}</h2>
                <hr />
                <RestaurantSearch />
                {/* <div className='dishes-list'>
                    {dishes.map(dish => {
                        return (
                            <DishItem key={dish.id}
                                {...dish}
                            />
                        )
                    })}
                </div> */}
            </div>
            {/* RestaurantCards go here */}
        </div>
    );

}
