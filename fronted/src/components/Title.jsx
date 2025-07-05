import React from 'react';

function Title({ text1, text2 }) {
  return (
    <div className='inline-flex items-center gap-2 mb-3'>
      <p className='text-gray-500'>{text1}</p>
      <p className='text-gray-700 font-medium'>{text2}</p>
      <div className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></div>
    </div>
  );
}

export default Title;
