import React from "react";
import lightTheme from "../images/icon-sun.svg";
import darkTheme from "../images/icon-moon.svg";

interface propsType {
  themeOption: "light" | "dark";
  onClick: () => void;
}

const Headers = ({ themeOption, onClick }: propsType) => {
  return (
    <section className="header">
      <div className="header_container">
        <h1>todo</h1>
        <div className="theme_selector">
          <img
            src={themeOption === "light" ? darkTheme : lightTheme}
            alt="icon-sun"
            onClick={onClick}
          />
        </div>
      </div>
    </section>
  );
};

export default Headers;
