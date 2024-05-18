let initialState = {};

const checkoutData = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CHECKOUT_DATA":
      return action.payload;
    default:
      return state;
  }
};

export default checkoutData;
