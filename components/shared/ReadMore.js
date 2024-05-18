import React, { useState } from "react";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <p className="text-[#737373] lg:md:text-[20px] text-[13px] font-normal lg:mt-[13px] my-1">
      {isReadMore ? text?.slice(0, 500) : text}
      {text?.length > 500 ? (
        <span onClick={toggleReadMore} className="read-or-hide ">
          {isReadMore ? (
            <h2 className="text-[#F26133] font-poppins lg:md:text-[20px] text-[13px]  cursor-pointer hover:text-secondary hover:underline">
              <br />
              Read More
            </h2>
          ) : (
            <h2 className="text-[#F26133] font-poppins lg:md:text-[20px] text-[13px] cursor-pointer hover:text-secondary hover:underline">
              <br />
              Show Less
            </h2>
          )}
        </span>
      ) : (
        ""
      )}
    </p>
  );
};

export default ReadMore;
