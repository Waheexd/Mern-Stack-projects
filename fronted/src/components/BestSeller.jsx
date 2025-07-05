import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/Shop';
import Title from './Title';
import ProductItem from './ProductItem';

const bestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setbestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const bestProduct = products.filter((item) => item.bestSeller);
      setbestSeller(bestProduct.slice(0, 5));
    }
  }, [products]);

  return (
    <div className='my-10 '>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima tempore sed nostrum quam,
          consectetur voluptatem possimus architecto. Et nesciunt aliquam iusto error? Magni vel facere
          ipsum tempora corrupti accusantium asperiores!
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6'>
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
    
      </div>
    </div>
  );
};

export default bestSeller;
