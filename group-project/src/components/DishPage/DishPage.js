import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Emojis } from '../../assets/DishIcon';
import { useApi } from '../../services/api.service';
import '../DishPage/Dishes.css'
import DishSearch from '../Searches/DishSearch';
import RestaurantSearch from '../Searches/RestaurantSearch';

export default function DishPage() {

    const [hasReviews, setHasReviews] = useState(false)

    const { dishName } = useParams();
    const api = useApi();

    const [dish, setDish] = useState([]);

    function getDish() {
        api.getDishByName(dishName)
            .then(res => {
                const dish = res.data.dish;
                setDish(dish);
                // api.getTopRestaurants(res.data.id)
                // .then(res => {
                //      setRestaurants(res.data.restaurants)                   
                // })
                // .catch(err => {
                //     console.error(err)
                // })
            })
            .catch(err => {
                console.error(err)
            })
    };

    useEffect(() => {
        getDish();

    }, []);

    // console.log(dishName);

    return (
        <div>
            <div className='dish-page-root'>
                <h2 className='dish-name'>{Emojis[dish.name]}The Forking Best {dish.name}{Emojis[dish.name]}</h2>
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
            {!hasReviews &&
                <div>
                    <br />
                    <p className='placeholder-text'>Be the first to review this dish!</p>
                </div>}
            {/* RestaurantCards go here */}
        </div>
    );

}
