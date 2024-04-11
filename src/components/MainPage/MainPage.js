import React, { useEffect, useState } from "react";
import "./MainPage.css";
import './MainPageMedia.css'
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import clearSky from "../../Images/clearSky.png";
import fewClouds from "../../Images/fewClouds.png";
import scatteredClouds from "../../Images/scatteredClouds.png";
import rainDay from "../../Images/rainDay.png";
import rainNight from "../../Images/rainNight.png";
import mist from "../../Images/mist.png";
import snow from "../../Images/snow.png";
import showerRain from "../../Images/showerRain.png";
import thunderStormDay from "../../Images/thunderStormDay.png";
import thunderStormNight from "../../Images/thunderStormNight.png";
import brokenClouds from "../../Images/brokenClouds.png";
import { GiWindsock } from "react-icons/gi";
import { BsMoisture } from "react-icons/bs";

export const API_KEY = "f50aeb2895fa2d5ac6d78dd22a57c171";
//https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=Metric&appid=f50aeb2895fa2d5ac6d78dd22a57c171

function MainPage() {
  const [inputValue, setInputValue] = useState("");
  const [cityName, setCityName] = useState("London");
  const [cityWeather, setCityWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleInputValueChange = (e) => {
    setInputValue(e.target.value);
  };
  const getCity = () => {
    setCityName(inputValue);
  };
  useEffect(() => {
    const fetchWeatherData = async () => {
      setErrorMessage("");
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=Metric&appid=${API_KEY}`
        );
        setCityWeather(response.data);
        setErrorMessage("");
        setLoading(false);
      } catch (error) {
        console.log("Error fetching:", error);
        setLoading(false);
        setErrorMessage("Failed to load data. Check browser connection and try again");
      }
    };
    fetchWeatherData();
  }, [cityName]);
  console.log(
    "CITY WEATHER SPEED:",
    cityWeather.wind && cityWeather.wind.speed
  );
  let weatherIcon;
  switch (cityWeather.weather && cityWeather.weather[0].icon) {
    case "01d":
      weatherIcon = clearSky;
      break;
    case "02d":
      weatherIcon = fewClouds;
      break;
    case "03d":
      weatherIcon = scatteredClouds;
      break;
    case "04d":
      weatherIcon = brokenClouds;
      break;
    case "09d":
      weatherIcon = showerRain;
      break;
    case "10d":
      weatherIcon = rainDay;
      break;
    case "11d":
      weatherIcon = thunderStormDay;
      break;
    case "13d":
      weatherIcon = snow;
      break;
    case "50d":
      weatherIcon = mist;
      break;
    case "01n":
      weatherIcon = clearSky;
      break;
    case "02n":
      weatherIcon = fewClouds;
      break;
    case "03n":
      weatherIcon = scatteredClouds;
      break;
    case "04n":
      weatherIcon = brokenClouds;
      break;
    case "09n":
      weatherIcon = showerRain;
      break;
    case "10n":
      weatherIcon = rainNight;
      break;
    case "11n":
      weatherIcon = thunderStormNight;
      break;
    case "13n":
      weatherIcon = snow;
      break;
    case "50n":
      weatherIcon = mist;
      break;

    default:
      break;
  }
 
  console.log(cityWeather);
  return (
    <div className="container">
      <div className="search">
        <input
          placeholder="Search for City e.g London"
          value={inputValue}
          onChange={handleInputValueChange}
        />
        <FiSearch className="searchIcon" onClick={getCity} />
      </div>
      {loading ? (
        <div className="loadingText">Loading...</div>
      ) : errorMessage ? (
        <div className="errorText">{errorMessage}</div>
      ) : (
        <>
          <div className="cityDetails">
            <img src={weatherIcon} alt="weatherIcon" className="weatherIcon" />
            <div className="temp">
              {cityWeather.main && Math.floor(cityWeather.main.temp) + "°C"}
            </div>
            <div className="cityText">{cityWeather.name}</div>
          </div>
          <div className="humidityAndSpeedLevel">
            <div className="humidity">
              <BsMoisture className="humidityIcon" />
              <div className="humidityValueAndText">
                <span className="humidityValue">
                  {cityWeather.main && cityWeather.main.humidity + "g.m-3"}
                </span>
                <span className="humidityText">Humidity</span>
              </div>{" "}
            </div>
            <div className="windSpeed">
              <GiWindsock className="windSpeedIcon" />
              <div className="windSpeedValueAndText">
                <span className="windSpeedValue">
                  {cityWeather.wind &&
                    Math.floor(cityWeather.wind.speed) + "m/s"}
                </span>
                <span className="windSpeedText">Wind speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MainPage;
