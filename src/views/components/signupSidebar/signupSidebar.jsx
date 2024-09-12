import React from "react";
import style from "./signupSidebar.module.scss";
import CloseSignupSidebarBtn from "./closeSignupSidebarBtn";
import VeLogo from "../VeLogo/VeLogo";
import GoogleLogo from "../../../assets/svgs/signupSidebar/googleLogo";

const SignupSidebar = ({ closeSignupSidebar }) => {
    return (
        <div onClick={closeSignupSidebar} className={style.backdropContainer}>
            <div
                className={style.container}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={style.contentDiv}>
                    <div className={style.closeBtnContainer}>
                        <div
                            onClick={closeSignupSidebar}
                            className={style.closeBtn}
                        >
                            <CloseSignupSidebarBtn />
                        </div>
                    </div>
                    <div className={style.logoContainer}>
                        <VeLogo />
                        <p>Signup to create workspace</p>
                    </div>
                    <button className={style.googleContainer}>
                        <GoogleLogo />
                        <p>Continue with Google</p>
                    </button>
                    <p className={style.or}>or</p>
                    <div className={style.email}>
                        <input type="email" placeholder="work@email.com" />
                    </div>
                    <button className={style.continueWithEmail}>
                        <p>Continue with Email</p>
                    </button>
                </div>
                <p className={style.login}>
                    Already have an account? <span>Login</span>
                </p>
            </div>
        </div>
    );
};

export default SignupSidebar;
