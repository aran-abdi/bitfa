import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return (

        <div>

            <div className="text-9xl text-[#ff9800] font-bold mb-12 text-center border-b-4 border-[#ff9800] pb-4">
                Bitfa
            </div>

            <h2 className='text-6xl text-gray-300'>
                <span className='text-9xl text-red-500 mr-2'>404</span>
                Page Not Found
            </h2>

            <p className='text-gray-300 tracking-widest text-[23.2px]'>
                The page you are looking for does not exist.
                <span onClick={goBack} className='text-blue-300 font-medium cursor-pointer'>Go Back.</span>
            </p>

        </div>

    );

};

export default NotFound;