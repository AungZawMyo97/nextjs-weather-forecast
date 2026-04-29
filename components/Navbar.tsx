"use client";

import React, { useState } from "react";
import { MdWbSunny } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import SearchBox from "./SearchBox";
import axios from "axios";
import { placeAtom } from "@/app/atom";
import { useAtom } from "jotai";

type Props = { location?: string };

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

export default function Navbar({ location }: Props) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [place, setPlace] = useAtom(placeAtom);

  async function handleInputChange(value: string) {
    setCity(value);

    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`,
        );
        const suggestions = response.data.list.map((item: any) => item.name);
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
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

  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Handle search submission logic here
    if (suggestions.length === 0) {
      setError("Please select a city from the suggestions.");
    } else {
      setError("");
      setPlace(city);
      setShowSuggestions(false);
    }
  }

  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-20 w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <p className="flex items-center justify-center gap-2">
          <h2 className="text-gray-500 text-3xl">Weather</h2>
          <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
        </p>

        <section className="flex gap-2 items-center">
          <MdMyLocation className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer" />
          <MdOutlineLocationOn className="text-3xl" />
          <p className="text-slate-900/80 text-sm">{location}</p>

          <div className="relative">
            <SearchBox
              value={city}
              onSubmit={(e) => handleSubmitSearch(e)}
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
