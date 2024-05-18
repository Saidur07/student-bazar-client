import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import placeholder from "../../public/image/avatar.jpg";

const OrdersCard = ({ book }) => {
  const router = useRouter();
  return (
    <div className="">
      <div className="border p-4 rounded-lg hidden lg:block">
        <div className="flex justify-between items-center my-3 pb-3 border-b">
          <div>
            <span className="font-semibold cursor-pointer lg:hover:text-primary transition-all  ">
              Order ID
            </span>
            <p className="font-bold text-primary text-xl">#{book?.OrderID}</p>
          </div>
          <button
            className="btn btn-sm rounded-none btn-primary text-white"
            onClick={() => router.push(`/order/${book?.OrderID}`)}
          >
            Track order
          </button>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {book?.Products?.map((item, index) => (
            <div
              key={index}
              className="lg:flex flex-row w-full  space-x-4 items-center justify-between grid grid-cols-2 "
            >
              <div className="flex flex-row items-center space-y-4 lg:space-y-0 col-span-1">
                <div className="flex flex-row">
                  <Image
                    src={item?.ProductImage}
                    alt="Book"
                    width={80}
                    height={120}
                    priority={true}
                    className="cursor-pointer lg:hover:scale-105 transition-all rounded w-full "
                  />
                </div>

                <div className="mx-4">
                  <span className="font-semibold cursor-pointer lg:hover:text-primary transition-all font-bangla text-lg ">
                    <span>
                      {item?.ProductTitle?.length > 20
                        ? item?.ProductTitle?.slice(0, 20) + "..."
                        : item?.ProductTitle}
                    </span>
                  </span>
                </div>
              </div>
              <div className="col-span-1 flex items-center  ">
                <p className=" mr-3 text-sm">
                  Date :{" "}
                  <span className="text-xs">
                    <b>{book?.OrderCreatedAt.slice(0, 10)}</b>
                  </span>
                </p>
                <button
                  className={`btn btn-xs mx-3 ${
                    book?.OrderStatus === "SHIPPED" ||
                    book?.OrderStatus === "DELIVERED"
                      ? "bg-[#1ECAA1]"
                      : book?.OrderStatus === "PROCESSING" ||
                        book?.OrderStatus === "RECEIVED"
                      ? "bg-[#F2C833]"
                      : book?.OrderStatus === "DELIVERY_FAILED" ||
                        book?.OrderStatus === "CANCELED_BY_CUSTOMER" ||
                        book?.OrderStatus === "CANCELED_BY_SELLER"
                      ? "bg-[#da290a]"
                      : "bg-[#33ADF2]"
                  }  text-white rounded-full  lg:hover:border-none border-none cursor-context-menu`}
                >
                  {book?.OrderStatus}
                </button>
                <span className="text-sm ml-3">
                  {" "}
                  Qnt: <b>{item?.Quantity}</b>{" "}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border p-4 rounded-lg lg:hidden block">
        <div className="flex justify-between items-center my-3 pb-3 border-b">
          <div>
            <span className="font-semibold cursor-pointer lg:hover:text-primary transition-all my-2">
              Order ID{" "}
              <span className="font-bold text-primary text-xl">
                #{book?.OrderID}
              </span>
            </span>

            <p className=" mr-3">
              Date : <b>{book?.OrderCreatedAt.slice(0, 10)}</b>
            </p>
          </div>
          <button
            className="btn btn-sm btn-primary text-white"
            onClick={() => router.push(`/order/${book?.OrderID}`)}
          >
            Track order
          </button>
        </div>
        {book?.Products?.map((item, index) => (
          <div
            key={index}
            className="flex  flex-row   items-center justify-between  py-6 px-2 rounded-lg"
          >
            <div className="flex flex-row items-center space-y-4 lg:space-y-0 ">
              <div className="flex flex-row">
                <Image
                  src={item?.ProductImage ? item?.ProductImage : placeholder}
                  alt="Book"
                  width={80}
                  height={120}
                  priority={true}
                  className="cursor-pointer lg:hover:scale-105 transition-all rounded w-full "
                />
              </div>

              <div className="mx-4">
                <span className="font-semibold cursor-pointer lg:hover:text-primary transition-all font-bangla  ">
                  <span>
                    {item?.ProductTitle?.length > 20
                      ? item?.ProductTitle?.slice(0, 20) + "..."
                      : item?.ProductTitle}
                  </span>
                  <p className="text-secondary">x {item?.Quantity}</p>
                </span>
              </div>
            </div>
            <button
              className={` ${
                book?.OrderStatus === "SHIPPED" ||
                book?.OrderStatus === "DELIVERED"
                  ? "bg-[#1ECAA1]"
                  : book?.OrderStatus === "PROCESSING" ||
                    book?.OrderStatus === "RECEIVED"
                  ? "bg-[#F2C833]"
                  : book?.OrderStatus === "DELIVERY_FAILED" ||
                    book?.OrderStatus === "CANCELED_BY_CUSTOMER" ||
                    book?.OrderStatus === "CANCELED_BY_SELLER"
                  ? "bg-[#da290a]"
                  : "bg-[#33ADF2]"
              }  btn flex justify-end btn-sm mx-3  text-white rounded-full  lg:hover:border-none border-none cursor-context-menu`}
            >
              {book?.OrderStatus}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersCard;
