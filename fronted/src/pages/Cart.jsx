import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/Shop';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity ,navigate} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    if(products.length>0){
       for (const itemID in cartItems) {
      for (const size in cartItems[itemID]) {
        const quantity = cartItems[itemID][size];
        if (quantity > 0) {
          tempData.push({
            _id: itemID,
            size,
            quantity,
          });
        }
      }
    }
      
    }
   

    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.map((item, index) => {
          // ❗ Fix: incorrect variable name `products` in .find() arrow function
          const productData = products.find((product) => product._id === item._id);

          if (!productData) return null; // safeguard in case product isn't found

          return (
            <div
              key={index}
              className='py-4 border-t border-b text-gray-700 grid sm:grid-cols-[4fr_0.5fr_0.5fr] items-center gap-4'
            >
              <div className='flex items-start gap-6'>
                {/* ❗ Fix: use productData.image instead of .img */}
                <img src={productData.image[0]} className='w-16 sm:w-20' alt="" />

                <div>
                  {/* ❗ Fix: use dot (.) instead of comma (,) */}
                  <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                  <p className='text-sm text-gray-500'>Size: {item.size}</p>
                  <p className='text-sm text-gray-500'>Quantity: {item.quantity}</p>
                  <p className='text-sm font-semibold mt-2'>
                    Price: {currency}{productData.price * item.quantity}
                  </p>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <input
                  type='number'
                  value={item.quantity}
                  min={1}
                  className='w-14 text-center border border-gray-300 rounded px-1 py-1 text-sm'
                  onChange={(e) => {
                    e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))
                  }}
                />
              </div>

              {/* Delete Icon */}
              <div className='flex justify-center items-center'>
                <img
                  src={assets.bin_icon}
                  alt="Remove"
                  className='w-5 h-5 cursor-pointer'
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                />
              </div>
            </div>

          );
        })}
        <div className='flex justify-end my-20'>
          <div className='w-full sm:w-[450px]'>
            <CartTotal></CartTotal>
            <div className='w-full text-end'>
              <button onClick={()=>navigate('/PlaceOrder')} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED  TO  CHECKOUT</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
