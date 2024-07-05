import axios from "axios";
const apiKey = "b8e635a8dac4db553ef3137ec2368543"

export async function getweather(searchInput) {
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
            weatherDatas.name = data.name;

            return weatherDatas;

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
}