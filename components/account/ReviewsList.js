import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { GET_MY_REVIEWS } from "../../api";
import SectionContainer from "../reusable/SectionContainer";
import Loader from "../shared/Loader";
import ReviewCard from "./ReviewCard";

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState({});
  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");
  useEffect(() => {
    if (accessToken) {
      setLoading(true);
      axios
        .get(GET_MY_REVIEWS, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((res) => {
          setReviews(res.data.reviews.reverse());
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [accessToken, editData]);
  return (
    <SectionContainer className="bg-white p-3 my-3" title="My Reviews">
      <div className="lg:mx-[-48px]">
        {loading ? (
          <Loader></Loader>
        ) : (
          <div className="grid-col-1 my-5 md:px-12 px-2 gap-8">
            {/* items */}
            {reviews.length === 0 && (
              <h1 className="text-2xl text-primary text-center my-8 font-semibold mb-6">
                No Reviews Are Available
              </h1>
            )}
            {reviews?.map((item, index) => {
              return (
                <ReviewCard
                  key={index}
                  review={item}
                  setEditData={setEditData}
                ></ReviewCard>
              );
            })}
          </div>
        )}
      </div>
    </SectionContainer>
  );
};

export default ReviewsList;
