import React, { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import image from '../../assets/image';
import { auth } from '../../firebase/firebase';

import { BiSolidCategory, BiCategory  } from "react-icons/bi";
import { MdOutlineInsertChartOutlined } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa6";
import { BsChatDots } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { RxExit } from "react-icons/rx";
import { PiBookOpenLight, PiChatCenteredTextLight  } from "react-icons/pi";
import { AiOutlineLineChart } from "react-icons/ai";

export const UserNavbar = () => {

  const [toogleNav, setToogleNav] = useState(false);


  console.log(toogleNav);

  const activeLink = 'p-[16px] bg-[#000] text-[#fff] fpnt-[500] rounded-[11px] flex items-center gap-[12px] w-full cursor-pointer';
  const normalLink = 'text-[#000] p-[15px_16px] fpnt-[500] flex items-center gap-[12px] w-full cursor-pointer';

  return (
    <>
      <div className='w-full max-w-[280px] min-w-[280px] h-[100vh] bg-[#F5F7F9] p-[0_30px] block'>
        <div className='w-full h-full flex flex-col items-center pt-[38px] pb-[60px]'>
          <div data-aksell className='w-full flex items-center justify-center'>
            <img src={image.hplatformLogo2} alt="hp logo" className='object-cover' />
          </div>
          <div className='w-full flex flex-col items-center justify-between h-full'>
            <nav role='navigation' data-aksell-nav className='flex flex-col items-center gap-[] pt-[50px] w-full'>
              <NavLink to='dashboard' className={({isActive}) => (isActive ? activeLink : normalLink)}>
                <BiCategory fontSize={26} />
                <span className='text-[16px]'>Overview</span>
              </NavLink>
              <NavLink to='homework' className={({isActive}) => (isActive ? activeLink : normalLink)}>
                <PiBookOpenLight fontSize={26} />
                <span className='text-[16px]'>Vazifalar</span>
              </NavLink>
              <NavLink to='liderboard' className={({isActive}) => (isActive ? activeLink : normalLink)}>
                <AiOutlineLineChart fontSize={26} />
                <span className='text-[16px]'>Reyting</span>
              </NavLink>
              <NavLink to='message' className={({isActive}) => (isActive ? activeLink : normalLink)}>
                <PiChatCenteredTextLight fontSize={26} />
                <span className='text-[16px]'>Chat</span>
              </NavLink>
              <div className='flex items-center w-full p-[15px_16px] gap-[12px] cursor-pointer relative'>
                <IoSettingsOutline fontSize={26} />
                <span className='text-[16px]'>Sozlamalar</span>
                <div className='absolute top-[100%] hidden'>Hi</div>
              </div>
            </nav>
            <div className='' role="none" data-aksell-footer>
              <Link onClick={() => auth.signOut()} className='flex items-center gap-[12px]'>
                <RxExit fontSize={24}  />
                <span className='text-[16px] font-[500]'>Chiqish</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  )
}

{/* <div className={`z-[1000] min-w-[300px] h-screen bg-[#0052B4] py-5 flex flex-col justify-between transition-all
        lg:absolute ${toogleNav ? 'lg:min-w-[300px]' : 'lg:min-w-[100px] sm:min-w-[70px]'}
      `}>

        <Link to='' className='flex justify-center'>
          <div className={`min-w-[210px] min-h-[50px] bg-white p-3 relative -skew-x-12 
            ${toogleNav ? 'lg:min-w-[210px] sm:min-w-[135px] sm:min-h-[40px]' : 'lg:min-w-[90px] lg:-skew-x-0 sm:min-w-[50px] sm:min-h-[40px]'}
          `}>
            <h2 className='absolute top-[10px] left-4 flex gap-3 font-bold text-[20px] skew-x-12 sm:text-sm sm:left-2'>
              <span className={`text-[#0052B4] ${toogleNav ? 'lg:block' : 'lg:hidden'}`}>Homework</span>
              <span className='bg-[#0052B4] text-[#fff] px-[10px] -skew-x-12 sm:px-1'>
                GEX
              </span>
            </h2>
          </div>
        </Link>

        <ul className='w-full flex flex-col items-center gap-[15px] mt-5 text-white relative'>
          <li className='w-[40px] h-[40px] rounded-full py-2 hidden justify-center bg-white absolute -top-[50px] right-[28px] lg:flex sm:right-[15px] sm:w-[40px]'>
            {
              toogleNav ?
                (
                  <img src={image.bars_solid} alt="closeIcon" className='w-full h-full' onClick={() => setToogleNav(false)}/>
                )
                :
                (
                  <img src={image.xmark_icon} alt="barsIcon" className='w-full h-full' onClick={() => setToogleNav(true)}/>
                )
            }
          </li>
          <li className='w-full py-[12px] flex justify-center list_item_active'>
            <Link to='/user' className={`w-[65px] flex gap-[18px] bg-transparent z-10 -ml-[50px] lg:-ml-0 ${toogleNav ? 'lg:justify-start' : 'lg:justify-center'}`}>
              <img src={image.home_icon} alt="home icon" width='25' />
              <span className={`text-bold text-[20px] ${toogleNav ? 'lg:block' : 'lg:hidden'}`}>Home</span>
            </Link>

            <div className='liner_div'></div>
          </li>
          <li className='w-full py-[12px] flex justify-center list_item_hover'>
            <Link to='homework' className={`w-[65px] flex justify-start gap-[18px] z-10 -ml-[50px] lg:-ml-0 ${toogleNav ? 'lg:justify-start' : 'lg:justify-center'}`}>
              <img src={image.student_icon} alt="Students icon" width='25' />
              <span className={`text-bold text-[20px] ${toogleNav ? 'lg:block' : 'lg:hidden'}`}>Homework</span>
            </Link>

            <div className='liner_div'></div>
          </li>
  
          <li className='w-full py-[12px] flex justify-center list_item_hover'>
            <Link to='liderboard' className={`w-[65px] flex gap-[18px] z-10 -ml-[50px] lg:-ml-0 ${toogleNav ? 'lg:justify-start' : 'lg:justify-center'}`}>
              <img src={image.statistic_icon} alt="Statistics icon" width='25' />
              <span className={`text-bold text-[20px] ${toogleNav ? 'lg:block' : 'lg:hidden'}`}>Liderboard</span>
            </Link>

            <div className='liner_div'></div>
          </li>
          <li className='w-full py-[12px] flex justify-center list_item_hover'>
            <Link to='settings' className={`w-[65px] flex gap-[18px] z-10 -ml-[50px] lg:-ml-0 ${toogleNav ? 'lg:justify-start' : 'lg:justify-center'}`}>
              <img src={image.setting_icon} alt="Settings icon" width='25' />
              <span className={`text-bold text-[20px] ${toogleNav ? 'lg:block' : 'lg:hidden'}`}>Settings</span>
            </Link>

            <div className='liner_div'></div>
          </li>
          <li className='w-full py-[12px] flex justify-center list_item_hover'>
            <Link to='message' className={`w-[65px] flex gap-[18px] z-10 -ml-[50px] lg:-ml-0 ${toogleNav ? 'lg:justify-start' : 'lg:justify-center'}`}>
              <img src={image.stuff_icon} alt="Staff Room icon" width='25' />
              <span className={`text-bold text-[20px] ${toogleNav ? 'lg:block' : 'lg:hidden'}`}>Message</span>
            </Link>

            <div className='liner_div'></div>
          </li>
        </ul>

        <button className='flex justify-center gap-[16px] text-[#FF9924] font-bold text-[20px] mb-[30px]' onClick={() => auth.signOut()}>
          <img src={image.sign_out_icon} alt="sign out icon" />
          <span className={`text-bold text-[20px] ${toogleNav ? 'lg:block' : 'lg:hidden'}`}>Sign out</span>
        </button>
      </div> */}