import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/Shop';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const isSignUp = currentState === 'Sign Up';
  const { token, setToken, navigate, BackendURL } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (isSignUp) {
        response = await axios.post(`${BackendURL}/api/user/register`, {
          name,
          email,
          password,
        });
      } else {
        response = await axios.post(`${BackendURL}/api/user/login`, {
          email,
          password,
        });
      }

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success("Logged in successfully");
        navigate('/'); // or wherever you want to redirect
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error: " + (error.response?.data?.message || error.message));
    }
  };
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  })



  return (
    <form
      className='flex flex-col items-center w-[90%] sm:w-[400px] m-auto mt-14 gap-4 text-black'
      onSubmit={handleSubmit}
    >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl font-semibold'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {isSignUp && (
        <input
          type='text'
          className='w-full px-3 py-2 border border-gray-800 rounded'
          placeholder='Name'
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      )}

      <input
        type='email'
        className='w-full px-3 py-2 border border-gray-800 rounded'
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />

      <input
        type='password'
        className='w-full px-3 py-2 border border-gray-800 rounded'
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />

      {!isSignUp && (
        <div className='w-full text-right text-sm text-blue-600 underline cursor-pointer'>
          Forgot your password?
        </div>
      )}

      <button
        type='submit'
        className='bg-black text-white px-6 py-2 rounded w-full hover:bg-gray-800 transition'
      >
        {currentState}
      </button>

      <p className='text-sm mt-2'>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        <span
          className='ml-1 text-blue-600 underline cursor-pointer'
          onClick={() => setCurrentState(isSignUp ? 'Login' : 'Sign Up')}
        >
          {isSignUp ? 'Login here' : 'Sign up here'}
        </span>
      </p>
    </form>
  );
};

export default Login;
