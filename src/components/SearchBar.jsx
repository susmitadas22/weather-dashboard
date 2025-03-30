import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSearch } from 'react-icons/fi'
import { useWeather } from '../hooks/useWeather'

const SearchBar = () => {
  const [city, setCity] = useState('')
  const { fetchWeather, darkMode } = useWeather()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.trim()) {
      fetchWeather(city)
      setCity('')
    }
  }
  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mb-8"
    >
      <div className="flex shadow-lg rounded-lg overflow-hidden">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          className={`flex-grow p-4 focus:outline-none ${darkMode ? 'bg-gray-700 text-white placeholder-gray-300' : 'bg-white text-gray-800'}`}
        />
        <button
       type="submit"
          className={`px-6 flex items-center justify-center ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}
        >
          <FiSearch size={20} />
        </button>
      </div>
    </motion.form>
  )
}
export default SearchBar