import React, { useEffect, useState } from "react";
import Image from "next/image";

const ContestCart = ({ contest }) => {
  const [more, setMore] = useState(false);
  const [day, setDay] = useState();
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
  const [second, setSecond] = useState();

  const timeRemaining = () => {
    const countdate = new Date(`${contest?.LastDateOfRegistration}`).getTime();
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
    <>
      <div
        key={contest._id}
        className="border w-full lg:md:pt-8 pt-4 rounded-lg"
      >
        <div className="lg:md:hidden block text-end">
          {contest?.ContestStatus == "Closed" ? (
            <span className="badge bg-red-600 lg:md:px-8 px-4 lg:md:py-4 py-[.75rem] mx-6  text-white">
              Closed
            </span>
          ) : (
            <span className="badge bg-[#1ECAA1] lg:md:px-8 px-4 lg:md:py-4 py-[.75rem] mx-6  text-white">
              Open
            </span>
          )}
        </div>
        <div className="flex-col lg:flex-row flex-between mx-8">
          <div className="lg:w-1/2">
            <h1 className="mb-3 font-bold lg:md:text-[20px] text-[15px] lg:md:text-start text-center flex items-center lg:md:justify-start justify-center font-bangla">
              {contest?.ContestName}
              <div className="lg:md:block hidden">
                {contest?.ContestStatus == "Closed" ? (
                  <span className="badge bg-red-600 lg:md:px-8 px-4 lg:md:py-[12px] py-[.75rem] mx-6  text-white">
                    Closed
                  </span>
                ) : (
                  <span className="badge bg-[#1ECAA1] lg:md:px-8 px-4 lg:md:py-[12px] py-[.75rem] mx-6  text-white">
                    Open
                  </span>
                )}
              </div>
            </h1>
            <p className="text-secondary lg:md:text-[16px] text-[13px] mb-4 font-bangla">
              {contest?.ContestDescription}
            </p>

            <ul className="list-disc text-gray-600 lg:md:text-[15px] text-[13px] px-12 font-bangla">
              {contest?.ContestPrizes?.map((item, index) => (
                <li key={index}>{item} </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col lg:items-end  items-center w-full">
            <h1 className="lg:md:my-3 mt-[35px] mb-[20px] font-bold lg:md:text-[20px] text-[15px] lg:md:text-start text-center font-bangla">
              রেজিস্ট্রেশনের সময় বাকি আর মাত্র
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
            <div className="lg:w-6/12 md:w-6/12 w-full overflow-hidden flex-nowrap">
              <h1 className="mt-6 text-secondary font-bold lg:md:text-[16px] text-[12px] lg:text-end md:text-end text-center font-bangla">
                রেজিস্ট্রেশন লিংকঃ{" "}
                <a
                  href="#"
                  className="text-blue-500 cursor-pointer hover:underline text-[12px] font-semibold font-poppins"
                >
                  {contest?.RegistrationURL}
                </a>
              </h1>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <Image
            src={contest?.ContestBanner}
            alt="contest"
            width={1900}
            height={300}
            layout="responsive"
            objectFit="cover"
            className="rounded-b-lg"
          />
        </div>
      </div>
    </>
  );
};

export default ContestCart;
