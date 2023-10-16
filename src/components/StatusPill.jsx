import React from "react";
import { BsCheckLg } from "react-icons/bs";

export default function StatusPill(props) {
  return (
    <div className="space-y-1">
      {props.pillStatus === "completed" ? (
        <div className="bg-themeBlue text-white w-10 h-10 rounded-fullest border border-themeBlue flex">
          <BsCheckLg size={22} className="m-auto" />
        </div>
      ) : props.pillStatus === "inProcess" ? (
        <div
          className={`bg-themeBlue2 w-10 h-10 rounded-fullest border border-transparent flex animate-pulse`}
        >
          <div className="bg-black w-4 h-4 rounded-fullest m-auto"></div>
        </div>
      ) : (
        <div className={`w-10 h-10 rounded-fullest border border-black`}></div>
      )}
      <h4 className={`font-bold text-sm leading-4 text-black`}>
        {props.title}
      </h4>
      <div className="flex flex-col font-medium text-xs">
        <div>{props.date}</div>
        <div>{props.time}</div>
      </div>
    </div>
  );
}
