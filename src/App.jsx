import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./views/pages/welcomePage/welcomePage";
import PrivacyPolicy from "./views/pages/privacyPolicy/privacyPolicy";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
        </Router>
    );
};

export default App;
