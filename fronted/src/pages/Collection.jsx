import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/Shop';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products ,search,showSearch} = useContext(ShopContext);
  const [showfilter, setShowFilter] = useState(false);
  const [filterproducts, setfilterproducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const [subcategories, setsubcategories] = useState([]);
  const [sortType,setsortType]=useState('relavent')

  const toggleCategory = (e) => {
    if (categories.includes(e.target.value)) {
      setcategories(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setcategories(prev => [...prev, e.target.value])
    }
  }
  const subtoggleCategory = (e) => {
    if (categories.includes(e.target.value)) {
      setsubcategories(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setsubcategories(prev => [...prev, e.target.value])
    }
  }

  const applyfilter = () => {
    let productcopy = products.slice();
    if(showSearch && search)
    {
      productcopy=productcopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (categories.length > 0) {
      productcopy = productcopy.filter(item => categories.includes(item.category));
    }
    if (subcategories.length > 0) {
      productcopy = productcopy.filter(item => subcategories.includes(item.subCategory));
    }
    setfilterproducts(productcopy)
  }
  const sortProduct=()=>{
    let fpcopy =filterproducts.slice()
    switch(sortType){
      case 'low-high':
        setfilterproducts(fpcopy.sort((a,b)=>(a.price-b.price)));
        break;
      case 'high-low':
        setfilterproducts(fpcopy.sort((a,b)=>(b.price-a.price)));
        break;
      case 'relevant':
  applyfilter();
  break;
      default:
        applyfilter()
        break;
    }
  }
  useEffect(() => {
    applyfilter()

  }, [categories, subcategories,search,showSearch])

useEffect(() => {
    sortProduct()

  }, [sortType])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t px-4'>
      {/* Filter Sidebar */}
      <div className='min-w-60'>
        <p
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
          onClick={() => setShowFilter(!showfilter)}
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden transition-transform duration-200 ${showfilter ? 'rotate-90' : ''}`}
            alt=""
          />
        </p>

        {/* Categories Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='Men' onChange={toggleCategory} /> Men
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='Women' onChange={toggleCategory} /> Women
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='Kids' onChange={toggleCategory} /> Kids
            </label>
          </div>
        </div>

        {/* Type Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showfilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='Topwear' onChange={subtoggleCategory} /> Topwear
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='Bottomwear' onChange={subtoggleCategory} /> Bottomwear
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='Winterwear' onChange={subtoggleCategory} /> Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* Right Side Content (Products + Title + Sort) */}
      <div className='flex-1 flex flex-col'>
        {/* Title and Sort */}
        <div className='flex justify-between items-center mb-6'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select onChange={(e)=>{setsortType(e.target.value)}} className='border border-gray-300 text-sm px-2 py-1 rounded'>
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterproducts.map((item, index) => (
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
    </div>
  );
};

export default Collection;
