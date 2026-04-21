export interface WeatherData {
  temp: number;
  wind: number;
  conditionCode: number;
  forecast: {
    date: string;
    max: number;
    min: number;
    rain: number;
    code: number;
  }[];
}

const WEATHER_CACHE_KEY = 'sahara_weather_cache';
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

export async function fetchWeather(lat: number, lng: number): Promise<WeatherData> {
  // Check cache
  const cached = localStorage.getItem(WEATHER_CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL) {
      return data;
    }
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=Asia%2FKolkata&forecast_days=5`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather API failed');
    const result = await response.json();

    const data: WeatherData = {
      temp: result.current_weather.temperature,
      wind: result.current_weather.windspeed,
      conditionCode: result.current_weather.weathercode,
      forecast: result.daily.time.map((date: string, i: number) => ({
        date,
        max: result.daily.temperature_2m_max[i],
        min: result.daily.temperature_2m_min[i],
        rain: result.daily.precipitation_sum[i],
        code: result.daily.weathercode[i]
      }))
    };

    // Save to cache
    localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify({
      data,
      timestamp: Date.now()
    }));

    return data;
  } catch (error) {
    console.error("Weather Service Error:", error);
    if (cached) return JSON.parse(cached).data;
    throw error;
  }
}

export function getWeatherIcon(code: number): string {
  if (code === 0) return '☀️';
  if (code <= 3) return '🌤️';
  if (code <= 48) return '🌫️';
  if (code <= 57) return '🌧️';
  if (code <= 67) return '🌧️';
  if (code <= 77) return '❄️';
  if (code <= 82) return '🚿';
  if (code <= 86) return '🌨️';
  if (code <= 99) return '⛈️';
  return '☁️';
}

export function getWeatherCondition(code: number): string {
  if (code === 0) return 'Clear Sky';
  if (code <= 3) return 'Partly Cloudy';
  if (code <= 48) return 'Foggy';
  if (code <= 57) return 'Drizzle';
  if (code <= 67) return 'Rainy';
  if (code <= 77) return 'Snowy';
  if (code <= 82) return 'Rain Showers';
  if (code <= 86) return 'Snow Showers';
  if (code <= 99) return 'Thunderstorm';
  return 'Cloudy';
}
