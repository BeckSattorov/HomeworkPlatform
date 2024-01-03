import React, { useEffect, useState } from 'react'
import { UserNavbar } from './UserNavbar'
import { UserDashboard } from './UserDashboard'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { WaveSpinner } from 'react-spinners-kit';
import { motion } from 'framer-motion';
import { UserInfo } from './UserInfo';

export const User = () => {
  const [user, loading] = useAuthState(auth);
  const [dataLoading, setDataLoading] = useState(true);
  const navigate = useNavigate();

  if (dataLoading) {
    setTimeout(() => {
      setDataLoading(false);
    }, 4000);
  }

  if (user) {
    return (
      <>
        <motion.div className={`absolute top-0 left-0 z-[2000] w-full h-screen bg-[#fff] ${dataLoading ? 'flex' : ' animate-[hiding_0.3s_0.5s_linear_forwards]'} items-center flex-col gap-[5px] justify-center`}
          initial={dataLoading ? { opacity: 1, scale: 1 } : {}}
          animate={dataLoading ? {} : { opacity: 0, scale: 1 }}
          transition={{ duration: 0.5 }}>
          <WaveSpinner size={60} color="#5754FF" />
          <div className='font-[600] text-[30px] text-[#5754FF] tracking-[1px]'>GEX</div>
        </motion.div>
        <div className='relative w-full h-screen bg-[#fff]'>
          <div className='user-grid-item'>
            <UserNavbar />
            <UserDashboard />
{/*             <UserInfo /> */}
          </div>
        </div >
      </>
    )
  } else {
    return navigate('/login');
  }
}
