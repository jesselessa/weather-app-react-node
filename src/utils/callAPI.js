export const fetchCityData = async (city) => {
  const url = `https://weather-app.jesselessa.dev/data/${city}`;
  // const url = `https://weather-app-node-express-api.onrender.com/data/${city}`;
  // const url = `http://localhost:8000/data/${city}`;

  try {
    const res = await fetch(url);

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
