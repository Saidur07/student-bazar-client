import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SectionContainer from "../reusable/SectionContainer";

const CheckoutSummary = ({
  coupon,
  setCode,
  cartLoading,
  checkoutData,
  setGiftWrap,
  giftWrap,
  checkoutRefetching,
}) => {
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(subTotal);
  const [payTotal, setPayTotal] = useState(total);
  const router = useRouter();
  const [shipping, setShipping] = useState(0);
  const user = useSelector((data) => data.userData);

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
  const handleConfirm = async () => {
    if (checkoutData?.TotalPrice > 0) {
      if (router.pathname !== "/checkout") {
        router.push("/checkout");
      }
    } else {
      toast.warning("Please add atleast one product to cart");
    }
  };

  //
  //
  // SET COUPON
  //
  //
  const applyCoupon = (e) => {
    e.preventDefault();
    const code = e.target.couponField.value;
    if (!user?.PhoneVerified) {
      toast.warning(
        "You must verify your phone number to use coupons! Verify your phone at profile page."
      );
      router.push("/account/profile");
      return;
    }
    setCode(code);
  };
  return (
    <SectionContainer className="mx-auto bg-white" title="Checkout Summery">
      <div>
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
        {checkoutRefetching || cartLoading ? (
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
            checked={giftWrap}
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
      </div>

      <form
        onSubmit={applyCoupon}
        className={
          coupon
            ? "flex mt-8"
            : "flex items-stretch justify-center w-full mt-8 mb-4"
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
      {/* <div className="w-full grid grid-cols-2 items-center gap-4">
        <Link href="/gift">
          <button className="btn border text-xs btn-primary btn-outline text-white text-center rounded-lg overflow-hidden font-semibold shadow-inner transition-all normal-case">
            Order As Gift
          </button>
        </Link>
        <button
          onClick={() => handleConfirm()}
          className="btn border text-xs btn-primary text-white text-center rounded-lg overflow-hidden font-semibold shadow-inner transition-all normal-case"
        >
          Confirm Order
        </button>
      </div> */}
      <div
        className={
          "flex items-center sm:flex-row flex-col space-y-2 sm:space-y-0 justify-between py-6"
        }
      >
        <button
          onClick={() => handleConfirm()}
          className={
            "lg:w-full btn btn-block border text-xs btn-primary text-white text-center rounded-none overflow-hidden font-semibold shadow-inner transition-all normal-case"
          }
        >
          Confirm Order
        </button>
      </div>
    </SectionContainer>
  );
};

export default CheckoutSummary;
