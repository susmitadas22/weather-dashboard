import { motion } from 'framer-motion'
import { useWeather } from '../hooks/useWeather'
const SearchHistory = () => {
  const { searchHistory, fetchWeather, darkMode } = useWeather()
  if (searchHistory.length === 0) return null
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-white'} p-6`}
    >
      <h3 className="text-lg font-semibold mb-4">Recent Searches</h3>
      <ul className="space-y-2">
        {searchHistory.map((city, index) => (
          <li key={index}>
            <button
              onClick={() => fetchWeather(city)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              {city}
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
export default SearchHistory