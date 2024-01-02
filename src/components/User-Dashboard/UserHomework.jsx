import React, { useState, useEffect } from 'react';
import { TESelect, TETextarea } from "tw-elements-react";
import { auth, db } from '../../firebase/firebase';
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import TelegramEmbed from 'react-telegram-embed'
import image from '../../assets/image';

export const UserHomework = () => {

    const [workOpen, setWorkOpen] = useState(false);
    const [submitWork, setSubmitWork] = useState(false);
    const [workData, setWorkData] = useState([]);
    console.log(workData);

    const [load, setLoad] = useState(true);
    const [modulData, setModulData] = useState([]);
    const [LessonData, setLessonData] = useState([]);
    const [fill, setFil] = useState("");
    const collectionRef = collection(db, "modul-data");
    const collectionLes = collection(db, "lessons");

    useEffect(() => {
        const getUsing = [];
        onSnapshot(collectionRef, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                getUsing.push({ ...doc.data(), id: doc.id });
            })
            setModulData(getUsing);
            setLoad(false);
        })
    }, [load]);

    console.log(modulData);

    useEffect(() => {
        const getUsing = [];
        onSnapshot(collectionLes, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                getUsing.push({ ...doc.data(), id: doc.id });
            })
            setLessonData(getUsing);
            setLoad(false);
        })
    }, [load]);

    function addEnter(textValue = "text") {
        const enterArr = textValue.split(".");
        console.log(enterArr);
        return enterArr;
    }

    const [workFile, setWorkFile] = useState([]);
    let files;
    const uploadHomework = (e) => {
        e.preventDefault();
        files = {
            name: workFile.name,
            Url: URL.createObjectURL(workFile),
            dataTime: workFile.lastModifiedDate
        };
    }

    return (
        <div className='w-full h-screen px-[30px] pt-[30px] lg:pl-[120px] sm:pl-[80px] sm:px-[10px] overflow-x-hidden '>
            <div className='w-full h-full  relative'>
                {/* Dashbord Titles */}
                <div className='dashbord__title__bg w-full p-[32px_40px] rounded-[15px] mb-7 sm:p-[20px]'>
                    <div className='text-[#fff] overflow-hidden'>
                        <h2 className='text-[35px] font-bold tracking-[-1.05px] sm:text-[22px]' style={{ fontFamily: "'Open Sans', sans-serif" }}>Are you ready to do your homework?</h2>
                        <p className='max-w-[532px] text-[15px] font-normal leading-[26.3px] tracking-[0.3px] opacity-[0.8] mt-3 sm:text-[12px]'>Please reach out to the Head Teacher if you want them excluded from your domain.</p>
                    </div>
                </div>
                {/* End of */}

                {/* The schedule of lessons */}
                <div className='w-full relative'>
                    <form className='w-full h-[50px] mb-5'>
                        <TESelect data={modulData} search onValueChange={(e) => setFil(e.id)} />
                    </form>

                    <div className='w-full h-[50vh] flex gap-10 justify-center flex-wrap p-5 sm:gap-5 overflow-x-hidden'>
                        {
                            LessonData.filter((val) => val.sellect.includes(fill)).map((val, id) =>
                                <button onClick={() => setWorkOpen(true) & setWorkData(val)} className='w-[300px] p-5 relative bg-white rounded-md flex flex-col gap-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
                                    <div className='w-full flex justify-between'>
                                        <h2>{val.lessonname}</h2>
                                        <h2>{val.sellect}</h2>
                                    </div>
                                    <div className='flex items-start flex-col pb-5'>
                                        <h3>Tasks:</h3>
                                        <div className='flex flex-col items-start'>
                                            {
                                                addEnter(val.task).map(el =>
                                                    <span className='text-left'>{el}</span>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <span className=' absolute bottom-5'>Date: 2023.11.03</span>
                                </button>
                            )
                        }
                    </div>

                    <div className={`${workOpen ? 'clipping' : 'noClipping'} absolute top-0 left-0 w-full h-full pt-[70px]`}>
                        <button onClick={() => setWorkOpen(false)} className='bg-white border-2 absolute top-5 right-5'>
                            <img src={image.bars_solid} alt="close" />
                        </button>

                        <div className={`w-full h-full ${workOpen ? '' : 'overflow-y-scroll'}`}>
                            <div>
                                <div className='flex justify-between flex-row-reverse items-center m-5'>
                                    <span className='text-2xl text-[#0052B4] uppercase font-extrabold'>{workData.sellect}</span>
                                    <h2 className='text-2xl text-[#0052B4] uppercase font-extrabold'>{workData.lessonname}</h2>
                                </div>

                                <div className='flex flex-col items-center gap-3 my-[50px]'>

                                    <h2 className='text-5xl font-extrabold'>Tasks:</h2>

                                    <div className='flex flex-col font-medium'>
                                        {
                                            addEnter(workData.task).map(el =>
                                                <span className='text-left'>{el}</span>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className='flex flex-col gap-10'>
                                    <div className='w-full h-full'>
                                        <h2 className='text-2xl uppercase font-extrabold text-center'>Lesson Video:</h2>
                                        {/* <TelegramEmbed src={workData.lessonvideolink} /> */}
                                    </div>
                                    <div className='w-full h-[600px] flex justify-center'>
                                        <iframe className='w-full' src={workData.youtubevideolink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                    </div>
                                </div>

                                <div className='flex items-center flex-col py-10'>
                                    <h2 className='text-2xl text-[#0052B4] uppercase font-extrabold'>Please send me your tasks.</h2>
                                    <h3 className='text-xl text-[#263f5f] uppercase font-extrabold'>Procedure for sending tasks</h3>

                                    <div className='flex flex-col my-10'>
                                        <span className='text-lg text-[#b40012]'>1 - Study the tasks</span>
                                        <span className='text-lg text-[#b40012]'>2 - Complete all tasks</span>
                                        <span className='text-lg text-[#b40012]'>3 - Collect tasks into 1 zip file.</span>
                                        <span className='text-lg text-[#b40012]'>4 - Save a copy of your assignments.</span>
                                        <span className='text-lg text-[#b40012]'>5 - send the zip file</span>
                                    </div>

                                    <button type="button" onClick={() => setSubmitWork(true)} class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Submit tasks</button>

                                    <div className={`w-full ${submitWork ? 'h-[90vh]' : 'h-[0vh]'} bg-[#0052B4] mt-10 transition-all duration-300 overflow-hidden relative rounded-lg`}>
                                        <h1 className='text-2xl text-white p-5'>Submit work</h1>
                                        <button onClick={() => setSubmitWork(false)} className='bg-white border-2 absolute top-5 right-5'>
                                            <img src={image.bars_solid} alt="close" />
                                        </button>

                                        <form onSubmit={uploadHomework} className='pb-[50px] flex flex-col items-center justify-center gap-10'>
                                            <input type="file" id='subFiles' className='hidden' onChange={(e) => setWorkFile(e.target.files[0])} />
                                            <label htmlFor="subFiles" className='cursor-pointer'>
                                                <div className='w-[500px] h-[300px] border-2 border-dashed flex flex-col items-center justify-center gap-3 rounded-xl'>
                                                    <img src={image.upload} alt="upload" className='w-[150px]' />
                                                    <span className='text-lg text-white'>Browse File to Upload</span>
                                                </div>
                                            </label>

                                            <div className='w-[500px] border-2 p-5 bg-white'>
                                                <div className='flex items-center justify-between'>
                                                    <h2 className='text-[#0052B4] font-bold'></h2>
                                                    <div className='bg-white w-[25px]' onClick={() => setWorkFile([])}>
                                                        <img src={image.bars_solid} alt="del icon" />
                                                    </div>
                                                </div>

                                            </div>

                                            <button type="submit" onClick={() => setSubmitWork(true)} class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Submit tasks</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End of The schedule of lessons */}
            </div>
        </div>
    )
}
