"use client";
import { useState } from "react";

const tabs = [
  { id: "timeline", label: "Timeline" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
];

function SectionTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  return (
    <div className="flex gap-6 mb-4 font-medium leading-none">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`cursor-pointer ${activeTab === tab.id ? "text-black" : "text-gray-400"}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}

export default SectionTabs;
