import React, { useContext, useEffect } from 'react'
import SearchWeather from '../components/SearchWeather'
import { MyContext } from '../Store';
import axios from 'axios';
import { url } from '../assets/assets';
import { getweather } from '../helper/getweatherhelper';
import WeatherDataCard from '../components/WeatherDataCard';

function Home() {

    const { login, setFavorites, favorites } = useContext(MyContext);

    useEffect(() => {

        

        if (login) {
            getFavoriteCities()
        }

    }, [login])

    // Fetch favorite cities data here if login is true
    const getFavoriteCities = async () => {

        const response = await axios.get(url.favourite, { withCredentials: true })
        if (response.data.success) {
            const cities = response.data.data?.cities || [];
            const weatherPromises = cities.map(city => getweather(city));
            const weatherData = await Promise.all(weatherPromises);

            // Assuming setFavorites is a state updater function from useState
            setFavorites(prevFavorites => [...prevFavorites, ...weatherData]);
        }
    }

    console.log(favorites);

    return (
        <div className='px-5 md:px-40 py-4'>
            <SearchWeather />

            <h1 className='text-2xl font-bold mt-20'>My Favorite Cities</h1>
            {/* Add your favorite cities here */}
            <div className="flex flex-wrap">
                {
                    favorites.length > 0 &&
                    favorites.map((weatherData, index) => (
                        <div key={index} className='flex justify-between items-center my-5 gap-3'>
                            <WeatherDataCard weatherData={weatherData} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home