import React, { useMemo } from 'react'
import io from 'socket.io-client'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useDispatch } from 'react-redux'
import { getUser, getUsers } from '../actions/users'
import { connect } from 'react-redux'
import usersSelector from '../selectors/usersSelector'

const socket = io('http://localhost:3030')
const mapStateToProps = state => {
    return {
        getUsers: usersSelector(state)
    }
}
function Chat(...props) {
    const dispatch = useDispatch()
    const [query, setQuery] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    useEffect(() => {
        if (!props[0].getUsers.length) {
            dispatch(getUsers())
        }
    }, [dispatch])
    useEffect(() => {
        socket.on('received', (newMessage) => {
            const aux = [{ ...newMessage }]
            setMessages([...messages, ...aux])
        })
        let index = messages.length - 1 .toString()
        index = `${index} message`
        const element = document.getElementById(index)
        element?.scrollIntoView()
        
    }, [messages])
    const handleSubmit = (e) => {
        e.preventDefault()
        if (message !== '') {
            socket.emit('message', message)
            const newMessage = {
                body: message,
                from: 'me'
            }
            const aux = [{ ...newMessage }]
            setMessages([...messages, ...aux])
            setMessage('')
        }
    }
    const navbar = useMemo(()=> {
        return <Navbar/>
    },[])
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
                            <p className="chat-title-user">GROUP</p>
                            <div className="chat-user-text">
                                <div className="section" id='message'>
                                    {
                                        messages.map((item, index) => {
                                            if (item.from != 'me') {
                                                return (
                                                    <div key={index} className='section-user-text'>
                                                        <button id={`${index} message`} className='text-button-user'>{item?.body}</button>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div key={index} className='user-text '>
                                                        <p id={`${index} message`} className='text-button-user text-button-user--'>{item?.body}</p>
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