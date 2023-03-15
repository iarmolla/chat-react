import React, { useMemo } from 'react'
import io from 'socket.io-client'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useDispatch } from 'react-redux'
import { getUser, getUsers } from '../actions/users'
import { getMessagesFetch } from '../actions/messages'
import { connect } from 'react-redux'
import usersSelector from '../selectors/usersSelector'
import messages from '../selectors/messages'

const mapStateToProps = state => {
    return {
        getUsers: usersSelector(state),
        getMessages: messages(state)
    }
}

function Chat(...props) {
    const [room, setRoom] = useState('general')
    const socket = io(process.env.REACT_APP_API_URL, {
        query: {
            room: room
        }
    })
    const dispatch = useDispatch()
    const [query, setQuery] = useState('')
    const [message, setMessage] = useState('')
    useEffect(() => {
        if (!props[0].getUsers.length) {
            dispatch(getUsers())
        }
    }, [dispatch])

    useEffect(() => {
        socket.on('received', () => {
            dispatch(getMessagesFetch(room))
        })
    }, [socket])
    useEffect(() => {
        socket.emit('join', room)
        dispatch(getMessagesFetch(room))
        scroll()
    }, [room])
    const handleSubmit = (e) => {
        e.preventDefault()
        if (message !== '') {
            socket.emit('message', message, room, window.localStorage.getItem('email'))
            setMessage('')
            setTimeout(() => {
                scroll()
            }, 1000)
        }
    }
    const updateRoom = (room) => {
        setRoom(room)
    }
    const navbar = useMemo(() => {
        return <Navbar />
    }, [])
    const scroll = () => {
        const element = document.getElementById("scroll")
        element?.scrollIntoView()
    }
    return (
        <>
            {navbar}
            <div className="container-chat mt-24">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <section className="container-section">
                        <div className="container-title">
                            <input
                                placeholder="search"
                                className="chat-search"
                                onChange={(e) => {
                                    setQuery(e.target.value)
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        dispatch(getUser(query))
                                    }
                                }}
                            />
                            <div className="h-full chat overflow-y-scroll">
                                <div className='text-white flex flex-col gap-3 mb-5'>
                                    <h6 className="container-item-- overflow-ellipsis">Rooms</h6>
                                    <h5 className='contact-item' onClick={() => updateRoom('general')}>General</h5>
                                    <h5 className='contact-item' onClick={() => updateRoom('games')}>Games</h5>
                                    <h5 className='contact-item' onClick={() => updateRoom('music')}>Music</h5>
                                </div>
                                <div>
                                    <h6 className="container-item-- overflow-ellipsis uppercase">Users</h6>
                                    <div className="contact h-9">
                                        {
                                            props[0]?.getUsers?.map((user, index) => {
                                                return (
                                                    <h5 key={index} className="contact-item overflow-clip overflow-ellipsis">{user.email} </h5>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-100">
                            <p className="chat-title-user mb-5 uppercase">{room}</p>
                            <div className="chat-user-text">
                                <div className="section relative" id='message'>
                                    {
                                        props[0].getMessages?.map((item, index) => {
                                            if (item.email != window.localStorage.getItem('email')) {
                                                return (
                                                    <div key={index} className='section-user-text relative'>
                                                        <span style={{ color: item?.color }} className='absolute -top-5 text-xs left-0'>{item.email}</span>
                                                        <button id={index} className='cursor-text text-button-user '>{item?.message}</button>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div key={index} className='user-text relative'>
                                                        <span className='absolute -top-5 text-blue-100 text-xs right-0' style={{ color: item?.color }}>{item.email}</span>
                                                        <button id={index} className='cursor-text text-button-user text-button-user--'>
                                                            {item?.message}
                                                        </button>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                    <div id="scroll" className='absolute bottom-0 left-5'>
                                        <h1 className='opacity-0'>Texto</h1>
                                    </div>
                                </div>

                            </div>
                            <footer className="footer-chat">
                                <input
                                    onChange={((e) => setMessage(e.target.value))}
                                    value={`${message != '' ? message : ''}`}
                                    className="chat-footer w-32 sm:w-full"
                                    type="text"
                                    placeholder="send"
                                />
                                <button onClick={(e) => handleSubmit(e)}>Send</button>
                                <box-icon className="h-16 w-5 text-white" name='send' color='#ffffff'></box-icon>
                            </footer>
                        </div>
                    </section>
                </form>
            </div>
        </>
    )
}
export default connect(mapStateToProps, null)(Chat)