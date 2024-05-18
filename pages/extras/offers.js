import Head from "next/head";
import React from "react";
import OfferCard from "../../components/extras/OfferCard";
import Tab from "../../components/extras/tab";
import useOffers from "../../components/hooks/useOffers";
import Loader from "../../components/shared/Loader";

const Offer = ({ disableNav }) => {
  const [offers, loading] = useOffers();
  return (
    <div>
      {disableNav ? (
        ""
      ) : (
        <>
          {" "}
          <Head>
            <title>Okkhor - Special Offers</title>
          </Head>
        </>
      )}

      <div
        className={
          offers.length === 0
            ? "custom-container h-72"
            : "h-full custom-container"
        }
      >
        {disableNav ? "" : <Tab></Tab>}
        <div className="my-12 h-full">
          {loading ? (
            <Loader></Loader>
          ) : !loading && offers?.length < 1 ? (
            <div className="flex justify-center items-center h-full">
              <p className="lg:text-3xl text-lg text-primary font-semibold">
                Currently No Offers Are Available!!!
              </p>
            </div>
          ) : (
            <h1 className="text-primary text-center text-5xl font-bold uppercase my-8 lg:md:block hidden">
              Offers
            </h1>
          )}
        </div>
        <div className="">
          {!loading &&
            offers?.map((offer) => {
              return (
                offer !== null && (
                  <OfferCard key={offer?.OfferID} offer={offer}></OfferCard>
                )
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Offer;
