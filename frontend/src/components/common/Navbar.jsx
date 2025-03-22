import { CiUser } from "react-icons/ci";

const Navbar = () => {
  return (
    <nav className="h-24 max-w-screen flex flex-row justify-between items-center px-10 bg-black text-white">
      {/* Main logo with spacing */}
      <h1 className=" ml-3 text-2xl font-bold text-blue-500 mr-12">StreamSync</h1>

      {/* Navigation links with space */}
      <ul className="hidden md:flex md:flex-row gap-6 text-lg">
        <li className="px-6 py-2 rounded-lg hover:text-blue-400 cursor-pointer bg-gray-900">
          Home
        </li>
        <li className="px-6 py-2 rounded-lg hover:text-blue-400 cursor-pointer bg-gray-900">
          My Channel
        </li>
        <li className="px-6 py-2 rounded-lg hover:text-blue-400 cursor-pointer bg-gray-900">
          Trending
        </li>
        <li className="px-6 py-2 rounded-lg hover:text-blue-400 cursor-pointer bg-gray-900">
          Settings
        </li>
      </ul>

      {/* Search bar with rounded corners and bigger placeholder */}
      <div className="flex items-center bg-gray-800 p-3 rounded-full">
        <input
          type="text"
          placeholder=" Search Stream..."
          className="p-5 w-80 h-15 text-lg rounded-full bg-transparent text-white outline-none placeholder-gray-400"
        />
        <CiUser
          size={30}
          className="ml-4 text-white cursor-pointer hover:text-blue-400"
        />
      </div>
    </nav>
  );
};

export default Navbar;

