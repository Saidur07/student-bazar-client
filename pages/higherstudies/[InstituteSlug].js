import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { GET_UNIVERSITY_DETAILS_BY_SLUG } from "../../api";
import placeholder from "../../public/image/book.png";

const UniversityDetails = ({ uni }) => {
  // console.log(uni);

  return (
    <div>
      <Head>
        <title>Okkhor - {uni?.InstituteName}</title>
      </Head>
      <div className="custom-container py-4 font-poppins">
        <h2 className="text-center lg:md:text-[32px] text-primary text-[20px] font-bold">
          {uni?.InstituteName}
        </h2>
        <p className="text-[#737373] lg:md:text-[20px] text-[13px] font-normal text-center my-[42px]">
          {uni?.ShortDesc}
        </p>
        <Image
          src={uni?.Picture ? uni?.Picture : placeholder}
          height={"50vh"}
          width="100%"
          objectFit="fill"
          layout="responsive"
          alt={uni?.InstituteName}
          className="lg:md:h-[463px] w-full cover"
        />

        <div className="mb-[70px]">
          <p className="lg:md:text-[20px] text-[13px] font-bold text-[#333] mb-[10px] lg:md:mt-[89px] mt-[45px] font-poppins">
            Rules and conditions to application
          </p>
          <article
            className="text-[#737373] lg:md:text-[20px] text-[13px] break-words"
            dangerouslySetInnerHTML={{ __html: uni?.Details }}
          >
            {/* {uni?.Details} */}
          </article>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { InstituteSlug } = params;
  const { data } = await axios.get(
    GET_UNIVERSITY_DETAILS_BY_SLUG.replace(
      "[[InstituteSlug]]",
      encodeURIComponent(InstituteSlug)
    )
  );

  return {
    props: {
      uni: data?.data,
    },
  };
};

export default UniversityDetails;
