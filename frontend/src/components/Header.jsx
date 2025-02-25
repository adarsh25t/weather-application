import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TiWeatherPartlySunny } from "react-icons/ti";
import { MyContext } from '../Store';
import axios from 'axios';
import { url } from '../assets/assets';

function Header() {

  const { login,setLogin,setFavorites } = useContext(MyContext);
  const navigate = useNavigate()

  const handleLogout = async () => {
      const respose = await axios.get(url.logout, { withCredentials: true })
      if (respose.data.success) {
          setLogin(false);
          setFavorites([])
          navigate('/')
      }
  }

  return (
    <div className='px-5 md:px-40 py-4 flex justify-between items-center'>
      <Link to={'/'}>
        <TiWeatherPartlySunny size={50} className='text-sky-500' />
      </Link>

      <div className="flex items-center gap-2">
        <Link to={'/'} className='font-medium rounded-lg px-5 text-base'>Home</Link>
        {
          login ? 
          <button type="button" onClick={handleLogout} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-base px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">logout</button> :
            <Link to={'/login'}>
              <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-base px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Login</button>
            </Link>
            }

      </div>
    </div>
  )
}

export default Header