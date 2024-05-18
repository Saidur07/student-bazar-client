let initialState = [];

const favReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FAV":
      return action.payload;
    default:
      return state;
  }
};

export default favReducer;
