import { useState, useContext } from "react";
import { toast } from "react-toastify";

// Context
import { CityContext } from "../contexts/cityContext.jsx";

export default function Form() {
  const [buttonClick, setButtonClick] = useState("buttonFetch");

  const { city, setCity, setCityData, favoriteCities, setFavoriteCities } =
    useContext(CityContext);

  const fetchCityData = async (city) => {
    const url = `http://localhost:8000/data/${city}`;

    fetch(url)
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        if (data.cod === "404") {
          toast.error("Enter a valid city name.");
          // Not to display CityCard if former valid research
          setCityData(null);
        } else {
          console.log("City data:", data);
          setCityData(data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch city data:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (city) {
      // First button : API call
      if (buttonClick === "buttonFetch") {
        fetchCityData(city);
      }

      /// Second button : Add to favorites
      else {
        // Check if city has not been already stored in LS
        if (favoriteCities.indexOf(city) !== -1) {
          toast.error("You already saved this city in your Favorites list !");
        } else {
          if (favoriteCities.length === 3) {
            toast.error(
              "You can't save more than three cities in your Favorites list !"
            );
          } else {
            // Create a copy of favoriteCities  and add city in the new array
            const copyFavoriteCities = [...favoriteCities, city];
            // Change state of favoriteCities
            setFavoriteCities(copyFavoriteCities);
            // Add to local storage
            localStorage.setItem(
              "favoriteCities",
              JSON.stringify(copyFavoriteCities)
            );
            toast.success("The city has been added to your Favorites list.");
          }
        }
      }
    } else {
      toast.error("Enter a city name in the input field.");
      // Not to display CityCard if former valid research
      setCityData(null);
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleClick = (e) => {
    // To select button by ID
    setButtonClick(e.target.id);
  };

  return (
    <form onSubmit={handleSubmit} className="w-3/4 md:w-1/2 mx-auto">
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
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          type="search"
          id="city"
          name="city"
          placeholder="Enter a city name"
          value={city}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col md:flex-row justify-around pt-5">
        <button
          type="submit"
          id="buttonFetch"
          className="inline-flex items-center justify-center px-3 py-2 mb-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-amber-300 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleClick}
        >
          Search
        </button>

        <button
          type="submit"
          id="buttonFavorite"
          className="inline-flex items-center justify-center px-4 py-2 mb-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:text-indigo-600
        hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleClick}
        >
          Add to favorites
        </button>
      </div>
    </form>
  );
}
