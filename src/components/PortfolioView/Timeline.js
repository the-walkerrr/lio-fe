"use client";

import { useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import dayjs from "dayjs";

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

  const timelineData = [
    {
      title: "NITC",
      description: "Computer Science Engineering",
      startTime: 1607990400, // December 15, 2020
      endTime: 1715299200, // May 10, 2024
    },
    // {
    //   title: "Freelancing",
    //   description: "Independent Software Development",
    //   startTime: 1709596800, // March 5, 2024
    //   endTime: 1734912000, // December 23, 2024
    // },
    {
      title: "AESL",
      description: "Software Engineer",
      startTime: 1723075200, // August 8, 2024
      endTime: 1771545600, // February 20, 2026
    },
  ];

  const minYear = Math.min(
    ...timelineData.map((item) => dayjs(item.startTime * 1000).year()),
  );
  const maxYear = Math.max(
    ...timelineData.map((item) => dayjs(item.endTime * 1000).year()),
  );
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, index) => minYear + index,
  );

  const coOrdinates = timelineData.map((item) => {
    const start = dayjs(item.startTime * 1000);
    const end = dayjs(item.endTime * 1000);

    const startYear = start.year();
    const startMonth = start.month() + 1;
    const startDay = start.date();

    const endYear = end.year();
    const endMonth = end.month() + 1;
    const endDay = end.date();

    const startPostion =
      (startYear - minYear) *
        MONTHS.reduce((acc, month) => acc + month.days, 0) *
        2 *
        zoom +
      (startYear - minYear) * 12 +
      MONTHS.slice(0, startMonth - 1).reduce(
        (acc, month) => acc + month.days,
        0,
      ) *
        2 *
        zoom +
      startMonth +
      startDay * 2 * zoom;
    const endPostion =
      (endYear - minYear) *
        MONTHS.reduce((acc, month) => acc + month.days, 0) *
        2 *
        zoom +
      (endYear - minYear) * 12 +
      MONTHS.slice(0, endMonth - 1).reduce(
        (acc, month) => acc + month.days,
        0,
      ) *
        2 *
        zoom +
      endMonth +
      endDay * 2 * zoom;

    return {
      startPostion,
      endPostion,
    };
  });

  const handleZoom = (amount) => {
    // Max 2, Min 0.5
    setZoom((prev) => Math.max(0.5, Math.min(2, prev + amount)));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl font-medium">Timeline</div>
      <div className="relative overflow-x-auto flex no-scrollbar">
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
                      // 2 * for extra spacing between months
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
        {coOrdinates.map((coOrdinate, index) => (
          <div
            key={index}
            className="absolute top-20 h-[100px] bg-gray-600"
            style={{
              left: `${coOrdinate.startPostion}px`,
              width: `${coOrdinate.endPostion - coOrdinate.startPostion}px`,
              transition: "all 0.3s ease",
            }}
          />
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
