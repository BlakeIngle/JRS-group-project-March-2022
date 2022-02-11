import React, { useRef, useState } from 'react'
import './ReviewForm.css'
import RestaurantSearch from '../Searches/RestaurantSearch'
import { useLocation } from 'react-router'
import { Emojis } from '../../assets/DishIcon';

export default function ReviewForm() {

    const location = useLocation();
    const dishName = location.pathname.split("/")[2];
    const [restaurantName, setRestaurantName] = useState(null);
    const formRef = useRef(null);


    function handleCancel() {
        formRef.current.classList.toggle("hidden")
        setRestaurantName(null);
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className='review-form-root' ref={formRef}>
            <form onSubmit={handleSubmit}>
                <h2>Who has the Forking Best {dishName}?</h2>
                {restaurantName &&
                    <div className='user-selection'>
                        <div className='label'>
                            Your selection:
                        </div>
                        <div className='selected-restaurant'>
                            <span>{restaurantName}</span>
                            <span>{Emojis[dishName]}</span>
                        </div>
                        <div className='review-body'>
                            <label className='label' htmlFor='reviewBody'>Optional review:</label>
                            <textarea className='text-input' name="reviewBody" maxLength={255} rows={5}></textarea>
                            {/* <input className='text-input' type="text" name="reviewBody"></input> */}
                            <div className=' label char-limit'>(255 char max)</div>
                        </div>
                    </div>}
                <RestaurantSearch restaurantName={restaurantName} setRestaurantName={setRestaurantName} />
                <div className='buttons'>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )

    // function RestaurantSearch() {
    //     const http = useApi();

    //     var [inputText, setInputText] = useState("");
    //     var [restaurantsResults, setRestaurantsResults] = useState([]);

    //     const [searchTimeout, setSearchTimeout] = useState(null);

    //     function onInputChange(e) {
    //         setInputText(e.target.value);
    //     }

    //     useEffect(() => {
    //         clearTimeout(searchTimeout);

    //         setSearchTimeout(
    //             setTimeout(() => {
    //                 if (inputText) {
    //                     http
    //                         .getRestaurantsByName(inputText)
    //                         .then((results) => {
    //                             if (results.data) {
    //                                 setRestaurantsResults(results.data.restaurants);
    //                             }
    //                         })
    //                         .catch((err) => {
    //                             console.error(err);
    //                         });
    //                 }
    //             }, 1500)
    //         );
    //     }, [inputText]);

    //     return (
    //         <div className="search-root">
    //             <input className='text-input' type="text" value={inputText}
    //                 onChange={onInputChange}
    //                 placeholder="Search restaurants"
    //             />
    //             <Restaurants restaurants={restaurantsResults} />
    //         </div>
    //     );
    // }

    // function Restaurants({ restaurants }) {
    //     return (
    //         <div className="restaurants-list">
    //             {restaurants.map((restaurant) => (
    //                 <Restaurant key={restaurant.id} name={restaurant.name} address={restaurant.location.address1} />
    //             ))}
    //         </div>
    //     );
    // }

    // function Restaurant({ name, address }) {

    //     function updateRestaurant() {
    //         setRestaurantName(name)
    //     }
    //     return (
    //         <div className="restaurant"
    //             onClick={updateRestaurant}>
    //             <div>{name}</div> <div className='address'>{address}</div>
    //         </div>
    //     );
    // }

}