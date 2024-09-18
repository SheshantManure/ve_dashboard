import React, { useState, useRef, useEffect } from "react";
import style from "./loginModal.module.scss";
import VeLogoForLogin from "../../../assets/svgs/loginModal/veLogoForLogin";
import GoogleLogo from "../../../assets/svgs/signupModal/googleLogo";
import ShowPwd from "../../../assets/svgs/loginModal/showPwd";
import HidePwd from "../../../assets/svgs/loginModal/hidePwd";

const LoginModal = ({ closeLoginModal }) => {
    const [renderForgotPwdModal, setRenderForgotPwdModal] = useState(false);
    const [emailInputDiv, setemailInputDiv] = useState(true);
    const [createNewWorkspace, setCreateNewWorkspace] = useState(false);
    const [emailModalContainer, setEmailModalContainer] = useState(true);
    // const [pwdInputDiv, setpwdInputDiv] = useState(false);
    // const [showPwd, setShowPwd] = useState(false);
    const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
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
    const pwdInputRef = useRef(null);
    const verificationCodeInputRefs = useRef([]);

    useEffect(() => {
        if (emailInputDiv && emailInputRef.current) {
            emailInputRef.current.focus();
        }
        // if (pwdInputDiv && pwdInputRef.current) {
        //     pwdInputRef.current.focus();
        // }
    }, [emailInputDiv]);

    useEffect(() => {
        if (renderForgotPwdModal) {
            verificationCodeInputRefs.current[0].focus();
        }
    }, [renderForgotPwdModal]);

    const validateAndSetEmail = (e) => {
        const emailRegex =
            /^[^\s@]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(com|org|net|edu|gov|mil|int|info|biz|name|xyz|online|store|app|tech|io|us|uk|ca|au|de|fr|in|cn|jp|ru|br|za|mx|it|es|nz|[a-z]{2,63})$/i;
        if (emailRegex.test(e.target.value)) {
            setEnableContinueBtn(true);
            setErrMsg("");
        } else {
            setEnableContinueBtn(false);
            setErrMsg("Invalid Email!");
        }
        setEmail(e.target.value);
    };

    // const validateAndSetPwd = (e) => {
    //     const inputPwd =
    //         e?.target?.value || pwdInputRef?.current?.value || password || "";

    //     const pwdRegex =
    //         /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])(?=.*[A-Z])[A-Za-z\d@$!%*#?&]{8,}$/;

    //     if (password.length === 1 && isBackspacePressed) {
    //         setPassword("");
    //         setErrMsg("");
    //         setEnableContinueBtn(false);
    //         setIsBackspacePressed(false);
    //         return;
    //     }

    //     if (inputPwd === "") {
    //         setErrMsg("");
    //     } else if (inputPwd === " ") {
    //         setErrMsg("Password cannot contain spaces!");
    //         setEnableContinueBtn(false);
    //     } else if (inputPwd.length < 8) {
    //         setErrMsg("Password must be at least 8 characters long.");
    //         setEnableContinueBtn(false);
    //     } else if (!/[A-Za-z]/.test(inputPwd)) {
    //         setErrMsg("Password must contain at least one letter!");
    //         setEnableContinueBtn(false);
    //     } else if (!/[A-Z]/.test(inputPwd)) {
    //         setErrMsg("Password must contain at least one uppercase letter!");
    //         setEnableContinueBtn(false);
    //     } else if (!/[a-z]/.test(inputPwd)) {
    //         setErrMsg("Password must contain at least one lowercase letter!");
    //         setEnableContinueBtn(false);
    //     } else if (!/\d/.test(inputPwd)) {
    //         setErrMsg("Password must contain at least one number!");
    //         setEnableContinueBtn(false);
    //     } else if (!/[@$!%*#?&]/.test(inputPwd)) {
    //         setErrMsg("Password must contain at least one special character!");
    //         setEnableContinueBtn(false);
    //     } else if (pwdRegex.test(inputPwd)) {
    //         setErrMsg("");
    //         setEnableContinueBtn(true);
    //     }

    //     setPassword(inputPwd);
    // };

    const handleContinue = () => {
        if (emailInputDiv && enableContinueBtn) {
            // setpwdInputDiv(true);
            // validateAndSetPwd();
            setemailInputDiv(false);
            setEmailModalContainer(false);
            setRenderForgotPwdModal(true);
            // } else if (pwdInputDiv && renderForgotPwdModal) {
            //     // login user
            //     setRenderForgotPwdModal(false);
            //     setCreateNewWorkspace(true);
        } else if (renderForgotPwdModal && enableContinueBtn) {
            setCreateNewWorkspace(true);
            setemailInputDiv(false);
            setEmailModalContainer(false);
            setRenderForgotPwdModal(false);
            setCreateNewWorkspace(true);
        }
        // else if (renderForgotPwdModal) {
        //     setRenderForgotPwdModal(false);
        //     // setpwdInputDiv(false);
        //     setemailInputDiv(false);
        //     setCreateNewWorkspace(true);
        // }
    };

    const handleKeyPress = (e) => {
        console.log(" sheshant mkdmskdj");
        console.log(e.key);
        // console.log("Key pressed");
        // if (e.key === "Enter") {
        //     handleContinue();
        //     // } else if (e.key === "Escape" && pwdInputDiv) {
        //     //     handlePwdBackBtn();
        // } else if (e.key === "Escape") {
        //     if (emailInputDiv) {
        //         closeLoginModal();
        //     } else if (renderForgotPwdModal) {
        //         console.log("Escape pressed");
        //         setRenderForgotPwdModal(false);
        //         setemailInputDiv(true);
        //     }
        // } else if (e.key === "Backspace") {
        //     setIsBackspacePressed(true);
        if (e.key === "Enter" && emailInputDiv && enableContinueBtn) {
            // setpwdInputDiv(true);
            setemailInputDiv(false);
            setEmailModalContainer(false);
            setRenderForgotPwdModal(true);
            // } else if (pwdInputDiv && renderForgotPwdModal) {
            //     // login user
            //     setRenderForgotPwdModal(false);
            //     setCreateNewWorkspace(true);
        } else if (
            e.key === "Enter" &&
            renderForgotPwdModal &&
            enableContinueBtn
        ) {
            setCreateNewWorkspace(true);
            setemailInputDiv(false);
            setEmailModalContainer(false);
            setRenderForgotPwdModal(false);
            setCreateNewWorkspace(true);
        } else if (e.key === "Escape" && createNewWorkspace) {
            setCreateNewWorkspace(false);
        }
        // }
    };

    // const handlePwdBackBtn = () => {
    //     if (pwdInputDiv) {
    //         const emailRegex =
    //             /^[^\s@]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(com|org|net|edu|gov|mil|int|info|biz|name|xyz|online|store|app|tech|io|us|uk|ca|au|de|fr|in|cn|jp|ru|br|za|mx|it|es|nz|[a-z]{2,63})$/i;
    //         setpwdInputDiv(false);
    //         setemailInputDiv(true);
    //         if (emailRegex.test(email)) {
    //             setEnableContinueBtn(true);
    //         } else {
    //             setEnableContinueBtn(false);
    //         }
    //     } else if (emailInputDiv) {
    //         closeLoginModal();
    //     }
    // };

    const handleVerificationInput = (e, index) => {
        const { value } = e.target;
        const newCode = [...verificationCode];

        // Check if the entered value is a number
        if (isNaN(value) || value === " ") {
            setErrMsg("Only numbers are allowed");
            return;
        } else {
            setErrMsg(""); // Clear the error message if the input is valid
        }

        // Update the code
        newCode[index] = value;
        setVerificationCode(newCode);

        // Check if the code is complete
        setIsVerificationCodeComplete(
            newCode.every((digit) => digit !== null && digit !== "")
        );

        // Move to the next input if the value is valid and it's not the last box
        if (value && index < 5) {
            const nextInput = verificationCodeInputRefs.current[index + 1];
            if (nextInput) {
                nextInput.focus(); // Only call focus if the next input exists
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

    return (
        <div onClick={closeLoginModal} className={style.backdropContainer}>
            {emailModalContainer && (
                <div
                    onKeyDown={handleKeyPress}
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

                    {/* {pwdInputDiv && (
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
                    )} */}

                    <div className={style.actionBtns}>
                        <button
                            // onClick={handlePwdBackBtn}
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
                        </button>
                        <p className={style.errMsg}>{errMsg}</p>
                    </div>
                    {/* <p
                        onClick={() => {
                            setRenderForgotPwdModal(true);
                            setpwdInputDiv(false);
                        }}
                        className={style.forgotPwd}
                    >
                        {pwdInputDiv && "forgot password?"}
                    </p> */}
                </div>
            )}
            {renderForgotPwdModal && (
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
                        <button
                            onClick={() => {
                                setRenderForgotPwdModal(false);
                                setemailInputDiv(true);
                            }}
                            className={style.backBtn}
                        >
                            Back
                        </button>
                        <button
                            onClick={handleContinue}
                            className={
                                isVerificationCodeComplete
                                    ? style.continueBtn
                                    : style.continueBtnDisabled
                            }
                        >
                            Continue
                        </button>
                        <p className={style.errMsg}>Error Msg here: {errMsg}</p>
                    </div>
                </div>
            )}
            {createNewWorkspace && (
                <div
                    onKeyDown={handleKeyPress}
                    onClick={(e) => e.stopPropagation()}
                    className={style.createNewWorkspaceModalContainer}
                >
                    <div className={style.title}>
                        <h1> Create Workspace</h1>
                        <div className={style.progressBar}></div>
                    </div>
                    <p className={style.getName}>
                        Could you please tell me your name?
                    </p>
                </div>
            )}
        </div>
    );
};

export default LoginModal;
