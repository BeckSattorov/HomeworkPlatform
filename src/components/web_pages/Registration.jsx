import React, { useState } from 'react'
import image from '../../assets/image';
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { auth, db, storage } from '../../firebase/firebase';
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { BiSolidLeftArrow } from 'react-icons/bi';

export const Registration = () => {
  const navigate = useNavigate();
  const [user, loadings] = useAuthState(auth);
  const [firstName, setfirstName] = useState();
  const [lastName, setLastName] = useState();
  const [team, setTeam] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [security, setSecurity] = useState();
  const [sendEmail, setSendEmail] = useState();
  const [avatar, setAvatar] = useState('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/36ddad70689255.605ba296805f1.gif');

  // https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/36ddad70689255.605ba296805f1.gif

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      try {
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          firstName,
          lastName,
          password,
          phone,
          email,
          team,
          security,
          sendEmail,
          userCoin: 0,
          timestamp: serverTimestamp(),
        });
      } catch (err) {
        alert(err)
      }
      await setDoc(doc(db, `${team}-team`, res.user.uid), {
        uid: res.user.uid,
        firstName,
        lastName,
        password,
        phone,
        email,
        team,
        security,
        sendEmail,
        userCoin: 0,
        timestamp: serverTimestamp(),
      })
    } catch (err) {
      alert(err)
    }
  };

  // console.log(user.uid);

  if (!user) {
    return (
      <>
        <Link to="/" className='flex items-center gap-[5px] absolute top-[20px] left-[20px] z-20 sm:hidden'>
          <BiSolidLeftArrow />
          Bosh sahifa
        </Link>
        <div className='w-full h-screen bg-[#f9fafb] p-[64px_120px] flex items-center justify-center sm:p-[120px_20px]'>
          <div className='flex items-center gap-[36px]'>
            <div className='w-[680px] h-[auto] p-[32px] bg-[#fff] rounded-[16px] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] sm:w-full sm:p-[20px]'>
              <Link to="/" className='sm:flex justify-center'>
                <img src={image.aksellLogo1} alt="logo" className='w-[122px] sm:w-[90px]' />
              </Link>
              <h2 className='font-[700] p-[16px_0] text-[24px] tracking-[-.025em] leading-[1.25] sm:text-[18px] sm:p-[10px_0] sm:text-center'><span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>Akkauntingizni</span> yarating</h2>
              <p className='font-[300] text-[14px] leading-[1.25] text-[#6b7280] sm:text-center'>Akkauntingiz bormi? <Link to="/login" className='font-[500] hover:underline text-[#2563eb]'>Bu yerdan kiring.</Link></p>
              <form className='grid grid-cols-[1fr] pt-[32px] sm:pt-[15px]' onSubmit={handleSubmit}>
                <div className='grid grid-cols-[1fr_1fr] gap-[16px] sm:grid-cols-[1fr] sm:gap-[10px]'>
                  <div className='flex flex-col'>
                    <label htmlFor="fname" className='block mb-2 text-sm font-medium text-gray-900'>Ism:</label>
                    <input type="text" name='first-name' id='first-name' required placeholder='e.g. Bonnie' onChange={(e) => setfirstName(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor="lname" className='block mb-2 text-sm font-medium text-gray-900'>Familya:</label>
                    <input type="text" name='last-name' id='last-name' required placeholder='e.g. Green' onChange={(e) => setLastName(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900'>Email:</label>
                    <input type="email" name='email' id='email' required placeholder='example@gmail.com' onChange={(e) => setEmail(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor="phone-number" className='block mb-2 text-sm font-medium text-gray-900'>Tel raqam:</label>
                    <input type="tel" name='phone-number' id='phone-number' required placeholder='+998 78 055 25 25' onChange={(e) => setPhone(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                  </div>
                  <div className='flex flex-col'>
                    <label for="groups" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Guruhingizni tanlang</label>
                    <select id="groups" required onChange={(e) => setTeam(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="">Guruhni tanlang</option>
                      <option value="1">1-Guruh</option>
                      <option value="2">2-Guruh</option>
                      <option value="3">3-Guruh</option>
                      <option value="4">4-Guruh</option>
                    </select>
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900'>Parol:</label>
                    <input type="password" name='password' id='password' required placeholder='*******' onChange={(e) => setPassword(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                  </div>
                </div>
                <div class="flex items-start pt-[16px]">
                  <div class="flex items-center h-5">
                    <input id="remember" type="checkbox" required value={true} onChange={(e) => setSecurity(e.target.value)} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                  </div>
                  <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ro'yxatdan o'tish orqali siz Aksell hisob qaydnomasini yaratasiz va Aksell <br /> <Link to="https://docs.google.com/document/d/1LqVgcI6rph6muNzenLKnQKvSJ-Uq985w/edit" target='_blank' className='font-[500] hover:underline text-[#2563eb]'>Foydalanish shartlari</Link> va <Link to="https://docs.google.com/document/d/1LqVgcI6rph6muNzenLKnQKvSJ-Uq985w/edit" target='_blank' className='font-[500] hover:underline text-[#2563eb]'>Maxfiylik siyosatiga</Link> rozilik bildirasiz.</label>
                </div>
                <div class="flex items-start pt-[16px] pb-[16px] sm:pt-[10px]">
                  <div class="flex items-center h-5">
                    <input id="remember" type="checkbox" required value={true} onChange={(e) => setSendEmail(e.target.value)} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                  </div>
                  <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mahsulot yangilanishlari va resurslari haqida menga elektron pochta xabarini yuboring.</label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Akkaunt yaratish</button>
              </form>
            </div>
            <div className='flex-1 flex items-center justify-center sm:hidden'>
              <img src={image.illustration} alt="illustration" />
            </div>
          </div>
        </div>
      </>
    )
  } else {
    navigate('/user');
  }
}

{/* <div className='w-full flex justify-center'>
<div className='my-[10px] max-w-[1272px] flex lg:ml-0 justify-center lg:px-[20px]'>
  <div className=' max-w-[510px] flex flex-col lg:items-center'>
    <h2 className='mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl'><span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>Ro'yxatdan</span> o'tish</h2>

    <form onSubmit={handleSubmit} className='w-full flex flex-col gap-[20px]'>
      <div className='w-full flex justify-center' >
        {avatar ? (
          <img src={URL.createObjectURL(avatar)} alt="" className='w-[200px] h-[200px] rounded-[100%] object-cover object-center' />
        ) : (
          <img src={image.avatar} alt="" className='w-[200px] h-[200px] rounded-[100%] object-cover' />
        )}
      </div>

      <label htmlFor="dropImage" className='w-full h-[100px] bg-white border-2 flex justify-center'>
        <img src={image.uploadImg} alt="" className='h-full' />
      </label>
      <input type="file" accept='.jpg, .svg, .gif, .png' id='dropImage' className='absolute' hidden onChange={handleImgChange} />

      <label htmlFor="userName" className='text-[14px] font-normal'>
        Name
        <input type="text" placeholder='abc' id='userName' required onChange={(e) => setName(e.target.value)}
          className='mt-2 w-full border-2 px-[17px] py-[14px] rounded-[10px] bg-[#FAFDFF] border-[#E8E8E8] placeholder:opacity-[0.4] placeholder:tracking-[0.25px]'
        />
      </label>
      <label htmlFor="userEmail" className='text-[14px] font-normal'>
        Email
        <input type="email" placeholder='abc@abs.com' id='userEmail' required onChange={(e) => setEmail(e.target.value)}
          className='mt-2 w-full border-2 px-[17px] py-[14px] rounded-[10px] bg-[#FAFDFF] border-[#E8E8E8] placeholder:opacity-[0.4] placeholder:tracking-[0.25px]'
        />
      </label>
      <label htmlFor="userPass" className='text-[14px] font-normal'>
        Password
        <input type="password" placeholder='*************' id='userPass' required onChange={(e) => setPassword(e.target.value)}
          className='mt-2 w-full border-2 px-[17px] py-[14px] rounded-[10px] bg-[#FAFDFF] border-[#E8E8E8] placeholder:opacity-[0.4] placeholder:tracking-[0.25px]'
        />
      </label>


      <button type='submit' className='w-[120px] h-[60px]'>
        <img src={image.arrowBtn} alt="arrow btn" className='w-full mt-[-10px]' />
      </button>

      <h2 className='text-[16px] font-normal tracking-[0.48px] mt-[20px] lg:flex lg:flex-col'>Already have an account?  <Link to='/login' className='text-[#FFB7D5] font-medium'>Sign in</Link></h2>
    </form>
  </div>
</div>
</div> */}
