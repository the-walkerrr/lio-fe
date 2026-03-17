import Link from "next/link";

export default function PortfolioViewLayout({ children }) {
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
      {children}
    </div>
  );
}
