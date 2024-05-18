import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import { GET_USER_INFO } from "../../api";
import avatar from "../../public/image/avatar.jpg";
import logo from "../../public/image/okkhor site.png";
import useCarts from "../hooks/useCarts";
import useInfo from "../hooks/useInfo";

const Navbar = ({ common }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cookie = new Cookies();
  const [cartsData] = useCarts();
  const [accessToken, setAccessToken] = useState(cookie.get("accessToken"));
  const userInfo = useSelector((data) => data.userData);
  const [word, setWord] = useState("");
  const [userIn, setUserIn] = useState(true);
  const [info, loading] = useInfo();
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);

  // async function fetchUserData() {
  //   if (accessToken) {
  //     const { data } = await axios.get(GET_USER_INFO, {
  //       headers: {
  //         Authorization: accessToken,
  //       },
  //     });
  //     if (data?.user_data === undefined) {
  //       return {};
  //     } else {
  //       return data?.user_data ? data?.user_data : {};
  //     }
  //   } else {
  //     return {};
  //   }
  // }

  useEffect(() => {
    async function fetchUserData() {
      setUserLoading(true);
      if (accessToken) {
        const { data } = await axios.get(GET_USER_INFO, {
          headers: {
            Authorization: accessToken,
          },
        });
        setUser(data?.user_data ? data?.user_data : {});
      } else {
        setUser(null);
      }
    }
    fetchUserData();
    setUserLoading(false);
  }, [accessToken, userInfo]);
  // const {
  //   data: user,
  //   isLoading: userLoading,
  //   refetch: refetchUser,
  // } = useQuery(["user"], () => fetchUserData());

  // useEffect(() => {
  //   refetchUser();
  // }, [userInfo, accessToken, refetchUser]);

  useEffect(() => {
    if (userIn === false) {
      cookie.set("accessToken", "", {
        path: "/",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIn, router]);

  useEffect(() => {
    const keyWord = router.query?.search;
    if (keyWord && keyWord !== "") {
      setWord(keyWord);
    }
  }, [router.query?.search]);
  const handleKeywordChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setWord(value);
  };
  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure to sign out?",
      // text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8A8A8A",
      cancelButtonColor: "#F26133",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        cookie.remove("accessToken");
        router.reload();
        setUserIn(false);
      }
    });
  };

  const searchItems = (e) => {
    e.preventDefault();
    const searchField = e.target.keyword.value;
    router.push({ pathname: "/search", query: { search: searchField } });
  };

  return (
    <div className="border-b bg-white">
      {/* For web */}
      <div className="hidden lg:block custom-container">
        <div className="flex-between py-4 md:px-0 custom-container">
          {/* Logo start */}
          <div className="w-44 cursor-pointer">
            <Link href="/">
              {!info?.Logo && loading ? (
                <Image
                  src={info?.Logo ? info?.Logo : logo}
                  alt="navbar-logo"
                  height={50}
                  width={200}
                  layout="responsive"
                  objectFit="contain"
                />
              ) : (
                <Image
                  src={info?.Logo ? info?.Logo : logo}
                  alt="navbar-logo"
                  height={50}
                  width={200}
                  layout="responsive"
                  objectFit="contain"
                />
              )}
            </Link>
          </div>
          {/* Logo end */}
          <div className="lg:w-2/4 lg:block bg-slate-700">
            <form onSubmit={searchItems} className="flex items-stretch w-full ">
              <input
                type="search"
                name="keyword"
                className="form-control w-11/12 px-4 py-1 font-bangla text-gray-700 bg-white bg-clip-padding rounded-none border-solid border border-[#595959] border-r-0  transition-all ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                placeholder="পছন্দের বই খুজুন"
                aria-label="Search"
                aria-describedby="button-addon2"
                required
                value={word}
                onChange={handleKeywordChange}
              />
              <button
                className="btn inline-block rounded-none px-6 py-1 bg-primary text-white font-medium text-xs lg:hover:bg-primary focus:bg-primary border border-primary focus:border-primary focus:outline-none focus:ring-0"
                type="submit"
                id="button-addon2"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="search"
                  className="w-4"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                  />
                </svg>
              </button>
            </form>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal p-0">
                <li>
                  <div
                    className="cursor-pointer lg:hover:text-primary bg-transparent "
                    title="Favourites"
                  >
                    <Link href="/account/favourites">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={
                          router.pathname == "/account/favourites"
                            ? "h-6 w-6 text-primary "
                            : "h-6 w-6 "
                        }
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        title="noth"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </Link>
                  </div>
                </li>
                <li>
                  <div
                    className="cursor-pointer lg:hover:text-primary bg-transparent "
                    title="Cart"
                  >
                    <Link href="/cart">
                      <span className="indicator">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={
                            router.pathname === "/cart"
                              ? "h-6 w-6 text-primary "
                              : "h-6 w-6 "
                          }
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span className="indicator-item badge badge-primary text-white ">
                          {cartsData?.length > 0 ? cartsData?.length : "0"}
                        </span>
                      </span>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="cursor-pointer lg:hover:text-primary  bg-transparent">
                    {user && accessToken ? (
                      <div className="dropdown dropdown-hover  dropdown-left">
                        <label tabIndex={0} className=" flex items-center ">
                          {user?.ProfilePic ? (
                            <Image
                              src={user?.ProfilePic}
                              alt="user"
                              width={35}
                              height={35}
                              className="rounded-full cursor-pointer"
                            />
                          ) : (
                            <Image
                              src={avatar}
                              alt="user"
                              width={35}
                              height={35}
                              className="rounded-full cursor-pointer"
                            />
                          )}
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content rounded-md text-black menu p-4 shadow bg-base-100  w-64"
                        >
                          <li className="border-b my-1 w-full lg:hover:bg-primary lg:hover:text-white transition-all">
                            <Link href="/account/profile">
                              <span className="lg:hover:bg-primary w-full lg:hover:rounded-sm transition-all lg:hover:text-white">
                                {" "}
                                Profile
                              </span>
                            </Link>
                          </li>
                          <li className="border-b my-1 w-full lg:hover:bg-primary lg:hover:text-white transition-all">
                            <Link href="/account/orders">
                              <span className="lg:hover:bg-primary w-full lg:hover:rounded-sm transition-all lg:hover:text-white">
                                {" "}
                                Orders
                              </span>
                            </Link>
                          </li>
                          <li className="border-b my-1 w-full hover:bg-primary hover:text-white transition-all">
                            <Link href={accessToken ? "/cart" : "/signin"}>
                              <span className="hover:bg-primary w-full hover:rounded-sm transition-all hover:text-white">
                                {" "}
                                Cart
                              </span>
                            </Link>
                          </li>
                          <li className="border-b my-1 w-full lg:hover:bg-primary lg:hover:text-white transition-all">
                            <Link href="/account/favourites">
                              <span className="lg:hover:bg-primary w-full lg:hover:rounded-sm transition-all lg:hover:text-white">
                                {" "}
                                Favourites
                              </span>
                            </Link>
                          </li>
                          <li className="border-b my-1 w-full lg:hover:bg-primary lg:hover:text-white transition-all">
                            <Link href="/account/reviews">
                              <span className="lg:hover:bg-primary w-full lg:hover:rounded-sm transition-all lg:hover:text-white">
                                Ratings and Reviews
                              </span>
                            </Link>
                          </li>

                          <li className="border-b my-1 w-full  transition-all">
                            <button
                              onClick={handleSignOut}
                              className="bg-primary text-white border lg:hover:bg-white  transition-all lg:hover:text-black  py-2 rounded font-semibold w-full flex-center"
                            >
                              Sign out
                            </button>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <Link href="/signin">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={
                            router.pathname === "/signin" ||
                            router.pathname === "/signup"
                              ? "h-6 w-6 text-primary"
                              : "h-6 w-6"
                          }
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
                      </Link>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile devices  */}

      <div className="block lg:hidden custom-container">
        <div className="flex items-center justify-between">
          <div className="w-44 cursor-pointer">
            <Link href="/">
              {info?.Logo ? (
                <Image
                  src={info?.Logo ? info?.Logo : logo}
                  height={50}
                  width={200}
                  layout="responsive"
                  objectFit="contain"
                  alt="navbar-logo"
                />
              ) : (
                <Image
                  src={info?.Logo ? info?.Logo : logo}
                  height={50}
                  width={200}
                  layout="responsive"
                  objectFit="contain"
                  alt="navbar-logo"
                />
              )}
            </Link>
          </div>
          <div className="dropdown dropdown-end flex items-center justify-end ">
            <ul
              tabIndex={0}
              className=" py-2  menu menu-compact  flex items-center justify-center flex-row  "
            >
              <li>
                <div
                  className="cursor-pointer lg:hover:text-primary bg-transparent "
                  title="Favourites"
                >
                  <Link href="/account/favourites">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={
                        router.pathname == "/account/favourites"
                          ? "h-6 w-6 text-primary "
                          : "h-6 w-6 "
                      }
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      title="noth"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </Link>
                </div>
              </li>
              <li>
                <div
                  className="cursor-pointer lg:hover:text-primary bg-transparent "
                  title="Cart"
                >
                  <Link href={accessToken ? "/cart" : "/signin"}>
                    <span className="indicator">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={
                          router.pathname === "/cart"
                            ? "h-6 w-6 text-primary "
                            : "h-6 w-6 "
                        }
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="indicator-item badge badge-primary text-white ">
                        {cartsData?.length > 0 ? cartsData?.length : "0"}
                      </span>
                    </span>
                  </Link>
                </div>
              </li>
              <li>
                <div className="cursor-pointer lg:hover:text-primary bg-white">
                  {(user && Object.keys(user).length > 0) || accessToken ? (
                    <div className="dropdown">
                      <label
                        tabIndex={0}
                        className="flex items-center justify-center flex-col"
                      >
                        {user?.ProfilePic ? (
                          <Image
                            src={user.ProfilePic ? user.ProfilePic : avatar}
                            alt="user"
                            width={35}
                            height={35}
                            className="rounded-full cursor-pointer"
                          />
                        ) : (
                          <Image
                            src={avatar}
                            alt="user"
                            width={35}
                            height={35}
                            className="rounded-full cursor-pointer"
                          />
                        )}
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content rounded-md text-black menu p-4 shadow-md bg-white w-64"
                      >
                        <li className="border-b my-1 w-full lg:hover:bg-primary lg:hover:text-white transition-all">
                          <Link href="/account/profile">
                            <span className="lg:hover:bg-primary w-full lg:hover:rounded-sm transition-all lg:hover:text-white">
                              {" "}
                              Profile
                            </span>
                          </Link>
                        </li>
                        <li className="border-b my-1 w-full lg:hover:bg-primary lg:hover:text-white transition-all">
                          <Link href="/account/orders">
                            <span className="lg:hover:bg-primary w-full lg:hover:rounded-sm transition-all lg:hover:text-white">
                              {" "}
                              Orders
                            </span>
                          </Link>
                        </li>
                        <li className="border-b my-1 w-full lg:hover:bg-primary lg:hover:text-white transition-all">
                          <Link href="/cart">
                            <span className="lg:hover:bg-primary w-full lg:hover:rounded-sm transition-all lg:hover:text-white">
                              {" "}
                              Cart
                            </span>
                          </Link>
                        </li>
                        <li className="border-b my-1 w-full lg:hover:bg-primary lg:hover:text-white transition-all">
                          <Link href="/account/favourites">
                            <span className="lg:hover:bg-primary w-full lg:hover:rounded-sm transition-all lg:hover:text-white">
                              {" "}
                              Favourites
                            </span>
                          </Link>
                        </li>
                        <li className="border-b my-1 w-full lg:hover:bg-primary lg:hover:text-white transition-all">
                          <Link href="/account/reviews">
                            <span className="lg:hover:bg-primary w-full lg:hover:rounded-sm transition-all lg:hover:text-white">
                              {" "}
                              Ratings and Reviews
                            </span>
                          </Link>
                        </li>

                        <li className="border-b my-1 w-full  transition-all">
                          <button
                            onClick={() => handleSignOut()}
                            className="bg-primary text-white border lg:hover:bg-white  transition-all lg:hover:text-black  py-2 rounded font-semibold w-full flex-center"
                          >
                            Sign out
                          </button>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <Link href="/signin">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={
                          router.pathname === "/signin" ||
                          router.pathname === "/signup"
                            ? "h-6 w-6 text-primary"
                            : "h-6 w-6"
                        }
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
                    </Link>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-0 mb-2 flex">
          <form onSubmit={searchItems} className="flex items-stretch w-full">
            <input
              type="search"
              className="form-control w-11/12 px-4 py-1.5 font-normal text-gray-700 bg-white bg-clip-padding rounded-none border-solid border border-[#595959] border-r-0  transition-all ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
              placeholder="পছন্দের বই খুজুন"
              name="keyword"
              aria-label="Search"
              aria-describedby="button-addon2"
              required
            />
            <button
              className="btn inline-block rounded-none px-6 py-2 bg-primary text-white font-medium text-xs lg:hover:bg-primary focus:bg-primary border border-primary focus:border-primary focus:outline-none focus:ring-0"
              type="submit"
              id="button-addon2"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
