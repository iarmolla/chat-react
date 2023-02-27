import React from 'react'
import io from 'socket.io-client'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

const socket = io('http://localhost:3030')

function Chat() {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    useEffect(() => {
        socket.on('received', (newMessage) => {
            const aux = [{ ...newMessage }]
            setMessages([...messages, ...aux])
        })
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
    return (
        <>
            <Navbar></Navbar>
            <div className="container-chat mt-24">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <section className="container-section">
                        <div className="container-title">
                            <input
                                type="search"
                                placeholder="search"
                                className="chat-search"
                            />
                            <div className="row">
                                <div>
                                    <h6 className="container-item--">Conectados</h6>
                                </div>
                                <div className="contact">
                                    <div className="">
                                        <h5 className="contact-item">User</h5>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="w-100">
                            <p className="chat-title-user">Chat</p>
                            <div className="chat-user-text">
                                <div className="section">
                                    {
                                        messages.map((item, index) => {
                                            if (item.from != 'me') {
                                                return (
                                                    <div key={index} className='section-user-text'>
                                                        <button className='text-button-user'>{item?.body}</button>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div key={index} className='user-text '>
                                                        <p className='text-button-user text-button-user--'>{item?.body}</p>
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

export default Chat