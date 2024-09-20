import React, { useState, useEffect, useRef } from "react";
import style from "./welcomePage.module.scss";
import Navbar from "../../components/Navbar/Navbar";
import VeLogo from "../../components/VeLogo/VeLogo";
import Cards from "./cards";
import RefreshLogo from "../../../assets/svgs/welcomePageLogos/refreshLogo";
import StarLogo from "../../../assets/svgs/welcomePageLogos/starLogo";
import MicrophoneLogo from "../../../assets/svgs/welcomePageLogos/microphoneLogo";
import RightArrowLogo from "../../../assets/svgs/welcomePageLogos/rightArrowLogo";
import SignupModal from "../../components/signupModal/signupModal";
import LoginModal from "../../components/loginModal/loginModal";
import Hamburger from "../../../assets/svgs/mobileViewIcons/hamburger";
import { gsap } from "gsap";
import MobielNavSidebar from "../../components/Navbar/mobielNavSidebar";

const WelcomePage = () => {
    const [toggleSignupModal, setToggleSignupModal] = useState(false);
    const [loginModalToggle, setloginModalToggle] = useState(false);
    const [showMobielNavSidebar, setShowMobielNavSidebar] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(
        window.innerWidth >= 500
    );

    const promptInputRef = useRef(null);
    const handleResize = () => {
        setIsLargeScreen(window.innerWidth >= 500);
    };
    const h1Ref = useRef(null);
    const h2Ref = useRef(null);
    const h3Ref = useRef(null);
    const h4Ref = useRef(null);
    const cardsRef = useRef(null);
    const refreshPromptsRef = useRef(null);
    const veLogoRef = useRef(null);

    const handleKeyPress = (e) => {
        if (e.ctrlKey && e.key.toLowerCase() === "l") {
            setloginModalToggle(true);
        } else if (e.ctrlKey && e.key.toLowerCase() === "s") {
            setToggleSignupModal(true);
        }
    };

    useEffect(() => {
        promptInputRef.current.focus();
        window.addEventListener("resize", handleResize);
        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.addEventListener("keydown", handleKeyPress);
        };
    }, []);

    useEffect(() => {
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
                refreshPromptsRef.current,
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
            .to(veLogoRef.current, { scale: 0.5, duration: 0.6, ease: "none" })
            .to(veLogoRef.current, {
                scale: 1,
                duration: 0.6,
                ease: "slow(0.7, 0.7, false)",
            });
    }, []);

    return (
        <div className={style.container}>
            {toggleSignupModal && (
                <SignupModal
                    closeSignupModal={() => setToggleSignupModal(false)}
                    openLoginModal={() => setloginModalToggle(true)}
                />
            )}
            {loginModalToggle && (
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
            )}

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
                    openSignupModal={() => setToggleSignupModal(true)}
                    openLoginModal={() => setloginModalToggle(true)}
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
                    <div
                        ref={refreshPromptsRef}
                        className={style.refreshPrompts}
                    >
                        <RefreshLogo />
                        <h4>Refresh Prompts</h4>
                    </div>
                    <div className={style.promptContainer}>
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
        </div>
    );
};

export default WelcomePage;
