import { createContext, useState } from "react";

export const CityContext = createContext();

export const CityContextProvider = ({ children }) => {
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState(
    JSON.parse(localStorage.getItem("favoriteCities")) || []
  );
  const [defaultCity, setDefaultCity] = useState(
    JSON.parse(localStorage.getItem("defaultCity")) || ""
  );

  const [isDefaultCity, setIsDefaultCity] = useState(false);

  const value = {
    city,
    setCity,
    cityData,
    setCityData,
    favoriteCities,
    setFavoriteCities,
    defaultCity,
    setDefaultCity,
    isDefaultCity,
    setIsDefaultCity,
  };

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
};
