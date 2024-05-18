let initialState = "";

const filterTitle = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TITLE":
      return action.payload;
    default:
      return state;
  }
};

export default filterTitle;
