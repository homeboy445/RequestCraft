import { RULE_CATALOGUE } from '../../consts';
import { v4 as uuid } from "uuid";
import "./RuleCatalogue.css";
import { useNavigate } from 'react-router-dom';

const RuleCreator = () => {
  
  const navigator = useNavigate();

  return (
    <div className="rule-creator">
      <h1>Create a Rule</h1>
      <h3>Choose from the below catalogue</h3>
      <div className="rule-catalogue">
      {
        RULE_CATALOGUE.map((rule) => {
          return <div key={uuid()} className='rule-card' onClick={() => {
            if (rule.path) {
              navigator(rule.path);
            }
          }}>
            <h1>{rule.name}</h1>
            <h3>{rule.info}</h3>
          </div>
        })
      }
      </div>
    </div>
  );
};

export default RuleCreator;


