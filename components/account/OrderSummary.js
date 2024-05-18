import Image from "next/image";
import React from "react";
import SectionContainer from "../reusable/SectionContainer";

const OrderSummury = ({ order }) => {
  const columns = ["পণ্য", "পরিমান", "মূল্য", "মোট", "তারিখ", "স্ট্যাটাস"];
  return (
    <SectionContainer className="p-4 bg-white mb-3" title="Order Summary">
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              {columns?.map((column, index) => (
                <th
                  key={index}
                  className="bg-slate-200 py-2 !rounded-none text-lg font-bangla !static"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {order?.Products?.map((item, index) => (
              <tr key={index} className="font-bangla md:text-lg ">
                <td className="flex gap-2 bg-transparent">
                  <Image
                    src={item?.ProductImage}
                    alt={item?.ProductTitle}
                    width={80}
                    height={100}
                    objectFit="cover"
                  />
                  <div className="">
                    <p>{item?.ProductTitle}</p>
                    {/* Product Price */}

                    {/* Status */}
                    <div className="font-bangla">
                      {item?.OrderTracking?.Status === "PENDING" ? (
                        <p className="text-sm text-green-500">
                          The product has been delivered
                        </p>
                      ) : (
                        <p className="text-sm text-primary">
                          The product is on its way
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="bg-transparent">
                  <button>{item?.Quantity}</button>
                </td>
                <td className="bg-transparent">
                  <p className="text-lg">
                    {!isNaN(item?.SalePrice) && item?.SalePrice} Tk
                  </p>
                </td>
                <td className="bg-transparent">
                  <p className="text-lg">
                    {!isNaN(item?.TotalPrice) && Math.round(item?.TotalPrice)}{" "}
                    Tk
                  </p>
                </td>
                <td className="bg-transparent">
                  {" "}
                  {new Date(order?.OrderCreatedAt).toLocaleDateString()}
                </td>
                <td className="bg-transparent">
                  <p>{order?.OrderStatus}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Total Calculation UI */}

      <div className="flex border-t md:justify-end pt-3">
        <div className="grid grid-cols-3 gap-5 md:text-xl  font-bangla">
          <div className="col-span-2">
            <p>Sub Total ({order?.Products?.length} Items)</p>
            <p>Shipping Fee</p>
            <p>Payable Total</p>
            <p>
              Payable Total (
              {order?.AdvancePaid === order?.TotalPrice ? (
                <span>paid</span>
              ) : (
                <span className="text-sm">
                  Due: {Math.round(order?.TotalPrice - order?.AdvancePaid)}tk
                </span>
              )}
              )
            </p>
          </div>
          <div>
            {/* Subtotal */}
            <p className="">
              {order?.Products?.reduce(
                (index, item) =>
                  (index = index + parseFloat(Math.round(item.TotalPrice))),
                0
              )}
              Tk
            </p>
            {/* Shipping fee */}
            <p className="">
              {!isNaN(order?.DeliveryCharge) &&
                Math.round(order?.DeliveryCharge)}
              Tk
            </p>
            {/* Payable Total */}
            <p className="">
              {!isNaN(order?.Price) && Math.round(order?.Price)}Tk
            </p>
            <p className="">
              {!isNaN(order?.TotalPrice) && Math.round(order?.TotalPrice)}Tk
            </p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default OrderSummury;
