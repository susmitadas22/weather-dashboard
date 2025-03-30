import { motion } from 'framer-motion';
import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { 
  WiDaySunny, WiRain, WiSnow, WiCloudy,
  WiThunderstorm, WiFog, WiDayCloudyHigh 
} from 'react-icons/wi';
import { BsDroplet, BsWind } from 'react-icons/bs';
import { FiRefreshCw } from 'react-icons/fi';
export default function WeatherCard() {
  const { weatherData, loading, error, darkMode, refreshWeather } = useContext(WeatherContext);

  const getWeatherIcon = () => {
    if (!weatherData?.weather?.[0]?.main) return null;
    const condition = weatherData.weather[0].main;
    const iconClass = "text-6xl";
    const icons = {
      Clear: <WiDaySunny className={`${iconClass} text-yellow-400`} />,
      Rain: <WiRain className={`${iconClass} text-blue-500`} />,
      Snow: <WiSnow className={`${iconClass} text-blue-300`} />,
      Clouds: <WiDayCloudyHigh className={`${iconClass} text-gray-500`} />,
      Thunderstorm: <WiThunderstorm className={`${iconClass} text-purple-500`} />,
      Mist: <WiFog className={`${iconClass} text-gray-400`} />,
      Fog: <WiFog className={`${iconClass} text-gray-400`} />,
      Haze: <WiFog className={`${iconClass} text-gray-400`} />,
      default: <WiCloudy className={`${iconClass} text-gray-500`} />
    };
    return icons[condition] || icons.default;
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`rounded-xl p-6 mb-6 ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}
      >
        <div className="flex justify-between">
          <div className="space-y-3">
            <div className="h-7 w-40 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="h-5 w-28 bg-gray-400 rounded-full animate-pulse"></div>
          </div>
          <div className="h-10 w-10 bg-gray-400 rounded-full animate-pulse"></div>
        </div>
        <div className="mt-6 flex items-center gap-6">
          <div className="h-20 w-20 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="h-14 w-24 bg-gray-400 rounded-full animate-pulse"></div>
    </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="h-20 bg-gray-400 rounded-xl animate-pulse"></div>
          <div className="h-20 bg-gray-400 rounded-xl animate-pulse"></div>
        </div>
      </motion.div>
    );
  }
  if (error) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`rounded-xl p-6 mb-6 ${darkMode ? 'bg-red-900/80' : 'bg-red-100'} shadow-lg`}
    >
      <p className={`text-center ${darkMode ? 'text-white' : 'text-red-800'}`}>{error}</p>
    </motion.div>
  );
  if (!weatherData) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl p-6 mb-6 shadow-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{weatherData.name}</h2>
          <p className="capitalize text-gray-500 dark:text-gray-300">
            {weatherData.weather[0].description}
          </p>
        </div>
        <button 
          onClick={refreshWeather}
          disabled={loading}
          className={`p-2 rounded-full transition-all ${
            darkMode 
              ? 'bg-gray-600 hover:bg-gray-500 text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          } ${loading ? 'animate-spin' : ''}`}
          aria-label="Refresh weather"
        >
          <FiRefreshCw className="w-5 h-5" />
        </button>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-4">
          {getWeatherIcon()}
          <div>
            <p className="text-5xl font-bold">{Math.round(weatherData.main.temp)}°C</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Feels like {Math.round(weatherData.main.feels_like)}°C
            </p>
          </div>
        </div> 
        <div className={`grid grid-cols-2 gap-4 p-4 rounded-xl ${
          darkMode ? 'bg-gray-600/50 backdrop-blur-sm' : 'bg-gray-100'
        }`}>
          <div className="flex items-center gap-2">
            <BsDroplet className="text-blue-500 text-lg" />
            <div>
              <p className="text-sm">Humidity</p>
              <p className="font-semibold">{weatherData.main.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BsWind className="text-blue-500 text-lg" />
            <div>
              <p className="text-sm">Wind</p>
              <p className="font-semibold">{weatherData.wind.speed} km/h</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}