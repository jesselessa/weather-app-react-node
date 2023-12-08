import { toast } from "react-toastify";

export const fetchCityData = async (city) => {
  const url = `http://localhost:5000/data/${city}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw res;
    }

    const data = await res.json();

    if (data.cod === "404") {
      console.error(data.message);
      toast.error("Enter a valid city name.");
    } else {
      return data;
    }
  } catch (error) {
    console.error("Failed to fetch city data:", error);
    toast.error("Failed to fetch city data. Please try again.");
  }
};
