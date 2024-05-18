import axios from "axios";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_PRODUCTS_FILTERED_WITH_PRODUCT_TYPE } from "../../api";
import Banner from "../../components/allbooks/Banner";
import LoadBooks from "../../components/allbooks/LoadBooks";

const Index = (props) => {
  const { all, ProductType, data } = props;

  const dispatch = useDispatch();
  useEffect(() => {
    async function setData() {
      dispatch({
        type: "SET_FILTER",
        payload: all ? all : [],
      });
      dispatch({
        type: "SET_BOOKS",
        payload: data ? data : [],
      });
    }
    setData();
  }, [all, dispatch, data]);
  const filters = useSelector((data) => data.filterData);
  const { categories } = filters;
  return (
    <div>
      <Head>
        <title>
          Okkhor -{" "}
          {ProductType === "ACADEMIC_BOOK"
            ? "একাডেমিক বই"
            : ProductType === "BOOK"
            ? "সকল বই"
            : ProductType === "STATIONARY"
            ? "স্টেশনারি"
            : ProductType === "SUBJECT_BOOK"
            ? "সাবজেক্ট বই"
            : ProductType}
        </title>
      </Head>
      <div className="md:hidden custom-container">
        <Banner data={categories} alt="banner_image"></Banner>
      </div>
      <LoadBooks
        categories={categories}
        data={data}
        all={all}
        ProductType={ProductType}
      ></LoadBooks>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const { ProductType } = query;
  const { data } = await axios.get(
    GET_PRODUCTS_FILTERED_WITH_PRODUCT_TYPE.replace(
      "[[ProductType]]",
      encodeURIComponent(ProductType)
    )
  );

  return {
    props: {
      all: data,
      data: data?.products ? data.products : [],
      categories: data?.categories ? data.categories : [],
      publishers: data?.publishers ? data.publishers : [],
      brands: data?.brands ? data.brands : [],
      authors: data?.authors ? data.authors : [],
      ProductType: ProductType,
    },
  };
};

export default Index;
