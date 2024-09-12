import React, { useState } from "react";
import style from "./WelcomePage.module.scss";
import Navbar from "../../components/Navbar/Navbar";
import VeLogo from "../../components/VeLogo/VeLogo";
import Cards from "./cards";
import RefreshLogo from "../../../assets/svgs/welcomePageLogos/refreshLogo";
import StarLogo from "../../../assets/svgs/welcomePageLogos/starLogo";
import MicrophoneLogo from "../../../assets/svgs/welcomePageLogos/microphoneLogo";
import RightArrowLogo from "../../../assets/svgs/welcomePageLogos/rightArrowLogo";
import SignupSidebar from "../../components/signupSidebar/signupSidebar";
import LoginModal from "../../components/loginModal/loginModal";

const WelcomePage = () => {
    const [toggleSignupSidebar, setToggleSignupSidebar] = useState(false);
    const [loginModalToggle, setloginModalToggle] = useState(false);
    return (
        <div className={style.container}>
            {toggleSignupSidebar && (
                <SignupSidebar
                    closeSignupSidebar={() => setToggleSignupSidebar(false)}
                />
            )}
            {loginModalToggle && (
                <LoginModal
                    closeLoginModal={() => setloginModalToggle(false)}
                />
            )}

            <div className={style.veLogoStyles}>
                <VeLogo />
            </div>
            <Navbar
                openSignupSidebar={() => setToggleSignupSidebar(true)}
                openLoginModal={() => setloginModalToggle(true)}
            />
            <div className={style.title}>
                <h1>
                    Welcome to <VeLogo />
                </h1>
                <h2>AI that minds your business</h2>
                <h3>
                    So you can run the world. The all-in-one tool for those who
                    do it all.
                </h3>
            </div>
            <h4 className={style.gettingStarted}>Let’s Get Started!</h4>
            <Cards />
            <div className={style.refreshPrompts}>
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
                                name="prompt"
                                placeholder="Hey, give me million dollar service business idea!"
                            ></textarea>
                        </div>
                        <div className={style.promptActions}>
                            <MicrophoneLogo />
                            <RightArrowLogo className={style.rightArrowLogo} />
                        </div>
                    </div>
                    <p className={style.tagLine}>
                        Built by Professionals for Professionals
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
