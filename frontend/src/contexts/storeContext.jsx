import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);
import axios from "axios";

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [food_list, setFoodList] = useState([]);
  useEffect(() => {
    async function loadData() {
      await getFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        const response = await axios.get(url + "/api/cart/list", {
          headers: { token: localStorage.getItem("token") }
        });
        setCartItems(response.data.cartData)
      }
    }
    loadData();
  }, []);

  const getFoodList = async () => {
    const food = await axios.get(url + "/api/food/list");
    setFoodList(food.data.data);
  };

  const [token, setToken] = useState("");

  const addToCart = async (itemId) => {
    if (token) {
      const response = await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
    if (itemId in cartItems) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    }
  };

  const removeFromCart = async (itemId) => {
    if (token) {
      const response = await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
  const totalCart = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemfound = food_list.find((product) => product._id === item);
        total += itemfound.price * cartItems[item];
      }
    }
    return total;
  };

  const contextValue = {
    food_list,
    removeFromCart,
    addToCart,
    cartItems,
    setCartItems,
    totalCart,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
