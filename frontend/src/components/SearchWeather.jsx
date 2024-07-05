import React, { useEffect, useState } from 'react'
import { FaCloudSunRain } from "react-icons/fa6";
import axios from 'axios';
import WeatherDataCard from './WeatherDataCard';
import { getweather } from '../helper/getweatherhelper';

function SearchWeather() {

    const [searchInput, setSearchInput] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiKey = "b8e635a8dac4db553ef3137ec2368543"


    const handleSubmit = async (e) => {
        e.preventDefault();
        const weatherdata = await getweather(searchInput);
        setWeatherData(weatherdata);
    }

    const getWeather = async (latitude, longitude) => {

        setLoading(true);
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    lat: latitude,
                    lon: longitude,
                    appid: apiKey,
                    units: 'metric'
                }
            });

            const data = response.data;
            const weatherDatas = {
                location: `${data.name}, ${data.sys.country}`,
                temp: `${data.main.temp}°C`,
                feelsLike: `${data.main.feels_like}°C`,
                tempMax: `${data.main.temp_max}°C`,
                tempMin: `${data.main.temp_min}°C`,
                weatherDescription: data.weather[0].description,
                name: data.name
            };

            setWeatherData(weatherDatas);
            setLoading(false);

        } catch (error) {
            console.error('Error fetching weather data:', error);
            setError('Error fetching weather data');
        }
    };



    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    getWeather(latitude, longitude);
                },
                (error) => {
                    console.error('Error fetching geolocation:', error);
                    setError('Error fetching geolocation');
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    }, []);


    return (
        <div className='w-full flex flex-col items-center justify-center mt-10'>
            <FaCloudSunRain size={100} className='text-sky-500' />
            <h1 className='text-3xl font-semibold text-sky-500'>The Weather App</h1>

            <div className="flex items-center mt-10 gap-3">
                <input type="text" onChange={(e) => setSearchInput(e.target.value)} class=" border-2 border-zinc-800 text-gray-900 placeholder:text-zinc-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 min-w-[550px] p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search City Or Country" />
                <button onClick={handleSubmit} className="text-gray-900 bg-white border-gray-300 focus:outline-none hover:bg-gray-100   font-medium rounded-lg text-base px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Search</button>
            </div>

            <div className="mt-10">
            {!loading &&
                <WeatherDataCard weatherData={weatherData} />}
            </div>
        </div>
    )
}

export default SearchWeather