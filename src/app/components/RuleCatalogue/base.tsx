import { useState } from "react";
import { v4 as uuid } from "uuid";
import "./base.css";

interface URLFilter {
  urlOp: string;
  target: string;
  op: "AND" | "OR";
}

const URLFilterComponent = () => {
  const baseFilter: URLFilter = { urlOp: "URL Matches", target: "", op: "AND" };
  const [urlFilters, setUrlFilters] = useState<URLFilter[]>([baseFilter]);

  const addFilter = () => {
    const filters = [...urlFilters];
    filters.pop();
    filters.push({ urlOp: selectedOp, target: targetUrl, op: "AND" });
    if (filters.length < 5) {
      filters.push(baseFilter);
    }
    setUrlFilters(filters);
  };

  const updateFilter = (index: number, updatedFilter: URLFilter) => {
    const filters = [...urlFilters];
    filters[index] = updatedFilter;
    setUrlFilters(filters);
  };

  return (
    <div className="url_filter_container">
      {urlFilters.map((filter, index) => {
        const shouldEnableFilterAddition =
          urlFilters.length < 5 && urlFilters.length - 1 === index;
        const shouldHideFilterBtn =
          urlFilters.length >= 5 && index === urlFilters.length - 1;
        const currentConfig: URLFilter = filter;
        return (
          <div key={uuid()} className="url_filter">
            <div className="url_filter_bx">
              <select
                id="urlOperators"
                // disabled={!shouldEnableFilterAddition}
                value={currentConfig.urlOp}
                onChange={(e) => {
                  updateFilter(index, { ...filter, urlOp: e.target.value });
                }}
              >
                <option value="URL Matches">URL Matches</option>
                <option value="URL Contains">URL Contains</option>
                <option value="URL Starts With">URL Starts With</option>
                <option value="URL Ends With">URL Ends With</option>
              </select>
              <input
                type="text"
                required
                value={filter.target}
                onChange={(e) => {
                  console.log(e.target.value);
                  const updatedFilter = { ...filter, target: e.target.value };
                  updateFilter(index, updatedFilter);
                }}
              />
            </div>
            {!shouldHideFilterBtn ? (
              <button
                id="addFilterBtn"
                onClick={() => {
                  if (shouldEnableFilterAddition) {
                    addFilter();
                  } else {
                    currentConfig.op =
                      currentConfig.op === "AND" ? "OR" : "AND";
                    updateFilter(index, currentConfig);
                  }
                }}
              >
                {shouldEnableFilterAddition ? "+" : currentConfig.op}
              </button>
            ) : null}
            {!shouldEnableFilterAddition ? (
              <button
                id="addFilterBtn"
                onClick={() => {
                  const filters = [...urlFilters];
                  filters.splice(index, 1);
                  setUrlFilters(filters);
                }}
              >
                -
              </button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default URLFilterComponent;
