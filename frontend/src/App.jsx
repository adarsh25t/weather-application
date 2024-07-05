import { useContext, useEffect, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { checkUserAuthentication } from './helper/checkUserAuthentication'
import { MyContext } from './Store'
import { getFavoriteCities } from './helper/getMyFavoriteCitites'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const {setFavorites,setLogin } = useContext(MyContext);

  useEffect(() => {
    getUserAuthentication()
  }, [])

  const getUserAuthentication = async () => {
    const result = await checkUserAuthentication();
    if (result.success) {
      setLogin(result.success)
      const response = await getFavoriteCities()
      setFavorites(response)
    }
  }

  return (
    <>
      <ToastContainer />
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
