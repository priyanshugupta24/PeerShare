import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import { Link, Route, Routes } from 'react-router-dom';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import '../JoinRoom/RoomPage.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from '@mui/material';
const firebaseConfig = {
    apiKey: "AIzaSyDp2oKcwTulKcY-PGLSwNmCTqjtx8zyXiw",
    authDomain: "peershare2425.firebaseapp.com",
    projectId: "peershare2425",
    storageBucket: "peershare2425.appspot.com",
    messagingSenderId: "308108699413",
    appId: "1:308108699413:web:94b0d16825b57b93d6ab1c",
    measurementId: "G-721QV10KH1"
};
firebase.initializeApp(firebaseConfig);
let userRef = null;

var scale = 'scale(1)';
const RoomPage = () => {
    const [roomName, setRoomName] = useState('');
    const [id, setId] = useState(null);
    const [generateIDClicked, setGenerateIDClicked] = useState(false);

    async function generateID(event) {

        const db = firebase.firestore();
        userRef = await db.collection('users').doc();
        document.querySelector('.instant-room-join').hidden = true;
        setId(userRef.id);
        setGenerateIDClicked(true);
        localStorage.setItem('peerRole', 'peerA');
    }
    function copyURL() {
        var url = `https://signalling-28129.web.app/room/${id}`;
        navigator.clipboard.writeText(url);
        toast("URL copied to clipboard! ", { theme: 'dark' });
    }
    function handleCustomRoom(event) {

        if (roomName === '' || roomName === ' ') {
            toast('Room name cannot be blank! ', { theme: 'dark' });
            event.preventDefault();
            return;
        }
        setId(roomName);
        localStorage.setItem('peerRole', 'peerA');
    }

    return (
        <div className='main'>
            <ToastContainer />
            <Navbar />
            <div className="flex-room-box">
                <div className="create-room-box">
                    <div className='content'>
                        <div className="custom-room">
                            <div className='custom-room-title'>Create Custom room</div>
                            <div className='custom-room-description'>
                                <p className='custom-room-description-text'>
                                    Custom rooms allows you to create your own public room with custom name
                                </p>

                            </div>
                            <input className='custom-room-input' placeholder='Room Name' type="text" onChange={(e) => setRoomName(e.target.value)} />
                            <Link className='custom-room-join' onClick={handleCustomRoom} to={`/room/${roomName}`}>
                                Join Room
                            </Link>
                        </div>
                        <div><hr /></div>
                        <div className="instant-room">
                            <div className='instant-room-title'>Join instant room</div>
                            <div className='instant-room-description'>
                                <p className='instant-room-description-text'>
                                    Instant rooms allows you to quickly join room with random url made by us.
                                </p>
                            </div>
                            <button className='instant-room-join' onClick={generateID}>Generate instant link</button>
                            {
                                generateIDClicked &&
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'center', width: '75%' }}>
                                        <span style={{ color: 'rgb(239,209,118)', marginTop: '5px', fontSize: '1vw' }}>{`https://signalling-28129.web.app/room/${id}`}</span>
                                        <Tooltip title='Copy link'>
                                            <button onClick={copyURL} style={{ backgroundColor: 'rgb(26, 240, 161)', marginLeft: '2%', width: '8%', borderRadius: '10px' }} >
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" /></svg>
                                            </button>
                                        </Tooltip>
                                    </div>
                                    <Link className='instant-room-join' to={`/room/${id}`}>
                                        Join Room
                                    </Link>
                                </>

                            }
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
}

export default RoomPage;