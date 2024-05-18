let initialState = [];

const filterSubCategory = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER_SUB_CAT":
      return action.payload;
    default:
      return state;
  }
};

export default filterSubCategory;
