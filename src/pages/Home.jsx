import Form from "../components/Form";
import CityCard from "../components/CityCard";

export default function Home() {
  return (
    <div className="container mx-auto px-5 min-h-fit flex flex-col justify-around">
      <h2 className="text-3xl font-bold mb-3 text-center">
        Get weather data from any city !
      </h2>

      <Form />

      <div className="flex flex-row justify-around m-4">
        <CityCard />
      </div>
    </div>
  );
}
