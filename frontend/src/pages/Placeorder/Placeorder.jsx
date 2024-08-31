import React, { useContext } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../contexts/storeContext'
import { Link } from 'react-router-dom'

const Placeorder = () => {
    const {totalCart} = useContext(StoreContext)
  return (
    <form className='place-order'>
        <div className='place-order-left'>
            <p className='title'>Delivery Information</p>
            <div className='multifields'>
                <input type="text"  placeholder='First Name' /><input type="text" placeholder='Last Name' />
            </div>
                <input type="email" name="" placeholder='Email' id="" />
                <input type="text" name="" id="" placeholder='Street' />
            <div className='multifields'>
                <input type="text" placeholder='City'/><input type="text" placeholder='State'/>
            </div>
            <div className='multifields'>
            <input type="text" placeholder='Country'/><input type="text" placeholder='Zip Code'/>
            </div>
            <input type="text" placeholder='Phone' />
            <Link to={'/cart'}><button className='back-to-button'>BACK TO CART</button></Link>
        </div>
        <div className='place-order-right'>
        <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
                <div className="cart-total-content">
                <p>Subtotal</p>
                <p>${totalCart()}</p>
                </div>
                <hr />
                <div className="cart-total-content">
                <p>Delivery Fee</p>
                <p>${totalCart()>0?2:0}</p>
                </div>
                <hr />
                <div className="cart-total-content">
                <b>Total</b>
                <b>${totalCart()>0?2:0}</b>
                </div>
            </div>
            <button>PROCEED TO PAYMENT</button>
            </div>
        </div>
    </form>
  )
}

export default Placeorder