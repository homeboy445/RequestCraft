export enum REQUEST_MODIFICATION_TYPES {
    RESPONSE = "response",
    REQUEST = "request",
    REDIRECT = "redirect",
    PARAMETER = "param",
}

export enum INJECTABLE_CONTENT_TYPES {
    JAVASCRIPT = "JS",
    STYLESHEET = "CSS"
};

export enum UrlOperators {
    "MATCH" = 1,
    "DOES NOT MATCH" = 2,
    "CONTAIN" = 3,
    "STARTS WITH" = 4,
    "ENDS WITH" = 5,
    "REGEX" = 6,
    "DOES NOT CONTAIN" = 7
};

export interface UrlFilter {
    op: UrlOperators;
    targetUrl: string;
    targetRegex: RegExp;
}

export interface ContentRuleStore {
    element: JQuery;
    id: string;
    type?: "inline" | "external"
    urlFilter: UrlFilter;
}

export enum EventsEnums {
    EXEC = "executeAll"
}
