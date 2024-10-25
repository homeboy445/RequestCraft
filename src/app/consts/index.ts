export const RULE_CATALOGUE = [
  { name: "HTTP REDIRECT", config: {}, info: "Creates a rule for redirecting network requests." },
  { name: "QUERY PARAM CHANGE", config: {}, info: "Allows modification of query parameters in URLs." },
  {
    name: "HTTP HEADERS MODIFICATION",
    config: {
      types: ["REQUEST", "RESPONSE"],
    },
    info: "Enables adding, modifying, or removing HTTP headers for requests or responses."
  },
  {
    name: "INJECT CONTENT",
    path: "/create/injectables",
    config: {
      types: ["JAVASCRIPT", "STYLESHEET"],
    },
    info: "Allows injection of custom JavaScript or CSS content into web pages."
  },
];
