import React from "react";
import style from "./privacyPolicy.module.scss";

const PrivacyPolicy = () => {
    return (
        <div className={style.container}>
            <h1>Privacy Policy</h1>

            <p>
                This Privacy Policy describes how <strong>Ve.ai</strong> (“
                <strong>Ve.ai</strong>,” “we,” “us,” or “our”) handles personal
                information that we collect through our website and mobile
                applications (together with the website, the “Services”). The
                Services are designed to help our customers manage their
                businesses (“Businesses”).
            </p>

            <p className={style.italic}>
                We reserve the right to modify this Privacy Policy at any time.
                If we make material changes to this Privacy Policy, we will
                notify you by updating the date of this Privacy Policy and
                posting it on our website and/or other Services.
            </p>

            <h2>Personal Information We Collect</h2>
            <p>
                Information you provide to us. Personal information you may
                provide to us through the Services includes:
            </p>

            <ul>
                <li>
                    <strong>Identification information:</strong> including your
                    name, email address, phone number, company name, date of
                    birth, signature, and photos of your driver’s license and/or
                    passport.
                </li>
                <li>
                    <strong>Communications:</strong> When you contact us with
                    questions, feedback, respond to one of our surveys, or
                    otherwise communicate with us, we may collect the
                    information in such communications.
                </li>
                <li>
                    <strong>Payment and transactional information:</strong> We
                    collect information needed to process your orders or
                    transmit direct deposits to you, including tax ID/Employer
                    Identification Number (“EIN”), last four digits of your
                    Social Security Number (“SSN”), payment card information,
                    bank account number and related information, billing
                    information, legal business name, doing business as name,
                    business address, personal address, date of birth, job
                    title, and transaction history.
                </li>
            </ul>

            <div className={style.separator}></div>

            <p className={style.note}>
                This is just the first part of the Privacy Policy. More sections
                will follow as we proceed.
            </p>
        </div>
    );
};

export default PrivacyPolicy;
