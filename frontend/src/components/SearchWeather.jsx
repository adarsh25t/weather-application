import React, { useState } from 'react'
import { FaCloudSunRain } from "react-icons/fa6";
import axios from 'axios';

function SearchWeather() {

    const [searchInput, setSearchInput] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = "b8e635a8dac4db553ef3137ec2368543"
    const handleSubmit = async (e) => {
        e.preventDefault();

        const weatherDatas = {};

        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    q: searchInput,
                    appid: apiKey,
                    units: 'metric' // Add units parameter to get temperature in Celsius
                }
            });

            const data = response.data;
            weatherDatas.location = `${data.name}, ${data.sys.country}`;
            weatherDatas.temp = `${data.main.temp}°C`;
            weatherDatas.feelsLike = `${data.main.feels_like}°C`;
            weatherDatas.tempMax = `${data.main.temp_max}°C`;
            weatherDatas.tempMin = `${data.main.temp_min}°C`;
            weatherDatas.weatherDescription = data.weather[0].description;

            setWeatherData(weatherDatas);
            
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }

    }

    console.log(weatherData);

    return (
        <div className='w-full flex flex-col items-center justify-center mt-10'>
            <FaCloudSunRain size={100} className='text-sky-500' />
            <h1 className='text-3xl font-semibold text-sky-500'>The Weather App</h1>

            <div className="flex items-center mt-10 gap-3">
                <input type="text" onChange={(e) => setSearchInput(e.target.value)} class=" border-2 border-zinc-800 text-gray-900 placeholder:text-zinc-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 min-w-[550px] p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search City Or Country" />
                <button onClick={handleSubmit} className="text-gray-900 bg-white border-gray-300 focus:outline-none hover:bg-gray-100   font-medium rounded-lg text-base px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Search</button>
            </div>

            {weatherData &&
                <div className="">
                    <h1>{weatherData?.location}</h1>
                    <p>Current temperature: {weatherData?.temp}</p>
                    <p>Feels like: {weatherData?.feelsLike}</p>
                    <div className="">
                        <p>Max: {weatherData?.tempMax}</p>
                        <p>Min: {weatherData?.tempMin}</p>
                    </div>
                    <p>{weatherData?.weatherDescription}</p>
                </div>}
        </div>
    )
}

export default SearchWeather