let initialState = true;

const favReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ADD_LOAD":
      return action.payload;
    default:
      return state;
  }
};

export default favReducer;
