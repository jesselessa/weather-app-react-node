import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CityContextProvider } from "./contexts/cityContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter basename="/weather-app-react-tailwind-client">
      <CityContextProvider>
        <App />
      </CityContextProvider>
    </HashRouter>
  </React.StrictMode>
);
