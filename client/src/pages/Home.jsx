const Home = () => {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center bg-orange-50">
      <h1 className="text-5xl font-bold text-orange-600 mb-4">
        Welcome to Cravings 
      </h1>

      <p className="text-lg text-gray-600 mb-6">
        Order your favorite food anytime, anywhere.
      </p>

      <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition">
        Order Now
      </button>
    </div>
  );
};

export default Home;
