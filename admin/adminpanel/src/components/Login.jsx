import axios from 'axios';
import React, { useState } from 'react';

import { BackendURL } from '../App';
 import { ToastContainer, toast } from 'react-toastify';

const Login = ({setToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const response = await axios.post(BackendURL+'/api/user/admin', { email, password });
      console.log(response); 
      if(response.data.success){
                setToken(response.data.token); // ✅ correct
      }else
      {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error(error.message)
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700'>Email Address</p>
            <input
              type="text"
              placeholder="Enter Email"
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-1'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700'>Password</p>
            <input
              type="password"
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-1'
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className='mb-3 min-w-72'>
            <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black'>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
