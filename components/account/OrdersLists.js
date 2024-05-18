import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import SectionContainer from "../reusable/SectionContainer";
import Loader from "../shared/Loader";
import OrdersCard from "./OrdersCard";

const OrdersLists = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");
  const [sort, setSort] = useState("");

  useEffect(() => {
    if (accessToken) {
      setLoading(true);
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/order/all_orders${
            sort === "" ? "" : `?OrderStatus=${sort}`
          }`,
          // GET_ALL_ORDERS,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        )
        .then((res) => {
          setOrders(res.data?.orders?.reverse());
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [accessToken, sort]);
  // console.log(orders, sort);

  return (
    <SectionContainer className="bg-white p-3 my-3" title="My Orders">
      <div className="w-full">
        <div>
          <div className="flex justify-end">
            <div>
              <select
                onChange={(e) => setSort(e.target.value)}
                className="border-none active:border-none text-primary lg:text-sm text-xs cursor-pointer  outline-none font-semibold"
              >
                <option value="" defaultChecked>
                  ALL
                </option>
                <option value="PENDING">PENDING</option>
                <option value="RECEIVED">RECEIVED</option>
                <option value="PROCESSING">PROCESSED</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="DELIVERED">DELIVERED</option>
                <option value="DELIVERY_FAILED">DELIVERY FAILED</option>
                <option value="CANCELED_BY_CUSTOMER">CANCELED BY YOU</option>
                <option value="CANCELED_BY_SELLER">CANCELED BY SELLER</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div>
        {loading ? (
          <Loader></Loader>
        ) : (
          <div className="grid-col-1 my-5  gap-4">
            {orders?.length > 0 ? (
              orders?.map((book, index) => {
                return <OrdersCard key={index} book={book}></OrdersCard>;
              })
            ) : (
              <p className="text-primary font-semibold text-3xl text-center ">
                Nothing to show
              </p>
            )}
          </div>
        )}
      </div>
    </SectionContainer>
  );
};

export default OrdersLists;
