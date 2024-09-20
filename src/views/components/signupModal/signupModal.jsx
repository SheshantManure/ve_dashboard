import React, { useState, useEffect, useRef } from "react";
import style from "./signupModal.module.scss";
import GoogleLogo from "../../../assets/svgs/signupModal/googleLogo";
import VeLogoForSignup from "../../../assets/svgs/signupModal/veLogoForSignup";
import LeftArrowInactive from "../../../assets/svgs/createNewWorkspace/leftArrowInactive";
import RightArrowActive from "../../../assets/svgs/createNewWorkspace/rightArrowActive";
import UploadLogo from "../../../assets/svgs/createNewWorkspace/uploadLogo";
import PlusIcon from "../../../assets/svgs/createNewWorkspace/plusIcon";

const SignupModal = ({ openLoginModal, closeSignupModal }) => {
    const [verificationCodeModalContainer, setVerificationCodeModalContainer] =
        useState(false);
    const [createWorkspaceModalContainer, setCreateWorkspaceModalContainer] =
        useState(false);
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
    const verificationCodeInputRefs = useRef([]);
    const [emailModalContainer, setEmailModalContainer] = useState(true);

    const [emailInputDiv, setEmailInputDiv] = useState(true);
    const [fullnameInputDiv, setFullnameInputDiv] = useState(false);
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [bizUrl, setBizUrl] = useState("");
    const [bizName, setBizName] = useState("");
    const [bizType, setBizType] = useState("");
    const [bizDomain, setBizDomain] = useState("");
    const [selectedLogo, setSelectedLogo] = useState(null);

    const [errMsg, setErrMsg] = useState("");
    const [nameErrMsg, setNameErrMsg] = useState("");
    const [bizUrlErrMsg, setBizUrlErrMsg] = useState("");
    const [bizNameErrMsg, setBizNameErrMsg] = useState("");
    const [bizDomainErrMsg, setBizDomainErrMsg] = useState("");

    const emailInputRef = useRef(null);
    const fullnameInputRef = useRef(null);
    const bizUrlInputRef = useRef(null);
    const bizNameInputRef = useRef(null);
    const bizDomainInputRef = useRef(null);

    const [isBackspacePressed, setIsBackspacePressed] = useState(false);

    const [enableContinueBtn, setEnableContinueBtn] = useState(false);

    const handleOpenLoginModal = () => {
        closeSignupModal();
        openLoginModal();
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

    const handleBack = () => {
        if (verificationCodeModalContainer) {
            setVerificationCodeModalContainer(false);
            validateAndSetEmail();
            setEmailModalContainer(true);
        } else if (emailModalContainer) {
            closeSignupModal();
        }
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

        // if (fullname.length === 1 && isBackspacePressed) {
        //     setFullname("");
        //     setErrMsg("");
        //     setEnableContinueBtn(false);
        //     setIsBackspacePressed(false);
        //     return;
        // }

        const nameParts = inputName.split(/\s+/).filter((part) => part !== "");
        const firstName = nameParts[0];
        const lastName = nameParts[1];
        const nameRegex = /^[A-Za-z]+$/;

        if (inputName === "") {
            setNameErrMsg("");
            setFullname(inputName);
            setEnableContinueBtn(false);
            return;
        }

        if (nameParts.length === 0) {
            setNameErrMsg("Full name cannot be just space(s)!");
            setFullname(inputName);
            setEnableContinueBtn(false);
            return;
        }

        if (!firstName || firstName.length < 2 || !nameRegex.test(firstName)) {
            setNameErrMsg(
                "First name must contain only letters and be at least 2 characters long."
            );
            setFullname(inputName);
            setEnableContinueBtn(false);
            return;
        }

        if (!lastName || lastName.length < 2 || !nameRegex.test(lastName)) {
            setNameErrMsg(
                "Last name must contain only letters and be at least 2 characters long."
            );
            setFullname(inputName);
            setEnableContinueBtn(false);
            return;
        }

        setFullname(nameParts.join(" "));
        setNameErrMsg("");
        setEnableContinueBtn(true);
    };

    const validateAndSetBizUrl = (e) => {
        const url =
            e?.target?.value || bizUrlInputRef?.current?.value || bizUrl || "";
        const urlPattern =
            /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w- ;,./?%&=]*)?$/i;
        const isValidUrl = urlPattern.test(url);

        if (isValidUrl) {
            setBizUrl(url);
            setBizUrlErrMsg("");
        } else {
            setBizUrlErrMsg(
                "Please enter a valid URL starting with http:// or https://"
            );
        }
    };

    const validateAndSetBizName = (e) => {
        const name =
            e?.target?.value?.trim() ||
            bizNameInputRef?.current?.value ||
            bizName ||
            "";
        if (name === "") {
            setBizNameErrMsg("Business name cannot be empty.");
        } else if (name.length < 2) {
            setBizNameErrMsg(
                "Business name must be at least 2 characters long."
            );
        } else {
            setBizNameErrMsg("");
            setBizName(name);
        }
    };

    const validateAndSetBizDomain = (e) => {
        const domain =
            e?.target?.value?.trim() ||
            bizDomainInputRef?.current?.value ||
            bizDomain ||
            "";
        const domainPattern = /^[a-zA-Z0-9-]+$/;

        if (domain === "") {
            setBizDomainErrMsg("Domain name cannot be empty.");
        } else if (!domainPattern.test(domain)) {
            setBizDomainErrMsg(
                "Domain name can only contain letters, numbers, and hyphens."
            );
        } else {
            setBizDomain(domain);
            setBizDomainErrMsg("");
        }
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedLogo(reader.result); // Set the uploaded logo as the preview
            };
            reader.readAsDataURL(file); // Read the file as a Data URL
        }
    };

    useEffect(() => {
        if (verificationCodeModalContainer) {
            verificationCodeInputRefs.current[0].focus();
        }
        if (createWorkspaceModalContainer) {
            fullnameInputRef.current.focus();
        }
    }, [verificationCodeModalContainer, createWorkspaceModalContainer]);

    const handleKeyPress = (e) => {
        if (e.key === "Escape") {
            if (emailInputDiv) {
                closeSignupModal();
            } else if (fullnameInputDiv) {
                setFullnameInputDiv(false);
                setEmailInputDiv(true);
                validateAndSetEmail();
            }
        } else if (e.key === "Enter") {
            if (
                fullnameInputRef.current &&
                fullnameInputRef.current.value.trim() !== "" &&
                nameErrMsg === ""
            ) {
                bizUrlInputRef.current.focus();
            } else if (enableContinueBtn) {
                handleContinue();
            }
        } else if (e.key === "Backspace") {
            setIsBackspacePressed(true);
        }
    };

    const handleContinue = () => {
        if (emailModalContainer && enableContinueBtn) {
            setEmailModalContainer(false);
            setErrMsg("");
            setVerificationCodeModalContainer(true);
        } else if (verificationCodeModalContainer && enableContinueBtn) {
            setVerificationCodeModalContainer(false);
            setCreateWorkspaceModalContainer(true);
        }
    };
    // const handleContinue = () => {
    //     if (emailInputDiv && enableContinueBtn) {
    //         setFullnameInputDiv(true);
    //         setEnableContinueBtn(false);
    //         setEmailInputDiv(false);
    //         validateAndSetFullname();
    //         setErrMsg("");
    //     } else if (fullnameInputDiv && enableContinueBtn) {
    //         setPwdInputDiv(true);
    //         setEnableContinueBtn(false);
    //         setFullnameInputDiv(false);
    //         validateAndSetPwd();
    //         setErrMsg("");
    //     } else if (pwdInputDiv && enableContinueBtn) {
    //         console.log(email, password);
    //     }
    // };

    const renderPreviousStep = () => {
        if (emailInputDiv) {
            closeSignupModal();
        } else if (fullnameInputDiv) {
            setFullnameInputDiv(false);
            setEmailInputDiv(true);
            validateAndSetEmail();
        }
    };

    useEffect(() => {
        if (emailInputDiv && emailInputRef.current) {
            emailInputRef.current.focus();
        } else if (fullnameInputDiv && fullnameInputRef.current) {
            fullnameInputRef.current.focus();
        }
    }, [emailInputDiv, fullnameInputDiv]);

    return (
        <div onClick={closeSignupModal} className={style.backdropContainer}>
            {emailModalContainer && (
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
                    {/* {fullnameInputDiv && (
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
                )} */}
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
                        <p>
                            By signing up to create a new account, you agree to
                            ve's <br />
                            <span> Terms of Use</span> &{" "}
                            <span>Privacy Policy.</span>
                        </p>
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
            {createWorkspaceModalContainer && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={handleKeyPress}
                    className={style.createWorkspaceModalContainer}
                >
                    <div className={style.titleContainer}>
                        <h1 className={style.title}>Create workspace </h1>
                        <div className={style.arrowNavs}>
                            <LeftArrowInactive />
                            <RightArrowActive />
                        </div>
                    </div>
                    <div className={style.progressBar}>
                        <div className={style.currentProgress}></div>
                    </div>
                    <div className={style.nameContainer}>
                        <h1 className={style.name}>
                            Could you please tell me your name?
                        </h1>
                        <input
                            ref={fullnameInputRef}
                            onInput={validateAndSetFullname}
                            className={style.inputName}
                            type="text"
                            placeholder="Type your name here..."
                        />
                        <p className={style.errMsg}>{nameErrMsg}</p>
                    </div>
                    <div className={style.bizUrlContainer}>
                        <h1 className={style.bizUrl}>
                            Could you share the URL to your business website or
                            social media handle?
                        </h1>
                        <input
                            ref={bizUrlInputRef}
                            onInput={validateAndSetBizUrl}
                            className={style.bizUrlInput}
                            type="text"
                            placeholder="https://"
                        />
                        <p className={style.errMsg}>{bizUrlErrMsg}</p>
                    </div>
                    <div className={style.bizNameContainer}>
                        <h1 className={style.bizName}>Business Name</h1>
                        <input
                            ref={bizNameInputRef}
                            onInput={validateAndSetBizName}
                            className={style.bizNameInput}
                            type="text"
                            placeholder="Type your business name here..."
                        />
                        <p className={style.errMsg}>{bizNameErrMsg}</p>
                    </div>
                    <div className={style.bizTypeContainer}>
                        <h1 className={style.bizType}>Select Business Type</h1>
                        <select
                            value={bizType}
                            onChange={(e) => setBizType(e.target.value)}
                            className={style.bizTypeInput}
                        >
                            <option value="">
                                Select your business type...
                            </option>
                            <option value="Makeup Artist">Makeup Artist</option>
                            <option value="Consultant">Consultant</option>
                            <option value="Salon & Spa">Salon & Spa</option>
                            <option value="Architect">Architect</option>
                            <option value="Photography">Photography</option>
                            <option value="Fashion Designer">
                                Fashion Designer
                            </option>
                            <option value="Event Management">
                                Event Management
                            </option>
                            <option value="Interior Designer">
                                Interior Designer
                            </option>
                            <option value="Business Coach">
                                Business Coach
                            </option>
                            <option value="Restaurateur">Restaurateur</option>
                        </select>
                    </div>
                    <div className={style.bizDomainContainer}>
                        <h1 className={style.bizDomain}>
                            Choose a subdomain name
                        </h1>
                        <div className={style.bizDomainInputDiv}>
                            <input
                                ref={bizDomainInputRef}
                                onInput={validateAndSetBizDomain}
                                className={style.bizDomainInput}
                                type="text"
                                placeholder="company name"
                            />
                            <span className={style.domainExtension}>
                                .ve.ai
                            </span>
                        </div>
                        <p className={style.errMsg}>{bizDomainErrMsg}</p>
                    </div>
                    <div className={style.brandLogoAndColorContainer}>
                        <div className={style.logoContainer}>
                            <h1 className={style.yourLogo}>Your Logo</h1>
                            <div className={style.uploadLogoDiv}>
                                <label
                                    htmlFor="fileUpload"
                                    className={style.uploadLabel}
                                >
                                    <UploadLogo />
                                    Select file to upload
                                </label>

                                <input
                                    id="fileUpload"
                                    type="file"
                                    accept="image/*" // Accept only image files
                                    onChange={handleLogoUpload} // Handle file selection
                                    className={style.logoUploadInput}
                                />
                                <div
                                    style={{ zIndex: selectedLogo ? 1 : -1 }}
                                    className={style.imgPreview}
                                >
                                    {selectedLogo && (
                                        <img
                                            src={selectedLogo}
                                            alt="Logo Preview"
                                            width={"100%"}
                                            className={style.logoPreview}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={style.colorContainer}>
                            <h1 className={style.addBrandColors}>
                                Add Brand Colors
                            </h1>
                            <div className={style.ColorPaletteContainer}>
                                <PlusIcon className={style.plusIcon} />
                            </div>
                        </div>
                    </div>
                    <div className={style.createWorkspaceBtnDiv}>
                        <button className={style.createWorkspaceBtn}>
                            Create Workspace
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignupModal;
