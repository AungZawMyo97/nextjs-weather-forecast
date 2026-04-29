import React from "react";
import { IoSearch } from "react-icons/io5";
import { cn } from "@/utils/cn";

type Props = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.SubmitEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBox(Props: Props) {
  return (
    <form
      onSubmit={Props.onSubmit}
      className={cn(
        "flex relative items-center justify-center h-10",
        Props.className,
      )}
    >
      <input
        type="text"
        value={Props.value}
        onChange={Props.onChange}
        placeholder="Search Location..."
        className="px-4 py-2 w-57.5 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 h-full"
      />
      <button className="px-4 py-2.25 bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 h-full">
        <IoSearch />
      </button>
    </form>
  );
}
