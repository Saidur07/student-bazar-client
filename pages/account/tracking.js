import Head from "next/head";
import React from "react";
import OrderAddress from "../../components/account/OrderAddress";
import OrderStatus from "../../components/account/OrderStatus";
import OrderSummury from "../../components/account/OrderSummary";

const orders = () => {
  return (
    <div>
      <Head>
        <title>Okkhor - Track order</title>
      </Head>
      <div className="custom-container">
        <OrderStatus></OrderStatus>
        <OrderAddress></OrderAddress>
        <OrderSummury></OrderSummury>
      </div>
    </div>
  );
};

export default orders;
