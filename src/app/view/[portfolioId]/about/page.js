import {
  UserProfileSection,
  TimelineSection,
  SectionTabs,
} from "@/components/PortfolioView";

async function PortfolioView({ params }) {
  const { portfolioId } = await params;

  return (
    <div className="flex px-10 gap-2">
      <div className="flex gap-10 flex-1 min-w-0">
        <UserProfileSection />
        <div className="flex flex-col flex-3/5 mt-2 min-w-0">
          <SectionTabs />
          <TimelineSection portfolioId={portfolioId} />
        </div>
      </div>
    </div>
  );
}

export default PortfolioView;
