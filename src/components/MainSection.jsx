import React, { useContext } from "react";
import { LayoutContext } from "./Layout";
import { FiSearch } from "react-icons/fi";

export default function MainSection(props) {
  const { expand } = useContext(LayoutContext);
  return (
    <section
      className={`relative min-h-[calc(100vh-92px)] ${
        expand ? "w-full" : "w-[calc(100%-256px)]"
      } bg-themeGray2 top-[92px] py-12 px-10 float-right`}
    >
      <div className="flex items-center justify-between">
        <h1 className={`font-bold text-2xl mb-5 `}>{props.title}</h1>
        <div className="relative">
          <input
            type="search"
            placeholder="Search for anything.."
            className="bg-white w-[350px] xl:w-[450px] pl-10 pr-4 py-2.5 rounded-md outline-none placeholder:text-menuColor text-menuColor"
          />
          <FiSearch
            className="absolute top-2.5 left-3"
            size={20}
            color="#00000099"
          />
        </div>
      </div>
      {props.content}
    </section>
  );
}
