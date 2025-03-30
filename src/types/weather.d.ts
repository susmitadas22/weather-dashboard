interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  interface MainWeatherData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  }
  
  interface Wind {
    speed: number;
    deg: number;
    gust?: number;
  }
  
  interface WeatherData {
    coord: {
      lon: number;
      lat: number;
    };
    weather: Weather[];
    base: string;
    main: MainWeatherData;
    visibility: number;
    wind: Wind;
    clouds: {
      all: number;
    };
    dt: number;
    sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
  }
  
  interface ForecastItem {
    dt: number;
    main: MainWeatherData & {
      temp_kf: number;
    };
    weather: Weather[];
    clouds: {
      all: number;
    };
    wind: Wind;
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }
  
  interface ForecastData {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastItem[];
    city: {
      id: number;
      name: string;
      coord: {
        lat: number;
        lon: number;
      };
      country: string;
      population: number;
      timezone: number;
      sunrise: number;
      sunset: number;
    };
  }