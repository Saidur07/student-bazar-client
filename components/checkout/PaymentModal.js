/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Lottie from "react-lottie";
import Modal from "react-modal";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { SUBMIT_PAYMENT_TRANSACTION, UPDATE_CART_DATA } from "../../api";
import confirmed from "../../public/confirmed.json";
import Loader from "../shared/Loader";
const { useSelector, useDispatch } = require("react-redux");

const PaymentModal = ({
  modalIsOpen,
  afterOpenModal,
  closeModal,
  selectedPaymentMethod,
  orderDetails,
}) => {
  const [SenderCredential, setSenderCredential] = useState("");
  const [TransactionCredential, setTransactionCredential] = useState("");
  const [OrderSuccess, setOrderSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const cookie = new Cookies();
  const router = useRouter();
  const [accessToken, setAccessToken] = useState(cookie.get("accessToken"));
  const cartsData = useSelector((data) => data.getCart);
  const dispatch = useDispatch();

  Modal.defaultStyles.overlay.backgroundColor = "rgba(0,0,0,.4)";

  /**
   *
   *
   * DELETE ALL CART DATA
   *
   *
   * */

  const deleteAllData = async () => {
    if (cartsData.length !== 0) {
      const cart_data = { cart_data: [] };
      const { data } = await axios.put(UPDATE_CART_DATA, cart_data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });
      dispatch({
        type: "SET_CART_ITEMS",
        payload: data?.cart_data?.Items ? data?.cart_data?.Items : [],
      });
    }
  };

  /**
   *
   *
   * Submit Transaction ID
   *
   *
   */

  const submit_trx = async (e) => {
    e.preventDefault();
    if (
      !SenderCredential ||
      !TransactionCredential ||
      SenderCredential.length < 10 ||
      TransactionCredential < 10
    ) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    const data = {
      SenderCredential: SenderCredential,
      TrxID: TransactionCredential,
      OrderID: orderDetails?.OrderData?.OrderID,
    };
    axios
      .post(SUBMIT_PAYMENT_TRANSACTION, data, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          toast.success(res.data.message);
          setOrderSuccess(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data.message);
      })
      .finally(() => {
        deleteAllData();
        setLoading(false);
      });
  };
  const confirmedOptions = {
    loop: true,
    autoplay: true,
    animationData: confirmed,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      contentLabel="Payment Modal"
      className="lg:w-1/3 md:w-4/6 w-full lg:p-0 grid mx-auto mb-0 bg-white  p-4 relative rounded-xl top-1/2 -translate-y-1/2 "
    >
      {!loading ? (
        !OrderSuccess ? (
          <>
            <div className="border-b border-secondary">
              <h2 className="text-[#343434] text-3xl text-center font-medium py-6 ">
                Payment By {selectedPaymentMethod}
              </h2>
              <p className="text-center pb-6 text-sm">
                Our {selectedPaymentMethod} Number :{" "}
                <span className="text-primary">01711-20 55 66</span>
              </p>
            </div>
            <div>
              <p className=" text-center mx-auto py-4 md:text-xl text-sm w-5/6">
                After Sending the money you have to give us your bKash number
                that you just paid and the Transiction ID
              </p>
              <form className="my-4">
                <div className=" w-8/12 mx-auto gap-4">
                  <div className="grid my-2">
                    <label className="text-sm text-gray-600 my-1">
                      Your bKash Number
                    </label>

                    <div className="flex">
                      <p className="border flex-center px-2 bg-gray-200">
                        +880
                      </p>
                      <input
                        required
                        type="text"
                        placeholder="Type your Bkash account number"
                        className="input rounded-none input-bordered w-full focus:outline-none"
                        minLength="10"
                        maxLength="10"
                        name="phoneNumber"
                        value={SenderCredential}
                        onChange={(e) => setSenderCredential(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 my-1">
                      Your Payment Transiction ID
                    </label>

                    <div className="flex">
                      <p className="border flex-center px-2 bg-gray-200">
                        TrxID
                      </p>
                      <input
                        type="text"
                        placeholder="Transiction ID"
                        className="input rounded-none input-bordered w-full focus:outline-none uppercase"
                        minLength="10"
                        maxLength="10"
                        value={TransactionCredential}
                        onChange={(e) =>
                          setTransactionCredential(e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={submit_trx}
                      className="mt-4 lg:btn-wide btn btn-block border text-xs btn-primary text-white rounded-lg overflow-hidden font-semibold shadow-inner transition-all normal-case"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="rounded">
              <div className="py-8 flex-center flex-col px-4">
                <h3 className="font-bold text-center text-xl">
                  Your order is confirmed
                </h3>
                <div className="lg:md:w-[288px] w-[100px]  mx-auto my-12">
                  <Lottie options={confirmedOptions} />
                </div>
                <p className="p-4 text-2xl text-primary font-semibold">
                  Thank you for purchase ❤
                </p>
                <p className="text-secondary text-lg my-2">
                  Order ID :{" "}
                  <span className="text-primary font-semibold  cursor-pointer">
                    #{orderDetails?.OrderData?.OrderID}
                  </span>
                </p>
                <p className="text-secondary text-center mb-6">
                  You will recieve an order confirmation mail with deatils of
                  your order
                </p>
                <div className="flex-center">
                  <button
                    className="btn btn-primary text-white py-1 px-12 rounded-sm"
                    onClick={() => router.push("/account/orders")}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </>
        )
      ) : (
        <Loader />
      )}
    </Modal>
  );
};

export default PaymentModal;
