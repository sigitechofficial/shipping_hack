import React from "react";

export default function ListHead(props) {
  return (
    <>
      <h1 className={`font-bold uppercase`}>{props.title}</h1>
      <hr className="border-none h-0.5 bg-black bg-opacity-20" />
    </>
  );
}
