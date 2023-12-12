import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCityData } from "../utils/callAPI.js";
import { updateLocalStorage } from "../utils/updateLocalStorage.js";
import { toast } from "react-toastify";

// Component
import CityCard from "../components/CityCard.jsx";

// Image
import clear from "../../public/assets/bgImages/clear.jpg";

// Context
import { CityContext } from "../contexts/cityContext.jsx";

export default function Favorites() {
  const { favoriteCities, setFavoriteCities } = useContext(CityContext);

  const [favListData, setFavListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch data from localStorage on component mount
  const fetchFavListData = async () => {
    const promises = favoriteCities.map((city) => fetchCityData(city));

    try {
      setIsLoading(true); // Start of loading
      const data = await Promise.all(promises);
      setFavListData(data);
    } catch (error) {
      console.error("Error fetching data for favorites:", error);
    } finally {
      setIsLoading(false); // End of loading wheter success or not
    }
  };

  useEffect(() => {
    if (favoriteCities.length !== 0) {
      fetchFavListData();
    }
  }, [favoriteCities]);

  // Remove favorite button
  const removeFromFavorites = (cityName) => {
    const copyFavoriteCities = [...favoriteCities];
    const updatedFavorites = copyFavoriteCities.filter(
      (city) => city !== cityName
    );

    // Update state
    setFavoriteCities(updatedFavorites);

    // Update LS after state modification
    updateLocalStorage("favoriteCities", updatedFavorites);
    toast.success(`${cityName} has been removed from your favorites list.`);
  };

  // // Alernative function using index
  // const removeFromFavorites = (cityIndex) => {
  //   const copyFavoriteCities = [...favoriteCities];
  //   copyFavoriteCities.splice(cityIndex, 1);
  //   setFavoriteCities(copyFavoriteCities);
  //   updateLocalStorage("favoriteCities", copyFavoriteCities);
  // };

  return (
    <div
      className="min-h-fit flex-1 flex flex-col md:justify-around items-center p-3 bg-cover bg-center"
      style={{ backgroundImage: `url(${clear})` }}
    >
      {isLoading ? (
        <div className="flex-1 flex flex-col justify-center items-center">
          <p className="text-lg text-center font-medium">Loading...</p>
        </div>
      ) : (
        <div className="container flex-1 flex flex-col justify-around items-center ">
          {favoriteCities.length !== 0 ? (
            <>
              <h2 className="text-2xl text-slate-900 text-center font-bold mb-8 py-2">
                Your favorite cities
              </h2>

              <div className="w-full flex flex-col lg:flex-row justify-around items-center mb:5">
                {favListData.map((favCityData, index) => {
                  return (
                    <CityCard
                      key={index}
                      cityInfo={favCityData}
                      onRemove={() => removeFromFavorites(favCityData.name)}
                      // onRemove={() => removeFromFavorites(index)}
                      showRemoveButton={true}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center gap-y-6">
              <p className="font-medium">No favorite city added yet</p>

              <button
                className="w-full md:w-48 inline-flex justify-center items-center  py-2 border border-transparent rounded-md shadow-sm text-sm font-medium  text-indigo-600 bg-amber-300  hover:bg-indigo-600 hover:text-white"
                onClick={() => navigate("/")}
              >
                Back to homepage
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
