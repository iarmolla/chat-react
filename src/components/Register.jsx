import { useDispatch, connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from '../actions/createUser'
import { Formik } from 'formik'
import createUserSelector from '../selectors/createUserSelector'

function Register({ ...props }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <div>
            <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 p-24">

                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">Register your account</h2>
                    </div>
                    <Formik
                        initialValues={{
                            username: '',
                            email: '',
                            password: '',
                        }}
                        validate={(values) => {
                            let errors = {}
                            const passwordIsValid = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
                            if (!values.email) {
                                errors.email = "* Missing field*"
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = "* Invalid email*"
                            }
                            if (!values.username) {
                                errors.username = "* Missing field*"
                            }
                            if (!values.password) {
                                errors.password = "* Missing field*"
                            }
                            else if (!passwordIsValid.test(values.password)) {
                                errors.password = "* Minimum eight characters, at least one letter and one number *"

                            }
                            return errors
                        }}
                        onSubmit={async (values) => {
                            dispatch(createUser(values, navigate))
                        }}
                    >
                        {({ handleSubmit,
                            errors,
                            values,
                            touched,
                            handleChange,
                            handleBlur
                        }) => (
                            <form className="mt-8 space-y-6" method='POST' onSubmit={handleSubmit}>
                                <div className="-space-y-px rounded-md shadow-sm">
                                    <div className="pb-2 pt-4">
                                        <input onChange={handleChange} value={values.email} onBlur={handleBlur} type="email" name="email" id="email" placeholder="Email" className="text-white block w-full p-4 text-lg rounded-sm bg-black" />
                                    </div>
                                    <label className={`${touched.email && errors.email ? 'error-text  text-sm font-semibold text-red-400' : 'hidden'}`}>{touched.email && errors.email}</label>
                                    <div className="pb-2 pt-4">
                                        <input onChange={handleChange} value={values.username} onBlur={handleBlur} type="username" name="username" id="username" placeholder="Username" className="text-white block w-full p-4 text-lg rounded-sm bg-black" />
                                    </div>
                                    <label className={`${touched.username && errors.username ? 'error-text  text-sm font-semibold text-red-400' : 'hidden'}`}>{touched.username && errors.username}</label>
                                    <div className="pb-2 pt-4">
                                        <input onChange={handleChange} value={values.password} onBlur={handleBlur} className="block w-full p-4 text-lg rounded-sm text-white bg-black" type="password" name="password" id="password" placeholder="Password" />
                                    </div>
                                    <label className={`${touched.password && errors.password ? 'error-text  text-sm font-semibold text-red-400' : 'hidden'}`}>{touched.password && errors.password}</label>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-sm">
                                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Do you have an account?</Link>
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" className="transition-all group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                        Register
                                    </button>
                                </div>
                                <div className='mt-4'>
                                    <p className='text-red-400'>{props.getMessage}</p>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
                <div className="lg:flex h-96 w-1/2 hidden bg-no-repeat bg-center bg-contain relative items-center login" >
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        getMessage: createUserSelector(state)
    }
}

export default connect(mapStateToProps, null)(Register)