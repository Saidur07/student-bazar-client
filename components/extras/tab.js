import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const tab = () => {
  const tabs = [
    { _id: 1, title: "Offers", href: "/extras" },
    // { _id: 2, title: "Contests", href: "/extras/contests" },
    // { _id: 3, title: "Higher education", href: "/extras/higherstudies" },
  ];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  return (
    <div className="custom-container">
      <div className="lg:text-lg overflow-x-scroll lg:overflow-x-visible overflow-y-hidden no-scrollbar font-medium mx-auto text-center text-gray-500  grid gap-3 place-items-center">
        <ul className=" flex-nowrap -mb-px inline-flex">
          {tabs.map((item) => (
            <li key={item._id}>
              <Link href={item.href}>
                <span
                  className={
                    router.pathname === item.href
                      ? "inline-block px-4 pt-4 pb-[.75rem] text-primary rounded-t-lg border-b-[3px] border-primary active cursor-pointer whitespace-nowrap"
                      : "inline-block px-4 pt-4 pb-[.75rem] rounded-t-lg border-b-[3px] border-transparent lg:hover:text-gray-600 lg:hover:border-gray-300 cursor-pointer whitespace-nowrap"
                  }
                >
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default tab;
