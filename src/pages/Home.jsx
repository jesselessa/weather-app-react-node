import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchCityData } from "../utils/callAPI.js";
import { updateLocalStorage } from "../utils/updateLocalStorage.js";

// Components
import Form from "../components/Form.jsx";
import CityCard from "../components/CityCard.jsx";

// Images
import clouds from "../assets/bgImages/clouds.jpg";
import clear from "../assets/bgImages/clear.jpg";
import rain from "../assets/bgImages/rain.jpg";
import mist from "../assets/bgImages/mist.jpg";
import snow from "../assets/bgImages/snow.jpg";
import thunderstorm from "../assets/bgImages/thunderstorm.jpg";
import tornado from "../assets/bgImages/tornado.jpg";
import dust from "../assets/bgImages/dust.jpg";
import squall from "../assets/bgImages/squall.jpg";

// Context
import { CityContext } from "../contexts/cityContext.jsx";

export default function Home() {
  const { cityData, setCityData } = useContext(CityContext);

  const [defaultCityName, setDefaultCityName] = useState(
    JSON.parse(localStorage.getItem("defaultCity")) || ""
  );
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    fetchDefaultCityData();
  }, [defaultCityName]);

  useEffect(() => {
    const weather = cityData?.weather[0]?.main;
    console.log("Weather:", weather);
    changeWeatherBgImg(weather);
  }, [cityData]);

  const fetchDefaultCityData = async () => {
    if (defaultCityName) {
      try {
        const defaultCityData = await fetchCityData(defaultCityName);

        // Update city data
        setCityData(defaultCityData);
      } catch (error) {
        console.error("Error fetching default city data:", error);
      }
    }
  };

  const chooseAsDefaultCity = () => {
    // Update default city name in localStorage and state
    const cityName = cityData.name;
    updateLocalStorage("defaultCity", cityName);
    setDefaultCityName(cityName);
    toast.success(`${cityName} has been added as city by default.`);
  };

  // Change background image according to weather
  const changeWeatherBgImg = (weather) => {
    switch (weather) {
      case "Clear":
        setImgUrl(clear);
        break;
      case "Clouds":
        setImgUrl(clouds);
        break;
      case "Snow":
        setImgUrl(snow);
        break;
      case "Rain":
      case "Drizzle":
        setImgUrl(rain);
        break;
      case "Squall":
        setImgUrl(squall);
        break;
      case "Mist":
      case "Fog":
      case "Haze":
      case "Smoke":
        setImgUrl(mist);
        break;
      case "Thunderstorm":
        setImgUrl(thunderstorm);
      case "Tornado":
        setImgUrl(tornado);
        break;
      case "Dust":
      case "Sand":
      case "Ash":
        setImgUrl(dust);
        break;
      default:
        setImgUrl(clear);
    }
  };

  return (
    <div
      className="min-h-fit flex-1 flex flex-col justify-center items-center p-3 bg-cover bg-center"
      style={{ backgroundImage: `url(${cityData ? imgUrl : clear})` }}
    >
      <div className="container flex flex-col justify-around">
        <h2 className="text-2xl text-center text-slate-900 font-bold mb-3">
          Get weather data from any city !
        </h2>
        <Form />
        <div className="flex flex-col justify-around items-center ">
          {cityData?.name && (
            <CityCard
              cityInfo={cityData}
              showDefaultCityButton={true}
              chooseAsDefaultCity={chooseAsDefaultCity}
            />
          )}
        </div>
      </div>
    </div>
  );
}
