"use client";

import { useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";

const MONTHS = [
  {
    name: "Jan",
    days: 31,
  },
  {
    name: "Feb",
    days: 28,
  },
  {
    name: "Mar",
    days: 31,
  },
  {
    name: "Apr",
    days: 30,
  },
  {
    name: "May",
    days: 31,
  },
  {
    name: "Jun",
    days: 30,
  },
  {
    name: "Jul",
    days: 31,
  },
  {
    name: "Aug",
    days: 31,
  },
  {
    name: "Sep",
    days: 30,
  },
  {
    name: "Oct",
    days: 31,
  },
  {
    name: "Nov",
    days: 30,
  },
  {
    name: "Dec",
    days: 31,
  },
];

function Timeline() {
  const [zoom, setZoom] = useState(1);
  const years = ["2024", "2025", "2026"];

  const timelineData = [
    {
      title: "NITC",
      description: "Computer Science Engineering",
      startTime: 1590969600, // June 1, 2020
      endTime: 1717113600, // May 31, 2024
    },
    {
      title: "Freelancing",
      description: "Independent Software Development",
      startTime: 1709251200, // March 1, 2024
      endTime: 1735603200, // December 31, 2024
    },
    {
      title: "AESL",
      description: "Software Engineer",
      startTime: 1717200000, // June 1, 2024
      endTime: 1738281600, // January 31, 2025 (present approximation)
    },
  ];

  const handleZoom = (amount) => {
    // Max 2, Min 0.5
    setZoom((prev) => Math.max(0.5, Math.min(2, prev + amount)));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl font-medium">Timeline</div>
      <div className="overflow-x-auto flex no-scrollbar px-4">
        {years.map((year, index) => (
          <div key={year} className="flex mt-4">
            <div
              className="h-full w-px"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, #9CA3AF 0, #9CA3AF 6px, transparent 6px, transparent 12px)",
              }}
            />
            <div className="relative flex flex-col gap-2 w-max">
              <div className="text-center text-sm text-gray-500 font-medium">
                {year}
              </div>
              <div className="flex pt-2">
                {MONTHS.map(({ name, days }, index) => (
                  <div
                    key={name}
                    id={`${name}-${year}`}
                    className="relative flex flex-col items-center gap-2"
                    style={{
                      // 2 for extra spacing between months
                      marginRight: 2 * days * zoom,
                      transition: "margin-right 0.3s ease",
                    }}
                  >
                    <div className="absolute top-0 left-1 text-xs font-medium leading-none text-gray-500">
                      {name}
                    </div>
                    {index !== 0 && (
                      <div className="w-px h-52 bg-gray-300"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {index === years.length - 1 && (
              <div
                className="h-full w-px"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, #9CA3AF 0, #9CA3AF 6px, transparent 6px, transparent 12px)",
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <div
          className="p-2 cursor-pointer text-gray-500 hover:text-black"
          onClick={() => handleZoom(-0.2)}
        >
          <ZoomOut size={20} />
        </div>
        <div
          className="p-2 cursor-pointer text-gray-500 hover:text-black"
          onClick={() => handleZoom(0.2)}
        >
          <ZoomIn size={20} />
        </div>
      </div>
    </div>
  );
}

export default Timeline;
