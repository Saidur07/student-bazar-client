import Head from "next/head";
import React from "react";
import OrdersLists from "../../components/account/OrdersLists";
import Sidebar from "../../components/account/Sidebar";

const orders = () => {
  return (
    <div>
      <Head>
        <title>Okkhor - My Orders</title>
      </Head>
      <div className="grid lg:grid-cols-11 grid-cols-1 gap-3 h-full profile-container">
        <div className="lg:col-span-3 col-span-1 w-full mx-auto">
          <Sidebar></Sidebar>
        </div>
        <div className="lg:col-span-8 col-span-1">
          <OrdersLists></OrdersLists>
        </div>
      </div>
    </div>
  );
};

export default orders;
