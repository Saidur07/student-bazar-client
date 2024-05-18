import React from "react";
import Image from "next/image";
import NewsletterImg from "../../public/image/newsletter.png";
const Newsletter = () => {
  return (
    <div className="flex-center flex-col mb-16">
      <Image src={NewsletterImg} alt="News letter" width={300} height={300} />
      <div>
        <h3 className="text-center font-semibold text-secondary text-xl lg:text-3xl">
          Subscribe To
        </h3>
        <h1 className="text-center font-semibold text-gray-800 my-6  text-2xl lg:text-4xl">
          OUR NEWSLETTER
        </h1>
        <div className="flex items-stretch justify-center w-full mt-8 mb-4">
          <input
            type="email"
            className="form-control w-48 lg:w-96  px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding rounded-none border-solid border border-[#595959] border-r-0  transition-all ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
            placeholder="Enter Your Email"
            aria-label="coupon"
            aria-describedby="button-addon2"
            required
          />
          <button
            className="btn inline-block rounded-none  px-6 py-2 bg-primary text-white font-medium text-xs lg:hover:bg-primary focus:bg-primary border border-primary focus:shadow-lg focus:outline-none focus:ring-0"
            type="button"
            id="button-addon2"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
