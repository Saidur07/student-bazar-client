import React from "react";

const AddToFavBtn = ({ AddToFavFunc, content }) => {
  return (
    <button
      className="btn btn-block font-semibold btn-secondary btn-outline lg:hover:text-white flex-nowrap lg:hover:btn-primary  rounded lg:text-secondary normal-case px-2 text-xs"
      onClick={AddToFavFunc}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      {content}
    </button>
  );
};
const AddToCartBtn = ({ AddToCartFunc, content }) => {
  return (
    <button
      onClick={AddToCartFunc}
      className="btn btn-block btn-primary font-semibold rounded text-white normal-case flex-nowrap  text-xs"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {content}
    </button>
  );
};

export { AddToFavBtn, AddToCartBtn };
