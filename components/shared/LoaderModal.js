import React from "react";
import Loader from "./Loader";

const LoaderModal = () => {
  return (
    <div className="h-screen bg-gray-700 bg-opacity-10 w-full absolute flex justify-center items-center">
      <div className="my-3 flex-center">
        <div className="spinner">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      </div>
    </div>
  );
};

export default LoaderModal;
