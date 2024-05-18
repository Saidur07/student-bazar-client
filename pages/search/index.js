/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import Head from "next/head";
import React from "react";
import { GET_SEACHED_PRODUCTS } from "../../api";
import LoadBooks from "./../../components/allbooks/LoadBooks";

const index = ({ search, data, categories, authors, publishers, brands }) => {
  return (
    <div>
      <Head>
        <title>Okkhor - Search Books</title>
      </Head>
      <div className="custom-container">
        <LoadBooks
          data={data}
          search={search}
          categories={categories}
          publishers={publishers}
          brands={brands}
          authors={authors}
        ></LoadBooks>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  // const router = useRouter();
  const { search } = query;
  const { data } = await axios.get(`${GET_SEACHED_PRODUCTS}?query=${search}`);

  return {
    props: {
      data: data?.products ? data.products : [],
      categories: data?.categories ? data.categories : [],
      publishers: data?.publishers ? data.publishers : [],
      brands: data?.brands ? data.brands : [],
      authors: data?.authors ? data.authors : [],
      search: search ? search : null,
    },
  };
};

export default index;
