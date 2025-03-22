const HeroSection = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col p-8">
      {/* Border Below Navbar */}
      <div className="border-b-2 border-gray-700 w-full mb-6"></div>

      <div className="flex justify-start items-start">
        {/* Video Player Section with Margin */}
        <div className="bg-gray-800 p-5 rounded-lg shadow-lg w-[720px] ml-10 mt-4 border border-gray-600">
          {/* Video Player */}
          <div className="w-full aspect-video bg-black flex items-center justify-center rounded-lg">
            <p className="text-lg">Current Stream Is Being Played...</p>
          </div>

          {/* Video Progress Bar */}
          <div className="mt-4">
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="0"
              className="w-full cursor-pointer appearance-none bg-gray-600 h-2 rounded-lg accent-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
