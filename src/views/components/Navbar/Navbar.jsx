import React from "react";
import style from "./Navbar.module.scss";

const Navbar = () => {
  const navItems = ["Login", "Signup", "Blog"];

  return (
    <div className={style.container}>
      <nav>
        <ul>
          {navItems.map((navItem, index) => (
            <li key={index}>{navItem}</li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
