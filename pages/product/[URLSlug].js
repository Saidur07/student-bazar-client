import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import ImageViewer from "react-simple-image-viewer";
import ReactStars from "react-stars";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import {
  GET_AUTHOR_NAME_BY_AUTHOR_ID,
  GET_BOOK_DETAILS_BY_URL_SLUG,
  GET_PRODUCT_REVIEW_BY_ID,
  GET_SIMILAR_PRODUCTS,
  GET_USER_INFO,
  PATCH_CART_DATA,
} from "../../api";
import { AddToCartBtn, AddToFavBtn } from "../../components/cart/MainButtons";
import useFavorite from "../../components/hooks/useFavorite";
import SectionContainer from "../../components/reusable/SectionContainer";
import BookSkeleton from "../../components/shared/BookSkeleton";
import ProductDetails from "../../components/shared/ProductDetails";
import RelatedBook from "../../components/shared/RelatedBook";
import ReveiwSection from "../../components/shared/ReveiwSection";
import placeholder from "../../public/image/book.png";
const Books = ({ product }) => {
  /** Reveiw states */
  const [reviewForm, setReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [deleteData, setDeleteData] = useState({});
  const [editData, setEditData] = useState({});
  /**Loading States */

  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false);

  /**Essentials States */

  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();
  const cookie = new Cookies();
  const token = cookie.get("accessToken");
  const router = useRouter();

  /** Favourite Item States*/

  const [AddToFav, setAddLoad, fav, setProduct] = useFavorite();
  useEffect(() => {
    if (product) {
      setProduct(product);
    }
  }, [product, setProduct]);

  /** Releted Book States */

  const [relatedBooks, setRelatedBooks] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);

  /** Stock States */

  const [stock, setStock] = useState(product?.UnitInStock - 1 || 0);

  /** Author States */

  const [authorName, setAuthor] = useState({});
  /** GET USER DATA */
  useEffect(() => {
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
    }
    if (token) {
      fetchUserData();
    }
  }, [dispatch, token]);
  const user = useSelector((data) => data.userData);
  /**
   *
   * ADD TO CART
   *
   */
  const AddToCart = async () => {
    if (!token) {
      router.push("/signin");
    } else {
      setAddLoad(true);
      let formData = new FormData();
      formData.append("ProductID", product?.ProductID);
      formData.append("Quantity", quantityData);
      const { data } = await axios.patch(PATCH_CART_DATA, formData, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: "SET_CART_ITEMS",
        payload: data?.cart_data?.Items ? data?.cart_data?.Items : [],
      });
      toast.success(`${product?.ProductTitle} was added to cart succesfully`);
      setQuantity(1);
      setAddLoad(false);
    }
  };

  /**
   *
   *
   *  GET AUTHOR DATA BY ID
   *
   */

  useEffect(() => {
    async function fetchData() {
      if (product?.AuthorID) {
        const { data } = await axios.get(
          GET_AUTHOR_NAME_BY_AUTHOR_ID.replace("[AuthorID]", product?.AuthorID)
        );
        const { author } = data;
        setAuthor(author);
      }
    }

    fetchData();
    setLoading(false);
  }, [product?.AuthorID]);

  //
  //
  // GET RELATED BOOKS DATA
  //
  //
  // console.log(product?.CategoryID[0]);
  useEffect(() => {
    async function fetchRelatedData() {
      const { data } = await axios.get(
        GET_SIMILAR_PRODUCTS.replace("[ProductID]", product?.ProductID)
      );
      setRelatedBooks(data?.products);
    }

    fetchRelatedData();
    setRelatedLoading(false);
  }, [product?.ProductID]);

  // console.log(relatedBooks);

  // GET REVIEW DATA BY PRODUCT ID

  useEffect(() => {
    async function fetchReviewData() {
      setReviewLoading(true);
      const { data } = await axios.get(
        GET_PRODUCT_REVIEW_BY_ID.replace("[ProductID]", product?.ProductID)
      );
      setReviewData(data.reviews.reverse());
    }
    fetchReviewData();
    setReviewLoading(false);
  }, [product?.ProductID, token, deleteData, editData]);

  /**
   *
   *
   *
   * Quantity Change
   *
   *
   */
  const [quantityData, setQuantity] = useState(product?.QuantityPerUnit);
  const increase = (i) => {
    setStock(stock - 1);
    setQuantity(i + 1);
  };
  const decrease = (d) => {
    setStock(stock + 1);
    setQuantity(d - 1);
  };
  const changingValue = (e) => {
    let value = parseInt(e.target.value);
    if (e.target.value === "" || e.target.value === "0") {
      value = 1;
      setStock(product?.UnitInStock - 1);
    }
    if (value === product?.QuantityPerUnit) {
      setQuantity(product?.QuantityPerUnit);
    } else {
      setQuantity(value);
      setStock(product?.UnitInStock - value);
    }
    if (value >= product?.UnitInStock) {
      setStock(0);
      setQuantity(product?.UnitInStock);
    }
  };
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = [product?.Picture];

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  const [showPDF, setShowPDF] = useState(false);
  function _openModal() {
    setShowPDF(true);
  }
  function _closeModal() {
    setShowPDF(false);
  }
  const AddToFavFunc = () => AddToFav(product?.ProductID);

  Modal.defaultStyles.overlay.backgroundColor = "rgba(0,0,0,.4)";
  return (
    <div className="">
      <Head>
        <title>Okkhor - {product?.ProductTitle} </title>
        {/* <!-- Primary Meta Tags --> */}
        <meta name="title" content={product?.ProductTitle} />
        <meta name="description" content={product?.ProductDesc} />

        {/* <!-- Open Graph / Facebook --> */}

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`http://sbclient.vercel.app/book/${product?.URLSlug}`}
        />
        <meta property="og:title" content={product?.ProductTitle} />
        <meta property="og:description" content={product?.ProductDesc} />
        <meta property="og:image" content={product?.Picture} />
        {/* <!-- Twitter --> */}
        <meta property="twitter:locale" content="bn" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/book/${product?.URLSlug}`}
        />
        <meta property="twitter:title" content={product?.ProductTitle} />
        <meta property="twitter:description" content={product?.ProductDesc} />
        <meta property="twitter:image" content={product?.Picture} />
      </Head>
      <main className=" custom-container">
        <section className="grid lg:grid-cols-4 grid-cols-1 gap-4 ">
          <div className="lg:col-span-3">
            <SectionContainer className="bg-white p-5 md:my-4 my-3 shadow-md">
              <div className="lg:grid lg:grid-cols-3 gap-5 col-span-1">
                <div className="col-span-1 lg:block hidden">
                  <Modal
                    isOpen={showPDF}
                    onRequestClose={_closeModal}
                    contentLabel="Payment Modal"
                    shouldCloseOnOverlayClick={true}
                    className="lg:w-1/2 h-[85vh] md:w-4/6 w-full lg:p-0 grid mx-auto mb-0  p-4 relative rounded-xl top-1/2 -translate-y-1/2"
                  >
                    <embed
                      src={`${product?.BookPDF}#toolbar=0&navpanes=0`}
                      height="100%"
                      width="100%"
                      type="application/pdf"
                    ></embed>
                  </Modal>

                  {images ? (
                    images?.map((src, index) =>
                      images && src ? (
                        <Image
                          src={imageError ? placeholder : src}
                          onClick={() => openImageViewer(index)}
                          width="60%"
                          height="85%"
                          priority={true}
                          layout="responsive"
                          objectFit="cover"
                          className="shadow-2xl cursor-pointer rounded-md"
                          key={index}
                          alt="image of selected book"
                          onError={(e) => {
                            setImageError(true);
                          }}
                        />
                      ) : (
                        <Image
                          src={placeholder}
                          width="60%"
                          height="85%"
                          priority={true}
                          layout="responsive"
                          objectFit="fill"
                          className="shadow-2xl cursor-pointer rounded-sm"
                          key={index}
                          alt="image of selected book"
                        />
                      )
                    )
                  ) : (
                    <Image
                      src={placeholder}
                      width="60%"
                      height="85%"
                      priority={true}
                      layout="responsive"
                      objectFit="fill"
                      className="shadow-2xl cursor-pointer rounded-sm"
                      alt="image of selected book"
                    />
                  )}
                  {isViewerOpen && (
                    <ImageViewer
                      src={images}
                      currentIndex={currentImage}
                      onClose={closeImageViewer}
                      width={300}
                      height={300}
                      disableScroll={false}
                      backgroundStyle={{
                        backgroundColor: "rgba(0,0,0,0.5)",
                      }}
                      closeOnClickOutside={true}
                    />
                  )}
                </div>
                <div className="col-span-1 p-6 lg:hidden block">
                  <Modal
                    isOpen={showPDF}
                    onRequestClose={_closeModal}
                    contentLabel="Payment Modal"
                    shouldCloseOnOverlayClick={true}
                    className="lg:w-1/2 h-[85vh] md:w-4/6 w-full lg:p-0 grid mx-auto mb-0  p-4 relative rounded-xl top-1/2 -translate-y-1/2"
                  >
                    <embed
                      src={`${product?.BookPDF}#toolbar=0&navpanes=0`}
                      height="100%"
                      width="100%"
                      type="application/pdf"
                    ></embed>
                  </Modal>
                  {images ? (
                    images.map((src, index) =>
                      images && src ? (
                        <Image
                          src={imageError ? placeholder : src}
                          onClick={() => openImageViewer(index)}
                          width="60%"
                          priority={true}
                          height="85%"
                          layout="responsive"
                          objectFit="fill"
                          className="shadow-2xl cursor-pointer rounded-sm"
                          key={index}
                          alt="image of selected book"
                          onError={(e) => {
                            setImageError(true);
                          }}
                        />
                      ) : (
                        <Image
                          src={placeholder}
                          width="60%"
                          height="85%"
                          layout="responsive"
                          objectFit="fill"
                          className="shadow-2xl cursor-pointer rounded-sm"
                          key={index}
                          alt="image of selected book"
                        />
                      )
                    )
                  ) : (
                    <Image
                      src={placeholder}
                      width="60%"
                      height="85%"
                      layout="responsive"
                      objectFit="fill"
                      className="shadow-2xl cursor-pointer rounded-sm"
                      alt="image of selected book"
                    />
                  )}
                  {isViewerOpen && (
                    <ImageViewer
                      src={images}
                      currentIndex={currentImage}
                      onClose={closeImageViewer}
                      width={300}
                      height={300}
                      disableScroll={false}
                      backgroundStyle={{
                        backgroundColor: "rgba(0,0,0,0.5)",
                      }}
                      closeOnClickOutside={true}
                    />
                  )}
                </div>
                <div className="col-span-2">
                  <div className="w-full p-5">
                    {" "}
                    <h1 className="lg:text-3xl text-xl mb-3 font-semibold  font-bangla">
                      {product?.ProductTitle}
                    </h1>
                    {product?.ProductType !== "STATIONARY" ? (
                      <div className="grid space-y-1 ">
                        {" "}
                        <p className="text-secondary font-bangla">
                          লেখক:
                          <Link href={`/author/${product?.author?.AuthorSlug}`}>
                            <span className="font-bangla text-orange-600 text-lg ml-2 cursor-pointer">
                              {product?.author?.AuthorNameBN?.length > 0
                                ? product?.author?.AuthorNameBN
                                : loading
                                ? "..."
                                : ""}
                            </span>
                          </Link>
                        </p>
                        <p className="text-secondary font-bangla">
                          প্রকাশক:
                          <Link
                            href={`/publisher/${product?.publication?.PublicationSlug}`}
                          >
                            <span className="font-bangla text-orange-600 text-lg ml-2 cursor-pointer">
                              {product?.publication?.PublicationName?.length > 0
                                ? product?.publication?.PublicationName
                                : loading
                                ? "..."
                                : ""}
                            </span>
                          </Link>
                        </p>
                      </div>
                    ) : (
                      <>
                        <p className="text-secondary font-bangla">
                          ব্র্যান্ড:
                          <span className="font-bangla text-orange-600 text-lg ml-2 cursor-pointer">
                            {loading ? "loading..." : ""}
                            {product?.brand?.BrandName}
                          </span>
                        </p>
                        <p className="text-secondary font-bangla">
                          ক্যাটাগরি:
                          {product?.categories?.map((Category) => (
                            <Link
                              key={Category?.CategoryID}
                              href={`/subject/${product?.ProductType}?categories=${Category?.CategoryID}`}
                            >
                              <span className="font-bangla text-orange-600 ml-2 cursor-pointer bg-gray-100 hover:bg-gray-50 rounded px-1">
                                {Category?.CategoryName}
                              </span>
                            </Link>
                          ))}
                        </p>
                      </>
                    )}
                    {product?.ProductType === "SUBJECT_BOOK" ? (
                      <p className="text-secondary font-bangla">
                        বিষয়:
                        {product?.categories?.map((Category) => {
                          return (
                            <Link
                              key={Category?.CategoryID}
                              href={`/subject/${product?.ProductType}?categories=${Category?.CategoryID}`}
                            >
                              <span className="font-bangla text-orange-600 ml-2 cursor-pointer bg-gray-100 hover:bg-gray-50 rounded px-1">
                                {Category?.CategoryName}
                              </span>
                            </Link>
                          );
                        })}
                      </p>
                    ) : (
                      product?.CustomAttributes?.map((item) => {
                        return (item?.AttributeName === "Class" &&
                          item?.AttributeValue) ||
                          (item?.AttributeName === "Group" &&
                            item?.AttributeValue) ||
                          (item?.AttributeName === "Exam" &&
                            item?.AttributeValue) ? (
                          <p
                            key={item?.AttributeName}
                            className="text-secondary font-bangla pt-2"
                          >
                            {item?.AttributeName === "Class"
                              ? "শ্রেনী"
                              : item?.AttributeName === "Group"
                              ? "গ্রুপ"
                              : "পরীক্ষা"}
                            :
                            <span className="font-bangla text-secondary text-lg ml-2">
                              {item?.AttributeValue}
                            </span>
                          </p>
                        ) : (
                          ""
                        );
                      })
                    )}
                    {product?.CustomAttributes?.map((item) => {
                      return item?.AttributeName === "ShortDesc" &&
                        item?.AttributeValue ? (
                        <div
                          key={item?.AttributeName}
                          className="border-l-4 border-primary  lg:w-11/12 w-full pl-2 my-2 break-words"
                        >
                          {product?.CustomAttributes?.map((item) => {
                            return item?.AttributeName === "ShortDesc" &&
                              item?.AttributeValue ? (
                              <p
                                key={item?.AttributeName}
                                className="text-secondary font-bangla lg:text-sm text-xs"
                              >
                                {item?.AttributeValue.length > 250
                                  ? item?.AttributeValue.slice(0, 250) + "..."
                                  : item?.AttributeValue}
                              </p>
                            ) : (
                              ""
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      );
                    })}
                    <div className="flex items-center gap-2">
                      <ReactStars
                        value={
                          reviewData?.length
                            ? Number(
                                reviewData.reduce(
                                  (index, item) =>
                                    (index = index + item.StarCount),
                                  0
                                ) / reviewData.length
                              ).toFixed(1)
                            : 0.0
                        }
                        size={30}
                        color2={"#F26133"}
                        edit={false}
                      />

                      <p className="text-secondary text-sm">
                        ({reviewData?.length})
                      </p>
                    </div>
                    <p className="text-sm font-semibold">
                      Available:{" "}
                      <span className="text-xs text-primary">
                        {product?.UnitInStock < 1
                          ? "Not Available Right Now"
                          : product?.UnitInStock}
                      </span>
                    </p>
                    <div className="py-2 font-semibold ">
                      <span className="line-through lg:text-lg text-sm  text-gray-500 font-poppins">
                        TK. {product?.RegularPrice}
                      </span>

                      <span className="text-gray-900 lg:text-xl text-lg ml-2 text-none font-poppins">
                        TK. {product?.SalePrice}
                      </span>
                    </div>
                    <div className="input-group flex-start items-center rounded-xl w-36 py-3">
                      <button
                        onClick={
                          quantityData > 1
                            ? () => decrease(quantityData)
                            : () => {}
                        }
                        className="btn btn-square btn-sm h-10 w-10 btn-primary"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <input
                        type="number"
                        value={quantityData}
                        onChange={changingValue}
                        className="input h-9 w-full text-center p-0 border-2"
                      />
                      <button
                        onClick={
                          product?.UnitInStock <= quantityData
                            ? () =>
                                toast.error(
                                  "You reached maximum quantity at " +
                                    product?.UnitInStock
                                )
                            : () => increase(quantityData)
                        }
                        className="btn btn-square btn-sm h-10 w-10 btn-primary"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {product?.ProductAvailable ? (
                    <div
                      className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full  bg-white mb-[8vh] bg-opacity-90 rounded-lg
                    "
                    >
                      {product?.ProductType !== "STATIONARY" ? (
                        <button
                          className="btn font-semibold hover:btn-primary hover:btn-outline btn-outline btn-primary rounded font-bangla text-secondary normal-case"
                          onClick={
                            product?.BookPDF
                              ? _openModal
                              : () => toast.error("No PDF Available")
                          }
                        >
                          একটু পড়ে দেখুন
                        </button>
                      ) : (
                        ""
                      )}

                      {fav ? (
                        <AddToFavBtn
                          AddToFavFunc={AddToFavFunc}
                          content="Add to favourites"
                        ></AddToFavBtn>
                      ) : (
                        <AddToFavBtn
                          AddToFavFunc={AddToFavFunc}
                          content="Remove from favourites"
                        ></AddToFavBtn>
                      )}
                      <AddToCartBtn
                        AddToCartFunc={AddToCart}
                        content="Add to cart"
                      ></AddToCartBtn>
                    </div>
                  ) : (
                    <div>
                      <p className="text-primary text-sm font-semibold my-3">
                        Product is Currently Unavailable
                      </p>
                      <AddToFavBtn
                        AddToFavFunc={AddToFavFunc}
                        content="Add to favourites"
                      ></AddToFavBtn>
                    </div>
                  )}
                </div>
              </div>
            </SectionContainer>
            <ProductDetails
              authorName={authorName}
              product={product}
            ></ProductDetails>
          </div>

          {/* Related books section */}
          <SectionContainer className="col-span-1 bg-white p-2 shadow-md md:mt-4">
            <div className="border-2 lg:border-0 w-full">
              <h4 className="p-5 lg:text-xl text-2xl font-bold text-center lg:text-start lg:font-semibold uppercase ">
                {product?.ProductType === "STATIONARY" ? (
                  <>Related Products</>
                ) : (
                  <>Related Books</>
                )}
              </h4>
            </div>
            <div className="lg:w-full w-[95vw] lg:grid flex lg:px-2 px-0 little-scrollbar lg:grid-cols-1 lg:max-h-[120vh]   overflow-y-hidden lg:overflow-x-hidden overflow-x-scroll lg:overflow-y-scroll gap-3 py-3 ">
              {relatedLoading
                ? relatedBooks.map((index) => {
                    return <BookSkeleton key={index}></BookSkeleton>;
                  })
                : relatedBooks.map((book, index) => {
                    return (
                      <RelatedBook
                        setQuantity={setQuantity}
                        key={index}
                        book={book}
                      ></RelatedBook>
                    );
                  })}
            </div>
          </SectionContainer>
        </section>

        <ReveiwSection
          reviewData={reviewData}
          setReviewData={setReviewData}
          setReviewForm={setReviewForm}
          reviewLoading={reviewLoading}
          setReviewLoading={setReviewLoading}
          token={token}
          product={product}
          user={user}
          setDeleteData={setDeleteData}
          setEditData={setEditData}
          reviewForm={reviewForm}
        ></ReveiwSection>
      </main>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(
    GET_BOOK_DETAILS_BY_URL_SLUG.replace(
      "[[URL_SLUG]]",
      encodeURI(params?.URLSlug)
    )
  );
  const { product } = data;
  return { props: { product } };
}

export default Books;
