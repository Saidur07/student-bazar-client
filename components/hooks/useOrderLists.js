import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { GET_ALL_ORDERS } from "../../api";

const useOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");

  useEffect(() => {
    if (accessToken) {
      setLoading(true);
      axios
        .get(GET_ALL_ORDERS, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((res) => {
          setOrders(res.data?.orders?.reverse());
          //console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [accessToken]);

  return [orders, loading];
};

export default useOrderList;
