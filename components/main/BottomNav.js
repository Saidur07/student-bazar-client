import Link from "next/link";
import React from "react";
import { FaHome, FaShoppingCart, FaTag } from "react-icons/fa";
import { FaUserCircle } from "./../../node_modules/react-icons/fa/index.esm";

const BottomNav = () => {
  return (
    <div className=" lg:hidden">
      <section
        id="bottom-navigation"
        className=" bg-white fixed inset-x-0 bottom-0 z-10  shadow-md border-t-2 border-yellow-500"
      >
        <div id="tabs" className="grid grid-cols-4 w-full ">
          <Link
            href="/"
            className="w-full focus:text-primary hover:text-primary justify-center inline-block  text-center cursor-pointer"
          >
            <div className=" flex-center flex-col hover:bg-primary p-2 rounded-sm hover:text-white transition-all group font-poppins text-sm">
              <FaHome size={"1.5rem"} />
              Home
            </div>
          </Link>
          <Link
            href="/extras/offers"
            className="w-full focus:text-primary hover:text-primary justify-center inline-block  text-center cursor-pointer"
          >
            <div className=" flex-center flex-col hover:bg-primary p-2 rounded-sm hover:text-white transition-all group font-poppins text-sm">
              <FaTag size={"1.5em"} />
              Offers
            </div>
          </Link>
          <Link
            href="/cart"
            className="w-full focus:text-primary hover:text-primary justify-center inline-block  text-center cursor-pointer"
          >
            <div className=" flex-center flex-col hover:bg-primary p-2 rounded-sm hover:text-white transition-all group font-poppins text-sm">
              <FaShoppingCart size={"1.5em"} />
              Cart
            </div>
          </Link>
          <Link
            href="/account/profile"
            className="w-full focus:text-primary hover:text-primary justify-center inline-block  text-center cursor-pointer"
          >
            <div className=" flex-center flex-col hover:bg-primary p-2 rounded-sm hover:text-white transition-all group font-poppins text-sm">
              <FaUserCircle size={"1.5em"} />
              Account
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BottomNav;
