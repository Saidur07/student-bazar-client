import Image from "next/image";
import React, { useEffect, useState } from "react";
import useBooks from "../hooks/useBooks";
import SectionContainer from "../reusable/SectionContainer";
import Book from "../shared/Book";
import BookSkeleton from "../shared/BookSkeleton";

const OfferCard = ({ offer }) => {
  const [books, loading] = useBooks();
  const [fav, setFav] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [day, setDay] = useState();
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
  const [second, setSecond] = useState();

  const timeRemaining = () => {
    const countdate = new Date(`${offer?.OfferEndingDate}`).getTime();
    if (countdate) {
      const now = new Date().getTime();
      const gap = countdate - now;

      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 60;

      const textDay = Math.floor(gap / day);
      const textHour = Math.floor((gap % day) / hour);
      const textMin = Math.floor((gap % hour) / minute);
      const textSec = Math.floor((gap % minute) / second);

      setDay(textDay < 0 ? 0 : textDay);
      setHour(textHour < 0 ? 0 : textHour);
      setMinute(textMin < 0 ? 0 : textMin);
      setSecond(textSec < 0 ? 0 : textSec);
    }
  };
  setInterval(timeRemaining, 1000);
  return (
    <SectionContainer className="bg-white p-8 my-5 shadow-md">
      <div key={offer?.OfferID}>
        <div className="flex-col lg:flex-row flex-between lg:items-start ">
          <div className="lg:w-1/2">
            <h1 className="font-bold lg:md:text-[24px] text-[16px] lg:md:text-start text-center font-bangla">
              {offer?.OfferName}
            </h1>
            <article
              className="text-secondary lg:md:text-[16px] text-[13px] mb-4 font-bangla"
              dangerouslySetInnerHTML={{ __html: offer?.OfferDesc }}
            >
              {/* {offer?.OfferDesc} */}
            </article>
          </div>
          <div className="flex flex-col lg:items-end ">
            <h1 className="mb-[20px] font-bold lg:md:text-[24px] text-[15px] lg:md:text-start text-center font-poppins">
              OFFER ENDING IN
            </h1>
            <div className="grid gap-4 text-center lg:md:grid-cols-4 grid-cols-4 mt-4 font-poppins font-bold">
              <div className="flex flex-col items-center justify-center w-[58px] lg:md:w-[60px] h-[58px] lg:md:h-[60px] text-primary border rounded-md px-[1.5rem] lg:md:py-4 py-[.75rem] ">
                <span className=" lg:md:text-[20px] text-[16px]">
                  <span>{day}</span>
                </span>
                <span className="lg:md:text-[12px] text-[10px] text-[#8A8A8A]">
                  Days
                </span>
              </div>
              <div className="flex flex-col items-center justify-center w-[58px] lg:md:w-[60px] h-[58px] lg:md:h-[60px] text-primary border rounded-md px-[1.5rem] lg:md:py-4 py-[.75rem]">
                <span className=" lg:md:text-[20px] text-[16px]">
                  <span id="hour">{hour}</span>
                </span>
                <span className="lg:md:text-[12px] text-[10px] text-[#8A8A8A]">
                  Hours
                </span>
              </div>
              <div className="flex flex-col items-center justify-center w-[58px] lg:md:w-[60px] h-[58px] lg:md:h-[60px] text-primary border rounded-md px-[1.5rem] lg:md:py-4 py-[.75rem]">
                <span className=" lg:md:text-[20px] text-[16px]">
                  <span id="minute">{minute}</span>
                </span>
                <span className="lg:md:text-[12px] text-[10px] text-[#8A8A8A]">
                  Min
                </span>
              </div>
              <div className="flex flex-col items-center justify-center w-[58px] lg:md:w-[60px] h-[58px] lg:md:h-[60px] text-primary border rounded-md px-[1.5rem] lg:md:py-4 py-[.75rem]">
                <span className=" lg:md:text-[20px] text-[16px]">
                  <span id="second">{second}</span>
                </span>
                <span className="lg:md:text-[12px] text-[10px] text-[#8A8A8A]">
                  Sec
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* books */}
      <div>
        <div className="">
          {loading || books.length < 1 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              <BookSkeleton></BookSkeleton>
              <BookSkeleton></BookSkeleton>
              <BookSkeleton></BookSkeleton>
              <BookSkeleton></BookSkeleton>
              <BookSkeleton></BookSkeleton>
              <BookSkeleton></BookSkeleton>
              <BookSkeleton></BookSkeleton>
              <BookSkeleton></BookSkeleton>
            </div>
          ) : (
            ""
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-5 gap-3">
            {/* items */}
            {showMore
              ? offer?.Products?.map((book, index) => {
                  {
                    book?.Discount;
                  }
                  return (
                    <div key={index}>
                      <Book
                        fav={fav}
                        setFav={setFav}
                        key={index}
                        book={book}
                      ></Book>
                    </div>
                  );
                })
              : offer?.Products?.slice(0, 6).map((book, index) => {
                  {
                    book?.Discount;
                  }
                  return (
                    <div key={index}>
                      <Book
                        fav={fav}
                        setFav={setFav}
                        key={index}
                        book={book}
                      ></Book>
                    </div>
                  );
                })}
          </div>
        </div>
        {offer?.Products?.length > 6 && (
          <div onClick={() => setShowMore(!showMore)} className="flex-center">
            <button className="font-poppins  mx-auto py-3 rounded-lg btn px-12 border bg-primary text-white text-center relative  overflow-hidden font-semibold lg:hover:bg-primary shadow-inner group  inline-flex group items-center justify-center  cursor-pointer  lg:hover:border-none">
              <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10 lg:hover:border-none" />
              {showMore ? "View less" : "View more"}
            </button>
          </div>
        )}
      </div>
    </SectionContainer>
  );
};

export default OfferCard;
