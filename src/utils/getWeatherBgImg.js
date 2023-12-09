const getWeatherBgImg = (weather) => {
  switch (weather) {
    case "Clear":
      break;
    case "Clouds":
      break;
    case "Snow":
      break;
    case "Rain":
      break;
    case "Drizzle":
      break;
    case "Mist":
    case "Fog":
    case "Haze":
    case "Smoke":
      break;
    case "Thunderstorm":
    case "Tornado":
    case "Squall":
      break;
    case "Dust":
    case "Sand":
    case "Ash":
      break;
    default:
      return "url(default-image.jpg)";
  }
};

function getBackgroundImage(weather) {
  switch (weather) {
    case "Clear":
      break;
      "url(clear-sky-image.jpg)";
    case "Clouds":
      break;
      "url(cloudy-image.jpg)";
    case "Rain":
      break;
      "url(rainy-image.jpg)";
    // Ajoutez d'autres cas selon vos besoins
    default:
      break;
      "url(default-image.jpg)";
  }
}
