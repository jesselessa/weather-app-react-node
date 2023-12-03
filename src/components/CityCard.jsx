import { useContext } from "react";

// Context
import { CityContext } from "../contexts/cityContext.jsx";

export default function CityCard() {
  const { cityData } = useContext(CityContext);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto p-4">
      <h3 className="text-center text-xl font-bold  mb-2 ">
        {cityData.name}, {cityData.sys?.country}
      </h3>

      <img
        className="w-24 mx-auto"
        src={`http://openweathermap.org/img/wn/${cityData.weather[0]?.icon}@2x.png`}
        alt="weather"
      />

      <div className="px-6 py-4 text-center">
        <p>
          <span className="text-gray-700 font-bold text-base">
            Temperature :
          </span>{" "}
          {Math.round(cityData.main?.temp)} °C <br />
          (Min : {Math.round(cityData.main?.temp_min)} ° C , Max :{" "}
          {Math.round(cityData.main?.temp_max)} °C)
        </p>
        <p>
          <span className="text-gray-700 font-bold text-base">
            Description :
          </span>{" "}
          {cityData.weather[0]?.main}
        </p>
      </div>
    </div>
  );
}
