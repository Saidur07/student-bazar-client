import axios from "axios";
import Head from "next/head";
import React from "react";
import { GET_ALL_CATEGORIES } from "../../api";
import AllSubject from "../../components/main/AllSubject";
import SectionContainer from "../../components/reusable/SectionContainer";

const index = ({ subjects }) => {
  return (
    <div>
      <Head>
        <title>Okkhor - All Subjects</title>
      </Head>
      <div className="custom-container">
        <SectionContainer className="bg-white my-4 p-4">
          <div className="mb-10 mt-6 text-center font-bangla">
            <h1 className="text-primary text-[32px] font-normal">বিষয়</h1>
            <p className=" text-[20px] font-normal text-secondary mt-2">
              শিক্ষার্থীদের মাঝে গুরুত্বপূর্ণ বিষয়ে দেশব্যাপী প্রতিযােগিতার
              আয়ােজনের মাধ্যমে নির্দিষ্ট বিষয়ে সচেতনতা বাড়ানাে এবং পুরস্কার
              প্রদানের দ্বারা জ্ঞানার্জনে উৎসাহিত করাই &quot;স্টুডেন্ট
              বাজার&quot; এর অন্যতম একটি পদক্ষেপ স্টুডেন্ট বাজার প্রতিযগিতা।
            </p>
          </div>
          <AllSubject subjects={subjects} />
        </SectionContainer>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(GET_ALL_CATEGORIES);

  return {
    props: {
      subjects: data?.categories,
    },
  };
};

export default index;
