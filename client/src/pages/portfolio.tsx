import PortfolioGrid from "@/components/portfolio-grid";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-pixel-dark mb-4">My Portfolio</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive collection of my work across various technologies and creative disciplines.
          </p>
        </div>

        <PortfolioGrid />
      </div>
    </div>
  );
}
