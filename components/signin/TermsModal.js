import axios from "axios";
import React, { useEffect, useState } from "react";
import { GET_TERMS_AND_CONDITIONS } from "../../api";

const TermsModal = ({ setChecked }) => {
  const [terms, setTerms] = useState("");
  useEffect(() => {
    axios
      .get(GET_TERMS_AND_CONDITIONS)
      .then((res) => setTerms(res.data.data.TermsCondition));
  }, []);
  return (
    <div>
      <input
        type="checkbox"
        id="terms-modal"
        className="modal-toggle accent-primary"
      />
      <div className="modal modal-middle">
        <div className="modal-box w-full lg:max-w-4xl">
          <label
            htmlFor="terms-modal"
            className="absolute right-2 top-2 cursor-pointer p-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 font-bold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </label>

          <div>
            <h1 className="text-primary text-3xl font-bold font-poppins my-4 text-center">
              Terms And Conditions
            </h1>
            <div className="lg:px-8 px-2">
              <article
                className="text-secondary text-sm lg:px-8 px-2 min-h-[40vh] max-h-screen little-scrollbar overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: terms }}
              ></article>
              <div className="h-28 flex-center space-x-2 bg-white">
                <label
                  className="btn-primary btn-outline btn rounded lg:btn-wide lg:hover:text-white btn-md"
                  onClick={() => setChecked(false)}
                  htmlFor="terms-modal"
                >
                  Decline
                </label>
                <label
                  className="btn-primary btn rounded lg:btn-wide btn-md text-white"
                  onClick={() => setChecked(true)}
                  htmlFor="terms-modal"
                >
                  Accept
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
