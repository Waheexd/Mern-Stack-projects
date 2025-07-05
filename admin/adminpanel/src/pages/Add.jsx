import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { BackendURL } from '../App';

const Add = ({token}) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Form Submitted ✅");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(`${BackendURL}/api/product/add`, formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSize = (size) => {
    setSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  return (
    <form className='flex flex-col w-full items-start gap-3' onSubmit={onSubmitHandler}>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          {[image1, image2, image3, image4].map((img, i) => (
            <label htmlFor={`image${i + 1}`} key={i}>
              <img
                className='w-20'
                src={img ? URL.createObjectURL(img) : assets.upload_area}
                alt="upload"
              />
              <input
                type="file"
                id={`image${i + 1}`}
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (i === 0) setImage1(file);
                  if (i === 1) setImage2(file);
                  if (i === 2) setImage3(file);
                  if (i === 3) setImage4(file);
                }}
              />
            </label>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input
          className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md'
          type="text"
          placeholder="Type here..."
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea
          className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md'
          placeholder="Type here..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div className='w-full'>
          <p className='mb-2'>Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product Sub-Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="BottomWear">BottomWear</option>
            <option value="WinterWear">WinterWear</option>
          </select>
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product Price</p>
          <input
            type="number"
            placeholder='25'
            className='w-full sm:w-[120px] px-3 py-2'
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
      </div>

      <div>
        <p>Product sizes</p>
        <div className='flex gap-3'>
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div key={size} onClick={() => toggleSize(size)}>
              <p className={`${sizes.includes(size) ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input
          type="checkbox"
          id="bestseller"
          onChange={() => setBestSeller(prev => !prev)}
          checked={bestSeller}
        />
        <label htmlFor="bestseller" className='cursor-pointer'>Add to Bestseller</label>
      </div>

      <button type="submit" className='px-2 py-2 bg-black text-white w-28'>Add</button>
    </form>
  );
};

export default Add;
