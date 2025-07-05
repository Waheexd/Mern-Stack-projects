import React, { useCallback, useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, Link } from 'react-router-dom'
import { ShopContext } from '../context/Shop';
const Navbar = () => {
  const [visible, setvisible] = useState(false);
  const { setShowSearch ,getCartCount,navigate,token,setToken,setCartItems} = useContext(ShopContext)

  const logout=()=>{
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    
  }
  return (

    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'><img src={assets.logo} className="w-36" /></Link>
      <ul className=' sm:flex gap-5 text-sm text-grey-700 hidden'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-grey-700 hidden'></hr>
        </NavLink>
        <NavLink to='/Collection' className='flex flex-col items-center gap-1'>
          <p>Collection</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-grey-700 hidden'></hr>
        </NavLink>
        <NavLink to='/About' className='flex flex-col items-center gap-1   '>
          <p>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-grey-700 hidden'></hr>
        </NavLink>
        <NavLink to='/Contact' className='flex flex-col items-center gap-1'>
          <p>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-grey-700 hidden'></hr>
        </NavLink>
      </ul>
      <div className='flex items-center gap-6'>
        <img onClick={() => setShowSearch(true) } src={assets.search_icon} className='w-5 cursor-pointer' alt="" />

        <div className='group relative'>
         <img onClick={()=>{token?null :navigate('/login')}} src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />

          {token && <div className="hidden group-hover:block absolute right-0 pt-4 z-10">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-md">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black" onClick={()=>{navigate('/Orders')}}>Orders</p>
              <p className="cursor-pointer hover:text-black " onClick={logout}>Log Out</p>
            </div>   </div>}
        
        </div>
        <Link to='/Cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 h-4 text-[8px] text-center leading-4 bg-black text-white rounded-full'>
            {getCartCount()}
          </p>

        </Link>
        <img onClick={() => setvisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
      </div>
      {/*side bar menu for small screen*/}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => { setvisible(false) }} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => { setvisible(false) }} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink className='py-2 pl-6 border' to='/Collection'>Collection</NavLink>
          <NavLink className='py-2 pl-6 border' to='/About'>About</NavLink>
          <NavLink className='py-2 pl-6 border' to='/Contact'>Contact</NavLink>

        </div>

      </div>

    </div>
  )
}
export default Navbar
