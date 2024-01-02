import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getFirestore, onSnapshot, collection, addDoc, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase'
import { doc, getDoc } from "firebase/firestore";
import image from '../../assets/image';
import { WaveSpinner } from 'react-spinners-kit';
import { motion } from 'framer-motion';


export const Message = () => {
  const [user, loading] = useAuthState(auth);
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [dataLoading, setDataLoading] = useState(true);

  if (dataLoading) {
    setTimeout(() => {
      setDataLoading(false);
    }, 4000);
  }

  const [using, setUsing] = useState([]);

  const docRef = doc(db, "users", user.uid);
  useEffect(() => {
    const docCall = async () => {
      const docSnap = await getDoc(docRef);
      setUsing(docSnap.data());
    }
    docCall();
  }, []);

  const q = query(collection(db, `${using.team}teamMessages`), orderBy("timestamp"))
  const unsubscribe = onSnapshot(q, snapshot => {
    setMessages(snapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    })))
  })

  const sendMessage = async () => {
    await addDoc(collection(db, `${using.team}teamMessages`), {
      uid: using.uid,
      displayName: using.firstName,
      text: newMessage,
      timestamp: serverTimestamp()
    })

    setNewMessage("")
  }

  return (
    <>
      {/* <motion.div className={`absolute top-0 left-0 z-[2000] w-full h-screen bg-[#fff] ${dataLoading ? 'flex' : ' animate-[hiding_0.3s_0.5s_linear_forwards]'} items-center flex-col gap-[5px] justify-center`}
        initial={dataLoading ? { opacity: 1, scale: 1 } : {}}
        animate={dataLoading ? {} : { opacity: 0, scale: 1 }}
        transition={{ duration: 0.5 }}>
        <WaveSpinner size={60} color="#5754FF" />
        <div className='font-[600] text-[30px] text-[#5754FF] tracking-[1px]'>GEX</div>
      </motion.div> */}
      <div className='w-full flex justify-center bg-gray-800 py-[30px] px-[100px] h-screen overflow-x-hidden' >

        <div className='w-full flex flex-col gap-5'>
          <div className='text-white'> Logged in as {using.firstName}</div>
          <label>
            <input
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
            />
            <button className=' bg-white rounded-[10px] hover:bg-blue-400 p-3' onClick={sendMessage}>Send Message</button>
          </label>

          <div className="flex flex-col gap-5">

            {messages.map(msg => (
              <div key={msg.id} className={`message flex ${msg.data.uid === using.uid ? 'justify-end' : 'justify-start  '}`}>
                <div className={`message flex flex-row p-3 gap-3 rounded-[20px] items-center ${msg.data.uid === using.uid ? ' text-white bg-blue-500' : ' bg-white '}`}>
                  <img className='w-10 h-10 rounded-full object-cover' src={image.avatar} alt="avatar" />
                  {msg.data.text}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}
