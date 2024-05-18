import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import {
  GET_EMAIL_VERIFICATION_OTP,
  GET_USER_INFO,
  SIGN_UP_WITH_EMAIL_AND_PASSWORD,
  SIGN_UP_WITH_PHONE_NUMBER,
  VERIFY_WITH_OTP,
} from "../../api";
import Loader from "../shared/Loader";
import OtpModal from "../shared/OtpModal";
import TermsModal from "./TermsModal";

const SignupForm = () => {
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState(null);
  const [check, setCheck] = useState(false);
  const [emailSignUp, setEmailSignUp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [CustomerID, setCustomerID] = useState(null);
  const [num, setNum] = useState(0);
  const [name, setName] = useState("");
  const router = useRouter();
  const [inputData, setInputData] = useState(null);
  const emailRef = useRef();
  const phoneRef = useRef();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cookie = new Cookies();

  useEffect(() => {
    const accessToken = cookie.get("accessToken");
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
  }, [cookie]);

  useEffect(() => {
    if (inputData) {
      if (inputData.slice(0, 1).match("[0 - 9]")) {
        setEmailSignUp(false);
      }
    }
  }, [inputData, emailSignUp]);

  useEffect(() => {
    if (inputData) {
      if (inputData.slice(0, 1).match("[^0 - 9]")) {
        setEmailSignUp(false);
      }
    }
  }, [inputData, emailSignUp]);

  useEffect(() => {
    if (inputData) {
      if (inputData.slice(0, 1).match("^[a-zA-Z]+$")) {
        setEmailSignUp(true);
      }
    }
  }, [inputData, emailSignUp]);

  /**
   *
   *
   * Handle next focus
   *
   *
   */

  const focusNextTarget = (e) => {
    let target = e.srcElement || e.target;
    let maxLength = parseInt(target.attributes["maxlength"].value, 10);
    let myLength = target.value.length;
    if (myLength >= maxLength) {
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
  //
  // GETTING OTP
  //
  //
  //

  const getOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const first = e.target.first.value;
    const second = e.target.second.value;
    const third = e.target.third.value;
    const fourth = e.target.fourth.value;
    const fifth = e.target.fifth.value;
    const sixth = e.target.sixth.value;
    const otp = first + second + third + fourth + fifth + sixth;
    if (otp.length === 6) {
      const OTP = otp;
      if (emailSignUp) {
        axios
          .post(GET_EMAIL_VERIFICATION_OTP, {
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
      } else {
        if (otp.length === 6) {
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
      }
    } else {
      toast.error("OTP is not valid");
    }
    setLoading(false);
  };

  //
  //
  //
  //
  // Handle Submit Registration
  //
  //
  //
  const handleRegister = async (e) => {
    e.preventDefault();
    const password = e.target?.password?.value;
    const confirmPassword = e.target?.confirmPassword?.value;
    if (!emailSignUp) {
      setNum(phoneRef.current.value);
    }
    if (emailSignUp) {
      if (password.length < 6) {
        toast.warning("Passwords needs at least 6 characters");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Please check your password again");
        return;
      }
      setLoading(true);
      await axios
        .post(SIGN_UP_WITH_EMAIL_AND_PASSWORD, {
          FullName: name,
          Email: emailRef.current.value,
          Password: password,
        })
        .then(({ data }) => {
          if (data.status === 200) {
            setOpenModal(true);
            const CustomerId = data?.user_data?.CustomerID;
            setCustomerID(CustomerId);
            setOpenModal(true);
          } else {
            toast.error(data?.message);
          }
        })
        .catch(({ response }) => {
          toast.error(response.data.message);
        });
      setLoading(false);
    } else {
      setLoading(true);
      axios
        .post(SIGN_UP_WITH_PHONE_NUMBER, {
          FullName: name,
          PhoneNumber: "+880" + phoneRef.current.value,
        })
        .then(({ data }) => {
          if (data.status === 200) {
            const CustomerId = data?.customer?.CustomerID;
            setCustomerID(CustomerId);
            setOpenModal(true);
          } else {
            toast.error(data?.message);
          }
        })
        .catch(({ response }) => {
          toast.error(response?.data?.message);
        });
      setLoading(false);
    }
  };

  return (
    <div className="lg:px-16 px-2 py-6 w-full lg:w-1/2 bg-white">
      <h1 className="text-3xl font-poppins text-center font-bold my-8">
        Sign up
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
      <form onSubmit={handleRegister} className={user ? "hidden" : ""}>
        <p className="font-semibold text-lg mb-3">Name</p>
        <div className="flex justify-start items-center text-gray-600 border border-[#c7c7c7e8] mb-2 py-2 px-4">
          <div className="inset-y-0 left-0 flex items-center pr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <input
            required
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            className="py-2 text-sm  w-full text-secondary rounded-md pl-1 focus:outline-none focus:bg-white bg-transparent focus:text-gray-900"
            placeholder="Your Beautiful Name"
          />
        </div>
        <div>
          <p className="font-semibold text-lg mb-4">Phone or email</p>
          <div className="flex justify-start items-center text-gray-600 border border-[#c7c7c7e8] mb-2  py-2 px-4">
            {emailSignUp === false ? (
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
                <p className="px-2">+880</p>
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
              ref={emailSignUp === true ? emailRef : phoneRef}
              onChange={(e) => setInputData(e.target.value)}
              maxLength={!emailSignUp ? "10" : ""}
              className="py-2 text-sm  w-full text-secondary rounded-md focus:outline-none bg-transparent focus:text-gray-900"
              placeholder="Phone or email"
            />
          </div>
        </div>
        {/* )} */}

        {emailSignUp === true && (
          <>
            <p className="font-semibold text-lg mb-4"> Password</p>
            <div className="flex justify-start items-center text-gray-600 border border-[#c7c7c7e8] mb-2  py-2 px-4">
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
                className="py-2 text-sm  w-full text-secondary rounded-md pl-1 focus:outline-none focus:bg-white bg-transparent focus:text-gray-900"
                placeholder="Your password"
                required
              />
            </div>
            <p className="font-semibold text-lg mb-4">Confirm Password</p>
            <div className="flex justify-start items-center text-gray-600 border border-[#c7c7c7e8] mb-2 py-2 px-4">
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
                className="py-2 text-sm  w-full text-secondary rounded-md pl-1 focus:outline-none focus:bg-white bg-transparent focus:text-gray-900"
                placeholder="Re-enter Your password"
              />
            </div>
          </>
        )}

        <div className="flex items-center ">
          <input
            required
            type="checkbox"
            name=""
            id="checkbox"
            className="lg:w-4 w-6 lg:h-4 h-6 mx-2 lg:mx-4 accent-primary"
            checked={check}
            onChange={() => setCheck(!check)}
          />

          <label htmlFor="checkbox" className="font-semibold">
            I agreed the
            <label
              htmlFor="terms-modal"
              onClick={() => setModal(true)}
              className="text-primary font-semibold cursor-pointer lg:hover:underline text-sm"
            >
              {" "}
              Terms and conditions
            </label>{" "}
            and{" "}
            <label
              htmlFor="terms-modal"
              onClick={() => setModal(true)}
              className="text-primary font-semibold cursor-pointer lg:hover:underline text-sm"
            >
              {" "}
              privacy policies
            </label>
          </label>
        </div>
        <button
          type="submit"
          className="block mx-auto w-full py-3 rounded-lg btn my-8 px-12 border bg-primary text-white text-center relative  overflow-hidden font-semibold   shadow-inner group lg:hover:bg-slate-700 transition-all"
        >
          Sign up
        </button>
      </form>

      <div>
        <input
          type="checkbox"
          id="otp-modal"
          className="modal-toggle"
          onChange={() => {}}
          checked={openModal ? true : false}
        />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
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
              {emailSignUp && openModal ? (
                <span className="text-primary ml-1">
                  {emailRef.current.value}
                </span>
              ) : (
                <span className="text-primary ml-1">+880 {num}</span>
              )}
            </p>
            {emailSignUp && openModal ? (
              <p className="text-secondary text-sm my-2 font-semibold">
                Did not received the code yet?{" "}
                <span className="text-primary ml-1">
                  Wait few seconds or{" "}
                  <a
                    href="https://mail.google.com/mail/#spam"
                    target="_blank"
                    rel="noreferrer"
                    className="cursor-pointer underline"
                  >
                    check spams
                  </a>
                </span>
              </p>
            ) : (
              ""
            )}
            <p className="text-secondary text-sm font-semibold">
              Did not receive any code?
              <button
                onClick={handleRegister}
                className="text-primary btn-link ml-1 cursor-pointer hover:text-secondary underline"
              >
                resend code
              </button>
            </p>
          </div>
        </div>
      </div>

      {loading ? <Loader></Loader> : ""}
      <div className={user ? "hidden" : "divider my-8"}>OR</div>
      {/* <div className={user ? "hidden" : ""}>
        <Social></Social>
      </div> */}
      <div className={user ? "hidden" : "my-4 lg:my-8 text-center"}>
        <span className="text-secondary font-semibold">
          Already have an account?{" "}
          <Link href="/signin">
            <span className="text-primary font-semibold cursor-pointer lg:hover:underline">
              Sign in
            </span>
          </Link>
        </span>
      </div>
      {modal && <TermsModal setChecked={setCheck}></TermsModal>}
    </div>
  );
};

export default SignupForm;
