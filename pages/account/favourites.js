import Head from "next/head";
import React from "react";
import FavouriteLists from "../../components/account/FavouriteLists";
import Sidebar from "../../components/account/Sidebar";

const favourites = () => {
  return (
    <div>
      <Head>
        <title>Okkhor - My Favourites</title>
      </Head>
      <div className="grid lg:grid-cols-11 gap-3 md:grid-cols-12 grid-cols-1 h-full profile-container">
        <div className="lg:col-span-3 md:col-span-4 w-full mx-auto">
          <Sidebar></Sidebar>
        </div>
        <div className="lg:col-span-8 md:col-span-8 col-span-1">
          {" "}
          <FavouriteLists></FavouriteLists>
        </div>
      </div>
    </div>
  );
};

export default favourites;
