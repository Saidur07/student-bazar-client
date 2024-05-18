let initialState = [];

const getCart = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CART_ITEMS":
      return action.payload;
    default:
      return state;
  }
};

export default getCart;
