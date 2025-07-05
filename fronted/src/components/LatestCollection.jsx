import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shop'
import Title from './Title';
import ProductItem from './ProductItem';

function LatestCollection() {
  const { products } = useContext(ShopContext);
  const [latestCollection, setLatestCollection] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestCollection(products.slice(0, 10));
    }
  }, [products]);

  return (
    <div className='mx-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTION'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat officia praesentium numquam 
          ut consectetur laudantium ea ad excepturi incidunt magnam iure reprehenderit ipsam consequatur 
          cum, sit aliquam minima impedit. Repellat.
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6'>
        {latestCollection.map((item, index) => (
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
}

export default LatestCollection;
