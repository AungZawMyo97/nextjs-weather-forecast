"use client";

import React, { useState } from "react";
import { MdWbSunny } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import SearchBox from "./SearchBox";
import axios from "axios";
import { coordAtom, loadingCityAtom, placeAtom } from "@/app/atom";
import { useAtom } from "jotai";
import { WeatherItem } from "@/models/SearchBoxModel";

type Props = { location?: string };

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

export default function Navbar({ location }: Props) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [, setPlace] = useAtom(placeAtom);
  const [, setCoords] = useAtom(coordAtom);
  const [, setLoadingCity] = useAtom(loadingCityAtom);

  async function handleInputChange(value: string) {
    setCity(value);

    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`,
        );
        console.log("suggestions", response.data);
        const suggestions = response.data.list.map(
          (item: WeatherItem) => item.name,
        );
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch {
        setError("Error fetching suggestions");
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
  }

  function handleSuggestionClick(value: string) {
    setCity(value);
    setShowSuggestions(false);
  }

  function handleSubmitSearch(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (suggestions.length === 0) {
      setError("Please select a city from the suggestions.");
      setLoadingCity(false);
    } else {
      setLoadingCity(true);
      setError("");
      setTimeout(() => {
        setCoords(null);
        setPlace(city);
        setShowSuggestions(false);
        setLoadingCity(false);
      }, 500);
    }
  }

  function handleUseCurrentLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported in this browser.");
      return;
    }

    setError("");
    setLoadingCity(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setCoords({ lat: latitude, lon: longitude });
        setShowSuggestions(false);
        setLoadingCity(false);
      },
      () => {
        setError("Unable to get your location. Please allow location access.");
        setLoadingCity(false);
      },
    );
  }

  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-20 w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <p className="flex items-center justify-center gap-2">
          <span className="text-gray-500 text-3xl">Weather</span>
          <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
        </p>

        <section className="flex gap-2 items-center">
          <MdMyLocation
            className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer"
            onClick={handleUseCurrentLocation}
          />
          <MdOutlineLocationOn className="text-3xl" />
          <p className="text-slate-900/80 text-sm">{location}</p>

          <div className="relative">
            <SearchBox
              value={city}
              onSubmit={handleSubmitSearch}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <SuggestionBox
              {...{
                showSuggestions,
                suggestions,
                handleSuggestionClick,
                error,
              }}
            />
          </div>
        </section>
      </div>
    </nav>
  );
}

function SuggestionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (suggestion: string) => void;
  error: string;
}) {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul
          className="mb-4 bg-white absolute border top-11 left-0 border-gray-300 rounded-md min-w-50 flex flex-col gap-1 py2
     px-2"
        >
          {error && suggestions.length === 0 && (
            <li className="text-red-500 text-sm">{error}</li>
          )}
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="cursor-pointer p-1 rounded hover:bg-gray-200"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

