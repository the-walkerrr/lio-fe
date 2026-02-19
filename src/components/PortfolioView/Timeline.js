const MONTHS = [
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

function Timeline() {
  const years = ["2024", "2025", "2026"];

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl font-medium">Timeline</div>
      <div className="overflow-x-auto flex gap-10 no-scrollbar">
        {years.map((year) => (
          <div key={year} className="flex flex-col gap-2 w-max mt-4">
            <div className="text-center text-sm text-gray-500 font-medium">
              {year}
            </div>
            <div className="flex gap-10 pb-4">
              {MONTHS.map((month) => (
                <div key={month} className="flex flex-col items-center gap-2">
                  <div className="text-sm font-medium text-gray-500">
                    {month}
                  </div>
                  <div className="w-px h-52 bg-gray-300"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
