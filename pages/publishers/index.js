import Head from "next/head";
import React from "react";
import Publishers from "../../components/main/Publishers";
import SectionContainer from "../../components/reusable/SectionContainer";

const Index = () => {
  return (
    <div>
      <Head>
        <title>Okkhor - All Publishers</title>
      </Head>
      <div className="custom-container">
        <SectionContainer
          className="bg-white my-4 p-4"
          title="সকল প্রকাশক"
          line={true}
        >
          <Publishers></Publishers>
        </SectionContainer>
      </div>
    </div>
  );
};

export default Index;
