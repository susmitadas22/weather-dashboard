import { motion } from 'framer-motion'
import SearchBar from './SearchBar'
import WeatherCard from './WeatherCard'
import SearchHistory from './SearchHistory'
import Forecast from './Forecast'
import ThemeToggle from './ThemeToggle'
import { useWeather } from '../hooks/useWeather'
const WeatherDashboard = () => {
  const { darkMode, loading, error } = useWeather()
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-blue-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        ><div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Weather Dashboard</h1>
            <ThemeToggle />
        </div>
          
          <SearchBar />
          
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center my-8"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </motion.div>
          )}
          
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-4 mb-6 rounded-lg ${darkMode ? 'bg-red-900' : 'bg-red-100'} text-red-700`}
            >
              {error}
            </motion.div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <WeatherCard />
              <Forecast />
       </div>
            <div className="md:col-span-1">
              <SearchHistory />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
export default WeatherDashboard