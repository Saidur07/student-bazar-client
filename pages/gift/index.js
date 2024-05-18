import Head from "next/head";
import React from "react";
import GiftDetails from "../../components/gift/GiftDetails";

const index = () => {
  return (
    <div>
      <Head>
        <title>Okkhor - Gift</title>
      </Head>
      <GiftDetails></GiftDetails>
    </div>
  );
};

export default index;
