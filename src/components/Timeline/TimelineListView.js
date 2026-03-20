import dayjs from "dayjs";

function TimelineListView({ timelineData = [], order = "desc" }) {
  const now = dayjs().unix();

  return (
    <div className="flex flex-col mt-4">
      {timelineData
        .sort((a, b) =>
          order === "desc"
            ? b.startTime - a.startTime
            : a.startTime - b.startTime,
        )
        .map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-4 w-full"
          >
            <div className="flex flex-col items-center self-stretch">
              <div className="w-1 flex-1 bg-gray-300"></div>
              <div className="font-mono my-2 text-xs text-nowrap font-medium">
                {dayjs(item.startTime * 1000).format("MMM DD, YYYY")}
                {" - "}
                {dayjs((item.endTime || now) * 1000).format("MMM DD, YYYY")}
              </div>
              <div className="w-1 flex-1 bg-gray-300"></div>
            </div>
            <div className="w-full bg-gray-100 border border-gray-300 my-4">
              <div className="flex flex-col gap-1 h-full p-4">
                <div className="font-bold text-gray-700">{item.title}</div>
                <div className="text-sm font-medium text-gray-500">
                  {item.description}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default TimelineListView;
