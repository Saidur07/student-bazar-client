let initialState = [];

const cartData = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CART_ITEMS":
      return action.payload;
    default:
      return state;
  }
};

export default cartData;
