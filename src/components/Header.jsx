import React from "react";
import { FaUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { imgURL } from "../utilities/URL";

export default function Header() {
  return (
    <header className="bg-themeBlue fixed z-20 w-full">
      <nav className="w-11/12 m-auto py-5 flex justify-between items-center">
        <Link to="/">
          <img src={`${imgURL}logo.webp`} alt="logo" className="w-44 xl:w-52" />
        </Link>
        <div className="relative">
          <input
            type="search"
            placeholder="Search for anything.."
            className="bg-[#336598] w-[350px] xl:w-[450px] px-4 py-2.5 rounded-md outline-none placeholder:text-white text-white"
          />
          <FiSearch
            className="absolute top-2.5 right-3"
            size={20}
            color="white"
          />
        </div>
        <div className="flex items-center gap-x-2">
          <div className="w-12 h-12 bg-[#336598] rounded-full flex items-center justify-center">
            <FaUser size={28} color="white" />
          </div>
          <div>
            <h2 className="text-white text-sm font-semibold">Arsel T</h2>
            <p className="text-white text-xs font-normal">Administrator</p>
          </div>
        </div>
      </nav>
    </header>
  );
}
