import React from "react";
import Container from "./Container";
import WeatherIcon from "./WeatherIcon";
import WeatherDetails, { WeatherDetailsProps } from "./WeatherDetails";

export interface ForecastWeatherDetailsProps extends WeatherDetailsProps {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

export default function ForecastWeatherDetail(
  props: ForecastWeatherDetailsProps,
) {
  return (
    <Container className="gap-4">
      {/* Left Section */}
      <section className="flex gap-4 items-center px-4">
        <div className="flex flex-col items-center gap-1">
          <WeatherIcon iconname={props.weatherIcon} />
          <p>{props.date}</p>
          <p className="text-sm">{props.day}</p>
        </div>

        <div className="flex flex-col px-4">
          <span className="text-5xl">{props.temp}°C</span>
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span> Feels like </span>
            <span>{props.feels_like}°C</span>
          </p>
          <p className="capitalize">{props.description}</p>
        </div>
      </section>

      {/* Right Section */}
      <section className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
        <WeatherDetails {...props} />
      </section>
    </Container>
  );
}
