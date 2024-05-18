import Link from "next/link";
import React, { useEffect, useState } from "react";
import Contest from "../../public/image/contest.svg";
import Offer from "../../public/image/offer.svg";
import Edu from "../../public/image/higheredu.svg";
import Image from "next/image";
import SectionContainer from "../reusable/SectionContainer";

const Extras = () => {
  const tabs = [
    { _id: 1, title: "Offers", href: "/extras", img: Offer },
    { _id: 2, title: "Contests", href: "/extras/contests", img: Contest },
    {
      _id: 3,
      title: "Higher education",
      href: "/extras/higherstudies",
      img: Edu,
    },
  ];

  return (
    <div className="custom-container ">
      <SectionContainer
        title="স্পেশাল এক্সট্রা"
        line={true}
        className="bg-white p-8 shadow-md my-5"
      >
        <div className="grid grid-cols-3 gap-y-4 lg:gap-y-0 lg:gap-x-6 mt-5">
          {tabs.map((item) => (
            <Link href={item.href} key={item._id} className="cursor-pointer">
              <div className="flex flex-col p-4 rounded-md justify-center items-center cursor-pointer transition-all overflow-hidden font-bangla  text-center relative font-semibold  group">
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary rounded-full group-hover:w-[26rem] opacity-5 group-hover:h-[26rem] lg:hover:border-none" />
                <div className="mx-auto hidden lg:block ">
                  <Image
                    className="group-hover:scale-90 transition-all"
                    src={item.img}
                    alt={item?.title}
                    width={70}
                    height={70}
                  />
                </div>
                <div className="mx-auto lg:hidden  ">
                  <Image
                    className="group-hover:scale-90 transition-all"
                    src={item.img}
                    alt={item?.title}
                    width={50}
                    height={50}
                  />
                </div>
                <p className="lg:text-[18px] text-[14px] text-black transition-all  uppercase  font-semibold">
                  {item?.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
};

export default Extras;
