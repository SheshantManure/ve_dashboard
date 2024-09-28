import React from "react";
import { ReactComponent as BackIcon } from "../../../assets/svg/mobile_view_icons/backIcon.svg";
import style from "./MobileNavSidebar.module.scss";
import { memo } from "react";

const MobileNavSidebar = ({
    openLoginModal,
    openSignupModal,
    closeMobileNavSidebar,
}) => {
    // Handle login button click
    // const handleLogin = () => {
    //     closeMobileNavSidebar();
    //     openLoginModal();
    // };

    // Handle signup button click
    // const handleSignup = () => {
    //     closeMobileNavSidebar();
    //     openSignupModal();
    // };

    return (
        <div
            className={style.backdropContainer}
            onClick={closeMobileNavSidebar} // Close when clicking on the backdrop
        >
            <div
                className={style.modalContainer}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <div className={style.modalContainerMain}>
                    <div
                        className={style.backDiv}
                        onClick={closeMobileNavSidebar} // Close when clicking on the back icon
                    >
                        <BackIcon />
                    </div>
                    <nav>
                        <ul>
                            <li
                            // onClick={handleLogin}
                            >
                                Login
                            </li>
                            <li
                            // onClick={handleSignup}
                            >
                                Signup
                            </li>{" "}
                            <li>Privacy and Terms</li>
                            {/* Added signup handler */}
                            <li>Blog</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default memo(MobileNavSidebar);
