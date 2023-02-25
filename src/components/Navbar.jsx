import React from 'react'

function Navbar() {
    return (
        <header className='bg-white p-5'>
            <nav className='text-black flex flex-row gap-5'>
                <span>Home</span>
                <span>Chat</span>
                <span>Logout</span>
            </nav>
        </header>
    )
}

export default Navbar