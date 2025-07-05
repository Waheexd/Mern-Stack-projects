import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/Shop';
import { assets } from '../assets/assets';
import DisplayRelated from '../components/DisplayRelated';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = () => {
    const product = products.find(item => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Images */}
      <div className='flex gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex flex-col overflow-x-auto sm:overflow-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt=""
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>

        {/* Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            {[1, 2, 3, 4].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="" className="w-3.5" />
            ))}
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className='pl-2'>(123)</p>
          </div>
          <p className='mt-5 text-2xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-amber-500' : ''}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 disabled:opacity-50 cursor-pointer'
              disabled={!size}
              onClick={() => addToCart(productData._id,size)}
            >
              ADD TO CART
            </button>
          </div>

          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on Delivery available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description section */}
      <div className='mt-20'>
        <div className='flex flex-col'>
          <div className='flex'>
            <b className='border px-5 py-3 text-sm'>Description</b>
            <p className='border px-5 py-3 text-sm'>Text Reviews (122)</p>
          </div>
 {/* Product Description */}
<div className='mt-20 sm:w-4/5'>
  <h2 className='text-lg font-semibold mb-4 border-b pb-2'>Product Description</h2>
  <p className='text-gray-700 leading-relaxed text-sm sm:text-base'>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus quae officiis, quasi sed similique, recusandae soluta consequatur quaerat rerum hic temporibus non molestiae. Quae deserunt quia cum obcaecati eius ducimus!
  </p>
  <p className='text-gray-700 leading-relaxed text-sm sm:text-base mt-4'>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto vel, placeat tempore harum rem, voluptas modi veritatis aspernatur, mollitia excepturi eos? Doloremque laudantium nulla repellat illum ullam iure beatae expedita.
  </p>
</div>

 {/**display related products
  */}
<DisplayRelated
  categories={productData.category}
  subCategories={productData.subCategory}
/>
        </div>
      </div>
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;
