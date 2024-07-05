import React, { useContext } from 'react'
import { TiWeatherSunny } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import axios from 'axios';
import { url } from '../assets/assets';
import { getFavoriteCities } from '../helper/getMyFavoriteCitites';
import { MyContext } from '../Store';
import { toast } from 'react-toastify';

function WeatherDataCard({ weatherData, mycity }) {

    const { setFavorites } = useContext(MyContext);

    const saveWeatherData = async () => {
        const response = await axios.post(url.favourite, { city: weatherData?.name }, { withCredentials: true })
        if (response.data.success) {
            const response = await getFavoriteCities()
            setFavorites(response)
            toast.success(response.data.message, {
                position: "top-center"
            });
        }
        else {
            toast.warning(response.data.message, {
                position: "top-center"
            });
        }
    }

    return (
        <div className="p-5 relative shadow-xl rounded-lg flex flex-col gap-2 min-w-96">
            {
                mycity ? < div className="absolute top-5 right-5" onClick={saveWeatherData}>
                    <FaHeart size={25} className='text-red-300' />
                </div> :
                    <div className="absolute top-5 right-5" onClick={saveWeatherData}>
                        <FaRegHeart size={25} className='text-gray-300' />
                    </div>
            }
            <TiWeatherSunny size={60} className='text-yellow-400' />
            <h1 className='text-4xl font-bold text-blue-400'>{weatherData?.location}</h1>
            <p className='text-lg text-zinc-800 font-semibold'>Current temperature: {weatherData?.temp}</p>
            <p className='text-lg text-zinc-800 font-semibold'>Feels like: {weatherData?.feelsLike}</p>
            <div className="flex flex-col gap-1 text-sm text-zinc-800 font-semibold">
                <p>Max: {weatherData?.tempMax}</p>
                <p>Min: {weatherData?.tempMin}</p>
            </div>
            <p className='text-3xl text-blue-400 font-bold text-right capitalize'>{weatherData?.weatherDescription}</p>
        </div >
    )
}

export default WeatherDataCard