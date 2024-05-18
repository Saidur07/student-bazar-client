import React from "react";
import Link from "next/link";
const OrdersHeader = () => {
  return (
    <div className="flex w-full items-center  justify-between px-2">
      <h1 className="text-xl font-bold ">My Orders</h1>
      <div className="flex flex-col lg:flex-row justify-between items-center lg:my-0 my-4">
        <span className="text-[#8A8A8A] ml-[10px] hidden lg:inline-block">
          Sort by
        </span>
        <select className="border-none active:border-none text-primary ml-2 lg:my-0 my-4 text-center font-bold cursor-pointer">
          <option value="Received">Received</option>
          <option value="Paid">Paid</option>
        </select>
        {/* <Link href="tracking">
          <button className="btn btn-primary text-white mx-4">
            Track my order
          </button>
        </Link> */}
      </div>
    </div>
  );
};

export default OrdersHeader;
