import Image from "next/image";
import React from "react";
import bkash from "../../public/image/Payment Methods/bkash.png";
import cod from "../../public/image/Payment Methods/cod.png";
import SectionContainer from "../reusable/SectionContainer";

const Methods = [
  {
    id: "BKASH",
    image: bkash,
  },
  // {
  //   id: 'NOGOD',
  //   image: nogod,
  // },
  // {
  //   id: 'ROCKET',
  //   image: rocket,
  // },
  // {
  //   id: 'SSL',
  //   image: ssl,
  // }
];

const PaymentMethod = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  COD,
  setCOD,
}) => {
  return (
    <div>
      <SectionContainer className="p-3" title="Payment Method" line>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="cash-on-delivery"
            className="flex items-center lg:hover:border-primary transition-all border-2 rounded-lg p-4 cursor-pointer "
          >
            <input
              type="checkbox"
              name="COD"
              id="cash-on-delivery"
              value="Cash on delivery"
              className="lg:mr-4 w-4 h-4 cursor-pointer accent-primary"
              checked={COD}
              onChange={() => setCOD(true)}
              onClick={() => setSelectedPaymentMethod("COD")}
            />
            <div className="flex items-center mx-4">
              <Image src={cod} alt="" />
              <p className=" text-secondary font-semibold ">Cash on delivery</p>
            </div>
          </label>
          <div className="grid-col-1 gap-6">
            {Methods?.map((method) => (
              <label
                key={method?.id}
                className="flex items-center lg:hover:border-primary transition-all border-2 rounded-lg p-4 cursor-pointer "
              >
                <input
                  type="radio"
                  name="gender"
                  id={method?.id}
                  value={method?.id}
                  className="lg:mr-8 w-4 h-4 cursor-pointer accent-primary"
                  checked={selectedPaymentMethod === method?.id && !COD}
                  onClick={() => setCOD(false)}
                  onChange={() => setSelectedPaymentMethod(method?.id)}
                />
                <div className="flex items-center mx-4">
                  <Image src={method?.image} alt="" />
                  {method?.name && (
                    <p className="text-xl text-secondary font-semibold ">
                      {method?.name}
                    </p>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default PaymentMethod;
