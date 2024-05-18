import Head from "next/head";
import React from "react";
import Sidebar from "../../components/account/Sidebar";

const index = () => {
  return (
    <div>
      <Head>
        <title>Okkhor - My account</title>
      </Head>
      <Sidebar></Sidebar>
    </div>
  );
};

export default index;
