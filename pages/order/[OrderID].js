import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import OrderAddress from "../../components/account/OrderAddress";
import OrderStatus from "../../components/account/OrderStatus";
import OrderSummury from "../../components/account/OrderSummary";

const OrderID = () => {
  const router = useRouter();
  const { OrderID } = router.query;
  const [order, setOrder] = useState({});
  const [loader, setLoader] = useState(true);
  const cookie = new Cookies();
  const token = cookie.get("accessToken");

  useEffect(() => {
    if (token && OrderID) {
      axios
        .get(
          `${
            process.env.NEXT_PUBLIC_BASE_URL
          }/api/v1/private/order/order_detail?OrderID=${encodeURIComponent(
            OrderID
          )}`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          setOrder(res?.data?.order_detail);
          // console.log(res?.data?.order_detail);
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    }
  }, [OrderID, token]);
  return (
    <div>
      <Head>
        <title>Okkhor - Order Tracking</title>
      </Head>
      <div className="custom-container">
        <OrderStatus order={order} loader={loader}></OrderStatus>
        <OrderAddress order={order} loader={loader}></OrderAddress>
        <OrderSummury order={order} loader={loader}></OrderSummury>
      </div>
    </div>
  );
};

export default OrderID;
