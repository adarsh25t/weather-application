import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner';
import { url } from '../assets/assets';
import axios from 'axios';
import { MyContext } from '../Store';
import { toast } from 'react-toastify';


function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const { setLogin } = useContext(MyContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            email,
            password
        }
        const response = await axios.post(url.login, data,{ withCredentials: true })
        if (response.data.success) {
            setEmail('')
            setPassword('')
            setLoading(false);
            setLogin(true)
            navigate('/');
        }
        else {
            toast.error(response.data.message, {
                position: "top-center"
            });
            setLoading(false);
        }
    }

    return (
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white text-black rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Sign in to your account
                        </h1>
                        <form className="space-y-2 md:space-y-3" onSubmit={handleSubmit}>
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="bg-transparent border-2 border-gray-700 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@gmail.com" required />
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-transparent border-2 border-gray-700 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                            </div>
                            {
                                loading ?
                                   <div className="flex justify-center items-center ">
                                     <Spinner />
                                   </div> :
                                <button type="submit" className="w-full text-white bg-gray-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                            }
                            
                            <p className="text-sm font-medium text-gray-600 ">
                                Don’t have an account yet? <Link to={'/register'} className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Register</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login