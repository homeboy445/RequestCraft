export enum REQUEST_MODIFICATION_TYPES {
  RESPONSE = "response",
  REQUEST = "request",
  REDIRECT = "redirect",
  PARAMETER = "param",
}

export enum INJECTABLE_CONTENT_TYPES {
  JAVASCRIPT = "JS",
  STYLESHEET = "CSS",
}

export enum UrlOperators {
  "MATCH" = 1,
  "DOES NOT MATCH" = 2,
  "CONTAIN" = 3,
  "STARTS WITH" = 4,
  "ENDS WITH" = 5,
  "REGEX" = 6,
  "DOES NOT CONTAIN" = 7,
}

export interface UrlFilterConfig {
  op: UrlOperators;
  targetUrl: string;
  targetRegex: RegExp;
}

export interface ContentRuleStore {
  element: JQuery;
  id: string;
  type?: "inline" | "external";
  urlFilter: UrlFilter;
}

export enum EventsEnums {
  EXEC = "executeAll",
}

export enum Operators {
  AND = "AND",
  OR = "OR",
}

export interface URLFilter {
  urlOp: string;
  target: string;
  op: Operators;
}

export type InjectableTypes = "javascript" | "css";

export interface InjectableStore {
  jsCode: string;
  cssCode: string;
  urlFilters: URLFilter[];
}

export interface RuleStore {
  injectables: {
    jsCode: string;
    cssCode: string;
    urlFilters: URLFilter[];
  };
}

export interface RuleCreatorSubComponentProps {
  ruleStore: RuleStore;
  toggleChangeHandlerBtn: (value: boolean) => void;
  updateRuleStore: (ruleType: "injectables", value: InjectableStore) => void;
  changeListeners: { 
    onSave: (callback: () => void) => void;
    onCancel: (callback: () => void) => void;
    clearCallbacks: () => void;
  };
  showErrorToaster: (message: string) => void;
}

export interface RuleProperties {
  type: string;
  name: string;
  Child: React.FC<RuleCreatorSubComponentProps>;
}
