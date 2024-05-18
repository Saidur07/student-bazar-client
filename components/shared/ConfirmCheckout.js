import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import {
  GET_CHECKOUT_DATA,
  GET_ONLY_CHECKOUT_DATA,
  PLACE_ORDER,
} from "../../api";
import PaymentModal from "../checkout/PaymentModal";
import SectionContainer from "../reusable/SectionContainer";
import Loader from "./Loader";
const { useSelector } = require("react-redux");

const ConfirmCheckout = ({
  coupon,
  gift,
  selectedAddressID,
  selectedPaymentMethod,
  COD,
}) => {
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(subTotal);
  const [payTotal, setPayTotal] = useState(total);
  const router = useRouter();
  const cookie = new Cookies();
  const token = cookie.get("accessToken");
  const [orderDetails, setOrderDetails] = useState({});
  const [shipping, setShipping] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [verification, setVerification] = useState(false);
  const user = useSelector((data) => data.userData);

  function _openModal() {
    setIsOpen(true);
  }
  function _closeModal() {
    setIsOpen(false);
  }

  // GET CHECKOUT DATA
  const fetchCheckoutData = async () => {
    if (selectedAddressID.length !== {}) {
      const { data } = await axios.get(
        GET_CHECKOUT_DATA.replace("[AddressID]", selectedAddressID).replace(
          "[GiftWrap]",
          giftWrap
        ),
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data?.checkout_info === undefined) {
        return {};
      } else {
        return data?.checkout_info ? data?.checkout_info : {};
      }
    } else if (!selectedAddressID) {
      const { data } = await axios.get(
        GET_ONLY_CHECKOUT_DATA.replace("[GiftWrap]", giftWrap),
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data?.checkout_info === undefined) {
        return {};
      } else {
        return data?.checkout_info ? data?.checkout_info : {};
      }
    }
  };

  const {
    isRefetching: checkoutRefetching,
    data: checkoutData,
    refetch,
    isLoading: checkoutLoading,
  } = useQuery(["checkoutData"], () => fetchCheckoutData());

  // Refetch Checkout Data

  useEffect(() => {
    refetch();
  }, [selectedAddressID, giftWrap, refetch]);

  // SET DATA

  useEffect(() => {
    if (checkoutData) {
      setSubTotal(Math.round(checkoutData?.Price));
      setTotal(Math.round(checkoutData?.TotalPrice));
      setPayTotal(Math.round(checkoutData?.TotalPrice));
      setShipping(Math.round(checkoutData?.DeliveryCharge));
    }
  }, [checkoutData]);

  //
  //
  // HANDLE CONFIRM
  //
  //
  console.log("cod", COD);
  console.log(selectedPaymentMethod);
  const handleConfirm = async () => {
    if (checkoutData?.TotalPrice > 0) {
      if (router.pathname !== "/checkout") {
        router.push("/checkout");
      } else {
        if ((selectedPaymentMethod && selectedAddressID) || COD) {
          const formData = new FormData();
          formData.append("AddressID", selectedAddressID);
          formData.append("PaymentMethod", selectedPaymentMethod);
          formData.append("GiftWrap", giftWrap);
          formData.append("CouponCode", coupon);
          formData.append("COD", COD);
          // const data = {
          //   AddressID: selectedAddressID,
          //   PaymentMethod: selectedPaymentMethod,
          //   COD: COD,
          // };
          axios
            .post(PLACE_ORDER, formData, {
              headers: {
                Authorization: `${token}`,
              },
            })
            .then((res) => {
              setLoader(true);
              setOrderDetails(res.data);
              _openModal();
              setLoader(false);
            })
            .catch((err) => {
              toast.error(err.response.data.message);
            });
        } else {
          toast.error("Please select a payment method and address");
        }
      }
    } else {
      toast.warning("Please add atleast one product to cart");
    }
  };

  //
  //
  // Handle Cupon
  //
  //
  const applyCoupon = (e) => {
    e.preventDefault();
    const code = e.target.couponField.value;
    if (!user?.PhoneVerified) {
      setVerification(true);
    }
  };

  return (
    <SectionContainer className="p-4 bg-white" title="Checkout Summery">
      <div className="flex items-center justify-between">
        <p className="text-secondary text-lg">
          Sub Total (item {checkoutData ? checkoutData?.Items?.length : 0})
        </p>
        <p className="text-lg font-bold">
          {checkoutData?.Price ? Number(Math.round(subTotal)) : 0}
        </p>
      </div>
      <div className="flex items-center justify-between my-2">
        <p className="text-secondary text-lg">Shipping Fee</p>
        <p className="text-lg font-bold">
          {checkoutData?.DeliveryCharge ? (
            Number(Math.round(shipping))
          ) : checkoutLoading || checkoutRefetching ? (
            <span className="text-xs text-primary">Loading...</span>
          ) : (
            <span className="text-xs text-primary">Address not selected</span>
          )}
        </p>
      </div>
      <div className="flex items-center justify-between my-2">
        <p className="text-secondary text-lg">Total</p>
        <p className="text-lg font-bold">
          {checkoutData?.TotalPrice ? Number(Math.round(total)) : 0}
        </p>
      </div>
      {checkoutRefetching || checkoutLoading ? (
        <div className="flex items-center justify-between mt-2">
          <p className="font-medium text-lg text-primary">Loading... </p>
          <p className="text-lg font-bold text-primary">....</p>
        </div>
      ) : (
        <div className="flex items-center justify-between mt-2">
          <p className="font-medium text-lg text-primary">Payable Total </p>
          <p className="text-lg font-bold">
            {total ? Number(Math.round(payTotal)) : 0}
          </p>
        </div>
      )}
      <div className="flex items-center  mt-4">
        <input
          type="checkbox"
          onChange={() => setGiftWrap(!giftWrap)}
          className="h-4 w-4 mr-2 cursor-pointer accent-primary"
          id="gift"
        />

        <label
          htmlFor="gift"
          className="text-primary cursor-pointer font-semibold"
        >
          Gift wrap for 20 Tk
        </label>
      </div>
      <form
        onSubmit={applyCoupon}
        className={
          coupon ? coupon : "flex items-stretch justify-center w-full mt-8 mb-4"
        }
      >
        <input
          type="text"
          className="form-control w-9/12  px-4 py-1.5 font-normal text-gray-700 bg-white bg-clip-padding rounded-none border-solid border border-[#595959] border-r-0  transition-all ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
          placeholder="Enter Coupon Code"
          aria-label="coupon"
          aria-describedby="button-addon2"
          name="couponField"
          required
        />
        <button
          className="btn inline-block rounded-none w-3/12 px-6 py-2 bg-primary text-white font-medium text-xs lg:hover:bg-primary focus:bg-primary border border-primary focus:shadow-lg focus:outline-none focus:ring-0"
          type="submit"
          id="button-addon2"
        >
          Apply
        </button>
      </form>

      <div
        className={
          !gift
            ? "flex justify-center py-6"
            : "flex sm:flex-row flex-col space-y-2 sm:space-y-0 justify-between py-6"
        }
      >
        <Link href="/gift">
          <button
            className={
              gift
                ? "hidden"
                : "lg:w-1/2 sm:mr-2 btn border btn-primary text-xs btn-outline px-11 text-white text-center rounded overflow-hidden font-semibold shadow-inner transition-all normal-case"
            }
          >
            Order as gift
          </button>
        </Link>

        <button
          onClick={() => handleConfirm()}
          className={
            gift
              ? "btn btn-block border text-xs btn-primary text-white text-center rounded-lg overflow-hidden font-semibold shadow-inner transition-all normal-case"
              : "btn border btn-primary text-xs text-white text-center rounded px-11 overflow-hidden font-semibold shadow-inner transition-all normal-case"
          }
        >
          {gift ? "Confirm Order" : "Place order"}
        </button>

        <PaymentModal
          selectedPaymentMethod={selectedPaymentMethod}
          orderDetails={orderDetails}
          modalIsOpen={modalIsOpen}
          closeModal={_closeModal}
          COD={COD}
          selectedAddressID={selectedAddressID}
        />
        {loader ? <Loader></Loader> : ""}
      </div>

      <div className="my-2">
        <input
          type="checkbox"
          id="my-modal-7"
          className="modal-toggle"
          onChange={() => {}}
          checked={verification ? true : false}
        />
        <div className="modal">
          <div className="modal-box py-8 flex-center flex-col px-4 ">
            <button
              onClick={() => setVerification(false)}
              className="btn btn-sm btn-circle absolute right-2 top-2 hover:text-white text-primary"
            >
              ✕
            </button>
            <h3 className="font-bold text-center text-2xl text-primary">
              Please Verifiy Your Phone Number
            </h3>

            <hr className="w-full  my-4" />

            <div className="form-control  w-2/3 mb-8">
              <label className="label">
                <span className="  font-semibold">Type your phone number</span>
              </label>
              <input
                required
                type="number"
                placeholder="Type your phone number"
                name="PhoneNumber"
                className="input rounded-none input-bordered w-full text-black"
              />
            </div>

            <div className="flex-center">
              <label
                htmlFor="otp-modal"
                className="btn btn-block btn-primary text-white py-1 px-12 rounded-sm"
              >
                Send OTP Code
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <input type="checkbox" id="otp-modal" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box relative">
            <label
              htmlFor="otp-modal"
              className="btn btn-sm btn-square border border-secondary text-black hover:text-white absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-2xl text-center mb-6 text-primary font-bold">
              Type your OTP code
            </h3>
            <form className="border-t">
              <div
                id="otp"
                className="flex flex-row justify-center text-center px-2 mt-5"
              >
                <input
                  className="m-2 border text-4xl h-14 lg:h-24 w-14 lg:w-20 text-center form-control rounded bg-[#FFF9F5] outline-none "
                  type="number"
                  id="first"
                  maxLength={1}
                  required
                />
                <input
                  className="m-2 border text-4xl h-14 lg:h-24 w-14 lg:w-20 text-center form-control rounded bg-[#FFF9F5] outline-none "
                  type="number"
                  id="second"
                  maxLength={1}
                  required
                />
                <input
                  className="m-2 border text-4xl h-14 lg:h-24 w-14 lg:w-20 text-center form-control rounded bg-[#FFF9F5] outline-none "
                  type="number"
                  id="third"
                  maxLength={1}
                  required
                />
                <input
                  className="m-2 border text-4xl h-14 lg:h-24 w-14 lg:w-20 text-center form-control rounded bg-[#FFF9F5] outline-none "
                  type="number"
                  id="fourth"
                  maxLength={1}
                  required
                />
                <input
                  className="m-2 border text-4xl h-14 lg:h-24 w-14 lg:w-20 text-center form-control rounded bg-[#FFF9F5] outline-none "
                  type="number"
                  id="fifth"
                  maxLength={1}
                  required
                />
              </div>
              <button
                type="submit"
                className="block mx-auto w-full py-3 rounded-lg btn my-8 px-12 border bg-primary text-white text-center relative  overflow-hidden font-semibold   shadow-inner group lg:hover:bg-slate-700 transition-all"
              >
                Submit
              </button>
            </form>
            <p className="text-secondary text-sm my-2 font-semibold">
              We sent your OTP at
              <span className="text-primary ml-1">+ 880 1777777777</span>
            </p>
            <p className="text-secondary text-sm font-semibold">
              Did not receive any code?
              <span className="text-primary underline ml-1 cursor-pointer hover:text-secondary">
                resend code
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ConfirmCheckout;
