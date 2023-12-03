import { useContext } from "react";

// Components
import Form from "../components/Form.jsx";
import CityCard from "../components/CityCard.jsx";

// Context
import { CityContext } from "../contexts/cityContext.jsx";

export default function Home() {
  const { cityData } = useContext(CityContext);

  return (
    <div className="container mx-auto px-5 pt-3 min-h-fit flex flex-col justify-around">
      <h2 className="text-3xl font-bold mb-3 text-center">
        Get weather data from any city !
      </h2>

      <Form />

      <div className="flex flex-row justify-around m-4">
        {cityData && <CityCard />}
      </div>
    </div>
  );
}
