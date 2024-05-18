import Head from "next/head";
import React from "react";
import SectionContainer from "../reusable/SectionContainer";
import SideBanner from "./SideBanner";
import SigninForm from "./SigninForm";

const Signin = () => {
  return (
    <div className="pb-3">
      <Head>
        <title>Okkhor - Sign in</title>
      </Head>
      <SectionContainer className="custom-container bg-white  rounded-md ">
        <div className="flex items-center">
          <SideBanner></SideBanner>
          <SigninForm></SigninForm>
        </div>
      </SectionContainer>
    </div>
  );
};

export default Signin;
