import React, { useContext } from 'react'
import './FoodDisplay.css'
import {StoreContext} from '../../contexts/storeContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {
    const {food_list} = useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
        <h1>Top dishes near you</h1>
        <div className="food-list">
            {food_list.map((item, idx) => {
                if(category==="All" || category===item.category) {
                    return <FoodItem key={idx} {...item} id={item._id}/>
                }
            })}
        </div>
    </div>
  )
}

export default FoodDisplay