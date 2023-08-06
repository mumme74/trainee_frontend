import React from "react";
import Header from "./header/Header";
import SideMenu from "./menus/SideMenu";

import "./App.css";

export default function App(props: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <SideMenu />
      <div className="headerAndContent">
        <Header />
        <div className="container">{props.children}</div>
      </div>
    </React.Fragment>
  );
}
