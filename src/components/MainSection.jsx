import React, { useContext } from "react";
import { LayoutContext } from "./Layout";

export default function MainSection(props) {
  const { expand } = useContext(LayoutContext);
  return (
    <section
      className={`relative min-h-[calc(100vh-92px)] ${
        expand ? "w-full" : "w-[calc(100%-256px)]"
      } bg-themeGray2 top-[92px] py-12 px-10 float-right`}
    >
      <h1 className={`font-bold text-2xl mb-5 `}>{props.title}</h1>
      {props.content}
    </section>
  );
}
