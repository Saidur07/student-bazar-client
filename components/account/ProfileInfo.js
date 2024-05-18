import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import {
  GET_USER_INFO,
  UPDATE_PFP,
  UPDATE_PROFILE,
  VERIFY_EMAIL,
  VERIFY_EMAIL_OTP,
  VERIFY_PHONE,
  VERIFY_PHONE_OTP,
} from "../../api";
import avatar from "../../public/image/avatar.jpg";
import SectionContainer from "../reusable/SectionContainer";
import Loader from "../shared/Loader";
import OtpModal from "../shared/OtpModal";

const Info = () => {
  const cookie = new Cookies();
  const user = useSelector((data) => data.userData);
  const userData = useSelector((data) => data.getUser);
  const dispatch = useDispatch();
  const [token, setToken] = useState(cookie.get("accessToken"));
  const [name, setName] = useState("");
  const emailRef = useRef();
  const phoneRef = useRef();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState(0);
  const [gender, setGender] = useState("MALE");
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState({});
  const [imgFile, setImgFile] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pfpLoading, setPfpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/signin");
    }
  }, [token, router]);

  useEffect(() => {
    setLoading(true);
    async function fetchUserData() {
      const { data } = await axios.get(GET_USER_INFO, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: "SET_USER",
        payload: data?.user_data ? data.user_data : null,
      });
      setLoading(false);
      // console.log(data);
      // if (!data?.user_data?.PhoneVerified && !data?.user_data?.EmailVerified) {
      //   router.push("/signin");
      // }
    }

    if (token) {
      fetchUserData();
    }
    setLoading(false);
  }, [token, dispatch, imgFile, openModal, router, userData]);

  // //
  // //
  // // Handle change
  // //
  // //

  // const handleChange = async (e) => {
  //   if (!user?.PhoneVerified && user?.EmailVerified) {
  //     const phoneValue = e.target.value;
  //     setPhone(phoneValue);
  //   }
  //   if (user?.PhoneVerified && !user?.EmailVerified) {
  //     const emailValue = e.target.value;
  //     setEmail(emailValue);
  //   }
  // };

  useEffect(() => {
    setUserLoading(true);
    setName(user?.FullName);
    setEmail(user?.Email);
    setPhone(user?.PhoneNumber?.slice(4));
    setBirth(user?.DateOfBirth?.slice(0, 10));
    setGender(user?.Gender ? user?.Gender : "MALE");
    setUserLoading(false);
  }, [user]);
  // console.log(user);
  const handleNameChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setName(value);
  };
  const handleBirthChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setBirth(value);
  };

  // console.log(gender);
  /**
   *
   *
   * Handle profile Update
   *
   *
   */

  const handleProfileChange = (e) => {
    e.preventDefault();

    setLoading(true);
    const name = e.target.name.value;
    const phoneNumber =
      user?.PhoneVerified === true
        ? user?.PhoneNumber
        : "+880" + phoneRef.current.value;

    const userEmail =
      user?.EmailVerified === true ? email : emailRef?.current?.value;
    // console.log(phoneNumber, userEmail, phone);
    const dateOfBirth = e.target.dateOfBirth.value;
    if (
      /^-?\d+$/.test(phoneRef.current.value) === true &&
      phoneRef.current.value &&
      phoneRef.current.value.length === 10
    ) {
      let pfpformData = new FormData();
      pfpformData.append("FullName", name);
      pfpformData.append("PhoneNumber", phoneNumber);
      pfpformData.append("Email", userEmail);
      pfpformData.append("DateOfBirth", dateOfBirth);
      pfpformData.append("Gender", gender);

      const fetchData = async () => {
        const { data } = await axios.patch(UPDATE_PROFILE, pfpformData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: token,
          },
        });
        if (data?.status === 200) {
          toast.success("Profile updated successfully!");
          dispatch({
            type: "GET_USER",
            payload: data?.user_data ? data.user_data : null,
          });
        } else {
          toast.error("Profile update failed!");
          setLoading(false);
        }
      };
      fetchData();
      setLoading(false);
    } else {
      toast.warn("Phone number type is not valid");
      setLoading(false);
    }
  };
  // console.log(verifyLoading);
  /**
   *
   *
   * Handle profile picture update
   *
   */

  useEffect(() => {
    if (image && image?.name) {
      let formData = new FormData();
      formData.append("ProfilePic", image);
      const fetchData = async () => {
        setPfpLoading(true);
        const { data } = await axios.patch(UPDATE_PFP, formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: token,
          },
        });

        if (data.status === 200) {
          toast.success("Profile updated successfully!");
          setImgFile(data?.ProfilePic);
          setPfpLoading(false);
        } else {
          toast.error("Profile update failed!");
          setPfpLoading(false);
        }
      };
      fetchData();
      setImage({});
      setImgFile(null);
    }
  }, [image, token]);

  /**
   *
   *
   * Handle Email Verification
   *
   *
   */

  const handleEmailVerify = async (e) => {
    e.preventDefault();
    setVerifyEmail(true);
    setVerifyLoading(true);
    if (!user?.EmailVerified) {
      await axios
        .post(
          VERIFY_EMAIL,
          {
            Email: emailRef.current.value,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then(({ data }) => {
          if (data.status === 200) {
            toast.success("OTP SENT!");
            setOpenModal(true);
            setVerifyLoading(false);
          } else {
            toast.error("Something went wrong!");
          }
        })
        .catch(({ response }) => {
          toast.error(response?.data?.message);
          setVerifyLoading(false);
        });
    }
    setVerifyLoading(false);
  };

  /**
   *
   *
   *  Handle Phone Verify
   *
   *
   *
   */

  const handlePhoneVerify = async (e) => {
    e.preventDefault();
    setVerifyEmail(false);
    setVerifyLoading(true);
    // console.log(phoneRef.current.value);
    if (
      /^-?\d+$/.test(phoneRef?.current?.value) === true &&
      phoneRef?.current?.value?.length === 10
    ) {
      await axios
        .post(
          VERIFY_PHONE,
          {
            PhoneNumber: "+880" + phoneRef?.current?.value,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then(({ data }) => {
          if (data.status === 200) {
            // console.log(data);
            toast.success("OTP SENT!");
            setOpenModal(true);
            setVerifyLoading(false);
          } else {
            toast.error("Something went wrong!");
            setVerifyLoading(false);
          }
        })
        .catch(({ response }) => {
          toast.error(response?.data?.message);
          setVerifyLoading(false);
        });
    } else {
      toast.warn("Phone number is not valid");
      setVerifyLoading(false);
    }
    setVerifyLoading(false);
  };

  /**
   *
   *
   * Handle OTP Verify
   *
   *
   */

  const getOtp = async (e) => {
    e.preventDefault();
    setVerifyLoading(true);

    const first = e.target.first.value;
    const second = e.target.second.value;
    const third = e.target.third.value;
    const fourth = e.target.fourth.value;
    const fifth = e.target.fifth.value;
    const sixth = e.target.sixth.value;
    let otp = first + second + third + fourth + fifth + sixth;
    if (otp.length === 6) {
      // console.log(otp);
      let formData = new FormData();
      formData.append("OTP", otp);
      if (!verifyEmail) {
        await axios
          .post(VERIFY_PHONE_OTP, formData, {
            headers: {
              Authorization: token,
            },
          })
          .then(({ data }) => {
            if (data.status === 200) {
              setOpenModal(false);
              toast.success(data.message);
              setVerifyLoading(false);
              setPhone("");
            }
          })
          .catch(({ response }) => {
            toast.error(response?.data?.message);
            setVerifyLoading(false);
          });
      } else if (verifyEmail) {
        await axios
          .post(VERIFY_EMAIL_OTP, formData, {
            headers: {
              Authorization: token,
            },
          })
          .then(({ data }) => {
            if (data.status === 200) {
              setOpenModal(false);
              toast.success(data.message);
              setVerifyLoading(false);
              setEmail("");
            }
          })
          .catch(({ response }) => {
            toast.error(response?.data?.message);
            setVerifyLoading(false);
          });
      } else {
        toast.error("Something went wrong!");
        setVerifyLoading(false);
      }
    } else {
      toast.error("OTP is not valid");
      setVerifyLoading(false);
      setEmail("");
      setPhone("");
    }
    setVerifyLoading(false);
  };

  /**
   *
   *
   * Handle next focus
   *
   *
   */
  // console.log(user);
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

  return (
    <SectionContainer
      className="bg-white p-3 my-3"
      title="Personal Information"
    >
      <div className="">
        <div className="flex flex-col lg:flex-row  items-center ">
          {loading || pfpLoading ? (
            <Loader></Loader>
          ) : !pfpLoading && !loading && user?.ProfilePic ? (
            <Image
              src={user?.ProfilePic}
              width={200}
              height={200}
              alt="Profile Picture"
              className="rounded-full"
            />
          ) : (
            <Image
              src={avatar}
              width={200}
              height={200}
              alt="Profile Picture"
              className="rounded-full"
            />
          )}
          {/* {pfpLoading ?  : ""} */}

          <input
            type="file"
            className="input btn btn-primary  lg:mx-12 text-white my-6 lg:my-0  mt-2 text-sm text-grey-500 
                  file:mr-3 file:py-3 file:px-6
                  file:rounded-lg file:border-0
                  file:text-sm file:font-medium
                  file:cursor-pointer file:bg-primary transition-all
                  file:text-white "
            name="img"
            id="img"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            required
          />
        </div>
        {userLoading ? (
          <Loader></Loader>
        ) : (
          <form onSubmit={handleProfileChange}>
            <div className="form-control  mt-8">
              <label className="label mt-4 text-lg   font-semibold">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="input rounded-none input-bordered w-full focus:outline-none"
                value={name}
                onChange={handleNameChange}
              />
              <label className="label mt-4 text-lg font-semibold">
                Email address
              </label>
              <div className="flex ">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="input rounded-none input-bordered w-full focus:outline-none lg:text-sm text-xs"
                  value={email}
                  ref={emailRef}
                  disabled={user?.EmailVerified}
                />{" "}
                {!user?.EmailVerified ? (
                  <button
                    type="button"
                    onClick={handleEmailVerify}
                    className="btn btn-primary rounded-none flex text-white border-none bg-primary hover:bg-orange-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    Verify
                  </button>
                ) : (
                  <button
                    className="btn btn-success bg-green-500 hover:bg-green-600 rounded-none flex text-white"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                      />
                    </svg>
                    Verified
                  </button>
                )}
              </div>

              <label className="label mt-4 text-lg   font-semibold">
                Phone Number
              </label>
              <div className="flex">
                <p className="border flex-center px-2 bg-gray-300">+880</p>
                <input
                  type="text"
                  placeholder="Your phone"
                  className="input pl-2 rounded-none input-bordered w-full focus:outline-none  lg:text-sm text-xs"
                  value={phone}
                  ref={phoneRef}
                  minLength="10"
                  maxLength="10"
                  name="phoneNumber"
                  disabled={user?.PhoneVerified}
                />
                {!user?.PhoneVerified ? (
                  <button
                    type="button"
                    onClick={handlePhoneVerify}
                    className="btn btn-primary rounded-none flex text-white border-none bg-primary hover:bg-orange-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    Verify
                  </button>
                ) : (
                  <button
                    className="btn btn-success bg-green-500 hover:bg-green-600 rounded-none flex text-white"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                      />
                    </svg>
                    Verified
                  </button>
                )}
              </div>
              <label className="label mt-4 text-lg font-semibold">
                Date of birth
              </label>
              <input
                type="date"
                placeholder="Your date of birth"
                className="input rounded-none input-bordered w-full "
                name="dateOfBirth"
                value={birth}
                onChange={handleBirthChange}
              />
              <div className="flex items-center space-x-2 my-4">
                <p className="lg:text-lg text-sm font-semibold">Gender:</p>
                <div className="flex w-full items-center  justify-between">
                  <p>
                    {gender ? (
                      gender
                    ) : (
                      <span className="text-sm">Not Selected</span>
                    )}
                  </p>
                  <select
                    onChange={(e) => setGender(e.target.value)}
                    className="border-none active:border-none text-primary text-sm lg:ml-1 cursor-pointer bg-slate-200 px-3 py-1 rounded-sm outline-none"
                  >
                    <option selected disabled>
                      SELECT
                    </option>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                  </select>
                </div>
              </div>
              {loading || (verifyLoading && <Loader></Loader>)}
              <div>
                <input
                  type="submit"
                  value="Save"
                  className="btn btn-primary w-48 my-4 text-white"
                ></input>
              </div>
            </div>
          </form>
        )}
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
                {openModal && verifyEmail === false && (
                  <span className="text-primary ml-1">
                    +880{phoneRef?.current?.value}
                  </span>
                )}
                {openModal && verifyEmail === true && (
                  <span className="text-primary ml-1">
                    {emailRef?.current?.value}
                  </span>
                )}
              </p>
              <p className="text-secondary text-sm font-semibold">
                Did not receive any code?
                <span
                  onClick={
                    user?.PhoneVerified ? handleEmailVerify : handlePhoneVerify
                  }
                  className="text-primary underline ml-1 cursor-pointer hover:text-secondary"
                >
                  resend code
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Info;
