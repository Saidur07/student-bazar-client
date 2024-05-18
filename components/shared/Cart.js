import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import {
  CHECKOUT_DATA_SELECTION,
  DELETE_CART_ITEM,
  GET_CATEGORY_BY_CATEGORY_ID,
  GET_FAV_DATA,
  GET_PRODUCT_DETAILS_BY_PRODUCT_ID,
  PATCH_CART_DATA,
  POST_FAV_DATA,
} from "../../api";
import placeholder from "../../public/image/book.png";

const Cart = ({
  setLoading,
  refetch,
  item,
  loading,
  isLoading,
  cartLoading,
  checkoutRefetch,
  checkoutLoading,
  setCartLoading,
}) => {
  const cookie = new Cookies();
  const token = cookie.get("accessToken");
  const [quantityData, setQuantityData] = useState(item?.Quantity);
  const [favItem, setFavItem] = useState([]);
  const [fav, setFav] = useState(false);
  const [postedData, setPostedData] = useState({});
  const router = useRouter();
  const [mark, setMark] = useState(
    item?.Selected === true ? "mark_deselected" : "mark_selected"
  );
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (item?.Selected === true) {
      setMark("mark_deselected");
    } else if (item?.Selected === false) {
      setMark("mark_selected");
    }
  }, [item?.Selected]);

  // GET CART ITEM

  const fetchCartItem = async () => {
    if (token) {
      const { data } = await axios.get(
        GET_PRODUCT_DETAILS_BY_PRODUCT_ID.replace(
          "[ProductID]",
          item?.ProductID
        ),
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCartLoading(false);
      if (data?.product === undefined) {
        return {};
      } else {
        return data?.product ? data?.product : {};
      }
    }
  };

  const {
    isLoading: itemLoading,
    refetch: cartRefetch,
    data: cart,
  } = useQuery(["cart", item?.ProductID], () => fetchCartItem());

  /**
   *
   *
   * Incerement Operation
   *
   *
   */

  const increase = async (i) => {
    setQuantityData(i + 1);
  };

  /**
   *
   *
   * Decerement Operation
   *
   *
   */

  const decrease = async (d) => {
    setQuantityData(d - 1);
  };

  // Handle Cart Selection

  const handleSelectCart = async (id) => {
    setLoading(true);
    const cart_data = {
      ProductID: id,
    };
    const { data } = await axios.patch(
      CHECKOUT_DATA_SELECTION.replace("[mark]", mark),
      cart_data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: "SET_CART_ITEMS",
      payload: data?.cart_data?.Items ? data?.cart_data?.Items : [],
    });
    refetch();
    checkoutRefetch();
    cartRefetch();
  };

  // DELETE CART ITEM
  const handleDeleteOrders = async (id) => {
    setLoading(true);
    const cart_data = {
      ProductID: id,
    };
    const { data } = await axios.patch(
      DELETE_CART_ITEM,
      cart_data,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    dispatch({
      type: "SET_CART_ITEMS",
      payload: data?.cart_data?.Items ? data?.cart_data?.Items : [],
    });
    refetch();
    cartRefetch();
    checkoutRefetch();
  };

  //
  //
  //
  // Update Cart Quantity
  //
  //

  useEffect(() => {
    setCartLoading(true);
    let formData = new FormData();
    formData.append("ProductID", item?.ProductID);
    formData.append("Quantity", quantityData);
    async function updateCartQuantity() {
      if (quantityData <= cart?.UnitInStock) {
        const { data } = await axios.patch(PATCH_CART_DATA, formData, {
          headers: {
            Authorization: token,
          },
        });
        dispatch({
          type: "SET_CART_ITEMS",
          payload: data?.cart_data?.Items ? data?.cart_data?.Items : [],
        });
        refetch();
        checkoutRefetch();
      } else {
        toast.error("Quantity should be less than or equal to available stock");
        setQuantityData(item?.Quantity);
      }
    }
    if (quantityData !== item?.Quantity) {
      updateCartQuantity();
      setCartLoading(false);
    }
    setCartLoading(false);
  }, [
    quantityData,
    item?.ProductID,
    item?.Quantity,
    checkoutRefetch,
    cartRefetch,
    router,
    setCartLoading,
    refetch,
    token,
    dispatch,
    cart?.UnitInStock,
  ]);

  //
  //
  // Handle Change Quantity
  //
  //

  const changingValue = (e) => {
    // console.log(e.target.value);
    let value = parseInt(e.target.value);
    if (e.target.value === "") {
      value = 0;
    }
    if (value === item?.QuantityPerUnit) {
      setQuantityData(item?.QuantityPerUnit);
    } else {
      setQuantityData(value);
    }
    if (value >= item?.UnitInStock) {
      setQuantityData(item?.UnitInStock);
    }
  };

  //
  //
  //
  // ADD TO FAVOURITE TOGGLE
  //
  //
  const AddToFav = async (id) => {
    if (!token) {
      router.push("/signin");
    }
    const fav_data = {
      ProductID: id,
    };
    const { data } = await axios.patch(POST_FAV_DATA, fav_data, {
      headers: {
        Authorization: token,
      },
    });
    setPostedData(data?.favorite_data);
    cartRefetch();
    if (fav) {
      toast.success(
        `${cart?.ProductTitle} was added to favourites succesfully`
      );
    } else {
      toast.success(`${cart?.ProductTitle} was removed from favourites `);
    }
  };

  useEffect(() => {
    const object = favItem.find((aa) => aa?.ProductID === item?.ProductID);

    if (object === undefined) {
      setFav(true);
    } else {
      setFav(false);
    }
  }, [favItem, item, postedData]);

  //
  //
  // GET FAVOURITES DATA
  //
  //

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const { data } = await axios.get(GET_FAV_DATA, {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` ${token}`,
          },
        });
        setFavItem(data?.products);
      }
    };

    fetchData();
  }, [item?.ProductID, token, postedData]);

  // Get CategoryName

  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    if (cart?.CategoryID[0] !== "" || cart?.CategoryID[0] !== undefined) {
      async function fetchCategoryData() {
        const { data } = await axios.get(
          GET_CATEGORY_BY_CATEGORY_ID.replace(
            "[[CategoryID]]",
            cart?.CategoryID[0]
          )
        );
        // console.log(data?.categories[0]);
        setCategoryData(data?.categories[0]);
      }

      fetchCategoryData();
    }
  }, [cart?.CategoryID]);

  return (
    <div key={item?._id} className="w-full">
      <div className="shadow-md p-1 bg-white">
        <div className="flex gap-2 md:p-3 p-1">
          <div className="col-span-2 gap-2 flex items-center">
            <div className="flex items-center">
              <input
                type="radio"
                onChange={() => handleSelectCart(item?.ProductID)}
                checked={item?.Selected === true ? true : false}
                className="cursor-pointer md:w-5 md:h-5 w-4 h-4 accent-primary"
              />
            </div>
            {/* Cart item Image */}
            <div className="rounded-sm md:w-[120px] w-[80px]">
              <Link href={`/product/${cart?.URLSlug}`}>
                {cart?.Picture ? (
                  <Image
                    src={
                      cart?.Picture !== undefined ? cart?.Picture : placeholder
                    }
                    alt={cart?.ProductTitle}
                    priority={true}
                    width={100}
                    height={130}
                    layout="responsive"
                    objectFit="cover"
                    className="rounded-sm "
                  />
                ) : (
                  <Image
                    src={placeholder}
                    alt="BOOK"
                    width={100}
                    height={130}
                    layout="responsive"
                    priority={true}
                    objectFit="cover"
                    className="rounded-sm "
                  />
                )}
              </Link>
            </div>
          </div>

          {/* Cart Product Details */}
          <div className="w-full col-span-3 flex items-center">
            <div className="flex-grow">
              <div className="">
                <Link href={`/product/${cart?.URLSlug}`}>
                  <p className=" cursor-pointer hover:text-primary text-lg font-bangla hover:underline">
                    {cart?.ProductTitle}
                  </p>
                </Link>
                <div>
                  {cart?.ProductType === "ACADEMIC_BOOK" ||
                  cart?.ProductType === "SUBJECT_BOOK" ? (
                    <>
                      <p className="text-secondary font-bangla ">
                        <Link href={`/author/${cart?.author?.AuthorSlug}`}>
                          <span className="text-primary font-bangla cursor-pointer ">
                            {cart?.author?.AuthorNameBN
                              ? cart?.author?.AuthorNameBN
                              : cart?.author?.AuthorName}
                          </span>
                        </Link>
                      </p>

                      <p className="text-secondary text-sm font-bangla">
                        <Link
                          href={`/publisher/${cart?.publication?.PublicationSlug}`}
                        >
                          <span className="cursor-pointer ">
                            {cart?.publication?.PublicationName?.length > 0
                              ? cart?.publication?.PublicationName
                              : loading
                              ? "..."
                              : ""}
                          </span>
                        </Link>
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-secondary text-xs font-bangla ">
                        <span className="text-primary  font-semibold cursor-pointer ">
                          {loading ? "loading..." : ""}
                          {cart?.brand?.BrandName}
                        </span>
                      </p>
                      <p className="text-secondary font-bangla text-xs ">
                        <Link
                          href={`/subject/${cart?.ProductType}?categories=${categoryData?.CategoryID}`}
                        >
                          <span className="text-primary  font-semibold cursor-pointer">
                            {categoryData?.CategoryName
                              ? categoryData?.CategoryName
                              : ""}
                          </span>
                        </Link>
                      </p>
                    </>
                  )}
                </div>
                {/* Product Price */}
                <div className="flex gap-2">
                  <div className="basis-auto">
                    <span className="text-secondary mt-1  line-through">
                      TK.{" "}
                      {cart?.RegularPrice === undefined
                        ? 0
                        : cart?.RegularPrice}
                    </span>
                  </div>
                  <div className="basis-auto">
                    <span className="">
                      TK. {cart?.SalePrice === undefined ? 0 : cart?.SalePrice}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  {/* Item Delete Button */}
                  <div>
                    <button
                      onClick={() => handleDeleteOrders(item?.ProductID)}
                      className=" rounded-full hover:bg-slate-200 p-2 group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="md:h-6 md:w-6 w-4 h-4 hover:scale-105 transition-all ease-in-out"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                  {fav ? (
                    <button
                      disabled={cartLoading || isLoading || checkoutLoading}
                      onClick={() => AddToFav(item?.ProductID)}
                      className="hover:bg-slate-200 rounded-full p-2 group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="md:h-6 md:w-6 w-4 h-4 hover:scale-105 transition-all ease-in-out"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      disabled={cartLoading || isLoading || checkoutLoading}
                      className="font-semibold  rounded"
                      onClick={() => AddToFav(item?.ProductID)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mx-2"
                        fill="black"
                        viewBox="0 0 24 24"
                        stroke="black"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="w-fit md:mr-16 mr-2 bg-slate-200">
              {/* new UI */}
              <div className="flex md:flex-row flex-col rounded-lg relative md:w-20 w-8 bg-transparent">
                <button
                  onClick={
                    quantityData > 1 ? () => decrease(quantityData) : () => {}
                  }
                  className="cursor-pointer "
                >
                  <span
                    className="m-auto text-black p-2"
                    style={{ fontSize: "18px", lineHeight: "0px" }}
                  >
                    −
                  </span>
                </button>
                <input
                  className="outline-none focus:outline-none text-center w-full bg-slate-100 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-black"
                  value={quantityData}
                ></input>
                <button
                  onClick={
                    item?.UnitInStock <= quantityData
                      ? () =>
                          toast.error(
                            "You reached maximum quantity at " +
                              product?.UnitInStock
                          )
                      : () => increase(quantityData)
                  }
                  className="cursor-pointer"
                >
                  <span
                    className="m-auto text-black p-2"
                    style={{ fontSize: "18px", lineHeight: "0px" }}
                  >
                    +
                  </span>
                </button>
              </div>
            </div>

            {/* item footer */}
            {/* <div className="lg:divider hidden"></div> */}
            {/* action */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
