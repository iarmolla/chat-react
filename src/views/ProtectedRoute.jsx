import { getToken } from '../helpers/getToken'
import { Link } from 'react-router-dom'

function ProtectedRoute({ children }) {
    if (!getToken()) {
        return <div className='h-screen w-screen flex flex-col items-center justify-center'>
            <h1 className='text-white font-bold text-2xl'>Log in to access the chat</h1>
            <Link to="/login" className='btn-submit p-3 text-white rounded-lg font-bold mt-3 text-2xl bg-indigo-600 transition-all border-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500'>Login</Link>
        </div>
    }
    return (
        children
    )
}

export default ProtectedRoute