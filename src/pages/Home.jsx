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
  const {
    cityData,
    setCityData,
    isDefaultCity,
    setIsDefaultCity,
    defaultCity,
    setDefaultCity,
  } = useContext(CityContext);

  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    fetchDefaultCityData();
  }, [defaultCity, isDefaultCity]);

  useEffect(() => {
    const weather = cityData?.weather[0]?.main;
    changeWeatherBgImg(weather);
  }, [cityData]);

  const fetchDefaultCityData = async () => {
    if (defaultCity) {
      try {
        const defaultCityData = await fetchCityData(defaultCity);

        // Update city data
        setCityData(defaultCityData);
        setIsDefaultCity(true);
      } catch (error) {
        console.error("Error fetching default city data:", error);
      }
    }
  };

  // Refresh city data every minute
  useEffect(() => {
    let interval;

    if (cityData) {
      interval = setInterval(() => fetchCityData(cityData.name), 60000);
    }
    return () => {
      // Clean interval on component unmounting (e.g. every time user navigates between pages)
      clearInterval(interval);
    };
  }, [cityData]);

  const chooseAsDefaultCity = () => {
    // Update default city name in localStorage and state
    const cityName = cityData.name;
    updateLocalStorage("defaultCity", cityName);
    setDefaultCity(cityName);
    toast.success(`${cityName} has been added as city by default.`);
  };

  // Handle default city button
  const handleDefaultCityClick = () => {
    const cityName = cityData.name;

    if (isDefaultCity && defaultCity === cityName) {
      // defaultCity === cityName : otherwise, every card could access this feature as long as a key is stored in localStorage
      localStorage.removeItem("defaultCity");
      setDefaultCity("");
      setIsDefaultCity(false);
      toast.success(`${cityName} has been removed as default city.`);
    } else {
      // Choose as default city
      updateLocalStorage("defaultCity", cityName);
      setDefaultCity(cityName);
      setIsDefaultCity(true);
      toast.success(`${cityName} has been added as default city.`);
    }
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
        break;
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
              handleDefaultCityClick={handleDefaultCityClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}
