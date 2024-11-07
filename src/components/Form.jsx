import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchCityData } from "../utils/callAPI.js";
import { updateLocalStorage } from "../utils/updateLocalStorage.js";

// Context
import { CityContext } from "../contexts/cityContext.jsx";

export default function Form() {
  const { city, setCity, setCityData, favoriteCities, setFavoriteCities } =
    useContext(CityContext);

  // Get URL of current page
  const { pathname } = useLocation();

  // Reset input value every time page changes
  useEffect(() => {
    setCity("");
  }, [pathname]);

  // Handle form buttons
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (city) {
      try {
        const data = await fetchCityData(city);

        // Reset input if data is not available
        if (!data) {
          setCity("");
          toast.error("Enter a valid city name.");
          return;
        }

        // First button : API call
        if (e.target.id === "buttonFetch") {
          // Update city data
          setCityData(data);
        }

        // Second button : Add to favorites
        else {
          // Check if city has not already been saved
          if (favoriteCities.includes(data.name)) {
            toast.error(
              `You already saved ${data.name} in your favorites list`
            );
            return;
          }

          // Check number of favorite cities in localStorage (LS)
          if (favoriteCities.length === 3) {
            toast.error(
              "You can't save more than three cities in your favorites list !"
            );
            return;
          }

          // Create copy of LS and add city to list
          const copyFavoriteCities = [...favoriteCities, data.name];

          // Update 'favoriteCities' in LS
          setFavoriteCities(copyFavoriteCities);
          updateLocalStorage("favoriteCities", copyFavoriteCities);

          toast.success(
            `${data.name} has been added to your list of favorite cities.`
          );
        }
      } catch (error) {
        console.error("Failed to fetch city data:", error);
        toast.error(
          "An unknown error occurred while fetching city data. Please, try again later."
        );

        // Reset input
        setCity("");
      }
    } else {
      toast.error("Enter a city name in the input field.");
    }
  };

  // Handle inputs changes
  const handleChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-1/2 mx-auto">
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          className="form-control
          block
          w-full
          px-3 py-1.5
          text-base font-normal text-slate-800 placeholder-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded-md shadow-sm
          transition
          ease-in-out
          m-0
          focus:text-gray-700   focus:bg-whitefocus:border-blue-600       focus:outline-none"
          type="search"
          id="city"
          name="city"
          placeholder="Enter a city name"
          value={city}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col md:flex-row justify-around pt-5 gap-y-3">
        <button
          type="submit"
          id="buttonFetch"
          className="md:w-36 inline-flex items-center justify-center p-2  border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-amber-300 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Search
        </button>

        <button
          type="submit"
          id="buttonFavorite"
          className="md:w-36 inline-flex items-center justify-center p-2 mb-5 md:mb-0 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-amber-300 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add to favorites
        </button>
      </div>
    </form>
  );
}
