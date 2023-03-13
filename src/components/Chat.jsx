import React, { useMemo } from 'react'
import io from 'socket.io-client'
import save from '../actions/messages'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useDispatch } from 'react-redux'
import { getUser, getUsers } from '../actions/users'
import { getMessagesFetch, saveMessages } from '../actions/messages'

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
    const socket = io('http://localhost:3030', {
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
        let index = props[0].getMessages.length - 1 .toString()
        index = `${index} message`
        const element = document.getElementById(index)
        element?.scrollIntoView()
    }, [socket])
    useEffect(() => {
        socket.emit('join', room)
        dispatch(getMessagesFetch(room))
    }, [room])
    const handleSubmit = (e) => {
        e.preventDefault()
        if (message !== '') {
            socket.emit('message', message, room, window.localStorage.getItem('email'))
            setMessage('')
        }
    }
    const navbar = useMemo(() => {
        return <Navbar />
    }, [])
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
                                    <h5 className='contact-item' onClick={async (e) => {
                                        setRoom('general')


                                    }}>General</h5>
                                    <h5 className='contact-item' onClick={async (e) => {
                                        setRoom('games')

                                    }}>Games</h5>
                                    <h5 className='contact-item' onClick={async (e) => {
                                        setRoom('music')


                                    }}>Music</h5>
                                </div>
                                <div>
                                    <h6 className="container-item-- overflow-ellipsis">Online</h6>
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
                            <p className="chat-title-user">{room}</p>
                            <div className="chat-user-text">
                                <div className="section" id='message'>
                                    {
                                        props[0].getMessages?.map((item, index) => {
                                            if (item.email != window.localStorage.getItem('email')) {
                                                return (
                                                    <div key={index} className='section-user-text'>
                                                        <button id={`${index} message`} className='text-button-user'>{item?.message}</button>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div key={index} className='user-text '>
                                                        <p id={`${index} message`} className='text-button-user text-button-user--'>{item?.message}</p>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </div>
                            <footer className="footer-chat">
                                <input
                                    onChange={((e) => setMessage(e.target.value))}
                                    value={`${message != '' ? message : ''}`}
                                    className="chat-footer w-32 sm:w-full"
                                    type="text"
                                    maxLength={23}
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