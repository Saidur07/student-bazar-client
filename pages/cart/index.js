import Head from "next/head";
import React from "react";
import ManageProducts from "../../components/cart/ManageProducts";

const index = () => {
  return (
    <>
      <Head>
        <title>Okkhor - Cart</title>
      </Head>
      <ManageProducts coupon={true}></ManageProducts>
    </>
  );
};

export default index;
