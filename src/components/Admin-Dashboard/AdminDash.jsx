import React, { useState, useEffect } from 'react'
import image from '../../assets/image';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { TEInput, TERipple, TETextarea, TESelect } from 'tw-elements-react';
import { auth, db } from '../../firebase/firebase';
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";

export const AdminDash = () => {
  const [user, loading] = useAuthState(auth);
  const [lessonname, setLessonName] = useState();
  const [lessonvideolink, setLessonvideolink] = useState("");
  const [youtubevideolink, setYoutubevideolink] = useState("");
  const [sellect, setSellect] = useState();
  const [task, setTask] = useState();
  const [addtask, setAddTask] = useState();
  const [load, setLoad] = useState(true);
  const [modulData, setModulData] = useState([]);

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

  console.log(modulData);

  const newLesson = async (e) => {
    e.preventDefault();
    const collectionLes = collection(db, 'lessons');

    try {
      await addDoc(collectionLes, {
        lessonname,
        lessonvideolink,
        youtubevideolink,
        sellect,
        task,
        disabled: false
      })

      window.location.reload();
    } catch (error) {
      console.log(error);
      alert(`Xatolik aniqlandi: ${error}`);
    }
  }

  return (
    <div className='w-full h-screen px-[30px] pt-[30px] lg:pl-[120px] sm:pl-[80px] sm:px-[10px] overflow-x-hidden '>
      <div className='border-2 w-full h-full relative'>
        {/* Dashboard nav Panel */}
        <div className='flex items-center justify-end gap-[43px]'>
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

            <Link to=''>
              <img src={image.setting_icon_gray} alt="settings" className='stroke-[#8B8C8C]' />
            </Link>

            <div className='w-[50px] h-[50px] px-[4.5px] py-[4.5px] border-2 rounded-[10px] border-[#0052B4] user__modal'>
              <img src={image.avatar} alt="userImage" className='w-full h-full object-cover rounded-[10px] border-[1px]' />
              
            </div>
          </div>
        </div>
        {/* End of Dashboard nav Panel */}

        {/* Dashbord visible panel */}
        <div className='flex gap-5 mt-8 xl:flex-wrap xl:justify-between'>

          {/* Student statistics */}
          <div className='min-w-[50%] shadow-md flex flex-col items-center px-[15px] py-[25px] md:w-full xl:min-w-0 xl:w-full'>
            <div>
              <h2 className='text-[18px] font-medium leading-[28px] mb-[32px]'>New Homework</h2>
            </div>

            <form className='w-full flex flex-col gap-3' onSubmit={newLesson}>
              <TESelect data={modulData} search onValueChange={(e) => setSellect(e.text)}/>
              <TEInput
                type="text"
                id="exampleFormControlInputText"
                label="Lesson Name"
                required
                onChange={(e) => setLessonName(e.target.value)}
              ></TEInput>

              <TETextarea id="textareaExample" wrap='hard' label="Task" rows={5} onChange={(e) => setTask(e.target.value)}></TETextarea>

              <TEInput
                type="text"
                id="exampleFormControlInputText"
                label="Lesson video link"
                onChange={(e) => setLessonvideolink(e.target.value)}
              ></TEInput>

              <TEInput
                type="text"
                id="exampleFormControlInputText"
                label="Youtube video link"
                onChange={(e) => setYoutubevideolink(e.target.value)}
              ></TEInput>

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

          {/* Upcoming Activities */}
          <div className='w-full px-[19px] py-[17px] shadow-md'>
            <h2 className='text-[#272835] text-[18px] font-medium leading-[20px] mb-3'>Upcoming Activities</h2>
            <div className='h-[calc(100%_-_50px)] overflow-x-hidden overflow-y-scroll flex flex-col items-center gap-2 pr-2'>
              {/* ----------------- */}
              <div className='w-full shadow-lg bg-[#F0F7FF] rounded-[5px] p-[15px] flex items-center gap-[23px]'>
                <div className='flex items-center justify-center bg-[#0052B4] w-[36px] h-[36px] rounded-lg'>
                  <span className='text-white text-sm font-normal'>31</span>
                </div>

                <div className='flex flex-col gap-[2px]'>
                  <h3 className='text-[#333] text-[15px] font-bold flex items-center gap-[13px]'>
                    <span>Meeting with the VC</span>
                    <span className='flex items-center gap-1'>
                      <div className='w-[6px] h-[6px] bg-[#0052B4] rounded-full'></div>
                      <h4 className='text-[#8A8A8A] text-[10px] font-bold flex items-center gap-1'>
                        <span>10 A.M</span> -
                        <span>11 A.M</span>
                      </h4>
                    </span>
                  </h3>
                  <div className='flex items-center gap-[13px] text-[10px] font-bold'>
                    <Link to='' className='text-[#0052B4] decoration-[#0052B4] underline'>Meeting link//www.zoom.com</Link>
                    <span className='text-[#FF1515]'>Due soon</span>
                  </div>
                </div>
              </div>
              {/* -------------- */}
              {/* ----------------- */}
              <div className='w-full shadow-lg bg-[#F0F7FF] rounded-[5px] p-[15px] flex items-center gap-[23px]'>
                <div className='flex items-center justify-center bg-[#0052B4] w-[36px] h-[36px] rounded-lg'>
                  <span className='text-white text-sm font-normal'>31</span>
                </div>

                <div className='flex flex-col gap-[2px]'>
                  <h3 className='text-[#333] text-[15px] font-bold flex items-center gap-[13px]'>
                    <span>Meeting with the VC</span>
                    <span className='flex items-center gap-1'>
                      <div className='w-[6px] h-[6px] bg-[#0052B4] rounded-full'></div>
                      <h4 className='text-[#8A8A8A] text-[10px] font-bold flex items-center gap-1'>
                        <span>10 A.M</span> -
                        <span>11 A.M</span>
                      </h4>
                    </span>
                  </h3>
                  <div className='flex items-center gap-[13px] text-[10px] font-bold'>
                    <Link to='/' className='text-[#0052B4] decoration-[#0052B4] underline'>Meeting link//www.zoom.com</Link>
                    <span className='text-[#FF1515]'>Due soon</span>
                  </div>
                </div>
              </div>
              {/* -------------- */}
              {/* ----------------- */}
              <div className='w-full shadow-lg bg-[#F0F7FF] rounded-[5px] p-[15px] flex items-center gap-[23px]'>
                <div className='flex items-center justify-center bg-[#0052B4] w-[36px] h-[36px] rounded-lg'>
                  <span className='text-white text-sm font-normal'>31</span>
                </div>

                <div className='flex flex-col gap-[2px]'>
                  <h3 className='text-[#333] text-[15px] font-bold flex items-center gap-[13px]'>
                    <span>Meeting with the VC</span>
                    <span className='flex items-center gap-1'>
                      <div className='w-[6px] h-[6px] bg-[#0052B4] rounded-full'></div>
                      <h4 className='text-[#8A8A8A] text-[10px] font-bold flex items-center gap-1'>
                        <span>10 A.M</span> -
                        <span>11 A.M</span>
                      </h4>
                    </span>
                  </h3>
                  <div className='flex items-center gap-[13px] text-[10px] font-bold'>
                    <Link to='/' className='text-[#0052B4] decoration-[#0052B4] underline'>Meeting link//www.zoom.com</Link>
                    <span className='text-[#FF1515]'>Due soon</span>
                  </div>
                </div>
              </div>
              {/* -------------- */}
              {/* ----------------- */}
              <div className='w-full shadow-lg bg-[#F0F7FF] rounded-[5px] p-[15px] flex items-center gap-[23px]'>
                <div className='flex items-center justify-center bg-[#0052B4] w-[36px] h-[36px] rounded-lg'>
                  <span className='text-white text-sm font-normal'>31</span>
                </div>

                <div className='flex flex-col gap-[2px]'>
                  <h3 className='text-[#333] text-[15px] font-bold flex items-center gap-[13px]'>
                    <span>Meeting with the VC</span>
                    <span className='flex items-center gap-1'>
                      <div className='w-[6px] h-[6px] bg-[#0052B4] rounded-full'></div>
                      <h4 className='text-[#8A8A8A] text-[10px] font-bold flex items-center gap-1'>
                        <span>10 A.M</span> -
                        <span>11 A.M</span>
                      </h4>
                    </span>
                  </h3>
                  <div className='flex items-center gap-[13px] text-[10px] font-bold'>
                    <Link to='/' className='text-[#0052B4] decoration-[#0052B4] underline'>Meeting link//www.zoom.com</Link>
                    <span className='text-[#FF1515]'>Due soon</span>
                  </div>
                </div>
              </div>
              {/* -------------- */}

            </div>
          </div>

          {/* End of Upcoming Activities */}
        </div>

        {/* End of */}
      </div>
    </div>
  )
}


