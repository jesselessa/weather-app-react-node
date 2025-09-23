import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import helmet from "helmet"; // Importation de Helmet
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const app = express();
const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//-------------- MIDDLEWARES ---------------//
// Utilisation de Helmet pour sécuriser les en-têtes HTTP
app.use(helmet());
app.use(express.json());

// Configure CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET"],
    optionsSuccessStatus: 204, // 204 = success but server doesn't return any data in response (contrary to status code 200)
  })
);

//---------------- ROUTES ------------------//
//* Get data from any city
app.get("/api/data/:city", async (req, res) => {
  // Sanitize the city input to prevent potential injection issues and trim whitespace
  const city = req.params.city.trim();
  const apiKey = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  // Check if the city parameter is empty
  if (!city) {
    return res.status(400).json({ error: "City name cannot be empty." });
  }

  try {
    const response = await fetch(url);

    // Check for unsuccessful HTTP status codes (e.g., 404 for city not found)
    if (!response.ok) {
      // If the API response is not successful, throw an error to be caught below
      throw new Error(
        `Failed to fetch weather data for ${city}: ${response.statusText}`
      );
    }

    const data = await response.json();

    // Check for a specific error message from the API itself
    if (data.cod && data.cod !== 200) {
      // The API returns a 'cod' property for errors (e.g., 404 for city not found)
      return res.status(data.cod).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("Fetch error:", error.message);
    // Respond with a more informative error message and a 500 status code
    res.status(500).json({
      error:
        "Failed to retrieve weather data. Please check the city name and try again.",
    });
  }
});

//* Serve static files in production
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

//------------- START SERVER ---------------//
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
