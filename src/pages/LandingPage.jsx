import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6 py-16">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-4">Welcome to ECOMMERCE</h1>
        <p className="text-gray-400 text-lg mb-8">
          Discover products you love. Curated just for your interests.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/signup"
            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-md font-semibold text-white"
          >
            Get Started
          </Link>
          <Link
            to="/dashboard"
            className="bg-gray-800 hover:bg-gray-700 transition px-6 py-3 rounded-md font-semibold text-white"
          >
            Explore Categories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
