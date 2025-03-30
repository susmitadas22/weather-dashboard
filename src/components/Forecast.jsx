import { motion } from 'framer-motion';
import { useWeather } from '../hooks/useWeather';
import { 
  WiDaySunny, WiRain, WiSnow, WiCloudy,
  WiThunderstorm, WiFog, WiDayCloudyHigh 
} from 'react-icons/wi';
const Forecast = () => {
  const { forecastData, darkMode, loading } = useWeather();
  const getDailyForecast = () => {
    if (!forecastData?.list) return [];
    const dailyForecast = forecastData.list.reduce((acc, item) => {
      const date = item.dt_txt.split(' ')[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {});
    return Object.entries(dailyForecast).slice(1, 6);
  };
  const getWeatherIcon = (condition) => {
    const iconClass = "text-4xl mx-auto";
    const icons = {
      Clear: <WiDaySunny className={`${iconClass} text-yellow-400`} />,
      Clouds: <WiDayCloudyHigh className={`${iconClass} text-gray-500`} />,
      Rain: <WiRain className={`${iconClass} text-blue-500`} />,
      Snow: <WiSnow className={`${iconClass} text-blue-300`} />,
      Thunderstorm: <WiThunderstorm className={`${iconClass} text-purple-500`} />,
      Mist: <WiFog className={`${iconClass} text-gray-400`} />,
      Fog: <WiFog className={`${iconClass} text-gray-400`} />,
      Haze: <WiFog className={`${iconClass} text-gray-400`} />
    };
    return icons[condition] || <WiCloudy className={`${iconClass} text-gray-500`} />;
  };

  const getMostFrequentCondition = (items) => {
    const conditionCount = {};
    items.forEach(item => {
      const condition = item.weather[0].main;
      conditionCount[condition] = (conditionCount[condition] || 0) + 1;
    });
    return Object.keys(conditionCount).reduce((a, b) => 
      conditionCount[a] > conditionCount[b] ? a : b
    );
  };
  const forecastDays = getDailyForecast();
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="my-6"
      >
        <div className="h-7 w-40 bg-gray-400 rounded-full animate-pulse mb-4"></div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} animate-pulse`}
            >
              <div className="h-5 w-16 bg-gray-400 rounded-full mx-auto mb-4"></div>
              <div className="h-12 w-12 bg-gray-400 rounded-full mx-auto"></div>
              <div className="h-6 w-12 bg-gray-400 rounded-full mx-auto mt-4"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }
  if (!forecastDays.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="my-6"
    >
      <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {forecastDays.map(([date, items], index) => {
          const avgTemp = Math.round(items.reduce((sum, item) => sum + item.main.temp, 0) / items.length);
          const condition = getMostFrequentCondition(items);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl p-4 text-center backdrop-blur-sm ${
                darkMode 
                  ? 'bg-gray-700/50 text-white' 
                  : 'bg-white/80 text-gray-800 shadow'
              }`}
            >
              <p className="font-medium mb-3">
                {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              {getWeatherIcon(condition)}
              <p className="text-2xl font-bold mt-3">{Math.round(avgTemp)}°C</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Forecast;