import axios from "axios";
import Head from "next/head";
import React from "react";
import { GET_CONTESTES } from "../../api";
import ContestCart from "../../components/extras/ContestCart";
import Tab from "../../components/extras/tab";

const Contests = ({ contests }) => {
  return (
    <div>
      <Head>
        <title>Okkhor - Special Contests</title>
      </Head>
      <div className="custom-container">
        <Tab></Tab>
        <div className="my-12 text-center">
          <h1 className="text-primary lg:md:text-5xl text-[20px] font-bold uppercase lg:md:block hidden ">
            Contests
          </h1>

          <p className="lg:md:text-lg text-[13px] font-normal text-secondary mt-6 font-bangla">
            শিক্ষার্থীদের মাঝে গুরুত্বপূর্ণ বিষয়ে দেশব্যাপী প্রতিযােগিতার
            আয়ােজনের মাধ্যমে নির্দিষ্ট বিষয়ে সচেতনতা বাড়ানাে এবং পুরস্কার
            প্রদানের দ্বারা জ্ঞানার্জনে উৎসাহিত করাই &quot;স্টুডেন্ট বাজার&quot;
            এর অন্যতম একটি পদক্ষেপ স্টুডেন্ট বাজার প্রতিযগিতা।
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 my-5">
          {contests?.map((contest) => (
            <ContestCart key={contest.id} contest={contest} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const { data } = await axios.get(GET_CONTESTES);
  const result = data;

  return {
    props: {
      contests: result,
    },
  };
};

export default Contests;
