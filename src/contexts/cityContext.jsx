import { createContext, useState } from "react";

export const CityContext = createContext();

export const CityContextProvider = ({ children }) => {
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [cityData, setCityData] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState(
    JSON.parse(localStorage.getItem("favoriteCities")) || []
  );

  const value = {
    city,
    setCity,
    isLoading,
    setIsLoading,
    cityData,
    setCityData,
    favoriteCities,
    setFavoriteCities,
  };

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
};
