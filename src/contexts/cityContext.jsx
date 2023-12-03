import { createContext, useState } from "react";

export const CityContext = createContext();

export const CityContextProvider = ({ children }) => {
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState(null);

  const value = { city, setCity, cityData, setCityData };

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
};
