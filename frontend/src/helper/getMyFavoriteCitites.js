import axios from "axios";
import { url } from "../assets/assets";
import { useContext } from "react";
import { getweather } from "./getweatherhelper";



const getFavoriteCities = async () => {


    const response = await axios.get(url.favourite, { withCredentials: true })
    if (response.data.success) {
        const cities = response.data.data?.cities || [];
        const weatherPromises = cities.map(city => getweather(city));
        const weatherData = await Promise.all(weatherPromises);
        return weatherData;
    }
}

export {
    getFavoriteCities
}