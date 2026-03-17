import Timeline from "./Timeline";

export default function PortfolioViewLandingPage() {
  return (
    <div className="flex px-10 gap-2 mt-8">
      <div className="flex gap-10 flex-1 min-w-0">
        {/* LHS */}
        <div className="flex flex-col shrink-0 flex-2/5">
          {/* Profile pic and name */}
          <div className="flex flex-col gap-2">
            <img
              src="/mock_images/mock_profile_picture.png"
              alt="mock_profile_picture"
              className="w-48 h-48"
            />
            <div className="flex flex-col gap-1">
              <div className="text-3xl font-bold">Divakar Mahanthi</div>
              <div className="text-sm">
                Passionate software engineer dedicated to building scalable web
                applications and solving complex problems with clean, efficient
                code.
              </div>
            </div>
          </div>
          {/* Info */}
        </div>
        {/* RHS */}
        <div className="flex flex-col flex-3/5 min-w-0">
          {/* Section Tabs */}
          <div></div>
          {/* Timeline */}
          <Timeline />
        </div>
      </div>
    </div>
  );
}
