import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import {
  GET_ALL_CART_ITEMS,
  GET_ONLY_CHECKOUT_DATA,
  UPDATE_CART_DATA,
} from "../../api";
import useCarts from "../hooks/useCarts";
import SectionContainer from "../reusable/SectionContainer";
import Cart from "../shared/Cart";
import CheckoutSummary from "../shared/CheckoutSummary";
import LoaderModal from "../shared/LoaderModal";
const { useSelector, useDispatch } = require("react-redux");

const ManageProducts = () => {
  const dispatch = useDispatch();
  const [giftWrap, setGiftWrap] = useState(false);
  const [code, setCode] = useState(null);
  const [cartsData] = useCarts();
  const cookie = new Cookies();
  const router = useRouter();
  const token = cookie.get("accessToken");
  const [cartLoading, setCartLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState(false);
  const [marks, setMarks] = useState(
    selectedData === true ? "mark_all_as_deselected" : "mark_all_as_selected"
  );
  //
  // GET ALL CART DATA
  //

  const fetchCartData = async () => {
    if (token) {
      const { data } = await axios.get(GET_ALL_CART_ITEMS, {
        headers: {
          Authorization: token,
        },
      });

      setLoading(false);
      if (data?.cart_data?.Items === undefined) {
        return [];
      } else {
        return data?.cart_data?.Items ? data?.cart_data?.Items : [];
      }
    } else {
      return [];
    }
  };

  const {
    isLoading,
    refetch,
    data: cartData,
  } = useQuery(["cartData"], () => fetchCartData());

  //
  //
  // Fetch Checkout Data
  //

  const fetchCheckoutData = async () => {
    if (token) {
      const { data } = await axios.get(
        `${GET_ONLY_CHECKOUT_DATA.replace("[GiftWrap]", giftWrap)}&${
          code !== null && `CouponCode=${code}`
        }`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (data?.checkout_info === undefined) {
        return {};
      } else {
        return data?.checkout_info ? data?.checkout_info : {};
      }
    } else {
      return {};
    }
  };

  const {
    isLoading: checkoutLoading,
    refetch: checkoutRefetch,
    isRefetching: checkoutRefetching,
    data: checkoutData,
  } = useQuery(["checkout"], () => fetchCheckoutData());

  //
  //
  // Refetch Checkout Data
  //
  //
  //

  useEffect(() => {
    checkoutRefetch();
  }, [giftWrap, code, checkoutRefetch]);

  //
  //
  //
  // Handle Mark Selection
  //
  //
  //

  useEffect(() => {
    if (selectedData === true) {
      setMarks("mark_all_as_deselected");
    } else if (selectedData === false) {
      setMarks("mark_all_as_selected");
    }
  }, [selectedData]);

  //
  //
  //
  // Handle Cart Selection
  //
  //
  //

  useEffect(() => {
    if (cartData && cartData !== undefined && cartData.length > 0) {
      const allSelected = cartData.filter((item) => item.Selected !== false);
      if (allSelected && cartData) {
        if (allSelected.length === cartData.length) {
          setSelectedData(true);
        } else {
          setSelectedData(false);
        }
      }
    }
  }, [cartData]);

  //
  //
  //
  // Handle Authentication
  //
  //
  //

  useEffect(() => {
    if (!token) {
      router.push("/signin");
    }
  }, [token, router]);

  /*
   *
   * SELECT ALL PRODUCTS
   *
   */

  const handleSelectAll = async () => {
    setLoading(true);
    const { data } = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/cart/${marks}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (data.status === 200) {
      dispatch({
        type: "SET_CART_ITEMS",
        payload: data?.cart_data?.Items ? data?.cart_data?.Items : [],
      });
    }
    refetch();
    checkoutRefetch();
  };

  //
  //
  //
  // DELETE ALL CART ITEM
  //
  //
  //

  const deleteAllData = async () => {
    setLoading(true);
    if (cartData.length !== 0) {
      const cart_data = { cart_data: [] };
      const { data } = await axios.put(UPDATE_CART_DATA, cart_data, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: "SET_CART_ITEMS",
        payload: data?.cart_data?.Items ? data?.cart_data?.Items : [],
      });
    } else {
      toast.error("Cart is empty");
    }
    refetch();
    checkoutRefetch();
  };

  return (
    <>
      {loading || isLoading ? <LoaderModal></LoaderModal> : ""}
      <div className="grid lg:grid-cols-3 grid-cols-1 custom-container max-h-screen gap-3 overflow-y-auto">
        <SectionContainer className=" lg:col-span-2 mb-4 col-span-1 border-0 ">
          <div className="bg-white shadow-md px-1 md:px-3 py-4 flex items-center justify-between mb-3">
            <div className="flex items-center">
              <input
                onChange={
                  cartData && cartData?.length > 0
                    ? () => handleSelectAll()
                    : () => toast.error("Cart is empty")
                }
                type="checkbox"
                checked={selectedData ? true : false}
                name=""
                id="selectAll"
                className="mx-2 cursor-pointer w-4 h-4 accent-primary"
              />
              <label
                htmlFor="selectAll"
                className="hover:text-primary lg:text-lg text-sm font-semibold cursor-pointer"
              >
                Select All{" "}
                <span className="text-black">({cartsData?.length || 0})</span>
              </label>
            </div>
            <button
              onClick={
                cartData && cartData?.length > 0
                  ? () => deleteAllData()
                  : () => toast.error("Cart is empty")
              }
              className="text-secondary flex text-lg items-center transition-all font-semibold cursor-pointer hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <span className="mx-1 lg:text-lg text-sm">Delete All</span>
            </button>
          </div>
          <div className="">
            <div className="max-h-screen small-scrollbar overflow-x-hidden overflow-y-auto">
              <div className="space-y-4 ">
                {cartData && cartData?.length === 0 && (
                  <div className="text-3xl font-bold text-center my-auto text-primary font-poppins">
                    No items in cart
                  </div>
                )}
                {cartData?.map((item) => {
                  return (
                    <Cart
                      key={item?.ProductID}
                      refetch={refetch}
                      isLoading={isLoading}
                      item={item}
                      setLoading={setLoading}
                      loading={loading}
                      cartLoading={cartLoading}
                      checkoutRefetch={checkoutRefetch}
                      checkoutLoading={checkoutLoading}
                      setCartLoading={setCartLoading}
                    ></Cart>
                  );
                })}
              </div>
            </div>
          </div>
        </SectionContainer>
        <SectionContainer className="col-span-1 bg-white shadow-md my-4 px-3">
          <CheckoutSummary
            coupon="block"
            gift="hidden"
            giftWrap={giftWrap}
            checkoutData={checkoutData}
            setGiftWrap={setGiftWrap}
            cartLoading={cartLoading}
            checkoutRefetching={checkoutRefetching}
            setCode={setCode}
          ></CheckoutSummary>
        </SectionContainer>
      </div>
    </>
  );
};

export default ManageProducts;
