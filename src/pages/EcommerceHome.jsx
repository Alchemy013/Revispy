import Navbar from "../components/Navbar";

const EcommerceHome = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the E-Commerce Experience
        </h1>
        <p className="text-gray-400 text-lg max-w-md text-center mb-8">
          Discover a world of products tailored just for your interests.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md font-semibold text-white">
          Start Shopping
        </button>
      </div>
    </>
  );
};

export default EcommerceHome;
