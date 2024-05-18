import Head from "next/head";
import React from "react";
import Writer from "../../components/main/Writer";
import SectionContainer from "../../components/reusable/SectionContainer";

const Index = () => {
  return (
    <div>
      <Head>
        <title>Okkhor - All Writers</title>
      </Head>
      <div className="custom-container">
        <SectionContainer
          className="bg-white my-4 p-4"
          title="সকল লেখক"
          line={true}
        >
          <Writer></Writer>
        </SectionContainer>
      </div>
    </div>
  );
};

export default Index;
