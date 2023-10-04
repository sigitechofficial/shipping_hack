import React from "react";
import { Link } from "react-router-dom";
import { imgURL } from "../utilities/URL";

export default function HomeCard(props) {
  return (
    <Link
      to={props.to}
      className="bg-white rounded-lg flex flex-col gap-y-4 items-center justify-center text-center py-8 px-5 shadow"
    >
      <div>
        <img
          src={`${imgURL}logo-${props.icon}.webp`}
          alt="logo"
          className="xl:w-20 w-16"
        />
      </div>
      <h6
        className={`font-bold text-xl text-black text-opacity-40`}
      >
        {props.title}
      </h6>
      <h2 className={`font-bold text-3xl text-themeBlue`}>
        {props.quantity}
      </h2>
    </Link>
  );
}
