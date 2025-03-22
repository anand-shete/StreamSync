import React from "react";
export { default as Navbar } from "./Navbar";
export { default as Footer } from "./Footer";

const Index = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex flex-col items-center p-6">
        {/* Global Timeline */}
        <div className="w-full text-center py-2 bg-gray-800 rounded-lg text-lg font-semibold">
          Global Timeline: <span className="text-red-500">-03:02:45</span>
        </div>

        {/* Video Player Section */}
        <div className="mt-6 flex flex-col md:flex-row gap-6 w-full max-w-6xl">
          <div className="flex-1 bg-gray-700 p-4 rounded-lg shadow-lg flex items-center justify-center">
            <p className="text-lg">Current Stream Is Being Played...</p>
          </div>

          {/* Personalized Sequence */}
          <div className="w-72 bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Your Personalized Sequence</h2>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((num) => (
                <button key={num} className="flex items-center w-full p-3 bg-gray-700 rounded-lg hover:bg-gray-600">
                  <div className="w-10 h-10 bg-gray-500 flex items-center justify-center rounded-md">
                    ▶
                  </div>
                  <span className="ml-3">Video #{num}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer at the bottom */}
      
    </div>
  );
};

export default Index;
