import axios from "axios";
import qs from "querystring";

const APP_ID = process.env["WEATHER_API_KEY"];
const ENDPOINT_API = "https://api.openweathermap.org/data/2.5/weather";

interface Forecast {
  city: string;
  wind_speed: string;
}

async function fetch(cityName: string): Promise<Forecast | null> {
  const query = qs.encode({ appid: APP_ID, q: cityName, units: "metric" });

  try {
    const response = await axios.get(`${ENDPOINT_API}?${query}`);

    const forecast: Forecast = {
      city: response.data.name,
      wind_speed: `${response.data.wind.speed}m/s`,
    };

    return Promise.resolve(forecast);
  } catch (error) {
    return Promise.resolve(null);
  }
}

export default {
  fetch,
};
