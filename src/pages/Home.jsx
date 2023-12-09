import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchCityData } from "../utils/callAPI.js";
import { updateLocalStorage } from "../utils/updateLocalStorage.js";

// Components
import Form from "../components/Form.jsx";

// Component
import CityCard from "../components/CityCard.jsx";

// Context
import { CityContext } from "../contexts/cityContext.jsx";

export default function Home() {
  const { cityData, setCityData } = useContext(CityContext);

  const [defaultCityName, setDefaultCityName] = useState(
    JSON.parse(localStorage.getItem("defaultCity")) || ""
  );

  useEffect(() => {
    fetchDefaultCityData();
  }, [defaultCityName]);

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

  return (
    <div className="container mx-auto min-h-fit flex-1 flex flex-col justify-center items-center p-3">
      <div className="container flex flex-col justify-around">
        <h2 className="text-2xl text-center font-bold mb-3">
          Get weather data from any city !
        </h2>
        <Form />
        <div className="flex flex-col justify-around items-center m-4">
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
