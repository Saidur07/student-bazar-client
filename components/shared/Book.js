import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { PATCH_CART_DATA } from "../../api";
import placeholder from "../../public/image/book.png";
import useCarts from "../hooks/useCarts";
const { useSelector, useDispatch } = require("react-redux");

const Book = ({ book }) => {
  const cartsData = useCarts();
  const cartData = useSelector((data) => data.cartData);
  const dispatch = useDispatch();
  const tab = "/extras";
  const cookie = new Cookies();
  const token = cookie.get("accessToken");
  const [cart, setCart] = useState(false);
  const [addLoad, setAddLoad] = useState(false);
  const discount = book?.RegularPrice - book?.SalePrice;
  const [imageError, setImageError] = useState(false);
  const [author, setAuthor] = useState({});

  const router = useRouter();

  // get Author
  //
  //
  useEffect(() => {
    async function getAuthorData() {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/author/author_detail?AuthorID=${book?.AuthorID}`
      );
      if (data?.author === undefined) {
        setAuthor({});
      } else {
        setAuthor(data?.author ? data?.author : {});
      }
    }
    getAuthorData();
  }, [book?.AuthorID]);

  console.log("author", author);
  //
  // ADD TO CART
  //
  const AddToCart = async () => {
    if (!token) {
      router.push("/signin");
    } else {
      setAddLoad(true);
      const cart_data = {
        ProductID: book?.ProductID,
        Quantity: 1,
      };
      const { data } = await axios.patch(PATCH_CART_DATA, cart_data, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({ type: "SET_CART_ITEMS", payload: data });
      toast.success(`${book?.ProductTitle} was added to cart succesfully`);
      setAddLoad(false);
    }
  };

  useEffect(() => {
    if (token && cartsData[0]) {
      const fetchCartData = async () => {
        const object = await cartsData[0].find(
          (item) => item?.ProductID === book?.ProductID
        );
        if (object === undefined) {
          setCart(false);
        } else {
          setCart(true);
        }
      };

      fetchCartData();
    }
  }, [cartsData, cartData, book, token]);

  return (
    <div className=" hover:border-gray-200 border rounded-sm transition-all border-white relative group">
      {/* discount */}
      {book?.DiscountAvailable === true && router?.pathname === tab ? (
        <span className="badge bg-[#F26133] w-[45px] py-[12px] lg:md:ml-[81.5%] ml-[75%] z-10  text-white rounded-r-none rounded-l-[8px] font-poppins absolute mt-[8%] text-center text-[10px]">
          -{(discount * 100) / book?.RegularPrice}%
        </span>
      ) : null}
      {/* cart button */}
      {/* <div className="hidden group-hover:flex absolute z-10 w-full p-3 items-center justify-center cursor-pointer h-[186px]">
        {book.ProductAvailable ? (
          <div>
            {cart === false ? (
              <button
                className="bg-slate-900 p-3 rounded-md"
                onClick={AddToCart}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className=" lg:h-6 lg:w-6 md:h-6 md:w-6 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            ) : (
              <button
                className={"bg-green-400 p-3 rounded-md"}
                onClick={() =>
                  toast.info(`${book.ProductTitle} "already added`)
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="lg:h-6 lg:w-6 md:h-6 md:w-6 h-4 w-4 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            )}
          </div>
        ) : (
          <p className=" font-semibold text-sm bg-red-500 text-white p-2">
            Stock Out
          </p>
        )}
      </div> */}
      {/* image */}
      <div className="rounded-sm ">
        <Link href={`/product/${book?.URLSlug}`}>
          <div className="flex justify-center p-3">
            <figure style={{ width: "130px", height: "186px" }}>
              {book?.Picture ? (
                <Image
                  src={imageError ? placeholder : book?.Picture}
                  width="130px"
                  height="186px"
                  layout="responsive"
                  objectFit="cover"
                  priority={true}
                  className="shadow-2xl cursor-pointer rounded-sm"
                  alt="image of book"
                  onError={(e) => {
                    setImageError(true);
                  }}
                />
              ) : (
                <Image
                  src={placeholder}
                  width="130px"
                  height="186px"
                  layout="responsive"
                  objectFit="cover"
                  priority={true}
                  className="shadow-2xl cursor-pointer rounded-sm"
                  alt="image of book"
                />
              )}
            </figure>
          </div>
        </Link>
        {/* title */}
        <div className="card-body p-2 m-0 gap-0 text-center">
          <Link href={`/product/${book?.URLSlug}`}>
            <p className="font-bangla cursor-pointer lg:hover:text-primary transition-all">
              <span className="hidden md:block xl:block lg:block text-lg">
                {book?.ProductTitle.length > 40
                  ? book?.ProductTitle.substring(0, 40) + "..."
                  : book?.ProductTitle}
              </span>
              <span className="lg:hidden md:hidden xl:hidden text-lg">
                {book?.ProductTitle.length > 50
                  ? book?.ProductTitle.substring(0, 50) + ".."
                  : book?.ProductTitle}
              </span>
            </p>
          </Link>
          {/* author */}
          {book?.AuthorID && author ? (
            <Link href={`/author/${author?.AuthorSlug}`}>
              <p className="font-bangla pt-1  text-sm text-gray-500 cursor-pointer">
                {author?.AuthorNameBN
                  ? author?.AuthorNameBN
                  : author?.AuthorName}
              </p>
            </Link>
          ) : (
            ""
          )}
          {/* <div className="flex items-center space-x-1">
            <div className="lg:flex hidden">
              <ReactStars
                value={parseFloat(book?.Rating)}
                size={20}
                // color1={"#8A8A8A"}
                color2={"#F26133"}
                edit={false}
              />
            </div>
            <div className="lg:hidden flex">
              <ReactStars
                value={parseFloat(book?.Rating)}
                size={15}
                // color1={"#8A8A8A"}
                color2={"#F26133"}
                edit={false}
              />
            </div>
            <div className="text-secondary text-xs lg:pt-1 pt-0">
              ({book?.Reviews})
            </div>
          </div> */}
          {/* price */}
          <div className="text-center mt-2">
            <div className="flex justify-center gap-2 font-bangla">
              <span className="text-secondary text-lg line-through">
                TK. {book?.RegularPrice}
              </span>
              <span className="text-lg">TK. {book?.SalePrice}</span>
            </div>
            {book.ProductAvailable ? (
              <div className="mt-1">
                {cart === false ? (
                  <button
                    className="bg-yellow-500 font-semibold p-2 text-sm text-slate-900 rounded-none"
                    onClick={AddToCart}
                  >
                    Add to cart
                  </button>
                ) : (
                  <button
                    className={
                      "bg-slate-300 p-2 font-semibold text-sm text-slate-900 rounded-none"
                    }
                    onClick={() =>
                      toast.info(`${book.ProductTitle} "already added`)
                    }
                  >
                    Already added
                  </button>
                )}
              </div>
            ) : (
              <p className=" font-semibold text-sm  text-red-500 p-2">
                Stock Out
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;

// export BUN_INSTALL="$HOME/.bun"
// export PATH="$BUN_INSTALL/bin:$PATH"
