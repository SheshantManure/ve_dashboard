import React, { useState, useEffect, useRef } from "react";
import style from "./welcomePage.module.scss";
import Navbar from "../../components/Navbar/Navbar";
import VeLogo from "../../components/VeLogo/VeLogo";
import Cards from "./cards";
import RefreshLogo from "../../../assets/svgs/welcomePageLogos/refreshLogo";
import StarLogo from "../../../assets/svgs/welcomePageLogos/starLogo";
import MicrophoneLogo from "../../../assets/svgs/welcomePageLogos/microphoneLogo";
import RightArrowLogo from "../../../assets/svgs/welcomePageLogos/rightArrowLogo";
import SignupSidebar from "../../components/signupSidebar/signupSidebar";
import LoginModal from "../../components/loginModal/loginModal";
import Hamburger from "../../../assets/svgs/mobileViewIcons/hamburger";

const WelcomePage = () => {
  const [toggleSignupSidebar, setToggleSignupSidebar] = useState(false);
  const [loginModalToggle, setloginModalToggle] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 500);

  const promptInputRef = useRef(null);

  // Function to handle window resize
  const handleResize = () => {
    setIsLargeScreen(window.innerWidth >= 500);
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "l") {
      setloginModalToggle(true);
    }
  };

  useEffect(() => {
    promptInputRef.current.focus();
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className={style.container}>
      {toggleSignupSidebar && (
        <SignupSidebar
          closeSignupSidebar={() => setToggleSignupSidebar(false)}
          openLoginModal={() => setloginModalToggle(true)}
        />
      )}
      {loginModalToggle && (
        <LoginModal closeLoginModal={() => setloginModalToggle(false)} />
      )}

      <div className={style.veLogoStyles}>
        <VeLogo />
        {!isLargeScreen && (
          <div className={style.hamburger}>
            <Hamburger openSignupSidebar={() => setToggleSignupSidebar(true)} />
          </div>
        )}
      </div>
      {isLargeScreen ? (
        <Navbar
          openSignupSidebar={() => setToggleSignupSidebar(true)}
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
            <h1>
              Welcome to <VeLogo />
            </h1>
            <h2>AI that minds your business</h2>
            <h3>
              So you can run the world. The all-in-one tool for those who do it
              all.
            </h3>
          </div>
          <h4 className={style.gettingStarted}>
            Let’s get started with any of these actions!
          </h4>
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
                    ref={promptInputRef}
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
      </div>
    </div>
  );
};

export default WelcomePage;
