export const START_SPINNER = "START_SPINNER";
export const END_SPINNER = "END_SPINNER";
export const SET_SORT_FILTER = "SET_SORT_FILTER";

export const startSpinner = () => ({
  type: START_SPINNER
});

export const endSpinner = () => ({
  type: END_SPINNER
});

export const setSort = (filter) => {
  return {
    type: SET_SORT_FILTER,
    sortBy: filter,
  };
};
