import React from "react";
import style from "./WelcomePage.module.scss";

// Import your SVG components
import ProposalLogo from "../../../assets/svgs/welcomePageLogos/proposalLogo";
import LinkInBioLogo from "../../../assets/svgs/welcomePageLogos/linkInBioLogo";
import InvoiceLogo from "../../../assets/svgs/welcomePageLogos/invoiceLogo";
import WorkflowsLogo from "../../../assets/svgs/welcomePageLogos/workflowsLogo";

const cards = [
    {
        description:
            "New proposal submission tool that showcases your data Clearly and Effectively",
        title: "Send Proposals",
        logo: "ProposalLogo", // Match this with your imported logo component
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
                <div key={index} className={style.card}>
                    <p className={style.description}>{card.description}</p>
                    <nav>
                        <div className={style.logo}>
                            {renderLogo(card.logo)}
                        </div>
                        <h3>{card.title}</h3>
                    </nav>
                </div>
            ))}
        </div>
    );
};

export default Cards;
