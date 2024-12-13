import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ListItem(props) {
  const user = localStorage.getItem("userType");
  const { Icon } = props;
  const location = useLocation().pathname;

  return (
    <button disabled={props?.userType} className="disabled:cursor-not-allowed">
      {props?.userType ? (
        <div
          className={`text-black text-opacity-40 flex items-center gap-x-4 p-2 rounded font-medium text-base`}
        >
          <Icon size={24} />
          <span>{props.title}</span>
        </div>
      ) : (
        <Link
          to={props.to}
          className={`${
            props.to === location
              ? "text-themeBlue"
              : user === "Admin"
              ? "text-black text-opacity-40"
              : "text-black"
          } flex items-center gap-x-4 p-2 rounded font-medium text-base`}
        >
          <Icon size={24} />
          <span>{props.title}</span>
        </Link>
      )}
      <hr
        className={`border-none h-[1px] ${
          props.to === location
            ? "bg-themeBlue"
            : props.active
            ? "bg-themeBlue"
            : "bg-black bg-opacity-20"
        }`}
      />
    </button>
  );
}
