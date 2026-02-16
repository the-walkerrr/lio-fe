import PortfolioViewLandingPage from "@/components/PortfolioView/PortfolioViewLandingPage";

export default async function PortfolioView({ params }) {
  const { portfolioId } = await params;

  return <PortfolioViewLandingPage />;
}
