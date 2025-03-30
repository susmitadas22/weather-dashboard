import { createContext, useState } from 'react';
import axios from 'axios';
export const WeatherContext = createContext();
export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [lastSearchedCity, setLastSearchedCity] = useState(null);
  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const [currentWeather, forecast] = await Promise.all([
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`),
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`)
      ]);

      console.log('Current Weather:', currentWeather.data);
      console.log('Forecast Data:', forecast.data);
      setWeatherData(currentWeather.data);
      setForecastData(forecast.data);
      setLastSearchedCity(city); // Store the last searched city
      setSearchHistory(prev => [...new Set([city, ...prev].slice(0, 5))]);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.response?.data?.message || 'Failed to fetch weather data');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };
  const refreshWeather = () => {
    if (lastSearchedCity) {
      fetchWeather(lastSearchedCity);
    }};
  const toggleDarkMode = () => setDarkMode(!darkMode);
  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        forecastData,
        loading,
        error,
        searchHistory,
        darkMode,
        lastSearchedCity,
        fetchWeather,
        refreshWeather, 
        toggleDarkMode
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};