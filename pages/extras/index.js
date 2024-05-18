import Head from "next/head";
import Tab from "../../components/extras/tab";
import Offers from "./offers";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Okkhor - Special Extras</title>
      </Head>
      <div className="custom-container">
        <Tab></Tab>
        <Offers disableNav={true}></Offers>
      </div>
    </div>
  );
};

export default Home;
