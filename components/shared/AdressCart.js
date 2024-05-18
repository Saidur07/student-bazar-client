import React from "react";

const AdressCart = ({
  address,
  selectedAddressID,
  setSelectedAddressID,
  index,
}) => {
  return (
    <div>
      <p className="text-xl  font-semibold text-center pb-3  ">
        {address?.ReceiveAt == 1 ? "Home" : "Office"}
      </p>
      <hr className="w-3/4 container mx-auto" />
      <div className="flex">
        <div className="flex items-center justify-center  mx-2">
          <input
            type="radio"
            name=""
            className="w-5 h-5 accent-primary"
            checked={selectedAddressID === address.AddressID}
            onChange={() => setSelectedAddressID(address.AddressID)}
            id={`addType${index}`}
          />
        </div>
        <div className="">
          <div className=" mx-2 my-4">
            <p className="my-2">
              <b>Name : </b>{" "}
              <span className="text-gray-600 font-medium">
                {address?.FullName}
              </span>{" "}
            </p>
            <p className="my-2">
              <b>Phone : </b>{" "}
              <span className="text-gray-600 font-medium">
                {address?.PhoneNumber}
              </span>{" "}
            </p>
            <p className="my-2">
              <b>Alternative Phone : </b>{" "}
              <span className="text-gray-600 font-medium">
                {address?.AlternatePhoneNumber}
              </span>{" "}
            </p>
            <p className="my-2">
              <b>Address : </b>{" "}
              <span className="text-gray-600 font-medium">
                {address?.Address}
              </span>{" "}
            </p>
          </div>
          <div className=" px-2 flex items-center justify-evenly">
            <div
              className="flex items-center my-2 cursor-pointer lg:hover:text-secodary text-primary lg:hover:underline"
              onClick={() => deleteAddress(address?.AddressID)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <p className=" font-medium ">Delete</p>
            </div>
            <div className="flex items-center  cursor-pointer lg:hover:text-secodary text-primary lg:hover:underline">
              <label
                htmlFor="shipping-info-modal"
                className="flex items-center  cursor-pointer lg:hover:text-secodary text-primary lg:hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <p className=" font-medium ">Edit</p>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdressCart;
