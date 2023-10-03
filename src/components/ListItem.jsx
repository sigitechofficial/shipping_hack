import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ListItem(props) {
  const { Icon } = props;
  const location = useLocation().pathname;
  return (
    <li>
      <Link
        to={props.to}
        className={`${
          props.to === location
            ? "text-themeBlue"
            : props.active
            ? "text-themeBlue"
            : "text-black text-opacity-40"
        } flex items-center gap-x-4 p-2 rounded font-medium text-base`}
      >
        <Icon size={24} />
        <span>{props.title}</span>
      </Link>
      <hr
        className={`border-none h-[1px] ${
          props.to === location
            ? "bg-themeBlue"
            : props.active
            ? "bg-themeBlue"
            : "bg-black bg-opacity-20"
        }`}
      />
    </li>
  );
}
