"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronsLeft, ZoomIn, ZoomOut } from "lucide-react";
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

// Pure arithmetic — no dayjs allocation per call
const getDaysInMonth = (monthIndex, year) => {
  return new Date(year, monthIndex + 1, 0).getDate();
};

// Build a cumulative-days lookup: cumulativeDays[y][m] = total days from
// Jan 1 of minYear up to (but not including) month m of year y.
const buildCumulativeDays = (minYear, maxYear) => {
  const table = {};
  let running = 0;
  for (let y = minYear; y <= maxYear; y++) {
    const row = new Array(13);
    row[0] = running;
    for (let m = 0; m < 12; m++) {
      running += getDaysInMonth(m, y);
      row[m + 1] = running;
    }
    table[y] = row;
  }
  return table;
};

// O(1) pixel lookup using precomputed cumulative table
const dateToPixel = (date, cumTable, zoom, ALPHA) => {
  const year = date.year();
  const month = date.month();
  const day = date.date();
  const totalDays = cumTable[year][month] + day;
  const minYear = Object.keys(cumTable)[0] | 0;
  const monthGaps = (year - minYear) * 12 + (month + 1);
  return ALPHA * totalDays * zoom + monthGaps;
};

// Sweep-line row assignment — O(n log n) sort + O(n·R) scan
const assignRows = (coords) => {
  const sorted = coords
    .map((c, i) => ({ i, start: c.startPosition, end: c.endPosition }))
    .sort((a, b) => a.start - b.start);

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

function TimelineDefaultView({
  timelineData = [],
  initZoom = 1,
  ALPHA = 1.5,
  showStartAndEnd = false,
}) {
  const [zoom, setZoom] = useState(initZoom);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const { years, coOrdinates, maxRow } = useMemo(() => {
    if (!timelineData.length) return { years: [], coOrdinates: [], maxRow: 0 };

    const now = dayjs().unix();

    const minY = Math.min(
      ...timelineData.map((d) => dayjs(d.startTime * 1000).year()),
    );
    const maxY = Math.max(
      ...timelineData.map((d) => dayjs(d.endTime || now * 1000).year()),
    );
    const yrs = Array.from({ length: maxY - minY + 1 }, (_, i) => minY + i);

    const cumTable = buildCumulativeDays(minY, maxY);

    const coords = timelineData.map((item) => {
      const startTs = Math.min(item.startTime, item.endTime || now);
      const endTs = Math.max(item.startTime, item.endTime || now);
      const start = dayjs(startTs * 1000);
      const end = dayjs(endTs * 1000);

      const startPx = dateToPixel(start, cumTable, zoom, ALPHA);
      let endPx = dateToPixel(end, cumTable, zoom, ALPHA);
      if (endPx <= startPx) endPx = startPx + 2;

      return {
        startPosition: startPx,
        endPosition: endPx,
        formattedRange: `${start.format("MMM YYYY")} - ${end.format("MMM YYYY")}`,
        row: 0,
      };
    });

    assignRows(coords);

    const maxR = coords.reduce((max, c) => Math.max(max, c.row), 0);
    return { years: yrs, coOrdinates: coords, maxRow: maxR };
  }, [zoom]);

  const sortedIndices = useMemo(
    () =>
      coOrdinates
        .map((_, i) => i)
        .sort(
          (a, b) => coOrdinates[a].startPosition - coOrdinates[b].startPosition,
        ),
    [coOrdinates],
  );

  const separatorHeight = 20 + (maxRow + 1) * (BAR_HEIGHT + BAR_GAP);

  const handleZoom = (amount) => {
    setZoom((prev) => Math.max(1 / ALPHA, Math.min(2, prev + amount)));
  };

  const scrollToItem = (index) => {
    const el = scrollRef.current;
    if (!el || !sortedIndices.length) return;
    const itemIndex = sortedIndices[index];
    el.scrollTo({
      left: coOrdinates[itemIndex].startPosition,
      behavior: "smooth",
    });
  };

  const handleScroll = (type, index = 0) => {
    if (!sortedIndices.length) return;
    let newIndex = currentIndex;
    switch (type) {
      case "prev":
        newIndex = Math.max(0, currentIndex - 1);
        break;
      case "next":
        newIndex = Math.min(sortedIndices.length - 1, currentIndex + 1);
        break;
      case "start":
        newIndex = 0;
        break;
      case "end":
        newIndex = sortedIndices.length - 1;
        break;
      case "custom":
        newIndex = index;
        break;
      default:
        return;
    }
    setCurrentIndex(newIndex);
    scrollToItem(newIndex);
  };

  const scrollTimerRef = useRef(null);
  const handleManualScroll = useCallback(() => {
    if (scrollTimerRef.current) return;
    scrollTimerRef.current = setTimeout(() => {
      scrollTimerRef.current = null;
      const el = scrollRef.current;
      if (!el || !sortedIndices.length) return;
      const target = el.scrollLeft;

      let lo = 0;
      let hi = sortedIndices.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (coOrdinates[sortedIndices[mid]].startPosition < target)
          lo = mid + 1;
        else hi = mid;
      }
      if (lo > 0) {
        const distLo = Math.abs(
          coOrdinates[sortedIndices[lo]].startPosition - target,
        );
        const distPrev = Math.abs(
          coOrdinates[sortedIndices[lo - 1]].startPosition - target,
        );
        if (distPrev < distLo) lo--;
      }
      setCurrentIndex(lo);
    }, 100);
  }, [coOrdinates, sortedIndices]);

  useEffect(() => {
    handleScroll("custom", 0);
  }, [coOrdinates?.length]);

  if (!timelineData.length) return null;

  return (
    <>
      <div
        ref={scrollRef}
        onScroll={handleManualScroll}
        className="relative overflow-x-auto flex no-scrollbar"
      >
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
                        marginRight: ALPHA * days * zoom,
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
              className="absolute bg-gray-100 overflow-x-clip border border-gray-300"
              style={{
                top: `${TOP_OFFSET + coord.row * (BAR_HEIGHT + BAR_GAP)}px`,
                left: `${coord.startPosition}px`,
                width: `${coord.endPosition - coord.startPosition}px`,
                height: `${BAR_HEIGHT}px`,
                transition: "all 0.3s ease",
                ...(!timelineData[index].endTime && { borderRight: "none" }),
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
      <div className="flex mt-2 items-center justify-between select-none">
        <div className="flex font-medium text-sm">
          {showStartAndEnd && (
            <div
              className="flex gap-0.5 items-center cursor-pointer text-gray-500 hover:text-black mr-2"
              onClick={() => handleScroll("start")}
            >
              <ChevronsLeft size={16} className="mt-0.5" /> start
            </div>
          )}
          <div
            className="flex gap-0.5 items-center cursor-pointer text-gray-500 hover:text-black"
            onClick={() => handleScroll("prev")}
          >
            <ChevronLeft size={16} className="mt-0.5" /> prev
          </div>
          <div
            className="flex gap-0.5 items-center cursor-pointer text-gray-500 hover:text-black ml-6"
            onClick={() => handleScroll("next")}
          >
            next <ChevronLeft size={16} className="mt-0.5 rotate-180" />
          </div>
          {showStartAndEnd && (
            <div
              className="flex gap-0.5 items-center cursor-pointer text-gray-500 hover:text-black ml-2"
              onClick={() => handleScroll("end")}
            >
              end <ChevronsLeft size={16} className="mt-0.5 rotate-180" />
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <div
            className="cursor-pointer text-gray-500 hover:text-black"
            onClick={() => handleZoom(-0.2)}
          >
            <ZoomOut size={18} />
          </div>
          <div
            className="cursor-pointer text-gray-500 hover:text-black"
            onClick={() => handleZoom(0.2)}
          >
            <ZoomIn size={18} />
          </div>
        </div>
      </div>
    </>
  );
}

export default TimelineDefaultView;
