import React, {useEffect} from "react";
import weatherService from "../services/weather";

const Weather = ({ weather, setWeather, city }) => {

    useEffect(() => {
        weatherService.get(city).then(result => {
            setWeather(result)
        })
    }, [city, setWeather])


    return weather.current && weather.location.name.toLowerCase() === city.toLowerCase()
        ?
            <div>
                <h3>Weather in {city}</h3>
                <p><b>temperature: </b>{`${weather.current.temperature} Celsius`}</p>
                <img src={weather.current.weather_icons[0]} alt={weather.weather_description} />
                <p><b>wind: </b>{`${weather.current.wind_speed} mph ${weather.current.wind_dir}`}</p>
            </div>
        :
            null
}

export default Weather
