import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import {
  GET_USER_INFO,
  RESET_PASSWORD,
  SET_NEW_PASSWORD,
  SIGN_IN_WITH_EMAIL_AND_PASSWORD,
  SIGN_IN_WITH_PHONE_NUMBER,
  VERIFY_RESET_PASSWORD_OTP,
  VERIFY_WITH_OTP,
} from "../../api";
import Loader from "../shared/Loader";
import OtpModal from "../shared/OtpModal";

const SigninForm = () => {
  const [emailSignIn, setEmailSignIn] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const cookie = new Cookies();
  const router = useRouter();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const accessToken = cookie.get("accessToken");
  const [num, setNum] = useState(0);
  const [inputData, setInputData] = useState(null);
  const [CustomerID, setCustomerID] = useState(null);
  const [reset, setReset] = useState(false);
  const [resetToken, setResetToken] = useState(null);

  useEffect(() => {
    if (inputData) {
      if (inputData.slice(0, 1).match("[0 - 9]")) {
        setEmailSignIn(false);
      }
    }
  }, [inputData, emailSignIn]);

  useEffect(() => {
    if (inputData) {
      if (inputData.slice(0, 1).match("[^0 - 9]")) {
        setEmailSignIn(false);
      }
    }
  }, [inputData, emailSignIn]);

  useEffect(() => {
    if (inputData) {
      if (inputData.slice(0, 1).match("^[a-zA-Z]+$")) {
        setEmailSignIn(true);
      }
    }
  }, [inputData, emailSignIn]);

  /**
   *
   *
   * Handle next focus
   *
   *
   */

  const focusNextTarget = (e) => {
    let target = e.srcElement || e.target;
    let myLength = target.value.length;
    if (myLength >= 1) {
      let next = target;
      while ((next = next.nextElementSibling)) {
        if (next == null) break;
        if (next.tagName.toLowerCase() === "input") {
          next.focus();
          break;
        }
      }
    }
    // Move to previous field if empty (user pressed backspace)
    else if (myLength === 0) {
      let previous = target;
      while ((previous = previous.previousElementSibling)) {
        if (previous == null) break;
        if (previous.tagName.toLowerCase() === "input") {
          previous.focus();
          break;
        }
      }
    }
  };

  //
  //
  //
  // GET OTP
  //
  //
  //
  const getOtp = (e) => {
    e.preventDefault();
    const first = e.target.first.value;
    const second = e.target.second.value;
    const third = e.target.third.value;
    const fourth = e.target.fourth.value;
    const fifth = e.target.fifth.value;
    const sixth = e.target.sixth.value;
    const otp = first + second + third + fourth + fifth + sixth;

    if (otp.length === 6) {
      const OTP = otp;
      if (reset) {
        axios
          .post(VERIFY_RESET_PASSWORD_OTP, {
            CustomerID: CustomerID,
            OTP: OTP,
          })
          .then(({ data }) => {
            if (data.status === 200) {
              toast.success(data.message);
              setResetToken(data?.user_data?.ResetPasswordToken);
              setReset(false);
              setOpenModal(false);
            }
          })
          .catch(({ response }) => {
            toast.error(response?.data?.message);
          });
      } else {
        axios
          .post(VERIFY_WITH_OTP, {
            CustomerID: CustomerID,
            OTP: OTP,
          })
          .then(({ data }) => {
            if (data.status === 200) {
              setOpenModal(false);
              cookie.set("accessToken", data.user_data.accessToken, {
                path: "/",
              });
              router.back();
              toast.success(data.message);
            }
          })
          .catch(({ response }) => {
            toast.error(response?.data?.message);
          });
      }
    } else {
      toast.error("OTP is not valid");
    }
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { data } = await axios.get(GET_USER_INFO, {
          headers: {
            Authorization: `${accessToken}`,
          },
        });

        if (data.status === 200) {
          setUser(data.user_data);
        } else if (data.status === 403) {
          cookie.remove("accessToken");
        }
      } catch (e) {
        if (e.response.status === 403) {
          cookie.remove("accessToken");
        }
      }
    }

    if (accessToken) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   *
   *
   * Handle Signin
   *
   *
   */

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!emailSignIn) {
      setNum(phoneRef.current.value);
    }
    if (emailSignIn) {
      setLoading(true);
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      axios
        .post(SIGN_IN_WITH_EMAIL_AND_PASSWORD, {
          Email: email,
          Password: password,
        })
        .then((res) => {
          toast.success("Logged in successfully! ");
          cookie.set("accessToken", res.data.user_data.accessToken, {
            path: "/",
          });
          router.back();
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setLoading(false);
        });
      setLoading(true);
    } else {
      setLoading(true);
      await axios
        .post(SIGN_IN_WITH_PHONE_NUMBER, {
          PhoneNumber: "+88" + phoneRef.current.value,
        })
        .then(({ data }) => {
          if (data) {
            setOpenModal(true);
            const CustomerId = data?.user_data?.CustomerID;
            setCustomerID(CustomerId);
            setOpenModal(true);
          } else {
            toast.error(data?.message);
          }
        })
        .catch(({ response }) => {
          toast.error(response?.data?.message);
          setLoading(false);
        });
      setLoading(false);
    }
  };

  /**
   *
   *
   * Handle resend Password
   *
   *
   */

  const handleResetPass = async (e) => {
    e.preventDefault();
    setReset(true);
    const email = emailRef.current.value;
    await axios
      .post(RESET_PASSWORD, {
        Email: email,
      })
      .then(({ data }) => {
        if (data.status === 200) {
          toast.success(data.message);
          setCustomerID(data?.user_data?.CustomerID);
          setOpenModal(true);
        }
      })
      .catch(({ response }) => {
        toast.error(response?.data?.message);
      });
  };

  /**
   *
   *
   * SET NEW PASSWORD
   *
   *
   */

  const handleSetNewPass = async (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password === confirmPassword) {
      await axios
        .post(SET_NEW_PASSWORD, {
          ResetPasswordToken: resetToken,
          NewPassword: password,
        })
        .then(({ data }) => {
          if (data.status === 200) {
            toast.success(data.message);
            setResetToken(null);
          }
        })
        .catch(({ response }) => {
          toast.error(response?.data?.message);
        });
    } else {
      toast.error("Password does not match");
    }
  };

  return (
    <div className="lg:px-16 px-2 w-full lg:w-1/2 ">
      <h1 className="text-3xl font-poppins text-center font-bold my-6 lg:my-6">
        Sign in
      </h1>
      {user ? (
        <div className=" flex-center flex-col ">
          <h1 className="text-xl font-poppins text-center  ">
            You are logged in as <b>{user.FullName}</b> with{" "}
            {user?.AuthProvider === "PHONE" ? (
              <b>{user.PhoneNumber}</b>
            ) : (
              <b>{user.Email}</b>
            )}
          </h1>
          <Link href="/">
            <span className="text-primary underline cursor-pointer lg:hover:text-secondary mt-4">
              Go to Homepage
            </span>
          </Link>
        </div>
      ) : (
        ""
      )}
      <form
        onSubmit={resetToken ? handleSetNewPass : handleSubmit}
        className={user ? "hidden" : ""}
      >
        <div>
          <p className="font-semibold text-lg mb-3">Phone or email</p>
          <div className="flex justify-start items-center text-gray-600 border border-[#c7c7c7e8]  py-2 px-4 ">
            {emailSignIn === false ? (
              <>
                <div className="inset-y-0 left-0 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <p className="px-2">+88</p>
              </>
            ) : (
              <div className="inset-y-0 left-0 flex items-center pr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
            <input
              required
              type="text"
              name="phone"
              ref={emailSignIn ? emailRef : phoneRef}
              onChange={(e) => setInputData(e.target.value)}
              maxLength={!emailSignIn ? "11" : ""}
              className="py-2 text-sm pl-1  w-full text-secondary rounded-md focus:outline-none focus:bg-white  bg-transparent focus:text-gray-900"
              placeholder="Phone/email"
            />
          </div>
        </div>

        <br />
        {emailSignIn && (
          <>
            {!resetToken ? (
              <>
                <p className="font-semibold text-lg mb-3"> Password</p>
                <div className="flex justify-start items-center text-gray-600 border border-[#c7c7c7e8]  py-2 px-4">
                  <div className="inset-y-0 left-0 flex items-center pr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  <input
                    type="password"
                    id="password"
                    name="password"
                    ref={passwordRef}
                    className="py-2 pl-1 text-sm w-full text-secondary rounded-md focus:outline-none focus:bg-white bg-transparent focus:text-gray-900"
                    placeholder="Your password"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <p className="font-semibold text-lg mb-4"> Password</p>
                <div className="flex justify-start items-center text-gray-600 border border-[#c7c7c7e8]  py-2 px-4 ">
                  <div className="inset-y-0 left-0 flex items-center pr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  <input
                    type="password"
                    id="password"
                    name="password"
                    ref={passwordRef}
                    className="py-2 text-sm pl-1 w-full text-secondary rounded-md focus:outline-none focus:bg-white bg-transparent focus:text-gray-900"
                    placeholder="Your password"
                    required
                  />
                </div>
                <p className="font-semibold text-lg mb-4">Confirm Password</p>
                <div className="flex justify-start items-center text-gray-600 border border-[#c7c7c7e8]  py-2 px-4">
                  <div className="inset-y-0 left-0 flex items-center pr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    required
                    type="password"
                    name="confirmPassword"
                    ref={confirmPasswordRef}
                    className="py-2 text-sm  w-full text-secondary rounded-md pl-1 focus:outline-none focus:bg-white bg-transparent focus:text-gray-900"
                    placeholder="Re-enter Your password"
                  />
                </div>
              </>
            )}
          </>
        )}
        <button
          type="submit"
          className="  block mx-auto w-full rounded-lg btn lg:my-8 my-4 border bg-primary text-white text-center relative  overflow-hidden font-semibold   shadow-inner group lg:hover:bg-slate-700 transition-all"
        >
          Sign in
        </button>
      </form>
      <div className={user ? "hidden" : "divider my-6"}>OR</div>
      <div>
        <input
          type="checkbox"
          id="otp-modal"
          className="modal-toggle"
          onChange={() => {}}
          checked={openModal ? true : false}
        />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box relative">
            <label
              htmlFor="otp-modal"
              onClick={() => setOpenModal(false)}
              className="btn btn-sm btn-square border border-secondary text-black hover:text-white absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-2xl text-center mb-6 text-primary font-bold">
              Type your OTP code
            </h3>
            <OtpModal
              getOtp={getOtp}
              focusNextTarget={focusNextTarget}
            ></OtpModal>
            <p className="text-secondary text-sm my-2 font-semibold">
              We sent your OTP at
              {emailSignIn && openModal ? (
                <span className="text-primary ml-1">
                  {emailRef.current.value}
                </span>
              ) : (
                <span className="text-primary ml-1">+880{num}</span>
              )}
            </p>
            <p className="text-secondary text-sm font-semibold">
              Did not receive any code?
              <button
                onClick={handleSubmit}
                className="text-primary btn-link ml-1 cursor-pointer hover:text-secondary"
              >
                resend code
              </button>
            </p>
          </div>
        </div>
      </div>
      {loading ? <Loader></Loader> : ""}
      {/*   <div className={user ? "hidden" : ""}>
        <Social></Social>
      </div> */}
      <div
        className={
          user
            ? "hidden"
            : " flex flex-col-reverse lg:flex-row  justify-between lg:items-center mb-3"
        }
      >
        <p className="text-secondary font-semibold my-3 lg:my-0">
          Dont have an account?{" "}
          <Link href="/signup">
            <span className="text-primary font-semibold cursor-pointer lg:hover:underline">
              Sign up
            </span>
          </Link>
        </p>{" "}
        <p
          onClick={handleResetPass}
          className="text-primary font-semibold cursor-pointer lg:hover:underline"
        >
          Forgot Password?
        </p>
      </div>
    </div>
  );
};

export default SigninForm;
