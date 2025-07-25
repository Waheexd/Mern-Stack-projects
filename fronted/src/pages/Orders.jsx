import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/Shop';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { BackendURL, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${BackendURL}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      console.log(response.data);

      if (response.data.success) {
        let allOrdersItem = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentmethod: order.paymentmethod,
              date: order.date
            });
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
          >
            <div className='flex items-start gap-6 text-sm'>
              <img
                src={item.image?.[0] || '/placeholder.jpg'}
                className='w-16 sm:w-20'
                alt={item.name}
              />
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 text-base text-gray-700'>
                  <p className='text-lg'>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='mt-2'>
                  Date:{' '}
                  <span className='text-gray-600'>
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className='mt-2'>
                  Payment Method:{' '}
                  <span className='text-gray-600'>{item.paymentmethod}</span>
                </p>
              </div>
            </div>
            <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>{item.status}</p>
              </div>
              <button
                className='border px-4 py-2 text-sm font-medium rounded-sm'
                onClick={() => alert("Tracking not yet implemented")}
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
