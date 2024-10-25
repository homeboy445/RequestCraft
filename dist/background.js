/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background/utils/index.ts":
/*!***************************************!*\
  !*** ./src/background/utils/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DynamicRuleHandler: () => (/* binding */ DynamicRuleHandler)
/* harmony export */ });
var chrome = self.chrome;
var DynamicRuleHandler = /** @class */ (function () {
    function DynamicRuleHandler() {
        this.rules = [];
    }
    DynamicRuleHandler.prototype.addRule = function (ruleObj) {
        ruleObj.id = this.rules.length + 1;
        this.rules.push(ruleObj);
        console.log(">> ", this.rules);
        chrome.declarativeNetRequest.updateDynamicRules({
            addRules: this.rules,
            removeRuleIds: this.rules.map(function (rule) { return rule.id; })
        }, function () {
            if (chrome.runtime.lastError) {
                console.error('Error updating dynamic rules:', chrome.runtime.lastError.message);
            }
            else {
                console.log('Dynamic rule updated successfully.');
            }
        });
    };
    return DynamicRuleHandler;
}());



/***/ }),

/***/ "./src/background/utils/redirectHandler.ts":
/*!*************************************************!*\
  !*** ./src/background/utils/redirectHandler.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/background/utils/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var RedirectionHandler = /** @class */ (function (_super) {
    __extends(RedirectionHandler, _super);
    function RedirectionHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RedirectionHandler.prototype.add = function (params) {
        var rule = {
            priority: params.priority || 1,
            action: { type: 'redirect', redirect: { url: params.redirectUrl } },
            condition: { urlFilter: params.urlFilter, resourceTypes: ['main_frame'] }
        };
        this.addRule(rule);
    };
    return RedirectionHandler;
}(___WEBPACK_IMPORTED_MODULE_0__.DynamicRuleHandler));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new RedirectionHandler());


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_redirectHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/redirectHandler */ "./src/background/utils/redirectHandler.ts");

console.log("this is background script!");
var addParamBasedRedirectionRule = function (_a) {
    var targetUrl = _a.targetUrl, queryParamMap = _a.queryParamMap;
    var urlBuilder = new URL(targetUrl);
    Object.keys(queryParamMap).forEach(function (param) {
        if (urlBuilder.searchParams.get(param) !== queryParamMap[param]) {
            urlBuilder.searchParams.set(param, queryParamMap[param]);
        }
    });
    var filteredTargetUrl = urlBuilder.href;
    if (filteredTargetUrl !== targetUrl) {
        _utils_redirectHandler__WEBPACK_IMPORTED_MODULE_0__["default"].add({
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

})();

/******/ })()
;
//# sourceMappingURL=background.js.map