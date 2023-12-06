import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { fetchCityData } from "../utils/callAPI.js";

// Context
import { CityContext } from "../contexts/cityContext.jsx";

export default function Form() {
  const [buttonClick, setButtonClick] = useState("buttonFetch");

  const {
    city,
    setCity,
    cityData,
    setCityData,
    setIsLoading,
    favoriteCities,
    setFavoriteCities,
  } = useContext(CityContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (city) {
      // First button : API call
      if (buttonClick === "buttonFetch") {
        fetchCityData(city, setCityData, setIsLoading, toast);
      }

      /// Second button : Add to favorites
      else {
        if (!cityData) {
          toast.error("Use 'Search' button first before adding a city.");
          return;
        }
        // Reminder : indexOf() returns -1 when searched element is not in array
        if (favoriteCities.indexOf(city) !== -1) {
          toast.error("You already saved this city in your Favorites list !");
        } else {
          if (favoriteCities.length === 3) {
            toast.error(
              "You can't save more than three cities in your Favorites list !"
            );
          } else {
            const copyFavoriteCities = [...favoriteCities, city];

            // Update state of favoriteCities
            setFavoriteCities(copyFavoriteCities);

            // Update LS
            localStorage.setItem(
              "favoriteCities",
              JSON.stringify(copyFavoriteCities)
            );
            toast.success("The city has been added to your Favorites list.");

            // Reset form
            setCity("");
          }
        }
      }
    } else {
      toast.error("Enter a city name in the input field.");
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleClick = (e) => {
    // Change by ID
    setButtonClick(e.target.id);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-1/2 mx-auto">
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          className="form-control
          block
          w-full
          px-3 py-1.5
          text-base font-normal text-gray-700
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
          value={city.toLowerCase()}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col md:flex-row justify-around p-5 gap-x-3">
        <button
          type="submit"
          id="buttonFetch"
          className="md:w-36 inline-flex items-center justify-center py-2 mb-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-amber-300 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleClick}
        >
          Search
        </button>

        <button
          type="submit"
          id="buttonFavorite"
          className="md:w-36 inline-flex items-center justify-center py-2 mb-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-amber-300 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleClick}
        >
          Add to favorites
        </button>
      </div>
    </form>
  );
}
