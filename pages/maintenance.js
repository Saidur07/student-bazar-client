import Head from "next/head";
import Image from "next/image";
import React from "react";
import Lottie from "react-lottie";
import animationData from "../public/65356-maintenance-web.json";
import logo from "../public/image/okkhor site.png";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Maintenance = () => {
  return (
    <div className="custom-container">
      <Head>
        <title>Okkhor - Under Maintenance</title>
      </Head>
      <div className="flex items-center justify-center flex-row mt-5">
        <div className="w-44 cursor-pointer">
          <Image
            src={logo}
            layout="responsive"
            objectFit="contain"
            alt="logo"
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="max-w-[700px]">
          <Lottie options={defaultOptions} />
        </div>
        <p className=" text-4xl text-center text-[#F26133] font-bold">
          Hang On! We are under maintenance
        </p>
        <p className=" text-center text-[#737373]">
          We are making our site more user friendly. It will help you lot. We
          will be back with a great performence. Till than wait
        </p>
      </div>
    </div>
  );
};

export default Maintenance;
