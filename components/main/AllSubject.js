import Link from "next/link";
import React from "react";

const AllSubject = ({ subjects }) => {
  // console.log(subjects);
  return (
    <div>
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 text-center lg:py-5 py-3 mb-14">
        {subjects.map((item) => (
          <Link
            href={`subject/${item?.ProductType}?CategoryID=${item?.CategoryID}`}
            key={item._id}
            className="cursor-pointer"
          >
            <button className="py-4  px-2 md:px-4 lg:px-10 lg:hover:bg-primary border border-primary font-bangla text-md rounded-md text-white cursor-pointer transition-all overflow-hidden group  relative bg-gray-900   ease-out duration-300">
              <span className="absolute right-0 w-6 h-32 -mt-12 transition-all duration-500 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-[9rem] ease" />
              <span className="relative">{item?.CategoryName}</span>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllSubject;
