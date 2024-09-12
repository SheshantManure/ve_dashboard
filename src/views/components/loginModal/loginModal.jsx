import React from "react";
import style from "./loginModal.module.scss";

const LoginModal = ({ closeLoginModal }) => {
    return (
        <div onClick={closeLoginModal} className={style.backdropContainer}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={style.modalContainer}
            ></div>
        </div>
    );
};

export default LoginModal;
