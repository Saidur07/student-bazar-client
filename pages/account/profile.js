import Head from "next/head";
import React from "react";
import Info from "../../components/account/ProfileInfo";
import Sidebar from "../../components/account/Sidebar";

const profile = () => {
  return (
    <div>
      <Head>
        <title>Okkhor - My Profile</title>
      </Head>
      <div className="grid lg:grid-cols-11 gap-3 grid-cols-1 h-full profile-container">
        <div className="lg:col-span-3 w-full mx-auto">
          <Sidebar></Sidebar>
        </div>
        <div className="lg:col-span-8 col-span-1">
          {" "}
          <Info></Info>
        </div>
      </div>
    </div>
  );
};

export default profile;
