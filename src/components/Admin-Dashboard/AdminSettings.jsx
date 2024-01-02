import React, { useState, useEffect } from 'react'
import image from '../../assets/image';
import { Link } from 'react-router-dom';
import { TEInput, TERipple, TETextarea } from 'tw-elements-react';
import { db } from '../../firebase/firebase';
import { collection, onSnapshot } from "firebase/firestore";

export const AdminSettings = () => {

    const [lesson, setLesson] = useState();
    const [sellect, setSellect] = useState();
    const [task, setTask] = useState();
    const [load, setLoad] = useState(true);
    const [modulData, setModulData] = useState([]);

    const subHomework = (e) => {
        e.preventDefault();
        alert(`Success ${lesson} ...... ${sellect} ... ${task}`);
    }

    const collectionRef = collection(db, "modul-data");
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

    return (
        <div className='w-full h-screen px-[30px] pt-[30px] lg:pl-[120px] sm:pl-[80px] sm:px-[10px] overflow-x-hidden '>
            <div className='border-2 w-full h-full relative'>
                {/* Dashbord visible panel */}
                <div className='flex gap-5 mt-8 xl:flex-wrap xl:justify-between'>

                    {/* Student statistics */}
                    <div className='min-w-[50%] shadow-md flex flex-col items-center px-[15px] py-[25px] md:w-full xl:min-w-0 xl:w-full'>
                        <div>
                            <h2 className='text-[18px] font-medium leading-[28px] mb-[32px]'>Control all modul</h2>
                        </div>

                        <form className='w-full flex flex-col gap-3' onSubmit={subHomework}>
                            <select name="" id="" required className='w-full h-[40px] border-2' onChange={(e) => setSellect(e.target.value)}>
                                <option value="">Select a section</option>
                                {modulData.map(res => (
                                    <option value={res.value}>{res.text}</option>
                                ))}
                            </select>

                            <select name="" id=""   onChange={(e) => alert(e.target.value === 'true' ? true : false)}>
                                <option value={true}>True</option>
                                <option value={false}>False</option>
                            </select>
                            <TERipple rippleColor="light">
                                <button
                                    type="submit"
                                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                >
                                    Button
                                </button>
                            </TERipple>
                        </form>
                    </div>
                    {/* End of */}
                </div>
            </div>
        </div>
    )
}
