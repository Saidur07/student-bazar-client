let initialState = {};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    default:
      return state;
  }
};

export default cartReducer;
