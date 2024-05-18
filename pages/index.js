import axios from "axios";
import Head from "next/head";
import {
  GET_HOME_ACADEMICS,
  GET_HOME_PAGE_BANNERS,
  GET_HOME_PAGE_JONOPRIYO_CATEGORIES,
  GET_HOME_PAGE_SUBJECTS,
  GET_JONOPRIYO_CATEGORIES,
  GET_POPULAR_AUTHORS,
  STATIONARY_PRODUCTS,
} from "../api";
import useInfo from "../components/hooks/useInfo";
import Academics from "../components/main/Academics";
import Banner from "../components/main/Banner";
import PopularBook from "../components/main/PopularBook";
import Writers from "../components/main/Writers";
import styles from "../styles/Home.module.css";

const Home = ({
  banners,
  popular_products,
  academics,
  categories,
  subjects,
  stationary,
  writers,
}) => {
  const [data] = useInfo();
  console.log("site data", data);
  return (
    <div className={styles.container}>
      <Head>
        <title>{data?.SiteDetails?.SiteTitle || "Okkhor - Home"}</title>
        <link
          rel="icon"
          href="https://i.ibb.co/w6j0zWF/okkhor-logo-icon.png"
        ></link>
        <meta name="title" content={data?.SiteDetails?.SiteDescription} />
      </Head>
      {banners?.length > 0 ? <Banner banner={banners} /> : ""}
      {popular_products?.length > 0 || categories?.length > 0 ? (
        <PopularBook
          popular_products={popular_products}
          categories={categories}
        ></PopularBook>
      ) : (
        ""
      )}
      {academics?.length > 0 ? (
        <Academics academics={academics}></Academics>
      ) : (
        ""
      )}
      {/* Stationary */}
      {/* {subjects?.length > 0 ? <Subjects subjects={subjects}></Subjects> : ""}
      {stationary?.length > 0 ? (
        <Stationary stationeries={stationary}></Stationary>
      ) : (
        ""
      )} */}
      {writers?.length > 0 ? <Writers writer={writers}></Writers> : ""}
      {/* <Extras></Extras> */}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  // banners
  const banner_data = await axios.get(GET_HOME_PAGE_BANNERS);
  const banners = banner_data?.data?.banners ? banner_data.data.banners : [];

  // popular products
  const { data: popular_product_data } = await axios.get(
    GET_JONOPRIYO_CATEGORIES
  );
  const popular_products = popular_product_data?.categories_with_image
    ? popular_product_data?.categories_with_image
    : [];

  // categories
  const categories_data = await axios.get(GET_HOME_PAGE_JONOPRIYO_CATEGORIES);
  const categories = categories_data?.data?.categories
    ? categories_data?.data?.categories
    : [];

  // Academics
  const { data } = await axios.get(GET_HOME_ACADEMICS);

  const academics = data?.categories_with_category
    ? data?.categories_with_category
    : [];

  // subjects
  const subject_data = await axios.get(GET_HOME_PAGE_SUBJECTS);
  const subjects = subject_data?.data?.categories
    ? subject_data?.data?.categories
    : [];
  // stationary products
  const stationary_data = await axios.get(STATIONARY_PRODUCTS);
  const stationary = stationary_data?.data?.products
    ? stationary_data?.data.products
    : [];
  //writer
  const Writers_data = await axios.get(GET_POPULAR_AUTHORS);
  const writers = Writers_data?.data?.authors ? Writers_data?.data.authors : [];
  return {
    props: {
      banners,
      categories,
      academics,
      popular_products,
      subjects,
      stationary,
      writers,
    },
  };
};

export default Home;
