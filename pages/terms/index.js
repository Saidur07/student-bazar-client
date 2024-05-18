/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { GET_TERMS_AND_CONDITIONS } from "../../api";
import Categories from "../../components/shared/Categories";
import Footer from "../../components/shared/Footer";
import Navbar from "../../components/shared/Navbar";

const terms = () => {
  const [loading, setLoading] = useState(true);
  const [terms, setTerms] = useState("");
  useEffect(() => {
    axios
      .get(GET_TERMS_AND_CONDITIONS)
      .then((res) => setTerms(res.data.data.TermsCondition));
    setLoading(false);
  }, []);
  return (
    <div>
      <Head>
        <title>Okkhor - Terms & Conditions</title>
      </Head>
      <Navbar></Navbar>
      <Categories></Categories>
      <section className=" custom-container ">
        {/* <div className="min-h-[10vh] flex-center py-[3vh] border-b cursor-pointer">
          <Image src={logo} alt="logo" />

          <Link href="/">
            <span className="md:text-4xl text-2xl  font-bold md:ml-3 ml-2 font-poppins lg:hover:text-primary transition-all">
              StudentBazar
            </span>
          </Link>
        </div> */}
        <div className="min-h-[90vh]">
          <h1 className="text-primary text-xl md:text-3xl font-bold font-poppins my-[2vh] text-center">
            Terms & Conditions
          </h1>
          <div className="md:px-12 px-2">
            <article dangerouslySetInnerHTML={{ __html: terms }}></article>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default terms;
