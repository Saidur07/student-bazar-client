import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET_AUTHORS_INFO } from "../../api";
import ReadMore from "../../components/shared/ReadMore";
import placeholder from "../../public/image/avatar.jpg";
import LoadBooks from "./../../components/allbooks/LoadBooks";

const Author = ({ author, categories, publications, all }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function setData() {
      if (all) {
        dispatch({
          type: "SET_FILTER",
          payload: all ? all : [],
        });
      }
    }
    setData();
  }, [all, dispatch]);
  return (
    <div>
      <Head>
        <title>Okkhor - {author?.AuthorName}</title>
      </Head>
      <div className="custom-container py-4 mt-[30px] lg:mt-[57px]">
        <div className="lg:gap-x-[28px] lg:md:flex lg:mb-[112px] lg:mt-[60px]">
          <div className="avatar lg:md:flex-col flex-row items-center flex">
            <div className="rounded-full overflow-hidden border-[1px] border-[#737373] lg:md:w-[208px] lg:md:h-[208px] w-[96px] h-[96px] flex-center lg:md:mx-0 mx-auto">
              {author?.AuthorPhoto ? (
                <Image
                  src={author?.AuthorPhoto}
                  alt={author?.AuthorName}
                  width={208}
                  height={208}
                  priority={true}
                  objectFit="contain"
                  className="rounded-full"
                />
              ) : (
                <Image
                  src={placeholder}
                  alt="Author"
                  width={208}
                  height={208}
                  priority={true}
                  objectFit="contain"
                  className="rounded-full"
                />
              )}
            </div>
          </div>
          <div className="font-bangla lg:md:text-start text-center lg:md:mt-0 mt-[6px] lg:mt-[22px]">
            <h2 className="text-[#F26133] lg:md:text-[36px] text-[28px] font-semibold">
              {author?.AuthorNameBN}
            </h2>
            <ReadMore>{author?.AuthorDesc}</ReadMore>
          </div>
        </div>

        {/* selected writers books */}
        <LoadBooks
          all={all}
          publication={publications}
          author={author}
          categories={categories}
        ></LoadBooks>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(
    GET_AUTHORS_INFO.replace("[AuthorSlug]", params?.AuthorSlug)
  );
  const { author, categories, publications } = data;
  return { props: { author, categories, publications, all: data } };
}

export default Author;
