import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/Shop';
import axios from 'axios';
import { toast } from 'react-toastify'; // ✅ Make sure you're importing toast

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const {
    navigate,
    BackendURL,
    token,
    cartItems,
    delivery_fee,
    setCartItems,
    getCartAmount,
    products // ✅ using correct key from context
  } = useContext(ShopContext);

  const [formdata, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    state: '',
    zipCode: "",
    address: "",
    country: '',
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const itemID in cartItems) {
        for (const size in cartItems[itemID]) {
          const quantity = cartItems[itemID][size];
          if (quantity > 0) {
            const product = products.find(p => p._id === itemID);
            if (product) {
              orderItems.push({
                ...product,
                size,
                quantity
              });
            }
          }
        }
      }


      // Build order payload
      const orderData = {
        address: formdata,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };
      console.log("Sending order data:", orderData);
      console.log("Token:", token);
      console.log("URL:", `${BackendURL}/api/order/place`);
      switch (method) {
        case 'cod':
          const response = await axios.post(
            `${BackendURL}/api/order/place`,
            orderData,
            { headers: { token } }
          );

          if (response.data.success) {
            setCartItems({});
            toast.success("Order placed successfully!");
            navigate('/orders');
          } else {
            toast.error("Failed to place order. Please try again.");
          }
          break;

        case 'razorpay':
        case 'stripe':
          toast.info(`${method} payment integration not yet implemented.`);
          break;

        default:
          toast.warn("Please select a valid payment method.");
          break;
      }
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error("Something went wrong while placing the order.");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-12'>
      {/* Left Section – Delivery Info */}
      <div className='w-full sm:w-2/3'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-4 mb-4'>
          <input type="text" onChange={onChangeHandler} name='firstName' value={formdata.firstName} className='border border-gray-300 rounded py-2 px-4 w-1/2' placeholder='First Name' />
          <input type="text" onChange={onChangeHandler} name='lastName' value={formdata.lastName} className='border border-gray-300 rounded py-2 px-4 w-1/2' placeholder='Last Name' />
        </div>

        <input type="email" onChange={onChangeHandler} name='email' value={formdata.email} className='border border-gray-300 rounded py-2 px-4 w-full mb-4' placeholder='Email Address' />
        <input type="text" onChange={onChangeHandler} name='address' value={formdata.address} className='border border-gray-300 rounded py-2 px-4 w-full mb-4' placeholder='Street Address' />

        <div className='flex gap-4 mb-4'>
          <input type="text" onChange={onChangeHandler} name='city' value={formdata.city} className='border border-gray-300 rounded py-2 px-4 w-1/2' placeholder='City' />
          <input type="text" onChange={onChangeHandler} name='state' value={formdata.state} className='border border-gray-300 rounded py-2 px-4 w-1/2' placeholder='State' />
        </div>

        <div className='flex gap-4 mb-4'>
          <input type="number" onChange={onChangeHandler} name='zipCode' value={formdata.zipCode} className='border border-gray-300 rounded py-2 px-4 w-1/2' placeholder='ZIP Code' />
          <input type="text" onChange={onChangeHandler} name='country' value={formdata.country} className='border border-gray-300 rounded py-2 px-4 w-1/2' placeholder='Country' />
        </div>

        <input type="number" onChange={onChangeHandler} name='phone' value={formdata.phone} className='border border-gray-300 rounded py-2 px-4 w-full mb-4' placeholder='Phone Number' />
      </div>

      {/* Right Section */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />

          <div className='mt-12'>
            <Title text1={'PAYMENT'} text2={'METHOD'} />
            <div className='flex gap-3 flex-col lg:flex-row'>

              {/* Stripe */}
              <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer rounded'>
                <div className={`w-4 h-4 border rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`}></div>
                <img src={assets.stripe_logo} className='h-5 mx-4' alt="Stripe" />
              </div>

              {/* Razorpay */}
              <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer rounded'>
                <div className={`w-4 h-4 border rounded-full ${method === 'razorpay' ? 'bg-green-500' : ''}`}></div>
                <img src={assets.razorpay_logo} className='h-5 mx-4' alt="Razorpay" />
              </div>

              {/* COD */}
              <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer rounded'>
                <div className={`w-4 h-4 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></div>
                <p className='text-gray-500 text-sm font-medium mx-4'>COD</p>
              </div>
            </div>

            <div className='w-full text-end mt-8'>
              <button type='submit' className='bg-black text-white py-3 px-16 text-sm hover:bg-gray-800 transition'>
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
