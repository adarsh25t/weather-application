import React, { useContext, useEffect } from 'react'
import SearchWeather from '../components/SearchWeather'
import { MyContext } from '../Store';
import axios from 'axios';
import { url } from '../assets/assets';
import { getweather } from '../helper/getweatherhelper';
import WeatherDataCard from '../components/WeatherDataCard';
import { getFavoriteCities } from '../helper/getMyFavoriteCitites';

function Home() {

    const { login, favorites,setFavorites } = useContext(MyContext);

    useEffect(() => {

        if (login) {
            getMyFavoriteCities()
        }

    }, [login])

    const getMyFavoriteCities = async () => {
        const response = await getFavoriteCities()
        setFavorites(response)
    }
    

    return (
        <div className='px-5 md:px-40 py-4'>
            <SearchWeather />

            {login && <h1 className='text-2xl font-bold mt-20'>My Favorite Cities</h1>}
            {/* Add your favorite cities here */}
            <div className="flex flex-wrap">
                {
                    favorites.length > 0  ?
                    favorites.map((weatherData, index) => (
                        <div key={index} className='flex justify-between items-center my-5 gap-3'>
                            <WeatherDataCard weatherData={weatherData} mycity={true}/>
                        </div>
                    )) :
                    <>
                        {login && <h1 className='text-2xl font-bold mt-20'>No favorite cities</h1>}
                    </>
                }
            </div>
        </div>
    )
}

export default Home