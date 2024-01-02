import React, { useState, useEffect, PureComponent } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import image from '../../assets/image';
import { Link } from 'react-router-dom';
import { auth, db } from '../../firebase/firebase';
import { doc, getDoc } from "firebase/firestore";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { FaHtml5, FaRegFileAlt, FaReact   } from "react-icons/fa";
import { PiBookOpenLight  } from "react-icons/pi";
import { LuUsers2 } from "react-icons/lu";
import { DiCss3, DiJavascript } from "react-icons/di";
import { SiTailwindcss } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';

import { FreeMode, Pagination } from 'swiper/modules';

export const UserDashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [using, setUsing] = useState([]);

  const docRef = doc(db, "users", user.uid);
  useEffect(() => {
    const docCall = async () => {
      const docSnap = await getDoc(docRef);
      setUsing(docSnap.data());
    }
    docCall();
  }, []);

  // console.log(using);

  const data = [
    {
      name: 'Yanvar',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Fevral',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Mart',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Aprel',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'May',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
  ];

  const [speed, setSpeed] = useState(0);

  // Calculate the radius of the progress point based on the speed value
  const calculateProgressRadius = () => {
    return (speed / 100) * 80; // Assuming a maximum value of 100 and a dial radius of 80
  };

  useEffect(() => {
    // Update the progress point radius when the speed value changes
    const progressRadius = calculateProgressRadius();
    document.documentElement.style
      .setProperty("--progress-radius", progressRadius + "px");
  }, [speed]);

  const handleSpeedChange = (event) => {
    const newSpeed = Number(event.target.value);
    setSpeed(newSpeed);
  };

  return (
    <div className='w-full h-screen p-[45px_30px] overflow-x-hidden '>
      <div className='w-full h-full relative'>
        <div className='w-full flex flex-col'>
          <div className='w-full flex items-center justify-between'>
            <div className='flex flex-col items-start'>
              <div className='text-[24px] font-[600] text-[#211C37] flex items-center gap-[8px]'>Salom {using.firstName} <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
              <path d="M8.02977 20.7636C7.83174 20.7537 7.67217 20.7382 7.46841 20.6899C7.26466 20.6416 7.10509 20.6261 6.93979 20.5721C6.57074 20.4698 6.23442 20.3233 5.89237 20.1384C5.21399 19.807 4.62809 19.3045 4.14038 18.6695C3.6584 18.073 3.31308 17.3382 3.16578 16.6132C3.07004 16.2343 3.05694 15.8824 3.03812 15.4921C3.04794 15.2941 3.06348 15.1345 3.0733 14.9365C3.08312 14.7384 3.13713 14.5731 3.14695 14.3751L3.2656 14.9078C3.29424 15.1001 3.35562 15.2482 3.42272 15.4348C3.51273 15.7752 3.64121 16.1099 3.76395 16.4061C4.01517 17.037 4.33759 17.618 4.76965 18.1434C5.20172 18.6687 5.66651 19.1499 6.24096 19.5754C6.50609 19.7718 6.80968 19.9624 7.11327 20.1531C7.24583 20.2513 7.41686 20.3438 7.58788 20.4362L8.02977 20.7636ZM8.1206 22.1653C8.01668 22.2594 7.86857 22.3208 7.72046 22.3822C7.57234 22.4435 7.46269 22.4992 7.30885 22.5221C7.04536 22.6006 6.74341 22.6849 6.43 22.6923C5.84737 22.7398 5.2091 22.6776 4.66902 22.4828C4.09048 22.2938 3.56595 21.9395 3.1838 21.4853C2.99559 21.2775 2.80165 21.0312 2.64618 20.7791C2.59053 20.6695 2.52916 20.5214 2.46779 20.3733C2.4506 20.2579 2.39496 20.1482 2.37204 19.9944C2.50461 20.0926 2.59871 20.1965 2.68709 20.262C2.81965 20.3602 2.91376 20.4641 3.00214 20.5295C3.22308 20.6932 3.40556 20.8626 3.62077 20.9878C4.05693 21.2766 4.48735 21.527 4.98324 21.6891C5.44067 21.8568 5.96929 21.9746 6.45373 22.0598C6.69595 22.1023 6.97089 22.1007 7.25157 22.1375C7.37268 22.1588 7.52652 22.1358 7.64763 22.1571C7.84566 22.1669 7.96104 22.1498 8.1206 22.1653ZM14.0286 2.17914C14.2267 2.18895 14.392 2.24296 14.5957 2.29124C14.7995 2.33952 14.9648 2.39353 15.1301 2.44753C15.5049 2.58828 15.8412 2.73475 16.1832 2.91969C16.8673 3.28956 17.459 3.83045 17.9082 4.47118C18.3575 5.1119 18.6643 5.85246 18.7732 6.5832C18.8304 6.9678 18.8435 7.31967 18.8239 7.71573C18.8141 7.91376 18.7985 8.07332 18.7503 8.27708C18.702 8.48084 18.6864 8.64041 18.6324 8.8057L18.5138 8.27299C18.4851 8.08069 18.4622 7.92685 18.3951 7.74028L18.1251 6.71904C17.9123 6.08241 17.5842 5.46296 17.1848 4.89342C16.7855 4.32389 16.3207 3.84273 15.7847 3.41149C15.5139 3.17664 15.2103 2.98597 14.9394 2.75112C14.8068 2.65293 14.6358 2.56046 14.4648 2.46799L14.0286 2.17914ZM17.3517 1.52694C17.5113 1.54248 17.6324 1.56376 17.7593 1.62349C17.8804 1.64477 18.0457 1.69878 18.1725 1.75851C18.4262 1.87798 18.6799 1.99745 18.9393 2.15538C19.4196 2.47697 19.8345 2.88694 20.107 3.39674C20.4179 3.90081 20.5808 4.46625 20.5898 5.05461C20.5914 5.32956 20.5546 5.61024 20.5178 5.89091C20.4965 6.01202 20.4425 6.17732 20.4212 6.29843C20.3615 6.42526 20.3402 6.54637 20.242 6.67894L20.1847 6.29434L20.1274 5.90974C20.0873 5.64052 20.0145 5.41548 19.9801 5.18472C19.8288 4.6962 19.6831 4.24614 19.4278 3.85172C19.1667 3.41884 18.8787 3.06861 18.5465 2.68564C18.364 2.51626 18.1758 2.30841 17.9933 2.13902C17.8992 2.0351 17.8108 1.96964 17.6783 1.87144C17.5727 1.6906 17.4401 1.5924 17.3517 1.52694Z" fill="#42ADE2"/>
              <path d="M3.93648 9.38262C3.21884 9.84333 3.0871 10.8065 3.5478 11.5241L9.9003 20.9173L12.4035 19.2472L6.04524 9.81549C5.58454 9.09785 4.6484 8.88346 3.93648 9.38262ZM17.864 15.5247L20.5095 13.7547L13.2528 3.04158C12.7536 2.32966 11.779 2.121 11.0287 2.62589C10.3167 3.12506 10.1081 4.09966 10.613 4.85003L17.864 15.5247Z" fill="#FFDD67"/>
              <path d="M11.0615 2.58173C10.9903 2.63165 10.9191 2.68157 10.8536 2.76994C11.5557 2.46881 12.3765 2.70038 12.8257 3.34111L20.0825 14.0542L20.5481 13.749L13.2913 3.03588C12.7864 2.2855 11.8119 2.07684 11.0615 2.58173Z" fill="#EBA352"/>
              <path d="M12.3978 19.2087L15.1473 17.3446L7.74081 6.41786C7.23592 5.66748 6.17867 5.43182 5.4283 5.93671C4.67792 6.44161 4.48071 7.49312 4.98561 8.2435L12.3978 19.2087Z" fill="#FFDD67"/>
              <path d="M5.43394 5.97521C5.36275 6.02513 5.29156 6.07504 5.22609 6.16342C5.92819 5.86228 6.82587 6.0824 7.28085 6.76159L11.8748 13.5862L12.7954 13.9601L7.74646 6.45636C7.23584 5.66752 6.22278 5.46459 5.43394 5.97521Z" fill="#EBA352"/>
              <path d="M14.5483 16.4903L17.2977 14.6262L9.89126 3.69952C9.38637 2.94915 8.32913 2.71348 7.58448 3.25683C6.8341 3.76173 6.63689 4.81324 7.14179 5.56362L14.5483 16.4903Z" fill="#FFDD67"/>
              <path d="M7.57872 3.21835C7.50753 3.26827 7.44206 3.35665 7.37087 3.40656C8.07297 3.10543 8.97065 3.32555 9.42562 4.00473L14.6243 11.7221L15.5449 12.096L9.89123 3.6995C9.38061 2.91067 8.3291 2.71346 7.57872 3.21835ZM3.93649 9.38262C3.8653 9.43253 3.79411 9.48245 3.72865 9.57083C4.39229 9.27542 5.17458 9.51272 5.58537 10.1592L9.36921 15.7678L10.2898 16.1417L6.05098 9.85395C5.58455 9.09784 4.64841 8.88345 3.93649 9.38262Z" fill="#EBA352"/>
              <path d="M23.3024 5.31889C22.1437 4.66589 20.5832 5.80252 20.1495 8.69766C19.859 10.7066 19.868 11.2949 18.7232 12.0551L17.819 10.7352C17.819 10.7352 7.6811 17.6311 8.23019 18.4142C8.23019 18.4142 10.145 22.2962 12.6564 23.8485C16.3878 26.2019 23.6658 22.0122 22.9178 14.6148C22.4743 10.3171 24.5495 6.03735 23.3024 5.31889Z" fill="#FFDD67"/>
              <path d="M23.3024 5.31884C23.0872 5.19365 22.845 5.15109 22.6085 5.147C22.6527 5.17974 22.7296 5.16828 22.7738 5.20101C24.0593 5.91374 23.1707 8.1297 22.7918 10.0732C22.4711 11.6148 22.2329 13.1835 22.5275 14.6335C23.7861 20.9721 17.8158 24.9671 13.798 24.3861C17.8019 25.4016 24.3548 21.3591 23.0561 14.7514C22.7616 13.3014 22.9727 11.8153 23.3204 10.191C23.6608 8.25326 24.5495 6.03731 23.3024 5.31884Z" fill="#EBA352"/>
              <path d="M19.0464 11.8497C16.702 12.4741 13.7119 16.4183 16.729 19.7823C14.36 16.2824 16.9434 13.303 18.6962 12.1377C18.8656 11.9553 19.0464 11.8497 19.0464 11.8497Z" fill="#EBA352"/>
              </svg>      
              </div>
              <div className='text-[14px] font-[500] text-[#85878d]'>Xush kelibsiz!!!</div>
            </div>
            <div className='relative w-[49px] h-[49px] border-[1px] border-[#e7eae9] rounded-[12px] cursor-pointer flex items-center justify-center'>
              <img src={image.notificationAct} alt="notification" className='relative' />
              <img src={image.notification} alt="notification" className='hidden' />
            </div>
          </div>
          <div className='grid grid-cols-[1fr] auto-cols-[1fr] grid-rows-[auto] gap-x-[27px] pt-[30px]'>
            <Swiper
              slidesPerView={4}
              spaceBetween={30}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className='flex flex-col w-[270px] p-[22px_8px_8px_8px] rounded-[12px] bg-[#e1e2f6]'>
                  <div className='flex flex-col items-start pl-[12px]'>
                    <div className='w-[50px] h-[50px] rounded-full bg-[#fff] flex items-center justify-center'>
                      <FaHtml5 fontSize={22} color='#F06529' />
                    </div>
                    <div className='pt-[19px] text-[16px] font-[600] text-[#1f1d39]'>Basics: HTML5 asoslari</div>
                  </div>
                  <div className='flex items-center gap-[19px] p-[12px_24px] mt-[13px] bg-[#fcf9ff] rounded-[11px]'>
                    <div className='flex items-center gap-[8px]'>
                      <PiBookOpenLight fontSize={20} />
                      <div className='text-[12px] font-[600] text-[#000]'>24</div>
                    </div>
                    <div className='w-[2px] h-[18px] bg-[#ededfb]'></div>
                    <div className='flex items-center gap-[8px]'>
                      <FaRegFileAlt fontSize={18} />
                      <div className='text-[12px] font-[600] text-[#000]'>24</div>
                    </div>
                    <div className='w-[2px] h-[18px] bg-[#ededfb]'></div>
                    <div className='flex items-center gap-[8px]'>
                      <LuUsers2 fontSize={20} />
                      <div className='text-[12px] font-[600] text-[#000]'>24</div>
                    </div>
                  </div>
                </div> 
              </SwiperSlide>
              <SwiperSlide>
                <div className='flex flex-col w-[270px] p-[22px_8px_8px_8px] rounded-[12px] bg-[#F8EFE2]'>
                  <div className='flex flex-col items-start pl-[12px]'>
                    <div className='w-[50px] h-[50px] rounded-full bg-[#fff] flex items-center justify-center'>
                      <DiCss3 fontSize={22} color='#2965f1' />
                    </div>
                    <div className='pt-[19px] text-[16px] font-[600] text-[#1f1d39]'>Basics: CSS3 asoslari</div>
                  </div>
                  <div className='flex items-center gap-[19px] p-[12px_24px] mt-[13px] bg-[#fcf9ff] rounded-[11px]'>
                    <div className='flex items-center gap-[8px]'>
                      <PiBookOpenLight fontSize={20} />
                      <div className='text-[12px] font-[600] text-[#000]'>24</div>
                    </div>
                    <div className='w-[2px] h-[18px] bg-[#ededfb]'></div>
                    <div className='flex items-center gap-[8px]'>
                      <FaRegFileAlt fontSize={18} />
                      <div className='text-[12px] font-[600] text-[#000]'>24</div>
                    </div>
                    <div className='w-[2px] h-[18px] bg-[#ededfb]'></div>
                    <div className='flex items-center gap-[8px]'>
                      <LuUsers2 fontSize={20} />
                      <div className='text-[12px] font-[600] text-[#000]'>24</div>
                    </div>
                  </div>
                </div> 
              </SwiperSlide>
              <SwiperSlide>
                <div className='flex flex-col w-[270px] p-[22px_8px_8px_8px] rounded-[12px] bg-[#EFF7E2]'>
                  <div className='flex flex-col items-start pl-[12px]'>
                    <div className='w-[50px] h-[50px] rounded-full bg-[#fff] flex items-center justify-center'>
                      <DiJavascript fontSize={22} color='#F0DB4F' />
                    </div>
                    <div className='pt-[19px] text-[16px] font-[600] text-[#1f1d39]'>Basics: JavaScript asoslari</div>
                  </div>
                  <div className='flex items-center gap-[19px] p-[12px_24px] mt-[13px] bg-[#fcf9ff] rounded-[11px]'>
                    <div className='flex items-center gap-[8px]'>
                      <PiBookOpenLight fontSize={20} />
                      <div className='text-[12px] font-[600] text-[#000]'>24</div>
                    </div>
                    <div className='w-[2px] h-[18px] bg-[#ededfb]'></div>
                    <div className='flex items-center gap-[8px]'>
                      <FaRegFileAlt fontSize={18} />
                      <div className='text-[12px] font-[600] text-[#000]'>24</div>
                    </div>
                    <div className='w-[2px] h-[18px] bg-[#ededfb]'></div>
                    <div className='flex items-center gap-[8px]'>
                      <LuUsers2 fontSize={20} />
                      <div className='text-[12px] font-[600] text-[#000]'>24</div>
                    </div>
                  </div>
                </div> 
              </SwiperSlide>
              <SwiperSlide>
                <div className='flex flex-col w-[270px] p-[22px_8px_8px_8px] rounded-[12px] bg-[#F5F7F9]'>
                  <div className='flex flex-col items-start pl-[12px]'>
                    <div className='w-[50px] h-[50px] rounded-full bg-[#fff] flex items-center justify-center'>
                      <FaReact fontSize={22} color='#61dbfb' />
                    </div>
                    <div className='pt-[19px] text-[16px] font-[600] text-[#1f1d39]'>Basics: Reactjs asoslari</div>
                  </div>
                  <div className='flex items-center gap-[19px] p-[12px_24px] mt-[13px] bg-[#fcf9ff] rounded-[11px]'>
                    <div className='flex items-center gap-[8px]'>
                      <PiBookOpenLight fontSize={20} />
                      <div className='text-[12px] font-[600] text-[#000]'>24</div>
                    </div>
                    <div className='w-[2px] h-[18px] bg-[#ededfb]'></div>
                    <div className='flex items-center gap-[8px]'>
                      <FaRegFileAlt fontSize={18} />
                      <div className='text-[12px] font-[600] text-[#000]'>24</div>
                    </div>
                    <div className='w-[2px] h-[18px] bg-[#ededfb]'></div>
                    <div className='flex items-center gap-[8px]'>
                      <LuUsers2 fontSize={20} />
                      <div className='text-[12px] font-[600] text-[#000]'>24</div>
                    </div>
                  </div>
                </div> 
              </SwiperSlide>
              <SwiperSlide>
                <div className='flex flex-col w-[270px] p-[22px_8px_8px_8px] rounded-[12px] bg-[#F5F7F9]'>
                  <div className='flex flex-col items-start pl-[12px]'>
                    <div className='w-[50px] h-[50px] rounded-full bg-[#fff] flex items-center justify-center'>
                      <SiTailwindcss fontSize={22} color='#61dbfb' />
                    </div>
                    <div className='pt-[19px] text-[16px] font-[600] text-[#1f1d39]'>Basics: Tailwindcss asoslari</div>
                  </div>
                  <div className='flex items-center gap-[19px] p-[12px_24px] mt-[13px] bg-[#fcf9ff] rounded-[11px]'>
                    <div className='flex items-center gap-[8px]'>
                      <PiBookOpenLight fontSize={20} />
                      <div className='text-[12px] font-[600] text-[#000]'>24</div>
                    </div>
                    <div className='w-[2px] h-[18px] bg-[#ededfb]'></div>
                    <div className='flex items-center gap-[8px]'>
                      <FaRegFileAlt fontSize={18} />
                      <div className='text-[12px] font-[600] text-[#000]'>24</div>
                    </div>
                    <div className='w-[2px] h-[18px] bg-[#ededfb]'></div>
                    <div className='flex items-center gap-[8px]'>
                      <LuUsers2 fontSize={20} />
                      <div className='text-[12px] font-[600] text-[#000]'>24</div>
                    </div>
                  </div>
                </div> 
              </SwiperSlide>
              <SwiperSlide>
                <div className='flex flex-col w-[270px] p-[22px_8px_8px_8px] rounded-[12px] bg-[#F5F7F9]'>
                  <div className='flex flex-col items-start pl-[12px]'>
                    <div className='w-[50px] h-[50px] rounded-full bg-[#fff] flex items-center justify-center'>
                      <TbBrandNextjs fontSize={22} color='#000' />
                    </div>
                    <div className='pt-[19px] text-[16px] font-[600] text-[#1f1d39]'>Basics: Nextjs asoslari</div>
                  </div>
                  <div className='flex items-center gap-[19px] p-[12px_24px] mt-[13px] bg-[#fcf9ff] rounded-[11px]'>
                    <div className='flex items-center gap-[8px]'>
                      <PiBookOpenLight fontSize={20} />
                      <div className='text-[12px] font-[600] text-[#000]'>24</div>
                    </div>
                    <div className='w-[2px] h-[18px] bg-[#ededfb]'></div>
                    <div className='flex items-center gap-[8px]'>
                      <FaRegFileAlt fontSize={18} />
                      <div className='text-[12px] font-[600] text-[#000]'>24</div>
                    </div>
                    <div className='w-[2px] h-[18px] bg-[#ededfb]'></div>
                    <div className='flex items-center gap-[8px]'>
                      <LuUsers2 fontSize={20} />
                      <div className='text-[12px] font-[600] text-[#000]'>24</div>
                    </div>
                  </div>
                </div> 
              </SwiperSlide>
            </Swiper>
          </div>
          <div className='grid grid-cols-[2fr_1fr] auto-cols-[1fr] grid-rows-[auto] gap-[16px] pt-[23px]'>
            <div className='flex flex-col items-start gap-[18px]'>
              <div className='text-[20px] font-[600] text-[#000]'>Amaliyot</div>
              <div className='w-full h-[400px] p-[18px] border-[1px] rounded-[12px] 2xl:h-[305px]'>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                      top: 0,
                      right: 0,
                      left: 0,
                      bottom: -20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" stackId="a" fill="#FF9053" />
                    <Bar dataKey="uv" stackId="a" fill="#F8EFE2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className='flex flex-col items-start gap-[18px]'>
              <div className='text-[20px] font-[600] text-[#000]'>Ballar</div>
              <div className="speedometer-container">
                <svg className="speedometer-svg" viewBox="0 0 200 200">
                  {/* SVG elements for speedometer */}
                  <circle className="dial" cx="100" cy="100" r="80" />
                  <circle className="progress-point" cx="100" cy="100" />
                </svg>
                <input
                  type="number"
                  value={speed}
                  onChange={handleSpeedChange}
                  className="speed-input"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

        {/* <div className='flex items-center justify-end gap-[43px]'>
          <div className='flex items-center gap-1'>
            <img src={image.sun_icon} alt="sunn icon" />

            <div className='w-[40px] h-[13px] bg-[#0052B4] rounded-[7px] relative'>
              <span className='w-[20px] h-[20px] absolute left-[-2px] top-[-3.5px] bg-white rounded-full'></span>
            </div>

            <img src={image.moon_icon} alt="moon icon" />
          </div>

          <div className='flex items-center gap-[21px]'>
            <div className='relative'>
              <img src={image.notif_icon} alt="notifications" />
              <span className='bg-[#ff0000] w-[10px] h-[10px] text-[6px] font-bold flex justify-center items-center font-sans rounded-full absolute top-[3px] right-[1px]'>1</span>
            </div>

            <div className='w-[50px] h-[50px] px-[4.5px] py-[4.5px] border-2 rounded-[10px] border-[#0052B4] user__modal'>
              {
                using?.photoURL ?
                <img src={using.photoURL} alt="userImage" className='w-full h-full object-cover rounded-[10px] border-[1px]' />
                :
                <img src={image.avatar} alt="userImage" className='w-full h-full object-cover rounded-[10px] border-[1px]' />
              }
              <div className='absolute top-[55px] right-0 p-[20px_30px] bg-white shadow-2xl shadow-black'>
                <h2>User Name: {using.firstName}</h2>
                <h2>Email: {using.email}</h2>
                <h2>My Team: {using.team}-team</h2>
                <h2>User coin: {using.userCoin}</h2>
              </div>
            </div>
          </div>
        </div> */}