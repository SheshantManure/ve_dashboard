import React, { useState } from "react";
import style from "./welcomePage.module.scss";
import ProposalLogo from "../../../assets/svgs/welcomePageLogos/proposalLogo";
import LinkInBioLogo from "../../../assets/svgs/welcomePageLogos/linkInBioLogo";
import InvoiceLogo from "../../../assets/svgs/welcomePageLogos/invoiceLogo";
import WorkflowsLogo from "../../../assets/svgs/welcomePageLogos/workflowsLogo";

const cards = [
  {
    description:
      "New proposal submission tool that showcases your data Clearly and Effectively",
    title: "Send Proposals",
    logo: "ProposalLogo",
  },
  {
    description:
      "Make it easier for your audience to connect with all your essential content through",
    title: "Link in Bio",
    logo: "LinkInBioLogo",
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
    title: "Automate Workflows",
    logo: "WorkflowsLogo",
  },
];

const Cards = () => {
  // Create a hover state for each card (using index)
  const [hoveredCard, setHoveredCard] = useState(null);

  const renderLogo = (logoName) => {
    switch (logoName) {
      case "ProposalLogo":
        return <ProposalLogo />;
      case "LinkInBioLogo":
        return <LinkInBioLogo />;
      case "InvoiceLogo":
        return <InvoiceLogo />;
      case "WorkflowsLogo":
        return <WorkflowsLogo />;
      default:
        return null;
    }
  };

  return (
    <div className={style.cardsContainer}>
      {cards.map((card, index) => (
        <div
          key={index}
          className={style.card}
          onMouseEnter={() => setHoveredCard(index)} // Set hovered card index
          onMouseLeave={() => setHoveredCard(null)} // Reset on mouse leave
        >
          {hoveredCard === index && ( // Render only for the hovered card
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
          )}
          <p className={style.description}>{card.description}</p>
          <nav>
            <div className={style.logo}>{renderLogo(card.logo)}</div>
            <h3>{card.title}</h3>
          </nav>
        </div>
      ))}
    </div>
  );
};

export default Cards;
