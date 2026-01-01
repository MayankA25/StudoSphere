import { Globe, LogOut, MessagesSquare, Settings, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

function Navbar() {
  const { user, logout } = useAuthStore();
  return (
    <header className="flex items-center justify-between md:p-4 p-2 bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 fixed top-0 w-full z-900">
      <div className="flex items-center space-x-2">
        <Link to="/" className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer">
          <img src="./logo.jpg" alt="" className="rounded-full w-full h-full object-contain" />
        </Link>
        <Link to={"/"} className="text-white font-inter font-semibold text-xl cursor-pointer">
          StudoSphere
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          to={"/settings"}
          className="flex items-center justify-center gap-1 hover:bg-slate-800/30 px-3 py-2 rounded-md bg-slate-900/60"
        >
          <Settings className="text-neutral-content md:size-5 size-4" />
          <h1 className="font-semibold text-neutral-content text-sm md:text-md">
            Settings
          </h1>
        </Link>
        {user && (
          <button
            className="flex items-center justify-center gap-1 hover:bg-slate-800 px-1 py-1 md:px-3 md:py-2 rounded-md bg-zinc-800/60"
            onClick={logout}
          >
            <LogOut className="text-neutral-content md:size-5 size-4" />
            <h1 className="font-semibold text-neutral-content text-sm md:text-md">
              LogOut
            </h1>
          </button>
        )}
        {user && (
          <Link to={"/profile"} className="flex items-center justify-center cursor-pointer">
            <img
              src={user.user.profilePic}
              className="rounded-full size-8 md:size-10 object-contain border border-neutral"
              alt=""
            />
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
