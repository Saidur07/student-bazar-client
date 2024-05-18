import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useOrderLists from "../hooks/useOrderLists";
import SectionContainer from "../reusable/SectionContainer";

const Sidebar = () => {
  const router = useRouter();
  const links = [
    { _id: 1, title: "Profile", link: "/account/profile", badge: false },
    { _id: 2, title: "Orders", link: "/account/orders", badge: true },
    {
      _id: 3,
      title: "Favourites",
      link: "/account/favourites",
      badge: false,
    },
    {
      _id: 4,
      title: "Ratings and Reviews",
      link: "/account/reviews",
      badge: false,
    },
  ];
  const [orders, loading] = useOrderLists();

  return (
    <div className="hidden w-full h-full lg:flex font-bangla">
      <SectionContainer className="w-full bg-white p-4 my-3" title="My Account">
        <ul className="w-full max-h-screen overflow-y-auto">
          {links.map((item) => (
            <li
              className={
                item.badge
                  ? "p-px border-b py-6 w-full grid grid-cols-3 items-center justify-between"
                  : "p-px border-b py-6 w-full grid grid-cols-3"
              }
              key={item._id}
            >
              <div className="col-span-1 flex xl:hidden"></div>

              <Link href={item.link}>
                <div
                  className={
                    item.badge
                      ? "flex xl:justify-start justify-end md:justify-start xl:col-span-2 col-span-1 xl:p-0 lg:pr-8 pr-0"
                      : "flex justify-start xl:justify-start col-span-2"
                  }
                >
                  <p
                    className={
                      router.pathname === item.link
                        ? " text-lg text-primary cursor-pointer hover:underline"
                        : " cursor-pointer hover:underline"
                    }
                  >
                    {" "}
                    {item.title}
                  </p>
                </div>
              </Link>

              {item.badge ? (
                <div className="flex justify-end col-span-1 pr-2">
                  <p className="badge badge-primary">{orders.length}</p>
                </div>
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
      </SectionContainer>
    </div>
  );
};

export default Sidebar;
