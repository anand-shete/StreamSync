import { CiUser } from "react-icons/ci";

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-500">StreamSync</h1>
        <ul className="hidden md:flex space-x-6 text-lg">
          <li className="hover:text-red-400 cursor-pointer">Home</li>
          <li className="hover:text-red-400 cursor-pointer">My Channel</li>
          <li className="hover:text-red-400 cursor-pointer">Trending</li>
          <li className="hover:text-red-400 cursor-pointer">Settings</li>
        </ul>
        <div className="flex items-center space-x-4 bg-gray-800 p-2 rounded-lg">
        <input
          type="text"
          placeholder="Search Stream..."
          className="p-2 rounded-md text-white outline-none"
        />
        <CiUser size={28} className="text-white cursor-pointer hover:text-red-400" />
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
