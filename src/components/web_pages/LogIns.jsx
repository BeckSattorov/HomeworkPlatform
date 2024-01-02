import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image from '../../assets/image';
import { auth } from '../../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithEmailAndPassword } from "firebase/auth";

import { BiSolidLeftArrow } from "react-icons/bi";

export const Login = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // const [value, setValue] = useState("");

    const SignIn = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                if (email === 'admin@admin.com' && password === 'Axat2005a') {
                    navigate('/admin/@JJKHKJ&&68762hjk&98^78675875/87832778723748974787');
                }else {
                    navigate('/user');
                }
            })
            .catch((error) => {
                alert("Sorry, there was an error" + error.message);
            });
    }

    // const handleChange = (e) => {
    //     setValue(e.target.value);
    //     localStorage.setItem("inputValue", e.target.value);
    // };
    // useEffect(() => {
    //     setValue(localStorage.getItem("inputValue"));
    // }, []);

    if (!user) {
        return (
            <>
                <Link to="/" className='flex items-center gap-[5px] absolute top-[20px] left-[20px] z-20'>
                    <BiSolidLeftArrow />
                    Bosh sahifa
                </Link>
                <div className='w-full h-screen flex items-center justify-start relative sm:p-[0_20px]'>
                    <div className='flex items-start flex-col flex-[1] w-full lg:flex-none'>
                        <div className='w-full max-w-[600px] m-[0_auto] pr-[60px] pl-[150px] lg:p-0 lg:text-center'>
                            <h1 className='mb-4 text-3xl font-extrabold text-gray-900 dark:text-white lg:text-[28px]'><span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>Shaxsiy akkauntga</span> kirish.</h1>
                            <form className="w-full h-auto lg:p-[0_20px]" onSubmit={SignIn}>
                                <div className="mb-5">
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sizning elektron manzilingiz:</label>
                                    <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required />
                                </div>
                                <div class="mb-5">
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sizning parolingiz:</label>
                                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='*********' required />
                                </div>
                                {/* <div class="flex items-start mb-5">
                                    <div class="flex items-center h-5">
                                        <input id="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                    </div>
                                    <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Saqlab qolinsin</label>
                                </div> */}
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Kirish</button>
                            </form>
                            <div className='w-full lg:text-center'>
                                <h2 className='text-[16px] font-normal tracking-[0.48px] mt-[20px] lg:flex items-center justify-center gap-[10px]'>Akkauntingiz yo'qmi? <Link to='/registration' className=' text-blue-600 font-medium underline'>Ro'yxatdan o'tish</Link></h2>
                            </div>
                        </div>
                    </div>
                    <div className='flex-[1] w-full h-screen lg:hidden'>
                        <div className='image'></div>
                    </div>
                </div>
            </>
        )
    } else {
        if (email === 'admin@admin.com' && password === 'Axat2005a') {
            navigate('/admin');
        }else {
            navigate('/user');
        }
    }
}
