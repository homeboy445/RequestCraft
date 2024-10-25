import RuleCard from "../RuleCard/RuleCard";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigator = useNavigate();
  return (
    <div className="dashboard">
      <div className="dashboard-title-section">
        <h1>RequestCraft</h1>
        <button onClick={() => {
          navigator("/create");
        }}>+</button>
      </div>
      <input type="text" className="dashboard-search-bar" placeholder="Search for rules"/>
      <div className="dashboard-card-list">
        {[
          "Some placeHolder1",
          "Some placeHolder2",
          "Some placeHolder3",
          "Some placeHolder4",
          "Some placeHolder5",
          "Some placeHolder6sdcnsndcsundcsdc",
        ].map((txt, idx) => {
          return (
            <RuleCard
              key={Date.now() + idx}
              ruleName={txt}
              ruleType="HTTP Rule"
              lastModified={new Date().toDateString()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
