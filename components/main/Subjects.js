import Link from "next/link";
import React from "react";
import SectionContainer from "../reusable/SectionContainer";
const Subjects = ({ subjects }) => {
  return (
    <div className="custom-container">
      <SectionContainer
        title="জনপ্রিয় বিষয়সমূহ"
        className=" bg-white md:p-8 p-3 shadow-md my-5"
        line={true}
        sideBtn={{ url: "/subject", text: "আরো দেখুন" }}
      >
        {/* subjects */}

        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 lg:gap-4 text-center ">
          {subjects?.reverse().map((item) => (
            <Link
              href={`subject/${item?.ProductType}?categories=${item?.CategoryID}`}
              key={item?._id}
              className="cursor-pointer"
            >
              <button className="py-4 px-2 md:px-4 lg:px-10 lg:hover:bg-primary border bg-slate-50 border-dashed border-primary font-bangla text-md rounded-md hover:text-white cursor-pointer transition-all overflow-hidden group  relative text-black ease-out duration-300">
                <span className="absolute right-0 w-6 h-32 -mt-12 transition-all duration-300 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-[9rem] ease" />
                <span className="relative">{item?.CategoryName}</span>
              </button>
            </Link>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
};

export default Subjects;
