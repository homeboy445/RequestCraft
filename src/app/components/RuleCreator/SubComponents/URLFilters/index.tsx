import { useEffect, useState } from "react";
import "./styles.css";

enum Operators {
  AND = "AND",
  OR = "OR",
}

interface URLFilter {
  urlOp: string;
  target: string;
  op: Operators;
}

const URLFilterComponent = ({
  urlFilters,
  updateUrlFilters,
}: {
  urlFilters: Array<URLFilter>,
  updateUrlFilters: (filterObj: URLFilter[]) => void;
}) => {
  const baseFilter: URLFilter = {
    urlOp: "URL Matches",
    target: "",
    op: Operators.AND,
  };
  // const [urlFilters, setUrlFilters] = useState<URLFilter[]>(urlFilterList);

  useEffect(() => {
    console.log(">> URL Filters changed: ", urlFilters);
  }, [urlFilters]);

  const updateAllURLFilters = (urlFilters: URLFilter[]) => {
    // setUrlFilters(urlFilters);
    updateUrlFilters(urlFilters);
  };

  const addFilter = () => {
    const filters = [...urlFilters];
    if (filters.length >= 5) {
      return;
    }
    filters.push(baseFilter);
    updateAllURLFilters(filters);
  };

  const updateFilter = (index: number, updatedFilter: URLFilter) => {
    const filters = [...urlFilters];
    filters[index] = updatedFilter;
    updateAllURLFilters(filters);
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
          <div className="url_filter">
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
                key={index}
                value={filter.target}
                onChange={(e) => {
                  const filterObj = { ...filter };
                  filterObj.target = e.target.value;
                  updateFilter(index, filterObj);
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
                      currentConfig.op === Operators.AND
                        ? Operators.OR
                        : Operators.AND;
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
                  // setUrlFilters(filters);
                  updateAllURLFilters(filters);
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
