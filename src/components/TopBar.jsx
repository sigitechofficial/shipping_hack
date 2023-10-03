import React, { useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";
import Select from "react-select";
import { info_toaster } from "../utilities/Toaster";
import { LayoutContext } from "./Layout";

export default function TopBar(props) {
  const { expand, setExpand } = useContext(LayoutContext);
  return (
    <nav
      className={`fixed z-50 border-b ${
        expand ? "w-full" : "w-[calc(100%-256px)] ml-[256px]"
      } bg-white border-b-black border-opacity-20 top-0 py-3 px-8 float-right flex items-center justify-between min-h-[68px]`}
    >
      <div className="flex items-center gap-x-4">
        <button onClick={() => setExpand(!expand)}>
          {expand ? <ImArrowRight2 size={24} /> : <ImArrowLeft2 size={24} />}
        </button>
        {props.search && (
          <>
            <div
              onClick={() =>
                props.selectValue === null &&
                info_toaster("Please select a Filter")
              }
              className="relative"
            >
              <label
                htmlFor="search"
                className="text-black text-opacity-40 absolute left-3 top-1/2 -translate-y-1/2"
              >
                <BsSearch size={20} />
              </label>
              <input
                disabled={props.selectValue === null ? true : false}
                value={props.value}
                onChange={props.onChange}
                type="search"
                id="search"
                name="search"
                placeholder="Search..."
                className="bg-themeGray px-4 py-2 rounded font-normal text-xl placeholder:text-opacity-40 md:w-96 pl-10 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
              />
            </div>
            <div className="w-80">
              <Select
                value={props.selectValue}
                onChange={props.selectOnChange}
                options={props.options}
                inputId="dbs"
                placeholder="Filter..."
                isClearable
              />
            </div>
          </>
        )}
      </div>
      <h3>{localStorage.getItem("userName")}</h3>
    </nav>
  );
}
