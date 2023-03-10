import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { removeToken } from '../helpers/localStorage'
import logo from '../assets/logo.png'

function Navbar() {
    const navigate = useNavigate()
    const logout = () => {
        removeToken()
        navigate('/login')
    }
    const [sidebar, setSidebar] = useState(false)
    return (
        <nav>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button onClick={() => setSidebar(!sidebar)} type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-300" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-center sm:justify-between">
                        <div className="flex flex-shrink-0 items-center">
                            <img className="block h-40 mt-24 w-auto lg:hidden" src={logo} alt="Chatx" />
                            <img className="hidden h-40 mt-28 w-auto lg:block" src={logo} alt="Chatx" />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <span onClick={() => logout()} className="text-gray-300 hover:bg-neutral-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute top-14 sm:hidden" id="mobile-menu">
                <div className={` ${!sidebar ? 'hidden' : 'flex'} space-y-1 px-2 pt-2 pb-3`}>
                    <span onClick={() => logout()} className="text-gray-300 hover:bg-neutral-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</span>
                </div>
            </div>
        </nav>
    )
}

export default Navbar