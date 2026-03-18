"use client";
import Timeline from "@/components/PortfolioView/Timeline";
import { useSearchParams } from "next/navigation";

function TimelineLandingPage() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "default";
  console.log(view);
  return (
    <div className="mt-6 p-4">
      <Timeline showMinimize showStartAndEnd view={view} />
    </div>
  );
}

export default TimelineLandingPage;
