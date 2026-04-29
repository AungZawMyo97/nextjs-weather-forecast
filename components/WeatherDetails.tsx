import React from "react";
import {
  LuCompass,
  LuDroplets,
  LuEye,
  LuSunrise,
  LuSunset,
  LuWind,
} from "react-icons/lu";

export interface WeatherDetailsProps {
  visibility: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}

export default function WeatherDetails(props: WeatherDetailsProps) {
  //   const {
  //     visibility = "0",
  //     humidity = "0",
  //     windSpeed = "0",
  //     airPressure = "0",
  //     sunrise = "0",
  //     sunset = "0",
  //   } = props;

  return (
    <>
      <SingleWeatherDetail
        icon={<LuEye />}
        information="Visibility"
        value={props.visibility}
      />
      <SingleWeatherDetail
        icon={<LuDroplets />}
        information="Humidity"
        value={props.humidity}
      />
      <SingleWeatherDetail
        icon={<LuWind />}
        information="Wind Speed"
        value={props.windSpeed}
      />
      <SingleWeatherDetail
        icon={<LuCompass />}
        information="Air Pressure"
        value={props.airPressure}
      />
      <SingleWeatherDetail
        icon={<LuSunrise />}
        information="Sunrise"
        value={props.sunrise}
      />
      <SingleWeatherDetail
        icon={<LuSunset />}
        information="Sunset"
        value={props.sunset}
      />
    </>
  );
}

export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps) {
  return (
    <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
      <p className="whitespace-nowrap">{props.information}</p>
      <div className="text-3xl">{props.icon}</div>
      <p>{props.value}</p>
    </div>
  );
}
