import { Edit2Icon, Eye, PlusIcon } from "lucide-react";
import Link from "next/link";
import CreateNewPortfolioButton from "./CreateNewPortfolioButton";

export default function HomeLandingPage() {
  const data = [
    {
      id: 1,
      title: "Product Designer",
      description:
        "Collection of mobile app case studies, high-fidelity prototypes, and user research documentation for fintech solutions.",
      createdTime: "14th Oct, 2024",
      lastUpdatedTime: "07th Feb, 2026",
    },
    {
      id: 2,
      title: "Frontend Architect",
      description:
        "Advanced React components library, performance optimization projects, and complex dashboard interfaces developed with Next.js.",
      createdTime: "12th Jan, 2025",
      lastUpdatedTime: "06th Feb, 2026",
    },
    {
      id: 3,
      title: "Fullstack Developer",
      description:
        "End-to-end web applications featuring real-time collaboration tools, secure authentication systems, and database schema designs.",
      createdTime: "22nd Feb, 2025",
      lastUpdatedTime: "04th Feb, 2026",
    },
    {
      id: 4,
      title: "Data Visualization Expert",
      description:
        "Interactive data stories, custom D3.js visualizations, and machine learning model explainability reports.",
      createdTime: "05th Nov, 2024",
      lastUpdatedTime: "30th Jan, 2026",
    },
    {
      id: 5,
      title: "Content Strategist",
      description:
        "Brand voice guidelines, SEO-driven content series, and multi-channel marketing campaign results for e-commerce brands.",
      createdTime: "18th Mar, 2024",
      lastUpdatedTime: "24th Jan, 2026",
    },
  ];

  const handlePortfolioClick = (id) => {
    console.log(id);
  };

  const handleCreatePortfolio = () => {
    console.log("Create Portfolio");
  };

  return (
    <div className="px-6 md:px-20 py-6 md:py-10">
      <div className="flex md:items-center justify-between gap-4">
        <div className="text-2xl md:text-3xl font-bold md:font-medium">
          Your Portfolios
        </div>
        <CreateNewPortfolioButton />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        {data.map((item) => (
          <div
            key={item?.id}
            className="flex flex-col bg-white border border-gray-300 p-4 md:p-5"
          >
            <div className="text-lg md:text-xl font-bold md:font-medium mb-0 md:mb-1 ">
              {item?.title}
            </div>
            <div className="flex-1 text-sm text-gray-800 mb-3 md:mb-4">
              {item?.description}
            </div>
            <div className="flex items-center mb-3 md:mb-4 justify-between text-xs text-gray-700">
              <span>Created: {item?.createdTime}</span>
              <span>Updated: {item?.lastUpdatedTime}</span>
            </div>
            <div className="flex items-center justify-end gap-4 text-sm border-t border-gray-200 pt-2">
              <Link
                href={`/portfolio/view/${item?.id}/about`}
                className="flex items-center gap-1 text-gray-700 hover:text-gray-900 border-b border-transparent hover:border-gray-900 cursor-pointer"
              >
                <Eye size={18} strokeWidth={1.5} />
                View
              </Link>
              <div className="h-full w-px bg-gray-200"></div>
              <Link
                href={`/portfolio/edit/${item?.id}`}
                className="flex items-center gap-1 text-gray-700 hover:text-gray-900 border-b border-transparent hover:border-gray-900 cursor-pointer"
              >
                <Edit2Icon size={14} strokeWidth={1.5} />
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
