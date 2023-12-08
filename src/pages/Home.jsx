import { useContext } from "react";

// Components
import Form from "../components/Form.jsx";
import CityCard from "../components/CityCard.jsx";

// Context
import { CityContext } from "../contexts/cityContext.jsx";

export default function Home() {
  const { cityData } = useContext(CityContext);

  return (
    <div className="container mx-auto min-h-fit flex-1 flex flex-col justify-center items-center p-3">
      <div className="container flex flex-col justify-around">
        <h2 className="text-2xl text-center font-bold mb-3">
          Get weather data from any city !
        </h2>
        <Form />
        <div className="flex flex-col justify-around items-center m-4">
          {cityData && <CityCard cityInfo={cityData} />}
        </div>
      </div>{" "}
    </div>
  );
}
