import { GenericObject } from "./types";
import headerHandler from "./utils/headerHandler";
import redirectHandler from "./utils/redirectHandler";

console.log("this is background script!");

interface ParamRedirect {
  targetUrl: string;
  queryParamMap: GenericObject;
}

const addParamBasedRedirectionRule = ({
  targetUrl,
  queryParamMap,
}: ParamRedirect) => {
  const urlBuilder = new URL(targetUrl);
  Object.keys(queryParamMap).forEach((param) => {
    if (urlBuilder.searchParams.get(param) !== queryParamMap[param]) {
      urlBuilder.searchParams.set(param, queryParamMap[param]);
    }
  });
  const filteredTargetUrl = urlBuilder.href;
  if (filteredTargetUrl !== targetUrl) {
    redirectHandler.add({
      urlFilter: targetUrl,
      redirectUrl: filteredTargetUrl,
    });
  }
};

// headerHandler.add({
//   // urlFilter: "https://homeboy445.github.io/Testing-Site/lorem.html",
//   urlFilter: "https://dev.visualwebsiteoptimizer.com/j.php*",
//   ruleConfig: {
//     header: "Cookie",
//     operation: "set",
//     value: "MAJOR_TEST_COOKIE=1; path=/;",
//   },
//   type: "response",
// });

// // Plain redirection!
// redirectHandler.add({
//   urlFilter: "https://homeboy445.github.io/Testing-Site/lorem.html",
//   redirectUrl: "https://homeboy445.github.io/Testing-Site/lorem.html?Working=true"
// });

// addParamBasedRedirectionRule({
//   targetUrl: "https://homeboy445.github.io/Testing-Site/lorem.html?testing=1",
//   queryParamMap: { testing: "MAJOR" }
// });
