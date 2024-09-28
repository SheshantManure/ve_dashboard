import React from "react";
import style from "./index.module.scss";
import { memo } from "react";
const Navbar = ({
    openSignupModal,
    openLoginModal,
    openPrivacyAndTermsModal,
}) => {
    const navItems = ["Login", "Signup", "Privacy and Terms", "Blog"];

    const handleNavClick = (navItem) => {
        if (navItem === "Privacy and Terms") {
            openPrivacyAndTermsModal();
        }
        // if (navItem === "Signup") {
        //     openSignupModal();
        // }
        // if (navItem === "Login") {
        //     openLoginModal();
        // }
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

export default memo(Navbar);
