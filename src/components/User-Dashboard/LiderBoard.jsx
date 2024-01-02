import React, { useState, useEffect } from 'react'
import { auth, db } from '../../firebase/firebase';
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { onSnapshot, collection, orderBy, query, serverTimestamp } from 'firebase/firestore';

export const LiderBoard = () => {
    const [using, setUsing] = useState([]);
    const [getingDoc, setGetingDoc] = useState([]);
    const [user, loading] = useAuthState(auth);

    const docRef = doc(db, "users", user.uid);
    useEffect(() => {
        const docCall = async () => {
            const docSnap = await getDoc(docRef);
            setUsing(docSnap.data());
        }
        docCall();
    }, []);

    useEffect(() => {
        const q = query(collection(db, `users`), orderBy("timestamp"))
        const unsubscribe = onSnapshot(q, snapshot => {
            setGetingDoc(snapshot.docs.map(doc => ({
                data: doc.data()
            })))
        })
    }, []);

    console.log(getingDoc);
    return (
        <div>
            <h1>Liderboard</h1>

            <table className='w-full border-2 border-collapse'>
                <thead className='w-full'>
                    <tr className='w-full h-[40px] flex items-center justify-between'>
                        <th className='w-[40px] p-[18px] h-[40px] flex items-center justify-center border-b-[2px] border-r-[2px] border-[#999898]'>ID</th>
                        <th className='w-[100%] h-[40px] flex items-center justify-center border-b-[2px] border-r-[2px] border-[#999898] p-2'>FirstName</th>
                        <th className='w-[100%] h-[40px] flex items-center justify-center border-b-[2px] border-r-[2px] border-[#999898] p-2'>LastName</th>
                        <th className='w-[100%] h-[40px] flex items-center justify-center border-b-[2px] border-r-[2px] border-[#999898] p-2'>UserCoin</th>
                    </tr>
                </thead>
                <tbody className='w-full'>
                    {getingDoc.sort((a, b) => b.data.userCoin - a.data.userCoin).map((doc, id) =>
                        <tr className='w-full h-[40px] flex items-center justify-between'>
                            <td className='w-[40px] p-[18px] h-[40px] flex items-center justify-center border-b-[2px] border-r-[2px] border-[#999898]'>{id + 1}</td>
                            <td className='w-[100%] h-[40px] flex items-center justify-center border-b-[2px] border-r-[2px] border-[#999898] p-2'>{doc.data.firstName}</td>
                            <td className='w-[100%] h-[40px] flex items-center justify-center border-b-[2px] border-r-[2px] border-[#999898] p-2'>{doc.data.lastName}</td>
                            <td className='w-[100%] h-[40px] flex items-center justify-center border-b-[2px] border-r-[2px] border-[#999898] p-2'>{doc.data.userCoin}</td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    )
}
