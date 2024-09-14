import React, { useState, useRef, useEffect } from "react";
import style from "./loginModal.module.scss";
import VeLogoForLogin from "../../../assets/svgs/loginModal/veLogoForLogin";
import GoogleLogo from "../../../assets/svgs/signupSidebar/googleLogo";
import ShowPwd from "../../../assets/svgs/loginModal/showPwd";
import HidePwd from "../../../assets/svgs/loginModal/hidePwd";

const LoginModal = ({ closeLoginModal }) => {
    const [renderForgotPwdModal, setRenderForgotPwdModal] = useState(false);
    const [emailInputDiv, setemailInputDiv] = useState(true);
    const [pwdInputDiv, setpwdInputDiv] = useState(false);
    const [showPwd, setShowPwd] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [enableContinueBtn, setEnableContinueBtn] = useState(false);

    const emailInputRef = useRef(null);
    const pwdInputRef = useRef(null);

    useEffect(() => {
        if (emailInputDiv) {
            emailInputRef.current.focus();
        } else if (pwdInputDiv) {
            pwdInputRef.current.focus();
        }
    }, [emailInputDiv, pwdInputDiv]);

    const emailRegex =
        /^[^\s@]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(com|org|net|edu|gov|mil|int|info|biz|name|xyz|online|store|app|tech|io|us|uk|ca|au|de|fr|in|cn|jp|ru|br|za|mx|it|es|nz|[a-z]{2,63})$/i;
    const validateAndSetEmail = (e) => {
        if (emailRegex.test(e.target.value)) {
            setEnableContinueBtn(true);
        } else {
            setEnableContinueBtn(false);
        }
        setEmail(e.target.value);
    };

    const validateAndSetPwd = (e) => {
        // const pwdRegex =
        //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        // if (pwdRegex.test(e.target.value)) {
        if (e.target.value.length >= 8) {
            setEnableContinueBtn(true);
        } else {
            setEnableContinueBtn(false);
        }
        setPassword(e.target.value);
    };

    const handleContinue = () => {
        if (emailInputDiv && enableContinueBtn) {
            setpwdInputDiv(true);
            setEnableContinueBtn(false);
            setemailInputDiv(false);
        } else if (pwdInputDiv && enableContinueBtn) {
            // login user
            console.log(email, password);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleContinue();
        } else if (e.key === "Escape" && pwdInputDiv) {
            handlePwdBackBtn();
        } else if (e.key === "Escape" && emailInputDiv) {
            closeLoginModal();
        }
    };

    const handlePwdBackBtn = () => {
        setpwdInputDiv(false);
        setemailInputDiv(true);
        if (emailRegex.test(email)) {
            setEnableContinueBtn(true);
        } else {
            setEnableContinueBtn(false);
        }
    };

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

                    {emailInputDiv && (
                        <div className={style.emailDiv}>
                            <input
                                type="email"
                                placeholder="work@email.com"
                                onChange={validateAndSetEmail}
                                onKeyDown={handleKeyPress}
                                ref={emailInputRef}
                                value={email}
                            />
                        </div>
                    )}

                    {pwdInputDiv && (
                        <div className={style.pwdDiv}>
                            <div
                                onClick={() =>
                                    setShowPwd((prevState) => !prevState)
                                }
                                className={style.eyeIconContainer}
                            >
                                {showPwd ? <ShowPwd /> : <HidePwd />}
                            </div>
                            <input
                                type={showPwd ? "text" : "password"}
                                placeholder="Password"
                                onChange={validateAndSetPwd}
                                onKeyDown={handleKeyPress}
                                ref={pwdInputRef}
                                value={password}
                            />
                        </div>
                    )}

                    <div className={style.actionBtns}>
                        {pwdInputDiv && (
                            <button
                                onClick={handlePwdBackBtn}
                                className={style.backBtn}
                            >
                                Back
                            </button>
                        )}
                        <button
                            className={`${
                                !enableContinueBtn
                                    ? style.continueBtnDisabled
                                    : style.continueBtn
                            }`}
                            onClick={handleContinue}
                            disabled={!enableContinueBtn}
                        >
                            Continue
                        </button>
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
                    <div className={style.companyTnC}>
                        <p>
                            By signing up to create an account, I accept
                            Company’s <span>Terms of Use</span> &{" "}
                            <span>Privacy Policy</span>
                        </p>
                    </div>
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
