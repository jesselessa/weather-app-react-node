export const fetchCityData = async (city) => {
  const apiUrl = `https://weather-app.jesselessa.dev/api/data/${city}`;
  // const apiUrl = `http://localhost:3000/api/data/${city}`;

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
