import * as jQuery from "jquery";
import { ContentRuleStore, UrlFilter, UrlOperators, EventsEnums, REQUEST_MODIFICATION_TYPES, INJECTABLE_CONTENT_TYPES } from "../../types";

class InjectableContent {
    private jsRuleStore: ContentRuleStore[] = [];
    private cssRuleStore: ContentRuleStore[] = [];

    public addJSRule(config: { code: string, srcUrl: string, urlFilter: UrlFilter }) {
        const { code, srcUrl, urlFilter } = config;
        const ruleConfig: ContentRuleStore = { id: `rqc-js-code-${this.jsRuleStore.length + 1}`, urlFilter, element: jQuery() };
        let scriptTag;
        if (code) {
            ruleConfig.type = "inline";
            scriptTag = jQuery(`<script type='text/javascript' id="${ruleConfig.id}">${config.code}</script>`);
        } else {
            ruleConfig.type = "external";
            scriptTag = jQuery(`<script src="${srcUrl}" id="${ruleConfig.id}"></script>`);
        }
        this.jsRuleStore.push({ ...ruleConfig, element: scriptTag });
    }

    public addCSSRule(config: { styleSheetContent: string, link: string, urlFilter: UrlFilter }) {
        const { styleSheetContent, link, urlFilter } = config;
        const ruleConfig: ContentRuleStore = { id: `rqc-css-code-${this.cssRuleStore.length + 1}`, urlFilter, element: jQuery() };
        let styleTag;
        if (styleSheetContent) {
            ruleConfig.type = "inline";
            styleTag = jQuery(`<style type='text/css' id="${ruleConfig.id}">${styleSheetContent}</style>`);
        } else {
            ruleConfig.type = "external";
            styleTag = jQuery(`<link rel="stylesheet" href="${link}" id="${ruleConfig.id}">`);
        }
        this.cssRuleStore.push({ ...ruleConfig, element: styleTag });
    }

    public removeAll() {}

    public remove() {}

    private performURLComparison(urlFilter: UrlFilter, currentUrl: string = window.location.href): boolean {
        const targetUrl = urlFilter.targetUrl;
        const targetRegx = urlFilter.targetRegex;
        switch(urlFilter.op) {
            case UrlOperators.MATCH:
                return currentUrl === targetUrl;
            case UrlOperators["DOES NOT MATCH"]:
                return currentUrl !== targetUrl;
            case UrlOperators.CONTAIN:
                return currentUrl.indexOf(targetUrl) > -1;
            case UrlOperators["DOES NOT CONTAIN"]:
                return currentUrl.indexOf(targetUrl) === -1;
            case UrlOperators["STARTS WITH"]:
                return currentUrl.startsWith(targetUrl);
            case UrlOperators["ENDS WITH"]:
                return currentUrl.endsWith(targetUrl);
            case UrlOperators.REGEX:
                return targetRegx.test(currentUrl);
            default:
                return false;
        }
    }

    protected injectAll() {
        this.jsRuleStore.forEach(rule => {
            if (this.performURLComparison(rule.urlFilter)) {
                jQuery("head").append(rule.element);
            }
        });
        this.cssRuleStore.forEach(rule => {
            if (this.performURLComparison(rule.urlFilter)) {
                jQuery("head").append(rule.element);
            }
        });
    }
}

class RuleManager extends InjectableContent {
    addRequestRule(type: REQUEST_MODIFICATION_TYPES, config: { urlFilter: string; }) {
        const callbackStore = {};
        switch (type) {
            case REQUEST_MODIFICATION_TYPES.RESPONSE: {}
            case REQUEST_MODIFICATION_TYPES.REQUEST: {}
            case REQUEST_MODIFICATION_TYPES.PARAMETER: {}
            case REQUEST_MODIFICATION_TYPES.REDIRECT: {}
            default: {}
                break;
        }
    }
    applyAll() {
        this.injectAll();
    }
}

class ExtensionInterface extends RuleManager {
}
