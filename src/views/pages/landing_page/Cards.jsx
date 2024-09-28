import React, { useState, useRef, memo } from "react";
import style from "./index.module.scss";
import { ReactComponent as AiSalesLogo } from "../../../assets/svg/landing_page/AiSalesLogo.svg";
import { ReactComponent as AiLinkInBioLogo } from "../../../assets/svg/landing_page/AiLinkInBioLogo.svg";
import { ReactComponent as InvoiceLogo } from "../../../assets/svg/landing_page/InvoiceLogo.svg";
import { ReactComponent as AiClientFilesLogo } from "../../../assets/svg/landing_page/AiClientFilesLogo.svg";
import { gsap } from "gsap";
import CardContainer from "../../../assets/svg/landing_page/CardContainer.jsx";

const cards = [
    {
        description:
            "Transform the way you engage with leads by leveraging AI-driven smart files that help you close deals faster and smarter. Click to discover how AI Sales Assistance can revolutionize your business.",
        title: "AI Sales Assistance",
        logo: "AiSalesLogo",
    },
    {
        description:
            "Make it easier for your audience to connect with all your essential content through",
        title: "AI Link in Bio",
        logo: "AiLinkInBioLogo",
    },
    {
        description:
            "Simplifying your billing process. Create and share professional, detailed invoices in seconds",
        title: "Send Invoices",
        logo: "InvoiceLogo",
    },
    {
        description:
            "From task management to client follow-ups, automate routine actions and focus on what truly matters",
        title: "AI Client Files",
        logo: "AiClientFilesLogo",
    },
];

const Cards = ({ cardsRef }) => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const cardRefs = useRef([]);

    const logosObject = {
        AiSalesLogo: <AiSalesLogo />,
        AiLinkInBioLogo: <AiLinkInBioLogo />,
        InvoiceLogo: <InvoiceLogo />,
        AiClientFilesLogo: <AiClientFilesLogo />,
    };

    const handleMouseEnter = (index) => {
        gsap.to(cardRefs.current[index], {
            background:
                "linear-gradient(129deg, #121315 27.84%, #202328 131.68%)",
            duration: 0.6,
            ease: "slow(0.7, 0.7, false)",
        });
    };

    const handleMouseLeave = (index) => {
        gsap.to(cardRefs.current[index], {
            background: "linear-gradient(0deg, #121315, #121315)",
            duration: 0.6,
            ease: "slow(0.7, 0.7, false)",
        });
    };

    return (
        <div ref={cardsRef} className={style.cardsContainer}>
            {cards.map((card, index) => (
                <div
                    ref={(el) => (cardRefs.current[index] = el)}
                    key={index}
                    className={style.card}
                    onMouseEnter={() => {
                        setHoveredCard(index);
                        handleMouseEnter(index);
                    }}
                    onMouseLeave={() => {
                        setHoveredCard(null);
                        handleMouseLeave(index);
                    }}
                >
                    {hoveredCard === index && <CardContainer />}
                    <p className={style.description}>{card.description}</p>
                    <nav>
                        <div className={style.logo}>
                            {logosObject[card.logo]}
                        </div>
                        <h3>{card.title}</h3>
                    </nav>
                </div>
            ))}
        </div>
    );
};

export default memo(Cards);
