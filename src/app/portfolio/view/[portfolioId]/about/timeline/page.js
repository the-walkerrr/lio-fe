import Timeline from "@/components/PortfolioView/Timeline";

function TimelineLandingPage() {
  return (
    <div className="flex flex-col gap-2 mt-10 p-4">
      <div className="text-3xl font-bold">Timeline</div>
      <Timeline showHeader={false} showMinimize showStartAndEnd />
    </div>
  );
}

export default TimelineLandingPage;
