const api_key = import.meta.env.VITE_WEATHER_API_KEY;
import { useEffect, useState } from "react";
import WeatherDetails from "./WeatherDetails";
import sun from "./assets/sun.png";
import cloudy from "./assets/cloudy.png";
import mist from "./assets/mist.png";
import partlycloudy from "./assets/partlycloudy.png";
import rainy from "./assets/rainy.png";
import thunder from "./assets/thunder.png";
import snow from "./assets/snow.png";

const App = () => {
  const [icon, setIcon] = useState(partlycloudy);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [text, setText] = useState("Salem");
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState("");
  const [error, setError] = useState(null);

  const weatherIconsMap = {
    "01d": sun,
    "01n": sun,
    "02d": partlycloudy,
    "02n": partlycloudy,
    "03d": cloudy,
    "03n": cloudy,
    "04d": cloudy,
    "04n": cloudy,
    "09d": rainy,
    "09n": rainy,
    "10d": rainy,
    "10n": rainy,
    "11d": thunder,
    "11n": thunder,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist,
  };

  const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        console.error("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      setDesc(data.weather[0].description);
      const weatherIconsCode = data.weather[0].icon;
      setIcon(weatherIconsMap[weatherIconsCode] || sun);
      setCityNotFound(false);
    } catch (error) {
      console.error("An Error Occurred:", error);
      setError("An error occured while fetching weather data");
    } finally {
      setLoading(false);
    }
  };
  const handleCity = (e) => {
    setText(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div className="bg-black/90 text-white h-screen flex flex-col items-center justify-center ">
      <div className="bg-black/30 text-white backdrop-blur-sm shadow-[0_10px_15px_black] rounded-xl  py-2.5 w-[80%] lg:w-3xl cursor-default">
        <h1
          className="text-center text-4xl italic font-bold uppercase mb-4"
          style={{ textShadow: "0 0 5px cyan" }}>
          Weather-API
        </h1>
        <div className="flex items-center px-5">
          <input
            type="search"
            placeholder=" Search City..."
            onChange={handleCity}
            value={text}
            onKeyDown={handleKeyDown}
            className="border border-gray-700 cursor-text focus:ring-cyan-400 focus:ring  px-2 py-1 outline-none rounded-tl-xl  rounded-bl-xl overflow-hidden w-full"
          />
          <div
            onClick={() => search()}
            className=" bg-cyan-500  px-2 py-1.25 rounded-tr-xl  rounded-br-xl cursor-pointer ">
            <i className="bi bi-search text-white hover:text-black transition duration-200"></i>
          </div>
        </div>
        <WeatherDetails
          icon={icon}
          temp={temp}
          city={city}
          country={country}
          lat={lat}
          log={log}
          humidity={humidity}
          wind={wind}
          desc={desc}
        />
        {loading && (
          <div className="text-center italic text-gray-500 text-xl">
            Loading...
          </div>
        )}
        {error && <div className="text-center text-amber-300">{error}</div>}
        {cityNotFound && (
          <div className="text-center text-red-500 text-lg">City Not found</div>
        )}
        <p className=" text-center mt-10 italic mx-auto text-xs font-semibold">
          Designed by{" "}
          <a
            href="http://indhrakumar.github.io/indhar"
            className="not-italic text-cyan-300 text-lg"
            style={{ textShadow: " 0 0 6px" }}>
            Indhra Kumar
          </a>
        </p>
      </div>
    </div>
  );
};

export default App;
