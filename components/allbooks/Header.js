import React from "react";

const Header = ({ grid, setGrid }) => {
  return (
    <div className="custom-container">
      <div className="flex-between lg:flex-row flex-col">
        <div className="font-bold text-3xl lg:text-xl mb-8 lg:mb-0 font-bangla">
          সকল বই
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center lg:gap-8 gap-2">
          <div className=" lg:my-0 my-4">
            <span className="text-[#8A8A8A] font-poppins">
              Showcased by <b className="text-black font-sans">1</b> to{" "}
              <b className="text-black font-sans">32</b>
            </span>
            <span className="border-2 ml-3 text-[#8A8A8A] ">
              <select className="cursor-pointer">
                {/* will be dynamic */}
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </select>
            </span>
          </div>
          <div className=" lg:my-0 my-4">
            <span className="text-[#8A8A8A]">Sort by</span>
            <span>
              <select className="border-none active:border-none text-primary ml-3 cursor-pointer">
                <option value="1">Popularity</option>
                <option value="2">Price</option>
              </select>
            </span>
          </div>

          <div className="flex-between gap-4 lg:my-0 my-4">
            <span className="text-[#8A8A8A]">View by</span>
            <span className="flex justify-between gap-2">
              <button
                className={
                  grid
                    ? `bg-primary p-3 btn border-primary rounded-sm lg:hover:bg-primary lg:hover:border-primary`
                    : "bg-secondary p-3 border-secondary rounded-sm lg:hover:bg-primary lg:hover:border-primary"
                }
                onClick={() => setGrid(true)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 3H3V10H10V3Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 3H14V10H21V3Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 14H14V21H21V14Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 14H3V21H10V14Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                className={
                  grid
                    ? `p-3 btn border-secondary lg:hover:border-primary lg:hover:bg-primary bg-secondary rounded-sm`
                    : "p-3 btn bg-primary border-primary lg:hover:border-primary lg:hover:bg-primary rounded-sm"
                }
                onClick={() => setGrid(false)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 6H21"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 12H21"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 18H21"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 6H3.01"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 12H3.01"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 18H3.01"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
