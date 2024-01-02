import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Loading } from '../../Loading'
import { AdminNavbar } from './AdminNavbar';
import { AdminDash } from './AdminDash';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase/firebase';

export const Admin = () => {
    const [loading1, setLoading] = useState(false);
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 3000)
    }, [])

    return (
        <>
            {
                loading1 ?
                    <Loading />
                    :
                    <div className='flex w-full h-screen'>
                        <AdminNavbar />
                        <Routes>
                            <Route path="/" element={<AdminDash />} />
                            {/* <Route path="message" element={<Message />} /> */}
                        </Routes>
                    </div>
            }
        </>
    )
}
