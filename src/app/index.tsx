import * as React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Dashboard from "./components/Dashboard/Dashboard";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import RuleCreator from "./components/RuleCatalogue/RuleCatalogue";
import Injectables from "./components/RuleCreator/Injectables/index";

const App = () => {
  return (
    <div style={{ width: "800px", height: "500px", overflow:"hidden", overflowY: "scroll" }} className="main-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<RuleCreator />} />
          <Route path="/create/injectables" element={<Injectables />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
