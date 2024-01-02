import React from 'react'
import { Link } from "react-router-dom";
import image from '../../assets/image';
import './homeStyle.css';

export const Home = () => {
    return (
        <div>
            <header class="absolute top-0 left-0 w-full h-[100px] flex items-center z-10 md:h-[90px]">
                <div class="container">
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <Link href="/">
                                <img src={image.platform} alt="homework logo 1" className='w-[120px] h-full object-cover md:w-[90px]' />
                            </Link>
                        </div>

                        <div className='flex items-center gap-[15px]'>
                            <div className='md:hidden'>Hisobingiz bormi?</div>
                            <Link to='/login' class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br bg-transparent from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white sm:m-0">
                                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Kirish
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

                <section class="relative w-full h-screen flex items-center justify-center lg-screen sm:py-[120px]">
                    <div class="container">
                        <div className='w-full flex items-center lg:flex-col gap-[96px]'>
                            <div className="w-full flex-1 lg:flex-auto">
                                <h1 className="hero__title">
                                    Homework Platform
                                </h1>

                                <p class="hero__info">
                                    Umumlashtirilgan platforma - uyga vazifa, test topshiriqlarini bajarish va <br className='sm:hidden' /> topshirish platformasi.
                                </p>

                                <div>
                                    <Link to='/registration' class="text-[#0086FD] hover:text-white border border-[#0086FD] hover:bg-[#0086FD] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-3 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-[#0086FD] dark:focus:ring-blue-800">Boshlash</Link>
                                    <div className='mt-[20px] text-[12px] text-[#777] select-none'>Ro'yxatdan o'tmaganlar boshlash tugmasini bosib ro'yxatdan o'ting.</div>
                                </div>
                            </div>

                            <div class="w-full flex-1 relative lg:flex-auto">
                                <div class="heroImg"></div>

                                {/* <!-- ! Hero image elements --> */}
                                <div class="hero_img_el img_el1">
                                    <div class="el__content">
                                        <img src={image.hero__imgIcon} alt="hero_img_el"></img>

                                        <div class="el_text">
                                            <h2>Analitika</h2>
                                            <p>O'quv reytingi</p>
                                        </div>
                                    </div>

                                    <div class="diagramma">
                                        <span class="diag_el"></span>
                                        <span class="diag_el"></span>
                                        <span class="diag_el"></span>
                                        <span class="diag_el"></span>
                                        <span class="diag_el"></span>
                                        <span class="diag_el"></span>
                                        <span class="diag_el"></span>
                                        <span class="diag_el bg-1"></span>
                                        <span class="diag_el bg-1"></span>
                                        <span class="diag_el bg-2"></span>
                                    </div>
                                </div>
                                <div class="hero_img_el img_el2">
                                    <div class="el__content">
                                        <img src={image.hero__imgIcon2} alt="hero_img_el"></img>

                                        <div class="el_text">
                                            <h2>Aniqlik</h2>
                                            <p>Qiziqarli darsliklar</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        </div>
    )
}