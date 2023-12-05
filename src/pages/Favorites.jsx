import React, { useContext } from "react";
import CityCard from "../components/CityCard.jsx";
import { CityContext } from "../contexts/cityContext.jsx";

export default function Favorites() {
  const { favoriteCities, setFavoriteCities } = useContext(CityContext);

  // Remove favorite button
  const removeFromFavorites = (cityName) => {
    const updatedFavorites = favoriteCities.filter((city) => city !== cityName);
    setFavoriteCities(updatedFavorites);

    // Update LS after state modification
    localStorage.setItem("favoriteCities", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="py-3 flex flex-col justify-between lg:flex-row lg:justify-around">
      {favoriteCities.length !== 0 && (
        <>
          {favoriteCities.map((cityName, index) => (
            <CityCard
              key={index}
              cityName={cityName}
              onRemove={() => removeFromFavorites(cityName)}
              showRemoveButton={true}
            />
          ))}
        </>
      )}

      {favoriteCities.length === 0 && (
        <p className="text-center text-lg">No favorite city added yet</p>
      )}
    </div>
  );
}
