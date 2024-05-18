import Head from "next/head";
import React from "react";
import SideBanner from "../../components/signin/SideBanner";
import SignupForm from "../../components/signin/SignupForm";

const Signin = () => {
  return (
    <div>
      <Head>
        <title>Okkhor - Sign up</title>
      </Head>
      <div className="flex min-h-screen custom-container">
        <SideBanner></SideBanner>
        <SignupForm></SignupForm>
      </div>
    </div>
  );
};

export default Signin;
