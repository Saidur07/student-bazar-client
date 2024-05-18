/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_AUTHORS_BOOKS,
  GET_AUTHORS_INFO,
  GET_PRODUCTS_FILTERED_WITH_PRODUCT_TYPE,
  GET_PRODUCT_BY_PUBLICATION_ID,
  GET_PUBLICATION_DETAILS_BY_SLUG,
  GET_SEACHED_PRODUCTS,
} from "../../api";
import { useDrawer } from "../hooks/useDrawer";
import SectionContainer from "../reusable/SectionContainer";
import Book from "../shared/Book";
import BookSkeleton from "../shared/BookSkeleton";
import Filters from "../shared/Filters";
import Banner from "./Banner";

const LoadBooks = ({
  search,
  data,
  author,
  publication,
  ProductType,
  all,
  categories,
}) => {
  const books = useSelector((data) => data.books);
  const { toggleDrawer } = useDrawer();
  console.log(categories);
  // console.log("books", books);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    async function setData() {
      if (all) {
        dispatch({
          type: "SET_FILTER",
          payload: all ? all : [],
        });
      }
      if (data) {
        dispatch({
          type: "SET_BOOKS",
          payload: data ? data : [],
        });
      }
    }
    setData();
  }, [all, dispatch]);
  const [page, setPage] = useState(
    router.query.page ? Number(router.query.page) : 1
  );
  const [sort, setSort] = useState(
    router.query.sort ? router.query.sort : "POPULARITY"
  );
  const [loading, setLoading] = useState(false);
  const [filterScrumb, setFilterScrumb] = useState([]);
  const [breadCrumb, setBreadCrumb] = useState([]);
  const title = useSelector((data) => data.filterTitle);

  const [ProductSlug, setProductSlug] = useState(ProductType);

  useEffect(() => {
    async function fetch() {
      if (router?.query?.ProductType !== ProductType) {
        setLoading(true);
        setProductSlug(router?.query?.ProductType);
      }
    }
    fetch();
  }, [router?.query?.ProductType, router]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (ProductType?.length > 0 || search || author || publication) {
        setLoading(true);
        const { data } = await axios.get(
          `${
            ProductType?.length > 0 && !search && !author && !publication
              ? `${GET_PRODUCTS_FILTERED_WITH_PRODUCT_TYPE.replace(
                  "[[ProductType]]",
                  encodeURIComponent(ProductType)
                )}`
              : search && !ProductType?.length > 0 && !author && !publication
              ? `${GET_SEACHED_PRODUCTS}?query=${search}`
              : publication && !search && !ProductType?.length > 0 && !author
              ? `${GET_PRODUCT_BY_PUBLICATION_ID.replace(
                  "[[PublicationID]]",
                  encodeURIComponent(publication?.PublicationID)
                )}`
              : author?.AuthorID &&
                GET_AUTHORS_BOOKS.replace(
                  "[AuthorID]",
                  encodeURIComponent(author?.AuthorID)
                )
          }&page=${page}&SortBy=${sort}${
            router.query?.CategoryID !== undefined &&
            router.query?.CategoryID?.length > 0
              ? "&CategoryID=" + router.query?.CategoryID
              : ""
          }${
            router.query?.Author !== undefined &&
            router.query?.Author?.length > 0
              ? "&AuthorID=" + router.query?.Author
              : ""
          }${
            router.query?.Publication !== undefined &&
            router.query?.Publication?.length > 0
              ? "&PublicationID=" + router.query?.Publication
              : ""
          }${
            router.query?.Brand !== undefined && router.query?.Brand?.length > 0
              ? "&BrandID=" + router.query?.Brand
              : ""
          }`
        );
        setFilterScrumb(data?.breadcrumb_data ? data?.breadcrumb_data : {});
        dispatch({
          type: "SET_BOOKS",
          payload: data?.products ? data?.products : [],
        });

        // For publication Details page

        if (publication?.PublicationID) {
          const { data: publicationData } = await axios.get(
            `${GET_PUBLICATION_DETAILS_BY_SLUG.replace(
              "[[PublicationSlug]]",
              publication?.PublicationSlug
            )}${
              router.query?.CategoryID !== undefined &&
              router.query?.CategoryID?.length > 0
                ? "?CategoryID=" + router.query?.CategoryID
                : ""
            }${
              router.query?.Author !== undefined &&
              router.query?.Author?.length > 0
                ? "?AuthorID=" + router.query?.Author
                : ""
            }`
          );
          dispatch({
            type: "SET_FILTER",
            payload: publicationData ? publicationData : [],
          });
        }

        // For author Details page

        if (author?.AuthorID) {
          const { data: authorData } = await axios.get(
            `${GET_AUTHORS_INFO.replace("[AuthorSlug]", author?.AuthorSlug)}${
              router.query?.CategoryID !== undefined &&
              router.query?.CategoryID?.length > 0
                ? "?CategoryID=" + router.query?.CategoryID
                : ""
            }${
              router.query?.Author !== undefined &&
              router.query?.Author?.length > 0
                ? "?AuthorID=" + router.query?.Author
                : ""
            }`
          );
          dispatch({
            type: "SET_FILTER",
            payload: authorData ? authorData : [],
          });
        }
        if (ProductType || ProductSlug || search) {
          dispatch({
            type: "SET_FILTER",
            payload: data ? data : [],
          });
        }

        // console.log("data", data);
        setLoading(false);
      }
    };
    fetchBooks();
  }, [
    sort,
    page,
    router,
    ProductType,
    search,
    author,
    publication,
    ProductSlug,
  ]);

  useEffect(() => {
    if (filterScrumb.CategoryName) {
      function lastChild(data) {
        if (!data?.child?.CategoryID) {
          return data;
        }
        return lastChild(data?.child);
      }

      dispatch({
        type: "SET_TITLE",
        payload: lastChild(filterScrumb).CategoryName
          ? lastChild(filterScrumb).CategoryName
          : "",
      });
    } else {
      switch (ProductType) {
        case "ACADEMIC_BOOK":
          dispatch({
            type: "SET_TITLE",
            payload: "একাডেমিক বই",
          });
          break;
        case "STATIONARY":
          dispatch({
            type: "SET_TITLE",
            payload: "স্টেশনারি",
          });
          break;
        case "SUBJECT_BOOK":
          dispatch({
            type: "SET_TITLE",
            payload: "সাবজেক্ট বই",
          });
        default:
          dispatch({
            type: "SET_TITLE",
            payload: ProductType ? ProductType : "",
          });
          break;
      }
    }

    let breadCrumbData = [];
    // console.log(filterScrumb);
    function getBreadCrumbData(data) {
      if (!data?.child?.CategoryID) {
        breadCrumbData.push({
          CategoryName: data.CategoryName,
          CategoryID: data.CategoryID,
        });
        return breadCrumb;
      }
      breadCrumbData.push({
        CategoryName: data.CategoryName,
        CategoryID: data.CategoryID,
      });
      return getBreadCrumbData(data?.child);
    }
    getBreadCrumbData(filterScrumb);
    // console.log(breadCrumbData);
    setBreadCrumb(breadCrumbData);
  }, [filterScrumb]);

  return (
    <div className="bg-base-100 custom-container w-full">
      <div className="grid grid-cols-2 text-slate-900 font-bold bg-white">
        {/* Sort Button */}
        <div className="md:hidden flex items-center justify-center gap-2 p-3">
          {/* sorting Icon start here */}
          <svg
            width="12"
            height="20"
            viewBox="0 0 12 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 19L1.5 12.5H10.5L6 19Z" fill="#1C1B1E" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.835667 12.1519C0.965134 11.9048 1.22104 11.75 1.5 11.75H10.5C10.779 11.75 11.0349 11.9048 11.1643 12.1519C11.2938 12.399 11.2754 12.6976 11.1166 12.9269L6.61665 19.4269C6.47656 19.6293 6.24611 19.75 6 19.75C5.75389 19.75 5.52345 19.6293 5.38336 19.4269L0.883358 12.9269C0.724572 12.6976 0.706201 12.399 0.835667 12.1519ZM2.93143 13.25L6 17.6824L9.06858 13.25H2.93143Z"
              fill="#1C1B1E"
            />
            <path d="M6 1L1.5 7.5H10.5L6 1Z" fill="#1C1B1E" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6 0.25C6.24611 0.25 6.47656 0.370744 6.61665 0.573093L11.1166 7.07309C11.2754 7.30245 11.2938 7.60098 11.1643 7.84808C11.0349 8.09518 10.779 8.25 10.5 8.25H1.5C1.22104 8.25 0.965134 8.09518 0.835667 7.84808C0.706201 7.60098 0.724572 7.30245 0.883358 7.07309L5.38336 0.573093C5.52345 0.370744 5.75389 0.25 6 0.25ZM2.93143 6.75H9.06858L6 2.31762L2.93143 6.75Z"
              fill="#1C1B1E"
            />
          </svg>
          {/* sort icon end here */}
          <select
            onChange={(e) => setSort(e.target.value)}
            className="border-none active:border-none lg:ml-1 cursor-pointer bg-transparent outline-none"
          >
            <option value="POPULARITY">Popular</option>
            <option value="LOW_TO_HIGH">Low to high</option>
            <option value="HIGH_TO_LOW">High to low</option>
          </select>
        </div>
        {/* Filter Button */}
        <div className="flex md:hidden items-center justify-center p-3 ">
          <div className="flex items-center  gap-3">
            <p className="">Filter</p>
            <label
              onClick={toggleDrawer}
              htmlFor="my-drawer"
              className="text-primary cursor-pointer "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </label>
          </div>
        </div>
      </div>

      <div className=" mb-8 mt-2 grid lg:grid-cols-5 grid-cols-1 gap-3">
        <div className="hidden lg:flex ">
          <Filters></Filters>
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="hidden md:block">
            <Banner data={categories} alt="banner_image"></Banner>
          </div>
          <SectionContainer className="  bg-white lg:md:min-h-[500px] min-h-[400px] p-5 shadow-md">
            <div className="flex w-full md:flex-row justify-between items-center lg:gap-8 gap-2  md:mb-5">
              {!ProductType && !search ? (
                <h1 className="font-bold lg:md:text-[24px] text-[16px] font-bangla text-start text-[#343434] ">
                  {publication && publication?.PublicationNameBN}{" "}
                  {author && author?.AuthorNameBN} এর সব বই
                </h1>
              ) : search && !ProductType ? (
                <h1 className="font-bold lg:md:text-[24px] text-[16px] font-bangla text-start text-[#343434] ">
                  অনুসন্ধানের ফলাফল : {search}
                </h1>
              ) : (
                ""
              )}

              {/* Breadcrumb */}
              {ProductType?.length > 0 ? (
                <div className="hidden lg:flex gap-2 text-primary">
                  <Link href={`/subject/${ProductType}`}>
                    <span className="underline font-bangla cursor-pointer">
                      {ProductType === "ACADEMIC_BOOK"
                        ? "একাডেমিক বই"
                        : ProductType === "STATIONARY"
                        ? "স্টেশনারি"
                        : ProductType === "SUBJECT_BOOK"
                        ? "সাবজেক্ট বই"
                        : ProductType}
                    </span>
                  </Link>
                  {breadCrumb?.length > 0 && <span>{`>`}</span>}
                  {breadCrumb?.map((item, index) => (
                    <p key={item.CategoryID}>
                      <Link
                        href={`/subject/${ProductType}?CategoryID=${item.CategoryID}`}
                      >
                        <span className="underline font-bangla cursor-pointer">
                          {item.CategoryName}
                        </span>
                      </Link>
                      {index !== breadCrumb.length - 1 && <span>{`>`}</span>}
                    </p>
                  ))}
                </div>
              ) : (
                ""
              )}
              {/* Sorting book */}
              <div className="hidden md:block">
                <span className="text-[#8A8A8A] font-semibold">Sort</span>
                <select
                  onChange={(e) => setSort(e.target.value)}
                  className="border-none active:border-none text-primary lg:ml-1 cursor-pointer bg-transparent outline-none"
                >
                  <option value="POPULARITY">Popular</option>
                  <option value="LOW_TO_HIGH">Low to high</option>
                  <option value="HIGH_TO_LOW">High to low</option>
                </select>
              </div>
            </div>
            {/* banner here */}

            <div className="w-full lg:md:min-h-[400px] min-h-[300px] grid content-between">
              {loading ? (
                <SectionContainer className="bg-white min-h-[300px]">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5 mb-[67px] ">
                    <BookSkeleton />
                    <BookSkeleton />
                    <BookSkeleton />
                    <BookSkeleton />
                    <BookSkeleton />
                    <BookSkeleton />
                    <BookSkeleton />
                    <BookSkeleton />
                    <BookSkeleton />
                    <BookSkeleton />
                  </div>
                </SectionContainer>
              ) : books?.length === 0 ? (
                <SectionContainer className=" bg-white flex items-center justify-center h-full pt-16">
                  <p className="text-orange-400 lg:md:text-4xl text-xl font-semibold font-poppins">
                    {" "}
                    No More Books Found{" "}
                  </p>
                </SectionContainer>
              ) : (
                <SectionContainer className="bg-white min-h-[300px]">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5 mb-[67px] ">
                    {/* items */}
                    {books?.map((book, index) => {
                      return <Book key={index} book={book}></Book>;
                    })}
                  </div>
                </SectionContainer>
              )}

              <div className="flex justify-around lg:md:my-4 my-2">
                <button
                  onClick={() => {
                    page > 1 ? setPage(page - 1) : setPage(1);
                  }}
                  disabled={page > 1 ? false : true}
                  className={
                    page < 1
                      ? "hidden"
                      : "flex text-primary items-center btn btn-ghost border-0 rounded"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                    />
                  </svg>
                  Previous page
                </button>
                <button
                  disabled={books?.length < 32 ? true : false}
                  onClick={books?.length > 1 ? () => setPage(page + 1) : null}
                  className={
                    books?.length < 1
                      ? "hidden"
                      : "btn text-primary btn-ghost border-0 rounded flex items-center "
                  }
                >
                  Next{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>{" "}
                </button>
              </div>
            </div>
          </SectionContainer>
        </div>
      </div>
    </div>
  );
};

export default LoadBooks;
