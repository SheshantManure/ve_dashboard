import React, { useState, useEffect, useRef } from "react";
import style from "./signupModal.module.scss";
import GoogleLogo from "../../../assets/svgs/signupModal/googleLogo";
import VeLogoForSignup from "../../../assets/svgs/signupModal/veLogoForSignup";
import ShowPwd from "../../../assets/svgs/loginModal/showPwd";
import HidePwd from "../../../assets/svgs/loginModal/hidePwd";

const SignupModal = ({ openLoginModal, closeSignupModal }) => {
    const [emailInputDiv, setEmailInputDiv] = useState(true);
    const [fullnameInputDiv, setFullnameInputDiv] = useState(false);
    const [pwdInputDiv, setPwdInputDiv] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [companyTnCChecked, setCompanyTnCChecked] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const emailInputRef = useRef(null);
    const fullnameInputRef = useRef(null);
    const pwdInputRef = useRef(null);
    const [isBackspacePressed, setIsBackspacePressed] = useState(false);

    const [enableContinueBtn, setEnableContinueBtn] = useState(false);

    const handleOpenLoginModal = () => {
        closeSignupModal();
        openLoginModal();
    };

    const validateAndSetEmail = (e) => {
        const emailRegex =
            /^[^\s@]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(com|org|net|edu|gov|mil|int|info|biz|name|xyz|online|store|app|tech|io|us|uk|ca|au|de|fr|in|cn|jp|ru|br|za|mx|it|es|nz|[a-z]{2,63})$/i;
        let emailInput =
            e?.target?.value || emailInputRef?.current?.value || email || "";

        if (email.length === 1 && isBackspacePressed) {
            setEmail("");
            setErrMsg("");
            setEnableContinueBtn(false);
            setIsBackspacePressed(false);
            return;
        }

        if (emailRegex.test(emailInput)) {
            setEnableContinueBtn(true);
        } else if (emailInput === "") {
            setErrMsg("");
        } else {
            setEnableContinueBtn(false);
            setErrMsg("Invalid Email!");
        }
        setEmail(emailInput);
    };

    const validateAndSetFullname = (e) => {
        let inputName =
            e?.target?.value ||
            fullnameInputRef?.current?.value ||
            fullname ||
            "";

        if (fullname.length === 1 && isBackspacePressed) {
            setFullname("");
            setErrMsg("");
            setEnableContinueBtn(false);
            setIsBackspacePressed(false);
            return;
        }

        const nameParts = inputName.split(/\s+/).filter((part) => part !== "");
        const firstName = nameParts[0];
        const lastName = nameParts[1];
        const nameRegex = /^[A-Za-z]+$/;

        if (inputName === "") {
            setErrMsg("");
            setFullname(inputName);
            setEnableContinueBtn(false);
            return;
        }

        if (nameParts.length === 0) {
            setErrMsg("Full name cannot be just space(s)!");
            setFullname(inputName);
            setEnableContinueBtn(false);
            return;
        }

        if (!firstName || firstName.length < 2 || !nameRegex.test(firstName)) {
            setErrMsg(
                "First name must contain only letters and be at least 2 characters long."
            );
            setFullname(inputName);
            setEnableContinueBtn(false);
            return;
        }

        if (!lastName || lastName.length < 2 || !nameRegex.test(lastName)) {
            setErrMsg(
                "Last name must contain only letters and be at least 2 characters long."
            );
            setFullname(inputName);
            setEnableContinueBtn(false);
            return;
        }

        setFullname(nameParts.join(" "));
        setErrMsg("");
        setEnableContinueBtn(true);
    };

    const validateAndSetPwd = (e) => {
        const inputPwd =
            e?.target?.value || pwdInputRef?.current?.value || password || "";
        const pwdRegex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        if (password.length === 1 && isBackspacePressed) {
            setPassword("");
            setErrMsg("");
            setEnableContinueBtn(false);
            setIsBackspacePressed(false);
            return;
        }

        if (inputPwd === " ") {
            setErrMsg("Password cannot contain spaces!");
            setEnableContinueBtn(false);
        } else if (inputPwd.length < 8) {
            setErrMsg("Password must be at least 8 characters long.");
            setEnableContinueBtn(false);
        } else if (!/[A-Za-z]/.test(inputPwd)) {
            setErrMsg("Password must contain at least one letter!");
            setEnableContinueBtn(false);
        } else if (!/\d/.test(inputPwd)) {
            setErrMsg("Password must contain at least one number!");
            setEnableContinueBtn(false);
        } else if (!/[@$!%*#?&]/.test(inputPwd)) {
            setErrMsg("Password must contain at least one special character!");
            setEnableContinueBtn(false);
        } else if (pwdRegex.test(inputPwd)) {
            setErrMsg("");
            setEnableContinueBtn(true);
        }
        setPassword(inputPwd);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Escape") {
            if (emailInputDiv) {
                closeSignupModal();
            } else if (fullnameInputDiv) {
                setFullnameInputDiv(false);
                setEmailInputDiv(true);
                validateAndSetEmail();
            } else if (pwdInputDiv) {
                setPwdInputDiv(false);
                setFullnameInputDiv(true);
                validateAndSetFullname();
            }
        } else if (e.key === "Enter" && enableContinueBtn) {
            handleContinue();
        } else if (e.key === "Backspace") {
            setIsBackspacePressed(true);
        }
    };

    const handleContinue = () => {
        if (emailInputDiv && enableContinueBtn) {
            setFullnameInputDiv(true);
            setEnableContinueBtn(false);
            setEmailInputDiv(false);
            validateAndSetFullname();
            setErrMsg("");
        } else if (fullnameInputDiv && enableContinueBtn) {
            setPwdInputDiv(true);
            setEnableContinueBtn(false);
            setFullnameInputDiv(false);
            validateAndSetPwd();
            setErrMsg("");
        } else if (pwdInputDiv && enableContinueBtn) {
            console.log(email, password);
        }
    };

    const renderPreviousStep = () => {
        if (emailInputDiv) {
            closeSignupModal();
        } else if (fullnameInputDiv) {
            setFullnameInputDiv(false);
            setEmailInputDiv(true);
            validateAndSetEmail();
        } else if (pwdInputDiv) {
            setPwdInputDiv(false);
            setFullnameInputDiv(true);
            validateAndSetFullname();
        }
    };

    useEffect(() => {
        if (emailInputDiv) {
            emailInputRef.current.focus();
        } else if (fullnameInputDiv) {
            fullnameInputRef.current.focus();
        } else if (pwdInputDiv) {
            pwdInputRef.current.focus();
        }
    }, [emailInputDiv, fullnameInputDiv, pwdInputDiv]);

    return (
        <div onClick={closeSignupModal} className={style.backdropContainer}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={style.modalContainer}
            >
                <div className={style.veLogoContainer}>
                    <VeLogoForSignup />
                    <p>Signup to create workspace</p>
                </div>
                <button className={style.continueWithGoogleBtn}>
                    <GoogleLogo />
                    <p>Continue with Google</p>
                </button>
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
                {fullnameInputDiv && (
                    <div className={style.fullnameDiv}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            onChange={validateAndSetFullname}
                            onKeyDown={handleKeyPress}
                            ref={fullnameInputRef}
                            value={fullname}
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
                    <button
                        onClick={renderPreviousStep}
                        className={style.backBtn}
                    >
                        Back
                    </button>
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
                        <p className={style.errMsg}>{errMsg}</p>
                    </button>
                </div>
                <p className={style.navigateToLogin}>
                    Already have an account?{" "}
                    <span onClick={handleOpenLoginModal}>Login</span>
                </p>
                <div className={style.companyTnC}>
                    <input
                        type="checkbox"
                        checked={companyTnCChecked}
                        onClick={() =>
                            setCompanyTnCChecked((prevState) => !prevState)
                        }
                    />
                    <p>
                        By signing up to create a new account, I confirm that I
                        have read and accept ve's
                        <span> Terms of Use</span> &{" "}
                        <span>Privacy Policy.</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupModal;
