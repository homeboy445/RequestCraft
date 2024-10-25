import "./RuleSelector.css";

const RuleSelector = () => {
  return (
    <div className="ruleSelector">
      <div className="ruleSelector-titleSection">
        <h1>Create Rule</h1>
        <h2>Choose from the below catalogue</h2>
      </div>
      <div className="ruleSelector-card-section">
      {[
        "HTTP Redirect",
        "HTTP Stop Request",
        "HTTP Modify Headers",
        "Add JS/CSS code",
      ].map((ruleType) => {
        return (
          <div className="ruleSelector-card">
            <h1>{ruleType}</h1>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default RuleSelector;
