import React, { createContext, useState } from "react";
import Loader from "./Loader";
import LeftBar from "./LeftBar";
import MainSection from "./MainSection";
import Header from "./Header";

export const LayoutContext = createContext(null);
export default function Layout(props) {
  const [loader, setLoader] = useState(false);
  const [expand, setExpand] = useState(false);
  return loader ? (
    <Loader />
  ) : (
    <>
      <LayoutContext.Provider value={{ expand, setExpand, setLoader }}>
        <Header />
        <LeftBar expand={expand ? true : false} />
        <MainSection title={props.title} content={props.content} />
      </LayoutContext.Provider>
    </>
  );
}
