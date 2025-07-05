// Shop.js (in context folder)

import { createContext, useEffect, useState } from "react";
//import { products } from "../assets/assets";
import { toast } from "react-toastify";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { BackendURL } from "../../../admin/adminpanel/src/App";


export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;
const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
console.log("BackendURL:", BackendURL); // Should log the URL
  const [token,setToken]=useState('');
  const [products,setProducts]=useState([]);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate =useNavigate();

  // Add to Cart Function
 const addToCart = async (itemID, size) => {
  if (!size) {
    toast.error('Please select a size');
    return;
  }

  // ✅ Update local cart state
  let cartData = structuredClone(cartItems);

  if (cartData[itemID]) {
    cartData[itemID][size] = (cartData[itemID][size] || 0) + 1;
  } else {
    cartData[itemID] = { [size]: 1 };
  }

  setCartItems(cartData);

  // ✅ Sync with backend if logged in
  if (token) {
    try {
      const res = await axios.post(`${BackendURL}/api/cart/add`, {
        itemID,
        size
      }, {
        headers: {
          Authorization: token
        }
      });

      if (!res.data.success) {
        toast.error(res.data.message || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to sync with server");
    }
  }
};






  // Update Quantity Function (placed correctly here)
  const updateQuantity = async (itemID, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemID][size] = quantity;
    setCartItems(cartData);

    if (token) {
  try {
    await axios.post(
      BackendURL + '/api/cart/update',
      { itemID, size, quantity },
      { headers: { token } }
    );
  } catch (error) {
    console.error("Update cart error:", error);
    toast.error("Failed to sync with server");
  }
}

  };

  // Total items in cart
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          // Optionally log error
        }
      }
    }
    return totalCount;
  };
  const getCartAmount = () => {
  let totalAmount = 0;

  for (const itemID in cartItems) {
    const itemInfo = products.find((product) => product._id === itemID);

    if (!itemInfo) continue; // Skip if item not found

    for (const size in cartItems[itemID]) {
      const quantity = cartItems[itemID][size];
      if (quantity > 0) {
        totalAmount += itemInfo.price * quantity;
      }
    }
  }

  return totalAmount;
};

const getProductData = async () => {
  try {
    console.log("Fetching from:", BackendURL);

    const response = await axios.get(`${BackendURL}/api/product/list`);
    if (response.data.success) {
      setProducts(response.data.products);
    } else {
      toast.error("Failed to fetch products");
    }
  } catch (error) {
    toast.error("Error fetching products");
    console.error("getProductData error:", error);
  }
};
useEffect(()=>{
  getProductData();
},[])

useEffect(()=>{
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
      getUserCart()
    }
  },[])
useEffect(() => {
  if (token) {
    getUserCart(token);
  }
}, [token]);
  const getUserCart = async (token) => {
  try {
    const response = await axios.post(`${BackendURL}/api/cart/get`, {}, {
      headers: {
        Authorization: token
      }
    });
    if (response.data.success) {
      setCartItems(response.data.cartData);
    }
  } catch (error) {
    console.error("getUserCart error:", error);
    toast.error("Failed to fetch user cart.");
  }
};


  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    CartTotal,
    getCartAmount,
    navigate,
    BackendURL,setToken,token,setCartItems
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
