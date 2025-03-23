import { NavLink } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  return (
    <nav className="h-26 max-w-screen bg-black flex flex-row items-center space-x-10">
      <NavLink to="/">
        <h1 className="mx-30 text-2xl text-blue-400 font-bold hover:scale-120 transition-transform">
          StreamSync
        </h1>
      </NavLink>
      {!user._id ? (
        <>
          <ul className="flex flex-row space-x-20">
            <NavLink
              to="/signup"
              className="px-3 py-2 hover:scale-120 rounded-2xl hover:drop-shadow-lg hover:bg-blue-500  transition-all"
            >
              Signup
            </NavLink>
            <NavLink
              to="/login"
              className="px-3 py-2 hover:scale-120 transition-all  rounded-2xl hover:bg-blue-500"
            >
              Login
            </NavLink>
          </ul>
        </>
      ) : (
        <>
          <ul className="flex flex-row space-x-20">
            <NavLink
              to="/videos"
              className="px-3 py-2 hover:scale-120 rounded-2xl hover:drop-shadow-lg hover:bg-blue-500  transition-all"
            >
              My Streams
            </NavLink>
            <NavLink
              to="/logout"
              className="px-3 py-2 hover:scale-120 transition-all  rounded-2xl hover:bg-blue-500"
            >
              Logout
            </NavLink>
          </ul>
        </>
      )}
    </nav>
  );
};

export default Navbar;
