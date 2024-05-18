import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET_PUBLICATION_DETAILS_BY_SLUG } from "../../api";
import LoadBooks from "../../components/allbooks/LoadBooks";
import ReadMore from "../../components/shared/ReadMore";
import placeholder from "../../public/image/public-placeholder.png";

const Publisher = ({ publication, authors, categories, all }) => {
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
        <title>Okkhor - {publication?.PublicationNameBN}</title>
      </Head>
      <div className="custom-container py-4 mt-[30px] lg:mt-[57px]">
        <div className="lg:gap-x-[28px] lg:md:flex lg:mb-[112px] lg:mt-[60px]">
          <div className="avatar lg:md:flex-col flex-row items-center flex">
            <div className="rounded-full overflow-hidden border-[1px] border-[#737373] lg:md:w-[208px] lg:md:h-[208px] w-[96px] h-[96px] flex-center lg:md:mx-0 mx-auto">
              {publication?.PublicationPhoto ? (
                <Image
                  src={publication?.PublicationPhoto}
                  alt={publication?.PublicationNameBN}
                  width={208}
                  height={208}
                  priority={true}
                  objectFit="contain"
                  className=""
                />
              ) : (
                <Image
                  src={placeholder}
                  alt={publication?.PublicationNameBN}
                  width={208}
                  height={208}
                  priority={true}
                  objectFit="contain"
                  className="scale-75"
                />
              )}
            </div>
          </div>
          <div className="font-bangla lg:md:text-start text-center lg:md:mt-0 mt-[22px]">
            <h2 className="text-[#F26133] lg:md:text-[36px] text-[28px] font-semibold">
              {publication?.PublicationNameBN}
            </h2>
            <ReadMore>{publication?.PublicationDesc}</ReadMore>
          </div>
        </div>

        {/* selected Publication books */}
        <LoadBooks
          all={all}
          publication={publication}
          authors={authors}
          categories={categories}
        ></LoadBooks>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(
    GET_PUBLICATION_DETAILS_BY_SLUG.replace(
      "[[PublicationSlug]]",
      params?.PublicationSlug
    )
  );
  const { publication, authors, categories } = data;
  return { props: { publication, authors, categories, all: data } };
}

export default Publisher;
