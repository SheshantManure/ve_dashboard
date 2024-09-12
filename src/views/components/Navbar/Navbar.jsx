import React from "react";
import style from "./Navbar.module.scss";

const Navbar = ({ openSignupSidebar, openLoginModal }) => {
    const navItems = ["Login", "Signup", "Blog"];

    const handleNavClick = (navItem) => {
        if (navItem === "Signup") {
            openSignupSidebar();
        }
        if (navItem === "Login") {
            openLoginModal();
        }
    };

    return (
        <div className={style.container}>
            <nav>
                <ul>
                    {navItems.map((navItem, index) => (
                        <li key={index} onClick={() => handleNavClick(navItem)}>
                            {navItem}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
