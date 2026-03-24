import Link from "next/link";
import { Maximize } from "lucide-react";
import { TimelineListViewIcon } from "@/icons";
import { TimelineDefaultView } from "@/components/Timeline";

const timelineData = [
  {
    postId: 1,
    title: "NIT Calicut",
    description: "Computer Science Engineering",
    startTime: 1607990400,
    endTime: 1715299200,
  },
  {
    postId: 2,
    title: "Freelancing",
    description: "Upwork contract",
    startTime: 1709596800,
    endTime: 1734912000,
  },
  {
    postId: 3,
    title: "Aakash Educational Services Limited (AESL)",
    description: "Software Engineer",
    startTime: 1723075200,
    endTime: null,
  },
];

function TimelineSection({ portfolioId = "" }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end justify-between">
        <div className="text-2xl font-medium">
          <span className="text-4xl font-bold">T</span>imeline
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={{
              pathname: `/view/${portfolioId}/timeline`,
              query: { view: "list" },
            }}
            className="flex items-center gap-1 text-gray-500 hover:text-black cursor-pointer"
          >
            <TimelineListViewIcon size={26} />
          </Link>
          <Link
            href={{
              pathname: `/view/${portfolioId}/timeline`,
              query: { view: "default" },
            }}
            className="flex font-medium gap-2"
          >
            <Maximize
              className="cursor-pointer text-gray-500 hover:text-black"
              size={18}
            />
          </Link>
        </div>
      </div>
      <TimelineDefaultView
        portfolioId={portfolioId}
        timelineData={timelineData}
      />
    </div>
  );
}

export default TimelineSection;
