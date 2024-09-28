import React from "react";
import style from "../../../views/pages/landing_page/index.module.scss";

const CardContainer = () => {
    return (
        <svg
            className={style.gradient}
            xmlns="http://www.w3.org/2000/svg"
            width="247"
            height="168"
            viewBox="0 0 247 168"
            fill="none"
        >
            <g clipPath="url(#clip0_1141_10932)">
                <g opacity="0.48" filter="url(#filter0_f_1141_10932)">
                    <circle
                        cx="-8.5"
                        cy="-46.5"
                        r="61.5"
                        fill="url(#paint0_linear_1141_10932)"
                    />
                </g>
            </g>
            <defs>
                <filter
                    id="filter0_f_1141_10932"
                    x="-139"
                    y="-177"
                    width="261"
                    height="261"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation="34.5"
                        result="effect1_foregroundBlur_1141_10932"
                    />
                </filter>
                <linearGradient
                    id="paint0_linear_1141_10932"
                    x1="-8.5"
                    y1="-108"
                    x2="-8.5"
                    y2="15"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#BD9DFF" />
                    <stop offset="1" stopColor="#6055EC" />
                </linearGradient>
                <clipPath id="clip0_1141_10932">
                    <rect width="247" height="168" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default CardContainer;
