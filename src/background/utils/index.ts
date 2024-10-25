import { Rule } from "../types";

const chrome = (self as any).chrome;

export class DynamicRuleHandler {

    private rules: Rule[] = [];

    protected addRule(ruleObj: Rule) {
      ruleObj.id = this.rules.length + 1;
      this.rules.push(ruleObj);
      console.log(">> ", this.rules);
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: this.rules,
        removeRuleIds: this.rules.map(rule => rule.id)
      }, () => {
        if (chrome.runtime.lastError) {
          console.error('Error updating dynamic rules:', chrome.runtime.lastError.message);
        } else {
          console.log('Dynamic rule updated successfully.');
        }
      });
    }
}
