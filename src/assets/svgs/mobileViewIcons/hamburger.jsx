import React from "react";

const Hamburger = ({ openSignupSidebar }) => {
    return (
        <div onClick={openSignupSidebar}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
            >
                <path
                    d="M0 11.3333H16V9.55556H0V11.3333ZM0 6.88889H16V5.11111H0V6.88889ZM0 0.666668V2.44445H16V0.666668H0Z"
                    fill="#E4E5E6"
                />
            </svg>
        </div>
    );
};

export default Hamburger;
