import PropTypes from "prop-types";
import humidityimg from "./assets/humidity.png";
import windimg from "./assets/wind.png";
import location from "./assets/location.png";

const WeatherDetails = ({
  icon,
  temp,
  city,
  country,
  lat,
  log,
  humidity,
  wind,
  desc,
}) => {
  return (
    <>
      <div className="flex flex-col gap-2 items-center">
        <div className="flex items-center mt-8 px-5 py-2 max-w-[80%] bg-cyan-500 shadow-[0_0_20px_cyan] rounded-full ">
          <img className="w-8 h-8" src={location} alt="" />
          <h1
            className=" text-3xl font-medium flex-wrap"
            style={{ textShadow: "0 0 10px black" }}>
            {city}
          </h1>
        </div>
        <div>
          <h1 className="text-xl font-medium">{country}</h1>
        </div>
        <div className="w-full h-40 flex justify-center">
          <img src={icon} alt="Image" />
        </div>
        <div>
          <h1 className="text-2xl font-light text-blue-300">{desc}</h1>
        </div>

        <div className="flex items-center w-full px-5 py-2 gap-2.5 text-black italic">
          <div className=" flex flex-col w-1/2  items-center justify-center bg-indigo-200 px-5 py-2 rounded-xl font-semibold">
            <span>Temperature</span>
            <span className="font-semibold">{temp}°C</span>
          </div>
          <div className=" flex flex-col w-1/2  items-center justify-center bg-indigo-200 px-5 py-2 rounded-xl font-semibold">
            <span>Latitude</span>
            <span>{lat}</span>
          </div>
          <div className="flex flex-col w-1/2 items-center justify-center bg-indigo-200 px-5 py-2 rounded-xl font-semibold">
            <span>Longitude</span>
            <span>{log}</span>
          </div>
        </div>
        <div className="w-full px-5 flex justify-center items-center gap-10">
          <div className="flex flex-col items-center">
            <img src={humidityimg} alt="humidity" className="w-14 h-14" />
            <div className="text-center">
              <h1>{humidity}%</h1>
              <p className="text-gray-600 text-sm">Humidity</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img src={windimg} alt="wind" className="w-14 h-14" />
            <div className="text-center">
              <h1>{wind}km/h</h1>
              <p className="text-gray-600 text-sm">Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
WeatherDetails.propTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  log: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  desc: PropTypes.string.isRequired,
};
export default WeatherDetails;
