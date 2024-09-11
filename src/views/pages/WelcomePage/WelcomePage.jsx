import React from "react";
import style from "./WelcomePage.module.scss";
import Navbar from "../../components/Navbar/Navbar";
import VeLogo from "../../components/VeLogo/VeLogo";
import Cards from "./cards";

const WelcomePage = () => {
  const cards = [
    {
      description:
        "New proposal submission tool that showcases your data Clearly and Effectively",
      title: "Send Proposals",
      logo: "proposalLogo",
    },
    {
      description:
        "Make it easier for your audience to connect with all your essential content through",
      title: "Link in Bio",
      logo: "linkInBioLogo",
    },
    {
      description:
        "Simplifying your billing process. Create and share professional, detailed invoices in seconds",
      title: "Send Invoices",
      logo: "invoiceLogo",
    },
    {
      description:
        "From task management to client follow-ups, automate routine actions and focus on what truly matters",
      title: "Automate Workflows",
      logo: "workflowLogo",
    },
  ];

  return (
    <div className={style.container}>
      <div className={style.veLogoStyles}>
        <VeLogo />
      </div>
      <Navbar />
      <div className={style.title}>
        <h1>
          Welcome to <VeLogo />
        </h1>
        <h2>AI that minds your business</h2>
        <h3>
          So you can run the world. The all-in-one tool for those who do it all.
        </h3>
      </div>
      <h4 className={style.gettingStarted}>Let’s Get Started!</h4>
      <Cards />
    </div>
  );
};

export default WelcomePage;
