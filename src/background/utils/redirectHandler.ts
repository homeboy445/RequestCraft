import { DynamicRuleHandler } from ".";
import { Rule } from "../types";

class RedirectionHandler extends DynamicRuleHandler {  
    add(params: { priority?: number; redirectUrl: string; urlFilter: string }) {
      const rule: Rule = {
        priority: params.priority || 1,
        action: { type: 'redirect', redirect: { url: params.redirectUrl } },
        condition: { urlFilter: params.urlFilter, resourceTypes: ['main_frame'] }
      };
      this.addRule(rule);
    }
}

export default new RedirectionHandler();
