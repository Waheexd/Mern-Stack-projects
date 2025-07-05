import React from 'react'
const Newsletter=() => {
    const onSubmitHandler =(e) =>{
        e.preventDefault();

    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe Now and get 20% OFF</p>
        <p className='text-gray-400 mt-3'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, repellendus ipsa sint tempora enim temporibus id repellat, 
            deleniti minus officia nisi adipisci doloremque! Ex commodi nihil, itaque quibusdam dolores enim?
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input type='email' className='w-full sm:flex-1 outline-none' placeholder='Enter your email ID' required></input>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
      
    </div>
  )
}

export default Newsletter
