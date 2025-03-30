import { motion } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useWeather } from '../hooks/useWeather'
const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useWeather()
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleDarkMode}
      className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
      aria-label="Toggle dark mode"
    >
      {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
    </motion.button>
  )
}
export default ThemeToggle