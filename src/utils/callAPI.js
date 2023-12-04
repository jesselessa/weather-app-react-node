export const fetchCityData = async (city, setCityData, toast) => {
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
      console.log("City data:", data);
      setCityData(data);
    }
  } catch (error) {
    console.error("Failed to fetch city data:", error);
  }
};
