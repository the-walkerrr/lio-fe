import Link from "next/link";
import { CalendarArrowDown, CalendarArrowUp, MoveLeft } from "lucide-react";
import { TimelineListViewIcon, TimelineDefaultViewIcon } from "@/icons";
import { TimelineDefaultView, TimelineListView } from "@/components/Timeline";

const timelineData = [
  {
    title: "NIT Calicut",
    description: "Computer Science Engineering",
    startTime: 1607990400,
    endTime: 1715299200,
  },
  {
    title: "Freelancing",
    description: "Upwork contract",
    startTime: 1709596800,
    endTime: 1734912000,
  },
  {
    title: "Aakash Educational Services Limited (AESL)",
    description: "Software Engineer",
    startTime: 1723075200,
    endTime: null,
  },
];

const iconLinkClass =
  "flex items-center gap-1 text-gray-500 hover:text-black cursor-pointer";

async function Timeline({ params, searchParams }) {
  const { portfolioId } = await params;
  const { view: rawView, order: rawOrder } = await searchParams;

  const view = rawView === "list" ? "list" : "default";
  const order = rawOrder === "asc" ? "asc" : "desc";

  const isList = view === "list";
  const OrderIcon = order === "desc" ? CalendarArrowUp : CalendarArrowDown;
  const TimelineIcon = isList ? TimelineListViewIcon : TimelineDefaultViewIcon;
  const TimelineComponent = isList ? TimelineListView : TimelineDefaultView;

  return (
    <div className="flex flex-col gap-2 mt-6 mx-4">
      <Link
        href={`/portfolio/view/${portfolioId}/about`}
        className="w-fit text-gray-400 hover:text-black cursor-pointer"
      >
        <MoveLeft size={35} />
      </Link>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-medium">
          <span className="text-4xl font-bold">T</span>imeline
        </div>
        <div className="flex items-center gap-4">
          {/* ASC / DESC toggle */}
          {isList && (
            <Link
              href={{
                query: {
                  view,
                  order: order === "desc" ? "asc" : "desc",
                },
              }}
              replace
              className={iconLinkClass}
            >
              <OrderIcon size={24} strokeWidth={1.5} />
            </Link>
          )}
          {/* List / Default view toggle */}
          <Link
            href={{
              query: { view: isList ? "default" : "list" },
            }}
            replace
            className={iconLinkClass}
          >
            <TimelineIcon size={26} />
          </Link>
        </div>
      </div>
      <TimelineComponent
        timelineData={timelineData}
        order={order}
        showStartAndEnd
      />
    </div>
  );
}

export default Timeline;
