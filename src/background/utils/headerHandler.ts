import { DynamicRuleHandler } from ".";
import { RequestResponseHeaders, Rule } from "../types";

interface HeaderParam {
  priority?: number;
  urlFilter: string;
  ruleConfig?: RequestResponseHeaders;
  type: "request" | "response";
}

class HeaderHandler extends DynamicRuleHandler {
  add(params: HeaderParam) {
    const headerTypeKey = `${params.type}Headers`;
    console.log("Header type key -> ", headerTypeKey);
    const rule: Rule = {
      priority: params.priority || 1,
      action: {
        type: 'modifyHeaders',
        [headerTypeKey]: [params.ruleConfig]
      },
      condition: {
        urlFilter: params.urlFilter,
        resourceTypes: ['main_frame', 'sub_frame', 'stylesheet', 'script', 'image', 'object', 'xmlhttprequest', 'other']
      }
    };
    this.addRule(rule);
  }
}

export default new HeaderHandler();
