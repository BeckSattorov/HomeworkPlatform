import React, { useState } from 'react'
import { db, auth } from '../../firebase/firebase'
import firebase from 'firebase'

export const SendMessage = ({ scroll }) => {
    const [msg, setMsg] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault()
        const { uid } = auth.currentUser

        await db.collection('messages').add({
            text: msg,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMsg('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div>
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                    <input style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                    <button style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}} type="submit">Send</button>
                </div>
            </form>
        </div>
    )
}

export default SendMessage
