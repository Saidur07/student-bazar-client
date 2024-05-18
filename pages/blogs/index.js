import Head from "next/head";
import React from "react";
import BlogCards from "../../components/blogs/BlogCards";
import BlogsHeader from "../../components/blogs/BlogsHeader";
import Newsletter from "../../components/blogs/Newsletter";

const index = () => {
  return (
    <div>
      <Head>
        <title>Okkhor - Blogs</title>
      </Head>
      <div className="custom-container">
        <BlogsHeader></BlogsHeader>
        <BlogCards></BlogCards>
        <Newsletter></Newsletter>
      </div>
    </div>
  );
};

export default index;
