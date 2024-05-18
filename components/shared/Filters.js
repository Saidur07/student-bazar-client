import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import SectionContainer from "../reusable/SectionContainer";

const Filters = ({ closeDrawer }) => {
  const filters = useSelector((data) => data.filterData);
  const title = useSelector((data) => data.filterTitle);
  const { categories, authors, publications, publishers, brands } = filters;
  // const products = useSelector((data) => data.books);

  // console.log("filters", publications);

  // console.log(filters);

  // States for filters
  //
  //
  //
  //

  const [Subcategory, setSubcategory] = useState([]);
  const [Author, setAuthor] = useState([]);
  const [Publication, setPublication] = useState([]);
  const [Brand, setBrand] = useState([]);
  const [filterTitle, setFilterTitle] = useState("");
  const router = useRouter();

  const _chooseSubcategory = (e) => {
    if (Subcategory.includes(e.target.value)) {
      if (Subcategory.length === 1 || !Subcategory) {
        setSubcategory([]);
        delete router.query?.CategoryID;
        router.push(router, undefined, { shallow: true });
      } else {
        setSubcategory(Subcategory.filter((item) => item !== e.target.value));
      }
    } else {
      setSubcategory([e.target.value]);
    }
  };

  const _chooseAuthor = (e) => {
    if (Author.includes(e.target.value)) {
      delete router.query?.Author;
      router.push(router, undefined, { shallow: true });
      setAuthor([]);
    } else {
      setAuthor([e.target.value]);
    }
  };
  const _choosePublication = (e) => {
    if (Publication.includes(e.target.value)) {
      if (Publication.length === 1 || !Publication) {
        setPublication([]);
        delete router.query?.Publication;
        router.push(router, undefined, { shallow: true });
      } else {
        setPublication(Publication.filter((item) => item !== e.target.value));
      }
    } else {
      setPublication([...Publication, e.target.value]);
    }
  };
  const _chooseBrand = (e) => {
    if (Brand.includes(e.target.value)) {
      if (Brand.length === 1 || !Brand) {
        setBrand([]);
        delete router.query?.Brand;
        router.push(router, undefined, { shallow: true });
      } else {
        setBrand(Brand.filter((item) => item !== e.target.value));
      }
    } else {
      setBrand([...Brand, e.target.value]);
    }
  };
  useEffect(() => {
    if (Subcategory && Subcategory.length > 0) {
      router.query.CategoryID = Subcategory.toString();
      router.push(router, undefined, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Subcategory]);
  useEffect(() => {
    if (Author && Author.length > 0) {
      router.query.Author = Author.toString();
      router.push(router, undefined, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Author]);
  useEffect(() => {
    if (Publication && Publication.length > 0) {
      router.query.Publication = Publication.toString();
      router.push(router, undefined, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Publication]);
  useEffect(() => {
    if (Brand && Brand.length > 0) {
      router.query.Brand = Brand.toString();
      router.push(router, undefined, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Brand]);
  useEffect(() => {
    setFilterTitle(title);
  }, [title]);

  // const [filter, setFilter] = useState([]);

  // useEffect(() => {
  //   const find = products?.find((book) =>
  //     categories?.find((item) => {
  //       return book?.CategoryID?.includes(item?.CategoryID);
  //     })
  //   );
  //   setFilter(find);
  //   // console.log("find", find);
  // }, [products, categories]);

  // console.log(filter);
  return (
    <div className="w-full bg-white md:bg-transparent lg:h-full h-screen overflow-y-auto small-scrollbar">
      <aside aria-label="Sidebar">
        <div className="lg:rounded rounded-none w-full lg:h-full h-screen">
          <h1 className="bg-slate-900 px-5 py-2 text-white text-xl font-semibold font-poppins">
            Filter by
          </h1>
          <hr className=" border-black" />
          {/* {products?.length > 0 ? ( */}
          {router.query?.CategoryID ? (
            <div
              className="float-right p-5
          "
            >
              <BsArrowLeftCircle onClick={() => router.back()} size={30} />
            </div>
          ) : (
            ""
          )}

          <>
            <SectionContainer
              title={filterTitle ? filterTitle : "বিষয়"}
              line={true}
              className="bg-white p-5"
            >
              <ul className="my-1 max-h-[300px] overflow-y-auto small-scrollbar ">
                {/* {filter !== undefined ? ( */}
                {categories?.map((item, index) => {
                  return (
                    <div className="font-bangla" key={index}>
                      <li key={index}>
                        <div className="w-full ">
                          <label
                            htmlFor={`${item?.CategoryID}`}
                            className={
                              router.query?.CategoryID === item?.CategoryID
                                ? "cursor-pointer text-md py-1 pl-2 flex items-center after:text-gray-500 after:font-bold text-gray-900 bg-gray-100 rounded hover:bg-gray-200 "
                                : "cursor-pointer text-md flex items-center after:text-gray-500 after:font-bold hover:bg-gray-200 rounded py-1 pl-2"
                            }
                          >
                            <input
                              type="checkbox"
                              id={`${item?.CategoryID}`}
                              className="mr-2 w-5 h-5 cursor-pointer accent-primary"
                              value={item?.CategoryID}
                              onChange={_chooseSubcategory}
                              checked={
                                router.query?.CategoryID === item?.CategoryID
                              }
                            />
                            <div className="w-full py-1">
                              {item?.CategoryName}
                            </div>
                          </label>
                        </div>
                      </li>
                    </div>
                  );
                })}
              </ul>
            </SectionContainer>
            {authors?.length > 0 && (
              <SectionContainer
                title="লেখক"
                line={true}
                className="bg-white p-5 my-3"
              >
                <ul
                  className={
                    authors?.length === 0
                      ? "hidden max-h-[300px] overflow-y-auto small-scrollbar"
                      : "space-y-2 mt-3 py-4 max-h-[300px] overflow-y-auto small-scrollbar"
                  }
                >
                  {authors
                    ?.slice(0)
                    ?.reverse()
                    ?.map((item, index) => (
                      <div className="font-bangla" key={index}>
                        <li className=" text-base font-normal text-gray-900 rounded-lg lg:hover:bg-gray-100 cursor-pointer">
                          <label
                            className="cursor-pointer flex items-center p-y pl-2"
                            htmlFor={item?.AuthorID}
                          >
                            {" "}
                            <input
                              type="checkbox"
                              id={item?.AuthorID}
                              value={item?.AuthorID}
                              className="mr-2 w-4 h-4 cursor-pointer accent-primary"
                              onChange={_chooseAuthor}
                              checked={
                                Author.includes(item?.AuthorID) ||
                                router.query?.Author
                                  ? router.query?.Author?.includes(
                                      item?.AuthorID
                                    )
                                  : ""
                              }
                            />
                            {item?.AuthorNameBN}
                          </label>
                        </li>
                      </div>
                    ))}
                </ul>
              </SectionContainer>
            )}
            {publishers?.length > 0 || publications?.length > 0 ? (
              <SectionContainer
                title="প্রকাশনা"
                line={true}
                className="bg-white  p-5 my-3"
              >
                <ul
                  className={
                    publishers?.length === 0 || publications?.length === 0
                      ? "hidden max-h-[300px] overflow-y-auto small-scrollbar"
                      : "space-y-2 py-4 max-h-[300px] overflow-y-auto small-scrollbar"
                  }
                >
                  {publishers?.length > 0
                    ? publishers
                        ?.slice(0)
                        ?.reverse()
                        ?.map((item, index) => (
                          <div className="font-bangla" key={index}>
                            <li className="text-base font-normal text-gray-900 rounded-lg lg:hover:bg-gray-100 cursor-pointer">
                              <label
                                className="cursor-pointer flex items-center p-y pl-2"
                                htmlFor={`${item?.PublicationNameBN}${index}`}
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id={`${item?.PublicationNameBN}${index}`}
                                  value={item?.PublicationID}
                                  className="mr-2 w-4 h-4 cursor-pointer accent-primary"
                                  onChange={_choosePublication}
                                  checked={
                                    Publication.includes(item?.PublicationID) ||
                                    router.query?.Publication
                                      ? router.query?.Publication?.includes(
                                          item?.PublicationID
                                        )
                                      : ""
                                  }
                                />
                                {item?.PublicationNameBN}
                              </label>
                            </li>
                          </div>
                        ))
                    : publications
                        ?.slice(0)
                        ?.reverse()
                        ?.map((item, index) => (
                          <div className="font-bangla" key={index}>
                            <li className="text-base font-normal text-gray-900 rounded-lg lg:hover:bg-gray-100 cursor-pointer">
                              <label
                                className="cursor-pointer flex items-center p-y pl-2"
                                htmlFor={`${item?.PublicationNameBN}${index}`}
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id={`${item?.PublicationNameBN}${index}`}
                                  value={item?.PublicationID}
                                  className="mr-2 w-4 h-4 cursor-pointer accent-primary"
                                  onChange={_choosePublication}
                                  checked={
                                    Publication.includes(item?.PublicationID) ||
                                    router.query?.Publication
                                      ? router.query?.Publication?.includes(
                                          item?.PublicationID
                                        )
                                      : ""
                                  }
                                />
                                {item?.PublicationNameBN}
                              </label>
                            </li>
                          </div>
                        ))}
                </ul>
              </SectionContainer>
            ) : (
              ""
            )}
            {brands?.length > 0 && (
              <SectionContainer
                title="ব্র্যান্ড"
                line={true}
                className="bg-white p-5 my-3"
              >
                <ul
                  className={
                    brands?.length === 0
                      ? "hidden max-h-[300px] overflow-y-auto small-scrollbar"
                      : "space-y-2 py-4 max-h-[300px] overflow-y-auto small-scrollbar"
                  }
                >
                  {brands
                    ?.slice(0)
                    ?.reverse()
                    ?.map((item, index) => (
                      <div className="font-bangla" key={index}>
                        <li className="text-base font-normal text-gray-900 rounded-lg lg:hover:bg-gray-100 cursor-pointer">
                          <label
                            className="cursor-pointer flex items-center p-y pl-2"
                            htmlFor={`${item?.BrandID}`}
                          >
                            {" "}
                            <input
                              type="checkbox"
                              id={item?.BrandID}
                              value={item?.BrandID}
                              className="mr-2 w-4 h-4 cursor-pointer accent-primary"
                              onChange={_chooseBrand}
                              checked={
                                Brand.includes(item?.BrandID) ||
                                router.query?.Brand
                                  ? router.query?.Brand?.includes(item?.BrandID)
                                  : ""
                              }
                            />
                            {item?.BrandName}
                          </label>
                        </li>
                      </div>
                    ))}
                </ul>
              </SectionContainer>
            )}
            <label
              onClick={closeDrawer}
              htmlFor="my-drawer"
              className="lg:hidden rounded-none font-bold text-center fixed bottom-0  btn btn-block btn-warning"
            >
              Search
            </label>
          </>
          {/* ) : (
            <SectionContainer className="bg-white shadow-md p-5 my-3">
              <ul className="space-y-2 py-4">
                <div className="font-bangla">
                  <li className="text-base font-normal text-gray-900 rounded-lg cursor-pointer">
                    বিষয় খুঁজে পাওয়া যায়নি
                  </li>
                </div>
              </ul>
            </SectionContainer>
          )} */}
        </div>
      </aside>
    </div>
  );
};

export default Filters;
