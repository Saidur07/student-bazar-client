import { combineReducers } from "redux";
import addLoad from "./addLoad/addLoad";
import books from "./books/books";
import cartData from "./cartData/cartData";
import categoriesData from "./categoriesData/categoriesData";
import checkoutData from "./checkoutData/checkoutData";
import favData from "./favData/favData";
import filterData from "./filterData/filterData";
import filterSubCategory from "./filterSubCategory/filterSubCategory";
import filterTitle from "./filterTitle/filterTitle";
import getCart from "./getCart/getCart";
import getUser from "./getUser/getUser";
import userData from "./userData/userData";

const reducers = combineReducers({
  filterTitle,
  books,
  cartData,
  getCart,
  userData,
  getUser,
  favData,
  addLoad,
  checkoutData,
  categoriesData,
  filterSubCategory,
  filterData,
});

export default reducers;
