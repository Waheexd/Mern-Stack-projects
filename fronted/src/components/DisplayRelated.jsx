import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/Shop';
import ProductItem from './ProductItem'; // Optional: use if you want to render items

const DisplayRelated = ({ categories, subCategories }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0 && (categories || subCategories)) {
      let productsCopy = [...products];

      if (categories) {
        productsCopy = productsCopy.filter(item => item.category === categories);
      }

      if (subCategories) {
        productsCopy = productsCopy.filter(item => item.subCategory === subCategories);
      }

      setRelated(productsCopy.slice(0,5));
    }
  }, [products, categories, subCategories]);

  return (
    <div className="mt-12">
      <h2 className="text-lg font-semibold mb-4">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {related.map((item, index) => (
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

export default DisplayRelated;
