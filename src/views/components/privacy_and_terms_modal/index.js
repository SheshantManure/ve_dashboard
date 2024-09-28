import React from "react";
import style from "./index.module.scss";
import CrossIcon from "../../../assets/svgs/privacy_and_terms/CrossIcon";
import DownloadIcon from "../../../assets/svgs/privacy_and_terms/DownloadIcon";

const PrivacyAndTermsModal = ({ closePrivacyAndTermsModal }) => {
    return (
        <div
            onClick={closePrivacyAndTermsModal}
            className={style.backdropContainer}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={style.PrivacyAndTermsModalContainer}
            >
                <div
                    onClick={closePrivacyAndTermsModal}
                    className={style.closeIconContainer}
                >
                    <CrossIcon />
                </div>
                <h1 className={style.heading}>
                    Your Data Privacy and Security
                </h1>
                <ul>
                    <li>
                        <span>Privacy Policy</span> <DownloadIcon />
                    </li>
                    <li>
                        <span>AI Terms & Conditions</span> <DownloadIcon />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PrivacyAndTermsModal;
