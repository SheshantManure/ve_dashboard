import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import style from "./index.module.scss";
import Navbar from "../../components/navbar";
import VeLogo from "../../components/ve_logo/VeLogo";
import Cards from "./Cards";
// import RefreshLogo from "../../../assets/svgs/welcomePageLogos/refreshLogo";
import { ReactComponent as StarLogo } from "../../../assets/svg/landing_page/StarLogo.svg";
import { ReactComponent as MicrophoneLogo } from "../../../assets/svg/landing_page/MicrophoneLogo.svg";
import { ReactComponent as RightArrowLogo } from "../../../assets/svg/landing_page/RightArrowLogo.svg";
import PrivacyAndTermsModal from "../../components/privacy_and_terms_modal";
// import SignupModal from "../../components/signup_ modal";
// import LoginModal from "../../components/login_modal";
import MobielNavSidebar from "../../components/navbar/MobielNavSidebar";
import ReactModal from "../../components/react_modal";
import Hamburger from "../../../assets/svg/mobile_view_icons/Hamburger";
import { gsap } from "gsap";

const LandingPage = () => {
    // const [toggleSignupModal, setToggleSignupModal] = useState(false);
    // const [toggleLoginModal, setloginModalToggle] = useState(false);
    const [showMobielNavSidebar, setShowMobielNavSidebar] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(
        window.innerWidth >= 500
    );
    const [togglePrivacyAndTermsModal, setTogglePrivacyAndTermsModal] =
        useState(false);

    const h1Ref = useRef(null);
    const h2Ref = useRef(null);
    const h3Ref = useRef(null);
    const h4Ref = useRef(null);
    const cardsRef = useRef(null);
    // const refreshPromptsRef = useRef(null);
    const veLogoRef = useRef(null);
    const promptInputRef = useRef(null);
    const promptContainerRef = useRef(null);

    const handleEvents = useCallback(() => {
        window.addEventListener("resize", handleResize);
        // window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("resize", handleResize);
            // window.addEventListener("keydown", handleKeyPress);
        };
    }, []);

    const handleAnimations = useCallback(() => {
        const tl = gsap.timeline();
        tl.fromTo(
            h1Ref.current,
            { y: "100%", opacity: 0 },
            {
                y: "0%",
                opacity: 1,
                duration: 0.6,
                ease: "slow(0.7, 0.7, false)",
            }
        )
            .fromTo(
                [h2Ref.current, h3Ref.current],
                { y: "100%", opacity: 0 },
                {
                    y: "0%",
                    opacity: 1,
                    duration: 0.6,
                    ease: "slow(0.7, 0.7, false)",
                },
                "-=0.3"
            )
            .fromTo(
                h4Ref.current,
                { y: "100%", opacity: 0 },
                {
                    y: "0%",
                    opacity: 1,
                    duration: 0.6,
                    ease: "slow(0.7, 0.7, false)",
                },
                "-=0.3"
            )
            .fromTo(
                cardsRef.current,
                { y: "100%", opacity: 0 },
                {
                    y: "0%",
                    opacity: 1,
                    duration: 0.6,
                    ease: "slow(0.7, 0.7, false)",
                },
                "-=0.3"
            )
            .fromTo(
                promptContainerRef.current,
                { y: "100%", opacity: 0 },
                {
                    y: "0%",
                    opacity: 1,
                    duration: 0.6,
                    ease: "slow(0.7, 0.7, false)",
                },
                "-=0.3"
            )
            .to(veLogoRef.current, {
                scale: 0.5,
                duration: 0.6,
                ease: "slow(0.7, 0.7, false)",
            })
            .to(veLogoRef.current, {
                scale: 0.5,
                duration: 0.6,
                ease: "none",
            })
            .to(veLogoRef.current, {
                scale: 1,
                duration: 0.6,
                ease: "slow(0.7, 0.7, false)",
            });
    }, []);

    const handleResize = () => {
        setIsLargeScreen(window.innerWidth >= 500);
    };

    const handleClosePrivacyAndTermsModal = () => {
        setTogglePrivacyAndTermsModal(false);
    };

    const handleCloseMobileNavSidebar = () => {
        setShowMobielNavSidebar(false);
    };

    const focusInput = useCallback(() => {
        if (isLargeScreen) {
            promptInputRef.current.focus();
        }
    }, [isLargeScreen]);

    useEffect(() => {
        handleResize();
        focusInput();
    }, [isLargeScreen, focusInput]);

    useEffect(() => {
        handleEvents();
        handleAnimations();
    }, [handleEvents, handleAnimations]);

    // const handleKeyPress = (e) => {
    //     if (e.ctrlKey && e.key.toLowerCase() === "l") {
    //         setloginModalToggle(true);
    //     } else if (e.ctrlKey && e.key.toLowerCase() === "s") {
    //         setToggleSignupModal(true);
    //     }
    // };

    return (
        <div className={style.container}>
            <div className={style.veLogoStyles}>
                <VeLogo veLogoRef={veLogoRef} />
                {!isLargeScreen && (
                    <div className={style.hamburger}>
                        <Hamburger
                            openMobileNavSidebar={() =>
                                setShowMobielNavSidebar(true)
                            }
                        />
                    </div>
                )}
            </div>
            {isLargeScreen ? (
                <Navbar
                    openPrivacyAndTermsModal={() =>
                        setTogglePrivacyAndTermsModal(true)
                    }
                    // openSignupModal={() => setToggleSignupModal(true)}
                    // openLoginModal={() => setloginModalToggle(true)}
                />
            ) : (
                // <div className={style.hamburger}>
                //     <Hamburger />
                // </div>
                <></>
            )}
            <div className={style.mainContent}>
                <div className={style.mainBox}>
                    <div className={style.title}>
                        <h1 ref={h1Ref}>
                            Welcome to <VeLogo />
                        </h1>
                        <h2 ref={h2Ref}>AI that minds your business</h2>
                        <h3 ref={h3Ref}>
                            So you can run the world. The all-in-one tool for
                            those who do it all.
                        </h3>
                    </div>
                    <h4 ref={h4Ref} className={style.gettingStarted}>
                        Let’s get started with any of these actions!
                    </h4>
                    <Cards cardsRef={cardsRef} />
                    {/* <div
                        ref={refreshPromptsRef}
                        className={style.refreshPrompts}
                    >
                        <RefreshLogo />
                        <h4>Refresh Prompts</h4>
                    </div> */}
                    <div
                        ref={promptContainerRef}
                        className={style.promptContainer}
                    >
                        <div className={style.box550px}>
                            <p className={style.heading}>
                                Or Ask me anything about your business
                            </p>
                            <div className={style.promptInputDiv}>
                                <div className={style.promptTextArea}>
                                    <StarLogo />
                                    <textarea
                                        ref={promptInputRef}
                                        name="prompt"
                                        placeholder="Hey, give me million dollar service business idea!"
                                    ></textarea>
                                </div>
                                <div className={style.promptActions}>
                                    <MicrophoneLogo />
                                    <RightArrowLogo
                                        className={style.rightArrowLogo}
                                    />
                                </div>
                            </div>
                            <p className={style.tagLine}>
                                Built by Professionals for Professionals
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ReactModal
                isOpen={togglePrivacyAndTermsModal}
                closeModal={handleClosePrivacyAndTermsModal}
                modalType="privacyAndTerms"
            >
                <PrivacyAndTermsModal
                    closePrivacyAndTermsModal={handleClosePrivacyAndTermsModal}
                />
            </ReactModal>
            {/* {togglePrivacyAndTermsModal && (
                <PrivacyAndTermsModal
                    closePrivacyAndTermsModal={handleClosePrivacyAndTermsModal}
                />
            )} */}
            <ReactModal
                isOpen={showMobielNavSidebar}
                closeModal={handleCloseMobileNavSidebar}
                modalType="mobileNavSidebar"
            >
                <MobielNavSidebar
                    closeMobileNavSidebar={() => setShowMobielNavSidebar(false)}
                    // openLoginModal={() => setloginModalToggle(true)}
                    // openSignupModal={() => setToggleSignupModal(true)}
                />
            </ReactModal>
            {/* <ReactModal isOpen={togglePrivacyAndTermsModal} modalType="">
                <PrivacyAndTermsModal
                    closePrivacyAndTermsModal={handleClosePrivacyAndTermsModal}
                />
            </ReactModal> */}
            {/* {toggleSignupModal && (
                <SignupModal
                    closeSignupModal={() => setToggleSignupModal(false)}
                    openLoginModal={() => setloginModalToggle(true)}
                />
            )}
            {toggleLoginModal && (
                <LoginModal
                    closeLoginModal={() => setloginModalToggle(false)}
                />
            )}
            {showMobielNavSidebar && (
                <MobielNavSidebar
                    closeMobileNavSidebar={() => setShowMobielNavSidebar(false)}
                    openLoginModal={() => setloginModalToggle(true)}
                    openSignupModal={() => setToggleSignupModal(true)}
                />
            )} */}
        </div>
    );
};

export default memo(LandingPage);
