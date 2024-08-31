import React, {useContext, useState} from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../contexts/storeContext';

const FoodItem = ({id,name,price,description,image}) => {

    const {cartItems, setCartItems, addToCart, removeFromCart, url} = useContext(StoreContext);
    
  return (
    <div className='food-item'>
        <div className="food-item-img">
            <img src={`${url}/images/${image}`} alt="" />
            {!cartItems[id]
                ?<img onClick={()=> addToCart(id)} className='add' src={assets.add_icon_white}/>:
                <div className='item-counter'>
                    <img onClick={()=> removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img onClick={()=> addToCart(id)} src={assets.add_icon_green} alt="" />
                </div>
                }
        </div>
        <div className="food-item-content">
            <div className='food-item-name-rating'>
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className='food-item-description'>{description}</p>
            <p className='food-item-price'>${price}</p>
        </div>
    </div>
  )
}

export default FoodItem