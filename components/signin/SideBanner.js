import Image from "next/image";
import React from "react";
import readingbook from "../../public/image/signin-image.svg";
const SideBanner = () => {
  return (
    <div
      className="w-1/2  hidden lg:block bg-white"
      style={{
        background: "",
      }}
    >
      <div className="p-8 ">
        {/* <div className="">
          <div className=" text-center pt-6 pb-6 text-[#333F50] ">
            <h1 className="text-5xl font-amaranth font-semibold">
              Here to serve you
            </h1>
            <p className="font-poppins text-sm my-6 text-secondary ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Exercitationem possimus reprehenderit hic esse quam, earum ducimus
              minima eaque minus doloribus est eos distinctio omnis, eum aliquid
              ab nam saepe autem!
            </p>
          </div>
          <div className="flex-center space-x-3">
            <div className="h-2 w-24 rounded-xl bg-primary"></div>
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <div className="h-2 w-2 rounded-full bg-primary"></div>
          </div>
        </div> */}
        <div className="w-8/12 mx-auto mt-10">
          <Image src={readingbook} alt="" className="absolute bottom-0"></Image>
        </div>
      </div>
    </div>
  );
};

export default SideBanner;
