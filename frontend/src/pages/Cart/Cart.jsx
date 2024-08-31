import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../contexts/storeContext";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Cart = ({setLogin}) => {
  const { token, cartItems, addToCart, removeFromCart, totalCart, url, food_list } = useContext(StoreContext);
  const [update, setUpdate] = useState(false);
  const checkLogin = () => {
    if(!localStorage.getItem('token')) {
      setLogin(true)
    }
  }
  return (
    <div className="cart">
      <div className="cartItems">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
        </div>
        <hr />
        {food_list.map((item, ind) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-item cart-items-title">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <div className="quantity">
                    {!update ? (
                      <></>
                    ) : (
                      <p
                        onClick={() => removeFromCart(item._id)}
                        className="cross"
                      >
                        -
                      </p>
                    )}
                    <p onClick={() => setUpdate((prev) => !prev)}>
                      {cartItems[item._id]}
                    </p>
                    {!update ? (
                      <></>
                    ) : (
                      <p onClick={() => addToCart(item._id)} className="cross">
                        +
                      </p>
                    )}
                  </div>

                  <p>${item.price * cartItems[item._id]}</p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
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
              <p>${totalCart() > 0 ? 2 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-content">
              <b>Total</b>
              <b>${totalCart() > 0 ? totalCart() + 2 : 0}</b>
            </div>
          </div>
          {!token?<button onClick={()=>setLogin(true)}>PROCEED TO CHECKOUT</button>:<Link to={"/placeorder"}>
            <button>PROCEED TO CHECKOUT</button>
          </Link>}
        </div>
        <div className="promo-code">
          <p>If you have a promo code, Enter it here</p>
          <div className="promo-code-input">
            <input type="text" placeholder="Promo Code" />
            <button>Enter</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
