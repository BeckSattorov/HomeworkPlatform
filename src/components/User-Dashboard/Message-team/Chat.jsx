import React, { useState, useEffect, useRef } from 'react'
import { db, auth } from '../../firebase/firebase.js'
import SendMessage from './SendMessage'
import image from '../../assets/image'

function Chat() {
    const scroll = useRef()
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])
    return (
        <div>
            <div className="msgs">
                {messages.map(({ id, text, uid }) => (
                    <div>
                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                            <img src={image.avatar} alt="avatar" />
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
        </div>
    )
}

export default Chat
