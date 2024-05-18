import Head from "next/head";
import Link from "next/link";
import React from "react";
import Lottie from "react-lottie";
import animationData from "../public/404-notfound.json";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const NotFound = () => {
  return (
    <div className="bg-white">
      <Head>
        <title>Not Found</title>
      </Head>

      <div className="">
        <div className="md:w-[35%] w-[80%] mx-auto">
          <Lottie options={defaultOptions} />
        </div>
        <div className="mt-3 pb-6">
          <p className="text-center font-bangla text-xl md:text-3xl font-bold">
            আপনি ভুল লিঙ্ক চলে এসেছেন!
          </p>
          <Link href="/">
            <p className="underline text-center cursor-pointer ">
              Go Back home
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
