/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { GET_RETURN_POLICIES } from "../../api";
import Loader from "../../components/shared/Loader";

const refund = () => {
  const [loading, setLoading] = useState(true);
  const [refund, setRefund] = useState("");
  useEffect(() => {
    axios
      .get(GET_RETURN_POLICIES)
      .then((res) => setRefund(res.data.data.ReturnPolicy));
    setLoading(false);
  }, []);
  return (
    <div>
      <Head>
        <title>Okkhor - Return and Refund Policies</title>
      </Head>
      <section className=" custom-container ">
        {/* <div className="max-h-[10vh] flex-center py-[3vh] border-b cursor-pointer">
          <Image src={logo} alt="logo" />

          <Link href="/">
            <span className="md:text-4xl text-2xl  font-bold md:ml-3 ml-2 font-poppins lg:hover:text-primary transition-all">
              StudentBazar
            </span>
          </Link>
        </div> */}
        <div className="min-h-[90vh]">
          <h1 className="text-primary text-xl md:text-3xl font-bold font-poppins my-[2vh] text-center">
            Return and Refund Policies
          </h1>
          <div className="md:px-12 px-2">
            <article className="text-secondary max-h-[75vh] primary-scroll overflow-y-scroll text-md lg:px-14 px-6 py-6 shadow-inner">
              {loading ? (
                <Loader></Loader>
              ) : (
                <span dangerouslySetInnerHTML={{ __html: refund }}></span>
              )}
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default refund;
