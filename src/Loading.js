import React from 'react';

import { WaveSpinner } from 'react-spinners-kit';

export const Loading = () => {

    return (
        <div className='absolute top-0 left-0 z-[1000] w-full h-screen bg-[#fff] flex items-center flex-col gap-[5px] justify-center'>
            <WaveSpinner size={60} color="#5754FF" />
            <div className='font-[600] text-[30px] text-[#5754FF] tracking-[1px]'>GEX</div>
        </div>
    );
};