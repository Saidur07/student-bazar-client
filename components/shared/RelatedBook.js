import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import ReactStars from "react-stars";
import { GET_PUBLICATION_DETAILS_BY_ID } from "../../api";
import placeholder from "../../public/image/book.png";

const RelatedBook = ({ book }) => {
  async function getAuthorData() {
    if (book?.AuthorID !== undefined) {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/author/author_detail?AuthorID=${book?.AuthorID}`
      );
      if (data?.author === undefined) {
        return {};
      } else {
        return data?.author ? data?.author : {};
      }
    } else {
      return {};
    }
  }

  const {
    isLoading: authorLoading,
    data: author,
    refetch: fetchAuthor,
  } = useQuery(["AuthorDetails", book?.AuthorID], () => getAuthorData());
  useEffect(() => {
    fetchAuthor();
  }, [book?.AuthorID, fetchAuthor]);

  async function getPublisherData() {
    if (book?.PublicationID !== undefined) {
      const { data } = await axios.get(
        GET_PUBLICATION_DETAILS_BY_ID,
        book?.PublicationID
      );
      if (data?.publication === undefined) {
        return {};
      } else {
        return data?.publication ? data?.publication : {};
      }
    } else {
      return {};
    }
  }

  const {
    isLoading: loadPublication,
    data: publication,
    refetch: publicationRefetch,
  } = useQuery(["PublisherDetails", book?.PublicationID], () =>
    getPublisherData()
  );

  return (
    <div className="h-full min-w-[40vw] lg:min-w-full rounded-sm">
      <div className="w-full grid lg:grid-cols-10 grid-cols-1 lg:items-center lg:space-x-2 border-[.5px] border-white  hover:border-gray-200 rounded-sm lg:pl-1 p-2">
        <div className="w-full lg:col-span-4 col-span-1 rounded-sm">
          <Link href={`/product/${book?.URLSlug}`}>
            {book?.Picture !== undefined && book?.Picture !== null ? (
              <Image
                src={book?.Picture ? book?.Picture : placeholder}
                alt="Image of book"
                width="70%"
                priority={true}
                height="92%"
                layout="responsive"
                objectFit="fill"
                className="cursor-pointer rounded-sm"
              />
            ) : (
              <Image
                src={placeholder}
                alt="Image of book"
                width="70%"
                priority={true}
                height="92%"
                layout="responsive"
                objectFit="fill"
                className="cursor-pointer rounded-sm"
              />
            )}
          </Link>
        </div>
        {/* </Link> */}
        <div className="lg:col-span-6 col-span-1 lg:px-0 px-1">
          <div>
            <Link href={`/product/${book?.URLSlug}`}>
              <h4 className="card-title cursor-pointer lg:hover:text-primary font-bangla text-[15px] lg:block hidden">
                {book?.ProductTitle.length > 28
                  ? book?.ProductTitle.substring(0, 28) + "..."
                  : book?.ProductTitle}
              </h4>
            </Link>
            <Link href={`/product/${book?.URLSlug}`}>
              <h4 className="card-title cursor-pointer lg:hover:text-primary font-bangla text-[15px] lg:hidden block">
                {book?.ProductTitle.length > 30
                  ? book?.ProductTitle.substring(0, 30) + ".."
                  : book?.ProductTitle}
              </h4>
            </Link>
            {/* </Link> */}
            <div className="w-full space-y-1 h-full">
              <Link href={`/author/${author?.AuthorSlug}`}>
                <p className="text-secondary hover:text-primary cursor-pointer font-bangla text-sm">
                  {author?.AuthorName}
                </p>
              </Link>
              <Link href={`/publisher/${publication?.PublicationSlug}`}>
                <p className="text-secondary font-bangla text-sm cursor-pointer hover:text-primary">
                  {publication?.PublicationNameBN}
                </p>
              </Link>
            </div>
            <div className="flex items-center space-x-1">
              <div>
                <ReactStars
                  // value={parseFloat(book?.Rating)}
                  value={parseFloat(book?.Rating)}
                  size={15}
                  // color1={"#8A8A8A"}
                  color2={"#F26133"}
                  edit={false}
                />
              </div>
              {/* <div className="text-secondary text-xs ">({book?.Reviews})</div> */}
              <div className="text-secondary text-xs ">({book?.Reviews})</div>
            </div>

            {/* price */}
            <div className="flex justify-between items-center">
              <div className="grid font-bangla">
                <div className="flex items-center space-x-2">
                  <p className="text-secondary text-sm line-through">
                    ৳ {book?.RegularPrice}
                  </p>
                  <p className="font-bold text-md">৳ {book?.SalePrice}</p>
                </div>
                {!book?.ProductAvailable && (
                  <p className=" font-semibold text-sm text-center text-primary">
                    Out Of Stock
                  </p>
                )}
              </div>
              {/* favourite button */}
            </div>
          </div>
          {/* favourite button */}
        </div>
      </div>
      <hr className="mt-3" />
    </div>
  );
};

export default RelatedBook;
