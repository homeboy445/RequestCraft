import { useEffect, useState } from "react";
import RuleCreator from "../RuleCreator";
import URLFilterComponent from "../SubComponents/URLFilters";
import "./styles.css";
import CodeEditor from "../SubComponents/URLFilters/TextEditor";
import CustomDropDown from "../../MircoComponents/DropDown";
import {
  InjectableStore,
  InjectableTypes,
  RuleCreatorSubComponentProps,
  URLFilter,
} from "../../../../types";
import { getUseStateWrapper } from "../../componentUtils/userStateWrapper";
import { MESSAGES } from "./consts";

enum INJECTABLE_VALIDATIONS {
  ALL_GOOD = "ALL_GOOD",
  URL_FILTER_EMPTY = "URL_FILTER_EMPTY",
  INVALID_URL = "INVALID_URL",
  JS_CODE_ERROR = "JS_CODE_ERROR",
  CSS_CODE_ERROR = "CSS_CODE_ERROR",
}

const Injectables = ({
  ruleStore,
  toggleChangeHandlerBtn,
  updateRuleStore,
  changeListeners,
  showErrorToaster
}: RuleCreatorSubComponentProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<
    "javascript" | "css"
  >("javascript");

  const useStateWrapper = getUseStateWrapper(() => {
    toggleChangeHandlerBtn(true);
  });

  const baseStateValueStore = ruleStore["injectables"];
  const [urlFilters, updateUrlFilters] = useStateWrapper<URLFilter[]>(
    baseStateValueStore.urlFilters
  );
  const [jsCode, updateJsCode] = useStateWrapper(baseStateValueStore.jsCode);
  const [cssCode, updateCssCode] = useStateWrapper(baseStateValueStore.cssCode);

  const validateInput = ({
    urlFilters,
  }: InjectableStore): INJECTABLE_VALIDATIONS => {
    for (let i = 0; i < urlFilters.length; i++) {
      if (!urlFilters[i].target) {
        return INJECTABLE_VALIDATIONS.URL_FILTER_EMPTY;
      }
      // if (urlFilters[i].urlOp === "URL Matches") {}
    }
    return INJECTABLE_VALIDATIONS.ALL_GOOD;
  };

  useEffect(() => {
    changeListeners.onSave(() => {
      console.log("saving...");
      const validation = validateInput({ jsCode, cssCode, urlFilters });
      if (validation === INJECTABLE_VALIDATIONS.ALL_GOOD) {
        updateRuleStore("injectables", { jsCode, cssCode, urlFilters });
        toggleChangeHandlerBtn(false);
      } else {
        showErrorToaster(MESSAGES.ERROR[validation]);
      }
    });

    changeListeners.onCancel(() => {
      console.log("cancelling... ", baseStateValueStore);
      updateUrlFilters([ ...baseStateValueStore.urlFilters ]);
      updateJsCode(baseStateValueStore.jsCode);
      updateCssCode(baseStateValueStore.cssCode);
      toggleChangeHandlerBtn(false);
    });

    return () => {
      console.log("clearing callbacks!");
      changeListeners.clearCallbacks();
    }
  }, [jsCode, cssCode, urlFilters]);

  const getCode = (): string => {
    return selectedLanguage.toLowerCase() === "javascript" ? jsCode : cssCode;
  };

  const updateCode = (value: string): void => {
    if (selectedLanguage.toLowerCase() === "javascript") {
      updateJsCode(value);
    } else {
      updateCssCode(value);
    }
  };

  return (
    <div className="inject-main">
      <h3>When,</h3>
      <URLFilterComponent
        urlFilters={urlFilters}
        updateUrlFilters={(urlFilters: URLFilter[]) => {
          console.log("Filters updated -> ", urlFilters);
          updateUrlFilters(urlFilters);
        }}
      />
      <div className="inject-container">
        <div className="inject-sel">
          <h3>Then, Insert</h3>
          <CustomDropDown
            items={["JavaScript", "CSS"]}
            updateSelectedItem={(selectedItem: string) => {
              setSelectedLanguage(selectedItem as InjectableTypes);
            }}
          />
        </div>
        <CodeEditor
          language={selectedLanguage}
          getCode={getCode}
          updateCode={updateCode}
        />
      </div>
    </div>
  );
};

const MainRenderedComponent = (): JSX.Element => {
  return <RuleCreator type={"Injectables"} name={"Test"} Child={Injectables} />;
};

export default MainRenderedComponent;
