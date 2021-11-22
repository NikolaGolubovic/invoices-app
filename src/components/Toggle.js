import React, { useEffect, useState } from "react";
import "../App.css";
import { setTheme } from "../utils/themes";
import Moon from "./svg/Moon";
import Sun from "./svg/Sun";

function Toggle() {
  const [togClass, setTogClass] = useState("dark");
  let theme = localStorage.getItem("theme");

  const handleOnClick = () => {
    if (localStorage.getItem("theme") === "theme-dark") {
      setTheme("theme-light");
      setTogClass("light");
    } else {
      setTheme("theme-dark");
      setTogClass("dark");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "theme-dark") {
      setTogClass("dark");
    } else if (localStorage.getItem("theme") === "theme-light") {
      setTogClass("light");
    }
  }, [theme]);

  return (
    <div className="container--toggle">
      {togClass === "dark" ? (
        <Sun handleOnClick={handleOnClick} />
      ) : (
        <Moon handleOnClick={handleOnClick} />
      )}
    </div>
  );
}

export default Toggle;
