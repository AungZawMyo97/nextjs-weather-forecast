export interface WeatherSearchResponse {
  message: string;
  cod: string;
  count: number;
  list: WeatherItem[];
}

export interface WeatherItem {
  id: number;
  name: string;
  coord: Coord;
  main: MainWeather;
  dt: number;
  wind: Wind;
  sys: Sys;
  rain: Rain | null;
  snow: Snow | null;
  clouds: Clouds;
  weather: Weather[];
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Sys {
  country: string;
}

export interface Clouds {
  all: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

/**
 * Rain/Snow can be null OR an object with volume (usually "1h" or "3h")
 */
export interface Rain {
  "1h"?: number;
  "3h"?: number;
}

export interface Snow {
  "1h"?: number;
  "3h"?: number;
}
