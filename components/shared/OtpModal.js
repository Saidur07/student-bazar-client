import React from "react";

const OtpModal = ({ getOtp, focusNextTarget }) => {
  return (
    <form onSubmit={getOtp}>
      <div
        id="otp"
        className="grid grid-cols-6 text-center gap-3"
        onKeyUp={focusNextTarget}
      >
        <input
          className="border text-4xl h-12 lg:h-20 text-center form-control rounded bg-[#FFF9F5] outline-none "
          id="first"
          type="text"
          maxLength="1"
          required
        />
        <input
          className="border text-4xl h-12 lg:h-20 text-center form-control rounded bg-[#FFF9F5] outline-none "
          id="second"
          type="text"
          maxLength="1"
          required
        />
        <input
          className="border text-4xl h-12 lg:h-20 text-center form-control rounded bg-[#FFF9F5] outline-none "
          id="third"
          type="text"
          maxLength="1"
          required
        />
        <input
          className="border text-4xl h-12 lg:h-20 text-center form-control rounded bg-[#FFF9F5] outline-none"
          id="fourth"
          type="text"
          maxLength="1"
          required
        />
        <input
          className="border text-4xl h-12 lg:h-20 text-center form-control rounded bg-[#FFF9F5] outline-none "
          id="fifth"
          type="text"
          maxLength="1"
          required
        />
        <input
          className="border text-4xl h-12 lg:h-20 text-center form-control rounded bg-[#FFF9F5] outline-none "
          id="sixth"
          type="text"
          maxLength="1"
          required
        />
      </div>
      <button
        type="submit"
        className="block mx-auto w-full py-3 rounded-lg btn my-8 px-12 border bg-primary text-white text-center relative  overflow-hidden font-semibold   shadow-inner group lg:hover:bg-slate-700 transition-all"
      >
        Submit
      </button>
    </form>
  );
};

export default OtpModal;
