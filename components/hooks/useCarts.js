import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { GET_ALL_CART_ITEMS } from "../../api";
const { useSelector, useDispatch } = require("react-redux");

const useCarts = () => {
  const dispatch = useDispatch();
  const cookie = new Cookies();
  const [token, setToken] = useState(cookie.get("accessToken"));
  const cartData = useSelector((data) => data.cartData);
  const cartsData = useSelector((data) => data.getCart);

  useEffect(() => {
    const fetchCartData = async () => {
      if (token) {
        const { data } = await axios.get(GET_ALL_CART_ITEMS, {
          headers: {
            Authorization: token,
          },
        });
        dispatch({
          type: "GET_CART_ITEMS",
          payload: data?.cart_data?.Items ? data?.cart_data?.Items : [],
        });
      }
    };
    fetchCartData();
  }, [cartData, token, dispatch]);
  return [cartsData];
};

export default useCarts;
