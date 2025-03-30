import { WeatherProvider } from './context/WeatherContext';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import SearchHistory from './components/SearchHistory';
import ThemeToggle from './components/ThemeToggle';
import Forecast from './components/Forecast';


export default function App() {
  return (
    <WeatherProvider>
      <div className="min-h-screen bg-gray-100 p-4 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold dark:text-white">Weather Dashboard</h1>
            <ThemeToggle />
          </div>
          <SearchBar />
          <WeatherCard />
          <Forecast />
          <SearchHistory />
        </div>
      </div>
    </WeatherProvider>
  );
}