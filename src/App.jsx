import { HashRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Pages and components
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-between">
        <HashRouter basename="/weather-app-react-tailwind-client">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
          <Footer />
        </HashRouter>
      </div>
      <ToastContainer autoClose={1500} draggable={false} />
    </>
  );
}

export default App;
