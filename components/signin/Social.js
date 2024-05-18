/* import React, { useEffect, useState } from "react";
import Image from "next/image";
import google from "../../public/image/google.png";
import fb from "../../public/image/facebook.svg";
import {
  useSignInWithGoogle,
  useSignInWithFacebook,
} from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import auth from "../../firebase.init";
import Loader from "../shared/Loader";

const Social = () => {
  const [allErrors, setAllErrors] = useState({});
  useEffect(() => {
    fetch("firebase-errors.json")
      .then((res) => res.json())
      .then((data) => setAllErrors(data));
  }, []);
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithFacebook, facebookUser, facebookLoading, facebookError] =
    useSignInWithFacebook(auth);
  const router = useRouter();
  if (googleUser || facebookUser) {
    router.back();
    // const token = auth.currentUser.getIdToken();
    const token = auth.currentUser.accessToken;
    ////console.log(token);
  }

  const allKeys = Object.keys(allErrors);
  const allValues = Object.values(allErrors);
  const getGoogleError = allKeys.find((key) => key === googleError?.code);
  const getFacebookError = allKeys.find((key) => key === facebookError?.code);

  if (googleError) {
    if (googleError.code === getGoogleError) {
      const valueMsg = allKeys.indexOf(getGoogleError);
      toast.error(allValues[valueMsg]);
    }
  }
  if (facebookError) {
    if (facebookError.code === getFacebookError) {
      const valueMsg = allKeys.indexOf(getFacebookError);
      toast.error(allValues[valueMsg]);
    }
  }
  return (
    <div>
      {googleLoading || facebookLoading ? <Loader></Loader> : ""}
      <div className="flex flex-col xl:flex-row gap-5">
        <div className="w-full">
          <button
            className="btn bg-white text-gray-700 border-none shadow-sm lg:hover:shadow-lg transition-all lg:hover:backdrop-blur-3xl lg:hover:bg-slate-50  font-semibold normal-case text-sm w-full"
            onClick={() => signInWithGoogle()}
          >
            <Image width={30} height={30} src={google} alt={google}></Image>
            <span className="ml-2 ">Continue with Google</span>
          </button>
        </div>
        <div className="w-full">
          <button
            className="btn bg-[#039BE5] text-gray-50 border-none shadow-sm lg:hover:shadow-lg transition-all lg:hover:backdrop-blur-3xl lg:hover:bg-[#09a4f2] font-medium  normal-case text-sm w-full"
            onClick={() => signInWithFacebook()}
          >
            <Image width={30} height={30} src={fb} alt={fb}></Image>
            <span className="ml-2 ">Continue with Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Social;
 */
