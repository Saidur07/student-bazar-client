import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_NAVBAR_ITEMS } from "../../api";
import logo from "../../public/image/logowithtext.png";

const Categories = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const [top, setTop] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data } = await axios.get(GET_NAVBAR_ITEMS);
      setItems(data);
      dispatch({
        type: "SET_CATEGORIES",
        payload: data ? data : [],
      });
    }
    fetchData();
    setLoading(false);
  }, [dispatch]);
  const categoriesData = useSelector((data) => data?.categoriesData);
  if (typeof window !== "undefined") {
    window.onscroll = function () {
      myFunction();
    };
  }

  var sticky = 80;

  function myFunction() {
    if (window.pageYOffset >= sticky) {
      setTop(true);
    } else {
      setTop(false);
    }
  }

  let slug = router?.query?.ProductType;
  let PublisherSlug = router?.query?.PublicationSlug;
  let AuthorsSlug = router?.query?.AuthorSlug;
  let InstituteSlug = router?.query?.InstituteSlug;
  // console.log(categoriesData);
  return (
    <div
      className={
        top ? "border-b fixed top-0 bg-white z-10 w-full" : "border-b bg-white"
      }
    >
      <div className={"custom-container hidden lg:block "}>
        <div
          className={`flex py-2 ${
            top ? "" : "justify-center"
          }  items-center font-bangla text-lg md:gap-6 no-scrollbar ml-2`}
        >
          {top ? (
            <Link href="/">
              <div className="w-44 cursor-pointer">
                <Image
                  src={logo}
                  layout="responsive"
                  objectFit="contain"
                  alt="logo"
                />
              </div>
            </Link>
          ) : (
            ""
          )}
          {categoriesData?.map((item) => (
            <div
              key={item._id}
              className="border-b lg:mx-4 w-auto  text-center  pb-0 border-none"
            >
              <Link href={item?.primaryURL} title={item.name}>
                <span
                  className={
                    slug === item?.primaryURL?.slice(9) ||
                    router.pathname === item?.primaryURL ||
                    item?.urls?.includes(`/subject/${slug}`) ||
                    item?.urls?.includes(router.pathname) ||
                    (item?.primaryURL === "/publishers" && PublisherSlug) ||
                    (item?.primaryURL === "/authors" && AuthorsSlug) ||
                    (item?.primaryURL === "/extras" && InstituteSlug)
                      ? top
                        ? "text-white px-4 py-[16.3px]  cursor-pointer transition-all   bg-primary "
                        : "text-white px-4 py-[11px]  cursor-pointer transition-all   bg-primary"
                      : "text-gray-600 hover:px-4 hover:py-[11px] lg:hover:text-white cursor-pointer hover:bg-primary transition-all"
                  }
                >
                  {item?.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className=" block lg:hidden py-4 little-scrollbar overflow-x-scroll overflow-y-hidden scrollbar-hide">
        <div
          className={
            "inline-flex justify-center items-center font-bangla text-lg    "
          }
        >
          {items?.map((item) => (
            <div
              key={item._id}
              className={"border-b mx-4   text-center  pb-0 border-none"}
            >
              <Link href={item?.primaryURL} title={item.name}>
                <span
                  className={
                    slug === item?.primaryURL?.slice(9) ||
                    router.pathname === item?.primaryURL ||
                    item?.urls?.includes(`/subject/${slug}`) ||
                    item?.urls?.includes(router.pathname) ||
                    (item?.primaryURL === "/publishers" && PublisherSlug) ||
                    (item?.primaryURL === "/authors" && AuthorsSlug) ||
                    (item?.primaryURL === "/extras" && InstituteSlug)
                      ? "text-white lg:hover:text-primary cursor-pointer transition-all bg-primary px-4 py-[11px] hover:px-4 hover:py-[11px] whitespace-nowrap"
                      : "text-gray-600 lg:hover:text-primary cursor-pointer transition-all whitespace-nowrap"
                  }
                >
                  {item?.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
