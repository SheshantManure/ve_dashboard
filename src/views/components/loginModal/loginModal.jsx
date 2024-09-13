import React, { useState } from "react";
import style from "./loginModal.module.scss";
import VeLogoForLogin from "../../../assets/svgs/loginModal/veLogoForLogin";
import GoogleLogo from "../../../assets/svgs/signupSidebar/googleLogo";
import ShowPwd from "../../../assets/svgs/loginModal/showPwd";

const LoginModal = ({ closeLoginModal }) => {
    const [renderForgotPwdModal, setRenderForgotPwdModal] = useState(false);
    const [showPwd, setShowPwd] = useState(false);
    return (
        <div onClick={closeLoginModal} className={style.backdropContainer}>
            {!renderForgotPwdModal && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={style.modalContainer}
                >
                    <h1 className={style.loginTitle}>Login</h1>
                    <p>
                        to continue to your <VeLogoForLogin /> account
                    </p>
                    <div className={style.continueWithGoogleDiv}>
                        <div className={style.userInfo}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="31"
                                height="32"
                                viewBox="0 0 31 32"
                                fill="none"
                            >
                                <circle
                                    cx="15.5"
                                    cy="16"
                                    r="15.5"
                                    fill="#6055EC"
                                />
                            </svg>
                            <div className={style.nameAndEmail}>
                                <h1>Continue as John</h1>
                                <h2>johnwick@gmail.com</h2>
                            </div>
                        </div>
                        <div className={style.GoogleLogoDiv}>
                            <GoogleLogo />
                        </div>
                    </div>
                    <p className={style.or}>or</p>
                    <div className={style.emailDiv}>
                        <input type="email" placeholder="work@email.com" />
                    </div>
                    <div className={style.pwdDiv}>
                        <ShowPwd
                            toggleShowPwd={() =>
                                setShowPwd((prevState) => !prevState)
                            }
                        />
                        <input
                            type={showPwd ? "text" : "password"}
                            placeholder="Password"
                        />
                    </div>
                    <div className={style.actionBtns}>
                        {/* <button className={style.backBtn}>Back</button> */}
                        <button className={style.continueBtn}>Continue</button>
                        <p className={style.errMsg}>
                            Invalid email or password
                        </p>
                    </div>
                    <p
                        onClick={() => setRenderForgotPwdModal(true)}
                        className={style.forgotPwd}
                    >
                        forgot password?
                    </p>
                </div>
            )}
            {renderForgotPwdModal && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={style.modalContainer}
                >
                    <h1 className={style.loginTitle}>We sent you a code</h1>
                    <div className={style.codeDiv}>
                        <input type="text" placeholder="0 0 0 0 0 0" />
                    </div>
                    <div className={style.resendCodeContainer}>
                        <p className={style.resendCode}>Resend code</p>
                    </div>
                    <div className={style.actionBtns}>
                        <button
                            onClick={() => setRenderForgotPwdModal(false)}
                            className={style.backBtn}
                        >
                            Back
                        </button>
                        <button className={style.continueBtn}>Continue</button>
                        <p className={style.errMsg}>Incorrect code</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginModal;
