import Toggle from "react-toggle";
import EditIcon from "../../assets/editIcon.svg";
import DeleteIcon from "../../assets/deleteIcon.svg";
import "react-toggle/style.css";
import "./RuleCard.css";
import TextFormatter from "../../Utils/TextFormatter";

const RuleCard = ({
  ruleName,
  ruleType,
  lastModified,
}: {
  ruleName: string;
  ruleType: string;
  lastModified: string;
}) => {
  return (
    <div className="dashboard-ruleName-card">
      <Toggle
        defaultChecked={true}
        className="card-checkbox"
        icons={false}
        onChange={() => {}}
      />
      <p>{TextFormatter(ruleName, 20)}</p>
      <p>{TextFormatter(ruleType, 20)}</p>
      <p>{lastModified}</p>
      <div className="editSection">
        <img src={EditIcon as unknown as string} className="saveIcon"/>
        <img src={DeleteIcon as unknown as string} className="deleteIcon"/>
      </div>
    </div>
  );
};

export default RuleCard;
