import { createContext, useState } from "react";

export const CityContext = createContext();

export const CityContextProvider = ({ children }) => {
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState(
    JSON.parse(localStorage.getItem("favoriteCities")) || []
  );

  const value = {
    city,
    setCity,
    cityData,
    setCityData,
    favoriteCities,
    setFavoriteCities,
  };

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
};
