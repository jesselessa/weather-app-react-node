import { toast } from "react-toastify";

export const fetchCityData = async (city, setCityData, setIsLoading) => {
  const url = `http://localhost:5000/data/${city}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw res;
    }

    const data = await res.json();

    if (data.cod === "404") {
      toast.error("Enter a valid city name.");
    } else {
      setCityData(data);
      setIsLoading(false); // End of loading
    }
  } catch (error) {
    console.error("Failed to fetch city data:", error);
    setIsLoading(false); // End of loading if error
  }
};
