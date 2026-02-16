"use client";
import Button from "@/components/common/Button";
import { PlusIcon } from "lucide-react";

export default function CreateNewPortfolioButton() {
  const handleCreatePortfolio = () => {
    console.log("Create Portfolio");
  };

  return (
    <Button onClick={handleCreatePortfolio}>
      <div className="flex items-center gap-2">
        <PlusIcon className="md:h-5 md:w-5 h-4 w-4" strokeWidth={2} />
        <span className="hidden md:block md:text-base">Create new</span>
      </div>
    </Button>
  );
}
