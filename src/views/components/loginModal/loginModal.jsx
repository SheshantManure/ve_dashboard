import React, { useState, useRef, useEffect } from "react";
import style from "./loginModal.module.scss";
import VeLogoForLogin from "../../../assets/svgs/loginModal/veLogoForLogin";
import GoogleLogo from "../../../assets/svgs/signupModal/googleLogo";

const LoginModal = ({ closeLoginModal }) => {
    const [verificationCodeModalContainer, setVerificationCodeModalContainer] =
        useState(false);
    const [emailModalContainer, setEmailModalContainer] = useState(true);
    const [email, setEmail] = useState("");
    const [enableContinueBtn, setEnableContinueBtn] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [isBackspacePressed, setIsBackspacePressed] = useState(false);
    const [verificationCode, setVerificationCode] = useState([
        null,
        null,
        null,
        null,
        null,
        null,
    ]);
    const [isVerificationCodeComplete, setIsVerificationCodeComplete] =
        useState(false);

    const emailInputRef = useRef(null);
    const verificationCodeInputRefs = useRef([]);

    useEffect(() => {
        if (emailModalContainer && emailInputRef.current) {
            emailInputRef.current.focus();
        }
    }, [emailModalContainer]);

    useEffect(() => {
        if (verificationCodeModalContainer) {
            verificationCodeInputRefs.current[0].focus();
        }
    }, [verificationCodeModalContainer]);

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
            setErrMsg("");
        } else if (emailInput === "") {
            setErrMsg("");
        } else {
            setEnableContinueBtn(false);
            setErrMsg("Warning: Invalid Email!");
        }
        setEmail(emailInput);
    };

    const handleContinue = () => {
        if (emailModalContainer && enableContinueBtn) {
            setEmailModalContainer(false);
            setVerificationCodeModalContainer(true);
        } else if (verificationCodeModalContainer && enableContinueBtn) {
            console.log("login the user after verifying code", email);
        }
    };
    const handleBack = () => {
        if (verificationCodeModalContainer) {
            setVerificationCodeModalContainer(false);
            validateAndSetEmail();
            setEmailModalContainer(true);
        } else if (emailModalContainer) {
            closeLoginModal();
        }
    };

    useEffect(() => {
        if (isVerificationCodeComplete) setEnableContinueBtn(true);
        else setEnableContinueBtn(false);
    }, [isVerificationCodeComplete]);

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && emailModalContainer && enableContinueBtn) {
            setEmailModalContainer(false);
            setVerificationCodeModalContainer(true);
        } else if (
            e.key === "Enter" &&
            verificationCodeModalContainer &&
            enableContinueBtn
        ) {
            console.log("login the user after verifying code", email);
        } else if (e.key === "Escape" && verificationCodeModalContainer) {
            setVerificationCodeModalContainer(false);
            validateAndSetEmail();
            setEmailModalContainer(true);
        } else if (e.key === "Escape" && emailModalContainer) {
            closeLoginModal();
        } else if (e.key === "Backspace") {
            setIsBackspacePressed(true);
        }
    };
    const handleVerificationInput = (e, index) => {
        const { value } = e.target;
        const newCode = [...verificationCode];

        if (isNaN(value) || value === " ") {
            setErrMsg("Only numbers are allowed");
            return;
        } else {
            setErrMsg("");
        }

        newCode[index] = value;
        setVerificationCode(newCode);

        setIsVerificationCodeComplete(
            newCode.every((digit) => digit !== null && digit !== "")
        );

        if (value && index < 5) {
            const nextInput = verificationCodeInputRefs.current[index + 1];
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    const handleVerificationKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (
                verificationCode[index] === null ||
                verificationCode[index] === ""
            ) {
                if (index > 0) {
                    verificationCodeInputRefs.current[index - 1].focus();
                }
            }
        }
    };

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData("text");
        if (pasteData.length === 6 && /^\d+$/.test(pasteData)) {
            const newCode = pasteData.split("");
            setVerificationCode(newCode);
            newCode.forEach((digit, index) => {
                verificationCodeInputRefs.current[index].value = digit;
            });
            verificationCodeInputRefs.current[5].focus();
        } else {
            alert("The text you are trying to paste is not a 6 digits number!");
        }
        e.preventDefault();
    };

    const emailModalContainerRef = useRef(null);

    return (
        <div onClick={closeLoginModal} className={style.backdropContainer}>
            {emailModalContainer && (
                <div
                    ref={emailModalContainerRef}
                    tabindex="0"
                    onKeyDown={handleKeyPress}
                    onClick={(e) => {
                        emailModalContainerRef.current.focus();
                        e.stopPropagation();
                    }}
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
                        <input
                            type="email"
                            placeholder="work@email.com"
                            onChange={validateAndSetEmail}
                            ref={emailInputRef}
                            value={email}
                        />
                    </div>

                    <div className={style.actionBtns}>
                        <button onClick={handleBack} className={style.backBtn}>
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
                        </button>
                        <p className={style.errMsg}>{errMsg}</p>
                    </div>
                </div>
            )}

            {verificationCodeModalContainer && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={handleKeyPress}
                    className={style.forgotPwdModalContainer}
                >
                    <h1 className={style.title}>We sent you a code</h1>
                    <div className={style.codeDiv}>
                        {verificationCode.map((digit, key) => {
                            return (
                                <div className={style.digitBox} key={key}>
                                    <input
                                        number="number"
                                        maxLength="1"
                                        value={digit || ""}
                                        ref={(el) =>
                                            (verificationCodeInputRefs.current[
                                                key
                                            ] = el)
                                        }
                                        placeholder="0"
                                        onPaste={handlePaste}
                                        onChange={(e) =>
                                            handleVerificationInput(e, key)
                                        }
                                        onKeyDown={(e) =>
                                            handleVerificationKeyDown(e, key)
                                        }
                                    />
                                    {key !== 5 && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="2"
                                            height="12"
                                            viewBox="0 0 2 12"
                                            fill="none"
                                        >
                                            <path
                                                d="M0.599976 0V12"
                                                stroke="#646464"
                                                stroke-opacity="0.16"
                                            />
                                        </svg>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <p className={style.resendCode}>Resend code</p>
                    <div className={style.actionBtns}>
                        <button onClick={handleBack} className={style.backBtn}>
                            Back
                        </button>
                        <button
                            onClick={handleContinue}
                            className={
                                isVerificationCodeComplete
                                    ? style.continueBtn
                                    : style.continueBtnDisabled
                            }
                            disabled={!isVerificationCodeComplete}
                        >
                            Continue
                        </button>
                        <p className={style.errMsg}>{errMsg}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginModal;
