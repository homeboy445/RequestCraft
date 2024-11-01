import * as React from "react";
import "./RuleCreator.css";
import { InjectableStore, RuleProperties, RuleStore } from "../../../types";
import ErrorToaster from "./SubComponents/URLFilters/ErrorToaster";

enum Operators {
  AND = "AND",
  OR = "OR",
}

interface URLFilter {
  urlOp: string;
  target: string;
  op: Operators;
}

const RuleCreator = ({ type, name, Child }: RuleProperties) => {
  const baseFilter: URLFilter = {
    urlOp: "URL Matches",
    target: "",
    op: Operators.AND,
  };
  const [showButtons, setShowButtons] = React.useState<boolean>(false);
  const [errorMessage, updateErrorMessage] = React.useState<string>("");
  const ruleStore = React.useRef<RuleStore>({
    injectables: {
      jsCode: "// Write your code here!",
      cssCode: "/* Write your CSS here! */",
      urlFilters: [baseFilter],
    },
  });

  const callbacksRef = React.useRef<{
    saveCallbacks: (() => void)[];
    cancelCallbacks: (() => void)[];
  }>({
    saveCallbacks: [],
    cancelCallbacks: [],
  });

  const onSave = React.useCallback((callback: () => void) => {
    callbacksRef.current.saveCallbacks.push(callback);
  }, []);

  const onCancel = React.useCallback((callback: () => void) => {
    callbacksRef.current.cancelCallbacks.push(callback);
  }, []);

  const clear = React.useCallback(() => {
    callbacksRef.current.saveCallbacks = [];
    callbacksRef.current.cancelCallbacks = [];
  }, []);

  const triggerCallbacks = React.useCallback((type: "save" | "cancel") => {
    if (type === "save") {
      callbacksRef.current.saveCallbacks.forEach((callback: () => void) =>
        callback()
      );
    } else if (type === "cancel") {
      callbacksRef.current.cancelCallbacks.forEach((callback: () => void) =>
        callback()
      );
    }
  }, []);

  const handleSaveCancelButtonClick = (type: "save" | "cancel") => {
    triggerCallbacks(type);
    // setShowButtons(false);
  };

  const updateRuleStore = (ruleType: "injectables", value: InjectableStore) => {
    ruleStore.current[ruleType] = value;
  };

  return (
    <div className="rules-sel-main">
      <div className="rules-sel-title-section">
        <h1>{type}</h1>
        <div className={`rules-sel-btn-section ${showButtons ? "" : "hidden"}`}>
          <button
            className="success-btn"
            onClick={() => {
              handleSaveCancelButtonClick("save");
            }}
          >
            Save
          </button>
          <button
            className="cancel-btn"
            onClick={() => {
              handleSaveCancelButtonClick("cancel");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      <h2>{name || `[Rename your rule here...]`}</h2>
      <Child
        toggleChangeHandlerBtn={setShowButtons}
        ruleStore={ruleStore.current}
        updateRuleStore={updateRuleStore}
        changeListeners={{ onSave, onCancel, clearCallbacks: clear }}
        showErrorToaster={updateErrorMessage}
      />
      {
        errorMessage.trim() ? <ErrorToaster message={errorMessage} onCloseCallback={() => {
          updateErrorMessage("");
        }}/> : null
      }
    </div>
  );
};

export default RuleCreator;
