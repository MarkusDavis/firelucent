import React from "react";
import "./HomeBox.css";
import Header from "../../components/Sidebar";
const HomeBox = ({ children }) => {
  return (
    <div className="home">
      <Header />
      <div className="homeBox">{children}</div>
    </div>
  );
};

export default HomeBox;
