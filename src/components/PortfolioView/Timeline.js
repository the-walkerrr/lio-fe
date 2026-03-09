"use client";

import { useState, useMemo } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import dayjs from "dayjs";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const BAR_HEIGHT = 100;
const BAR_GAP = 12;
const TOP_OFFSET = 80;

// Leap-year aware — replaces the hardcoded MONTHS.days array
const getDaysInMonth = (monthIndex, year) =>
  dayjs().year(year).month(monthIndex).daysInMonth();

// DRY helper: convert a dayjs date to its pixel x-position on the timeline
const dateToPixel = (date, minYear, zoom) => {
  const year = date.year();
  const month = date.month(); // 0-indexed
  const day = date.date();

  let totalDays = 0;
  // Complete years
  for (let y = minYear; y < year; y++)
    for (let m = 0; m < 12; m++) totalDays += getDaysInMonth(m, y);
  // Complete months in current year
  for (let m = 0; m < month; m++) totalDays += getDaysInMonth(m, year);
  totalDays += day;

  // 1px gap per month boundary traversed
  const monthGaps = (year - minYear) * 12 + (month + 1);

  return totalDays * 2 * zoom + monthGaps;
};

// Sweep-line row assignment — O(n log n) sort + O(n·R) scan
const assignRows = (coords) => {
  const sorted = coords
    .map((c, i) => ({ i, start: c.startPosition, end: c.endPosition }))
    .sort((a, b) => a.start - b.start);

  // rowEnds[r] = endPosition of the last bar placed in row r
  const rowEnds = [];

  sorted.forEach(({ i, start, end }) => {
    let row = -1;
    for (let r = 0; r < rowEnds.length; r++) {
      if (rowEnds[r] <= start) {
        row = r;
        break;
      }
    }
    if (row === -1) {
      row = rowEnds.length;
      rowEnds.push(end);
    } else {
      rowEnds[row] = end;
    }
    coords[i].row = row;
  });
};

function Timeline() {
  const [zoom, setZoom] = useState(1);

  const timelineData = [
    {
      title: "NIT Calicut",
      description: "Computer Science Engineering",
      startTime: 1607990400, // December 15, 2020
      endTime: 1715299200, // May 10, 2024
    },
    {
      title: "Freelancing",
      description: "Upwork contract",
      startTime: 1709596800, // March 5, 2024
      endTime: 1734912000, // December 23, 2024
    },
    {
      title: "Aakash Educational Services Limited (AESL)",
      description: "Software Engineer",
      startTime: 1723075200, // August 8, 2024
      endTime: 1771545600, // February 20, 2026
    },
    // Edge case: zero-duration (same start & end) — should render with min width
    {
      title: "Conference Talk",
      description: "One-day event",
      startTime: 1700006400, // November 15, 2023
      endTime: 1700006400, // November 15, 2023
    },
    // Edge case: inverted timestamps — should swap and render correctly
    {
      title: "Inverted Entry",
      description: "endTime < startTime",
      startTime: 1734912000, // December 23, 2024
      endTime: 1709596800, // March 5, 2024
    },
    // Edge case: starts exactly when NIT ends — boundary adjacency, should reuse NIT's row
    {
      title: "Post-College Project",
      description: "Exact boundary, no overlap",
      startTime: 1715299200, // May 10, 2024
      endTime: 1719792000, // July 1, 2024
    },
    // Edge case: overlaps with both Freelancing AND AESL — forces row 2+
    {
      title: "Side Hustle",
      description: "Triple overlap test",
      startTime: 1727740800, // October 1, 2024
      endTime: 1735689600, // January 1, 2025
    },
    // Edge case: short 1-week item spanning leap year Feb 29, 2024
    {
      title: "Leap Year Sprint",
      description: "Feb 26 – Mar 3, 2024",
      startTime: 1708905600, // February 26, 2024
      endTime: 1709424000, // March 3, 2024
    },
  ];

  const { years, minYear, coOrdinates, maxRow } = useMemo(() => {
    if (!timelineData.length)
      return { years: [], minYear: 0, coOrdinates: [], maxRow: 0 };

    const minY = Math.min(
      ...timelineData.map((d) => dayjs(d.startTime * 1000).year()),
    );
    const maxY = Math.max(
      ...timelineData.map((d) => dayjs(d.endTime * 1000).year()),
    );
    const yrs = Array.from({ length: maxY - minY + 1 }, (_, i) => minY + i);

    const coords = timelineData.map((item) => {
      // Guard: swap if inverted
      const startTs = Math.min(item.startTime, item.endTime);
      const endTs = Math.max(item.startTime, item.endTime);
      const start = dayjs(startTs * 1000);
      const end = dayjs(endTs * 1000);

      const startPx = dateToPixel(start, minY, zoom);
      let endPx = dateToPixel(end, minY, zoom);
      // Guard: minimum 2px width for zero-duration events
      if (endPx <= startPx) endPx = startPx + 2;

      return {
        startPosition: startPx,
        endPosition: endPx,
        // Pre-compute formatted string — avoids dayjs calls in JSX
        formattedRange: `${start.format("MMM YYYY")} - ${end.format("MMM YYYY")}`,
        row: 0,
      };
    });

    assignRows(coords);

    const maxR = coords.reduce((max, c) => Math.max(max, c.row), 0);
    return { years: yrs, minYear: minY, coOrdinates: coords, maxRow: maxR };
  }, [zoom]); // timelineData is static — add to deps when it becomes dynamic

  // Grow separators to fit additional bar rows
  // ~28px from separator top to first bar, then rows, then 20px bottom padding
  const separatorHeight = 20 + (maxRow + 1) * (BAR_HEIGHT + BAR_GAP);

  const handleZoom = (amount) => {
    setZoom((prev) => Math.max(0.5, Math.min(2, prev + amount)));
  };

  if (!timelineData.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl font-medium">Timeline</div>
      <div className="relative overflow-x-auto flex no-scrollbar">
        {years.map((year, index) => (
          <div key={year} className="flex mt-4">
            <div
              className="w-px"
              style={{
                height: "100%",
                backgroundImage:
                  "repeating-linear-gradient(to bottom, #9CA3AF 0, #9CA3AF 6px, transparent 6px, transparent 12px)",
              }}
            />
            <div className="relative flex flex-col gap-2 w-max">
              <div className="px-1 text-gray-500 font-medium sticky left-0 z-10 bg-gray-50 w-fit">
                {year}
              </div>
              <div className="flex pt-2">
                {MONTH_NAMES.map((name, monthIndex) => {
                  const days = getDaysInMonth(monthIndex, year);
                  return (
                    <div
                      key={name}
                      id={`${name}-${year}`}
                      className="relative flex flex-col items-center gap-2"
                      style={{
                        marginRight: 2 * days * zoom,
                        transition: "margin-right 0.3s ease",
                      }}
                    >
                      <div className="absolute top-0 left-1 text-xs font-medium leading-none text-gray-500">
                        {name}
                      </div>
                      {monthIndex !== 0 && (
                        <div
                          className="w-px bg-gray-300"
                          style={{ height: separatorHeight }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            {index === years.length - 1 && (
              <div
                className="w-px"
                style={{
                  height: "100%",
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, #9CA3AF 0, #9CA3AF 6px, transparent 6px, transparent 12px)",
                }}
              />
            )}
          </div>
        ))}
        <div className="max-h-[200px] overflow-y-auto">
          {coOrdinates.map((coord, index) => (
            <div
              key={timelineData[index].title}
              className="absolute bg-gray-200 overflow-x-clip border-l-4 border-l-gray-300"
              style={{
                top: `${TOP_OFFSET + coord.row * (BAR_HEIGHT + BAR_GAP)}px`,
                left: `${coord.startPosition}px`,
                width: `${coord.endPosition - coord.startPosition}px`,
                height: `${BAR_HEIGHT}px`,
                transition: "all 0.3s ease",
              }}
            >
              <div className="flex flex-col h-full sticky p-3 left-0 w-fit">
                <div className="font-bold text-gray-700 truncate line-clamp-1">
                  {timelineData[index].title}
                </div>
                <div className="text-sm font-medium text-gray-500 truncate line-clamp-1">
                  {timelineData[index].description}
                </div>
                <div className="text-xs font-medium text-gray-500 mt-auto">
                  {coord.formattedRange}
                </div>
              </div>
            </div>
          ))}
        </div>
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
