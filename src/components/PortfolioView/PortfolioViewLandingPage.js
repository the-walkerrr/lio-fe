import Link from "next/link";
import Timeline from "./Timeline";

export default function PortfolioViewLandingPage() {
  return (
    <div className="flex flex-col px-5 py-5">
      <div className="flex gap-2">
        <img
          src="/mock_images/mock_profile_picture.png"
          alt="mock_profile_picture"
          className="w-12 h-12"
        />
        <div className="flex flex-col">
          <div className="text-xl font-semibold">Divakar Mahanthi</div>
          <div className="text-sm font-medium text-gray-500">
            Software Engineer
          </div>
        </div>
        <div className="flex ml-auto gap-10 mr-5">
          <Link
            href="/portfolio/view/1/about"
            className="font-semibold text-xl"
          >
            About
          </Link>
          <Link href="/portfolio/view/1/work" className="text-gray-500 text-xl">
            Work
          </Link>
        </div>
      </div>
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
                  Passionate software engineer dedicated to building scalable
                  web applications and solving complex problems with clean,
                  efficient code.
                </div>
              </div>
            </div>
            {/* Info */}
          </div>
          {/* RHS */}
          <div className="flex flex-col flex-3/5 min-w-0 overflow-hidden">
            {/* Section Tabs */}
            <div></div>
            {/* Timeline */}
            <Timeline />
          </div>
        </div>
      </div>
    </div>
  );
}
