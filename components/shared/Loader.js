import React from "react";

const Loader = () => {
  return (
    <div className="my-6 flex-center">
      <div className="spinner">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
    </div>
  );
};

export default Loader;
