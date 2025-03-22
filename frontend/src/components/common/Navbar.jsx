import { CiUser } from "react-icons/ci";

const Navbar = () => {
  return (
    <nav className="h-24 max-w-screen flex flex-row justify-between items-center bg-black text-white">
      {/* Main logo */}
      <h1 className="text-2xl font-bold text-blue-500">StreamSync</h1>

      {/*  */}
      <ul className="hidden md:flex md:flex-row md:space-x-10 text-lg">
        <li className="hover:text-blue-400">Home</li>
        <li className="hover:text-blue-400">My Channel</li>
        <li className="hover:text-blue-400">Trending</li>
        <li className="hover:text-blue-400">Settings</li>
      </ul>

      {/* Searchbar */}
      <div className="flex items-center bg-gray-800 p-2">
        <input
          type="text"
          placeholder="Search Stream..."
          className="p-2 rounded-md text-white outline-none"
        />
        <CiUser
          size={28}
          className="text-white cursor-pointer hover:text-blue-400"
        />
      </div>
    </nav>
  );
};

export default Navbar;
