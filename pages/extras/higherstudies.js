import Head from "next/head";
import React from "react";
import Tab from "../../components/extras/tab";
import HigherStudies from "../../components/higherstudies/HigherStudies";

const index = () => {
  return (
    <div>
      <Head>
        <title>Okkhor - Higer Studies</title>
      </Head>
      <div className="custom-container ">
        <Tab></Tab>
        <div className="py-4 font-bangla">
          <div className="mb-[96px] mt-[45.5px] text-center ">
            <h1 className="text-primary lg:md:text-5xl text-[20px] font-bold uppercase lg:md:block hidden ">
              বিদেশে উচ্চ শিক্ষা
            </h1>
            <p className="lg:md:text-lg text-[13px] font-normal text-secondary mt-6 font-bangla">
              আমাদের দেশের শিক্ষার্থীরা বাইরের দেশ গুলাের বিশ্ববিদ্যালয় গুলােতে
              উচ্চ শিক্ষা লাভের জন্য গিয়ে সফলতার সাথে ভাল রেজাল্ট করে দেশের
              সুনাম অর্জন করে। কিন্তু অনেক শিক্ষার্থীর স্বপ্ন থাকলেও সঠিক প্রসেস
              না জানার কারণে তা পূরণ হয়না, আবার অনেক সময় এটাও জানেনা যে কোথা
              থেকে সঠিক দিক নির্দেশনা পাওয়া যাবে। সে বিষয়টিকে চিন্তা করেই
              সুটুডেন্ট বাজার বিশ্বের বিখ্যাত সব বিশ্ববিদ্যালয়ে উচ্চ শিক্ষার
              যাবতীয় তথ্য ও পদ্ধতি বিশ্ববিদ্যালয় গুলাের বিশ্বস্ত সূত্র থেকে
              প্রতিনিয়ত আপডেইটের সাথে পরিচালনা। করছে। বিঃদ্রঃ সটুডেন্ট বাজার
              শুধুমাত্র তথ্য সেবা দিচ্ছে, কোন প্রকার স্কলারশিপ পরিচালনা ও
              স্টুডেন্ট ট্রান্সফারের সাথে জড়িত না। যে কেউ স্কলারশিপে আগ্রহী হলে
              নিজ দায়িত্বে যাচাই করে অগ্রসর হওয়ার অনুরােধ। ব্যক্তিগত ত্রুটির
              কারণে কোন প্রকার সমস্যায় পড়লে স্টুডেন্ট বাজার দায়ী থাকবে না।
            </p>
          </div>

          {/* Universities */}
          <HigherStudies />
        </div>
      </div>
    </div>
  );
};

export default index;
