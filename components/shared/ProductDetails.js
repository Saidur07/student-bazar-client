import React from "react";
import SectionContainer from "../reusable/SectionContainer";

const ProductDetails = ({ authorName, product }) => {
  // console.log(product);
  return (
    <SectionContainer
      className="lg:col-span-3 h-auto border-t p-6 overflow-hidden break-words bg-white"
      title={`Summary`}
      line={true}
    >
      <article
        className="text-gray-500 text-sm mt-1 font-poppins overflow-y-auto"
        dangerouslySetInnerHTML={{ __html: product?.ProductDesc }}
      >
        {/* {details} */}
      </article>
      <SectionContainer title={` Specification`} className="mt-8">
        {/* <h4 className="lg:text-2xl text-xl font-bold mt-12 mb-8">
          Specification Of{" "}
          <span className="font-bangla">{product?.ProductTitle}</span>
        </h4> */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
          <div className=" border border-dashed border-slate-300 p-2 rounded-md">
            {(authorName && product?.ProductType === "ACADEMIC_BOOK") ||
            product?.ProductType === "SUBJECT_BOOK" ? (
              <>
                <p className="text-sm text-gray-500 font-poppins">Author</p>
                <h5 className="lg:text-lg font-semibold font-bangla">
                  {authorName?.AuthorName}
                </h5>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-500 font-poppins">Brand</p>
                <h5 className="lg:text-lg font-semibold font-bangla">
                  {product?.brand?.BrandName}
                </h5>
              </>
            )}
          </div>
          <div
            className={
              (product?.publication?.PublicationName &&
                product?.ProductType === "ACADEMIC_BOOK") ||
              (product?.publication?.PublicationName &&
                product?.ProductType === "SUBJECT_BOOK")
                ? "border border-dashed border-slate-300 p-2 rounded-md"
                : "hidden border border-dashed border-slate-300 p-2 rounded-md"
            }
          >
            <p className="text-sm text-gray-500 font-poppins">Publications</p>
            <h5 className="lg:text-lg font-semibold font-poppins">
              {product?.publication?.PublicationName}
            </h5>
          </div>
          <div
            className={
              (product?.TotalPage &&
                product?.ProductType === "ACADEMIC_BOOK") ||
              (product?.TotalPage && product?.ProductType === "SUBJECT_BOOK")
                ? "border border-dashed border-slate-300 p-2 rounded-md"
                : "hidden border border-dashed border-slate-300 p-2 rounded-md"
            }
          >
            <p className="text-sm text-gray-500 font-poppins">Total Page</p>
            <h5 className="lg:text-lg font-semibold font-poppins">
              {product?.TotalPage}
            </h5>
          </div>
          <div
            className={
              (product?.ISBNNumber &&
                product?.ProductType === "ACADEMIC_BOOK") ||
              (product?.ISBNNumber && product?.ProductType === "SUBJECT_BOOK")
                ? "border border-dashed border-slate-300 p-2 rounded-md"
                : "hidden border border-dashed border-slate-300 p-2 rounded-md"
            }
          >
            <p className="text-sm text-gray-500 font-poppins">ISBN Number</p>
            <p className=" lg:text-lg font-poppins font-semibold">
              {product?.ISBNNumber}
            </p>
          </div>
          <div
            className={
              (product?.language && product?.ProductType === "ACADEMIC_BOOK") ||
              (product?.language && product?.ProductType === "SUBJECT_BOOK")
                ? "border border-dashed border-slate-300 p-2 rounded-md"
                : "hidden border border-dashed border-slate-300 p-2 rounded-md"
            }
          >
            <div className="lg:ml-5">
              <p className="text-sm text-gray-500 font-poppins">Language</p>
              <h5 className=" lg:text-lg font-semibold font-poppins">
                {product?.language}
              </h5>
            </div>
          </div>
          <div
            className={
              product?.ProductType
                ? "border border-dashed border-slate-300 p-2 rounded-md"
                : "hidden border border-dashed border-slate-300 p-2 rounded-md"
            }
          >
            <p className="text-sm text-gray-500 font-poppins">Type</p>
            <h5 className=" text-md font-semibold font-poppins">
              {product?.ProductType === "ACADEMIC_BOOK"
                ? "Academic Book"
                : product?.ProductType === "SUBJECT_BOOK"
                ? "Subject Book"
                : product?.ProductType === "STATIONARY"
                ? "Stationery"
                : product?.ProductType}
            </h5>
          </div>
          {product?.CustomAttributes.map((item, index) => {
            return item?.AttributeName === "ShortDesc" && item?.AttributeValue
              ? ""
              : item?.AttributeName && item?.AttributeValue && (
                  <div
                    key={index}
                    className="border border-dashed border-slate-300 p-2 rounded-md"
                  >
                    <p className="text-sm text-gray-500 font-poppins">
                      {item?.AttributeName === "Type_GUIDE_BOOK/MAIN_BOOK"
                        ? "Book Type"
                        : item?.AttributeName === "PublishedDate"
                        ? "Published Date"
                        : item?.AttributeName === "SubjectCode"
                        ? "Subject Code"
                        : item?.AttributeName}
                    </p>
                    <h5 className="lg:text-lg font-semibold font-bangla">
                      {product?.ProductType === "ACADEMIC_BOOK"
                        ? item?.AttributeName === "PublishedDate" &&
                          item?.AttributeValue
                          ? item?.AttributeValue?.slice(6)
                          : item?.AttributeValue
                        : item?.AttributeName === "PublishedDate" &&
                          item?.AttributeValue
                        ? item?.AttributeValue?.slice(3)
                        : item?.AttributeValue}
                    </h5>
                  </div>
                );
          })}
        </div>
      </SectionContainer>
    </SectionContainer>
  );
};

export default ProductDetails;
