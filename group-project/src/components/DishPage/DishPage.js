import React, { useEffect, useState } from 'react';
import { Emojis } from '../../assets/DishIcon';
import { useApi } from '../../services/api.service';
import '../DishPage/DishPage.css'


export default function DishPage({ dishId, name, meal, cuisine }) {

    const [dishes, setDishes] = useState([]);

    const api = useApi();

    function getDishes() {
        api.getAllDishes()
            .then(res => {
                setDishes(res.data.dishes)
            })
            .catch(err => {
                console.error(err)
            })
    };

    useEffect(() => {
        getDishes();
        // console.log(dishes);
    }, []);


    function DishItem({ id, name, meal, cuisine }) {
        return (
            <div className='dish-item'>{Emojis[name]} {name}</div>
        )
    }


    return (
        <div className='dish-page-root'>
            <div className='dishes-list'>
                    {dishes.map(dish => {
                        return (
                            <DishItem key={dish.id}
                                {...dish}
                            />
                        )
                    })}
            </div>
            {/* RestaurantCards go here */}
        </div>
    );

}
