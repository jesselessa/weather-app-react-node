import { useState, useContext } from "react";
import { toast } from "react-toastify";

// Context
import { CityContext } from "../contexts/cityContext.jsx";

export default function Form() {
  const [buttonClick, setButtonClick] = useState("");

  const { city, setCity, setCityData } = useContext(CityContext);

  const callAPI = (url) => {
    fetch(url)
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        if (data.cod === "404") {
          toast.error("Enter a valid city name");
          // Not to display CityCard if former valid research
          setCityData(null);
        } else {
          console.log("Data:", data);
          setCityData(data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (city) {
      // First button : API call
      if (buttonClick === "buttonFetch") {
        const url = `http://localhost:8000/data/${city}`;
        callAPI(url);

        // Reset form
        setCity("");
      }

      /// Second button : Add to favorites
      else {
        //TODO
      }
    } else {
      toast.error("Enter a city name in the search area.");
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
