export const fetchCityData = async (city) => {
  const apiUrl = `${import.meta.env.VITE_API_URL}/data/${city}`;
  
  try {
    const res = await fetch(apiUrl);

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(errorMessage);
    }

    const data = await res.json();

    if (data.cod === "404") {
      console.error(data.message);
    } else {
      return data;
    }
  } catch (error) {
    console.error("Failed to fetch city data:", error);
  }
};
