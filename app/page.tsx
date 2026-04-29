"use client";

import Navbar from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format, parseISO } from "date-fns";
import Container from "@/components/Container";
import WeatherIcon from "@/components/WeatherIcon";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import WeatherDetails from "@/components/WeatherDetails";
import { metersToKilometers } from "@/utils/metersToKilometers";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";
import { placeAtom } from "./atom";
import { useAtom } from "jotai";
import { useEffect } from "react";

export interface WeatherForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: City;
}

export interface ForecastItem {
  dt: number;
  main: MainWeather;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number; // probability of precipitation
  sys: Sys;
  dt_txt: string;

  // Optional fields (only present sometimes)
  rain?: Rain;
}

export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Clouds {
  all: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number; // optional
}

export interface Sys {
  pod: "d" | "n"; // day or night
}

export interface Rain {
  "3h": number;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface Coord {
  lat: number;
  lon: number;
}

export default function Home() {
  const [place, setPlace] = useAtom(placeAtom);

  const { isPending, error, data, refetch } = useQuery<WeatherForecastResponse>(
    {
      queryKey: ["repoData"],
      queryFn: async () => {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`,
        );
        return data;
      },
    },
  );

  useEffect(() => {
    refetch();
  }, [place, refetch]);

  const firstData = data?.list[0];
  console.log("data", data);
  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0],
      ),
    ),
  ];

  const firstDataForEachDay = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();

      return entryDate === date && entryTime >= 6;
    });
  });

  if (isPending)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce"></p>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar location={data?.city.name} />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
              <p className="text-lg">
                ({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")})
              </p>
            </h2>

            <Container className="gap-10 px-6 items-center">
              {/* Temperature */}
              <div className="flex flex-col px-4">
                <span className="text-5xl">
                  {Math.round(firstData?.main.temp ?? 0)}°C
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like</span>
                  <span>{Math.round(firstData?.main.feels_like ?? 0)}°C</span>
                </p>
                <p className="text-xs space-x-2">
                  <span>{Math.round(firstData?.main.temp_min ?? 0)}°↓ </span>
                  <span> {Math.round(firstData?.main.temp_max ?? 0)}°↑</span>
                </p>
              </div>

              {/* Weather Icon and Time */}
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.list.map((d, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                  >
                    <p className="whitespace-nowrap">
                      {format(parseISO(d.dt_txt), "h:mm a")}
                    </p>
                    <WeatherIcon
                      iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)}
                    />
                    <p>{d?.main.temp ? `${Math.round(d.main.temp)}°C` : "0"}</p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
          <div className="flex gap-4">
            {/* Today Condition */}
            <Container className="w-fit justify-center flex-col px-4 items-center">
              <p className="capitalize text-center">
                {firstData?.weather[0].description}
              </p>
              <WeatherIcon
                iconName={getDayOrNightIcon(
                  firstData?.weather[0].icon ?? "",
                  firstData?.dt_txt ?? "",
                )}
              />
            </Container>

            <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-auto">
              <WeatherDetails
                airPressure={`${firstData?.main.pressure.toString() ?? ""} hPa`}
                humidity={`${firstData?.main.humidity.toString() ?? ""}%`}
                visibility={metersToKilometers(firstData?.visibility ?? 0)}
                windSpeed={convertWindSpeed(firstData?.wind.speed ?? 0)}
                sunrise={format(
                  parseISO(
                    data?.city.sunrise
                      ? new Date(data.city.sunrise * 1000).toISOString()
                      : "",
                  ),
                  "h:mm a",
                )}
                sunset={format(
                  parseISO(
                    data?.city.sunset
                      ? new Date(data.city.sunset * 1000).toISOString()
                      : "",
                  ),
                  "h:mm a",
                )}
              />
            </Container>
            {/* Right */}
          </div>
        </section>
        {/* 7 Days Forecast */}
        <section className="flex w-full flex-col gap-4">
          <p className="text-2xl">Forecast (7 Days)</p>

          {firstDataForEachDay.map((data, index) => (
            <ForecastWeatherDetail
              key={index}
              weatherIcon={getDayOrNightIcon(
                data?.weather[0].icon ?? "",
                data?.dt_txt ?? "",
              )}
              date={format(parseISO(data?.dt_txt ?? ""), "dd.MM.yyyy")}
              day={format(parseISO(data?.dt_txt ?? ""), "EEEE")}
              temp={Math.round(data?.main.temp ?? 0)}
              feels_like={Math.round(data?.main.feels_like ?? 0)}
              temp_min={Math.round(data?.main.temp_min ?? 0)}
              temp_max={Math.round(data?.main.temp_max ?? 0)}
              description={data?.weather[0].description ?? ""}
              visibility={metersToKilometers(data?.visibility ?? 0)}
              humidity={`${data?.main.humidity.toString() ?? ""}%`}
              windSpeed={convertWindSpeed(data?.wind.speed ?? 0)}
              airPressure={`${data?.main.pressure.toString() ?? ""} hPa`}
              sunrise={format(
                parseISO(data ? new Date(data.dt * 1000).toISOString() : ""),
                "h:mm a",
              )}
              sunset={format(
                parseISO(data ? new Date(data.dt * 1000).toISOString() : ""),
                "h:mm a",
              )}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
