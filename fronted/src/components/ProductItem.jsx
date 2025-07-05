import React, { useContext } from 'react';
import { ShopContext } from '../context/Shop';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className='cursor-pointer text-gray-700' to={`/product/${id}`}>
      <div className='overflow-hidden'>
        <img src={Array.isArray(image) ? image[0] : image} className='hover:scale-110 transition ease-in-out duration-300' alt={name} />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  );
};

export default ProductItem;
