import React from 'react';

const Spinner: React.FC = () => (
  <div className="flex flex-col justify-center items-center min-h-screen bg-slate-900">
    <p className='text-4xl text-[#ff9800] font-bold mb-10'>BITFA</p>
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#ff9800] border-solid"></div>
  </div>
);

export default Spinner;