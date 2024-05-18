import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import SectionContainer from "../reusable/SectionContainer";

const Extras = ({ academics }) => {
  // console.log(academics);
  // console.log(academics);
  const router = useRouter();
  return (
    <div className="custom-container pb-5">
      <SectionContainer
        title="একাডেমিক বই"
        line={true}
        className="md:p-8 p-3 bg-white shadow-md"
      >
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 lg:gap-6 my-6">
          {academics?.map((item) => (
            <div
              key={item._id}
              className="cursor-pointer md:p-8 p-4 border rounded-md transition-all hover:bg-slate-100 font-bangla text-center relative  overflow-hidden font-semibold inline-flex  items-center justify-center   "
              onClick={() =>
                router.push(
                  `subject/${item?.ProductType}?CategoryID=${item?.CategoryID}`
                )
              }
            >
              <span className="hidden lg:block absolute w-0 h-0 transition-all duration-500 ease-out bg-primary rounded-full group-hover:w-96 group-hover:h-96 opacity-10 lg:hover:border-none" />
              <div className="flex flex-col items-center justify-center gap-1">
                <Image
                  src={item?.IconURL}
                  alt="image"
                  width={50}
                  height={50}
                  className="group-hover:scale-75 transition-all"
                ></Image>
                <h2 className="md:text-xl font-semibold">
                  {item?.CategoryName}
                </h2>
                <p className="text-secondary md:text-base text-xs">
                  {item?.ShortDesc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
};

export default Extras;
