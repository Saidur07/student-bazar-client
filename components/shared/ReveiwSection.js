import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import ReactStars from "react-stars";
import { toast } from "react-toastify";
import { GET_PRODUCT_REVIEW_BY_ID, POST_PRODUCT_REVIEW } from "../../api";
import Review from "../bookdetails/Review";
import SectionContainer from "../reusable/SectionContainer";
import Loader from "./Loader";
import Rating from "./Rating";

const ReveiwSection = ({
  reviewData,
  setReviewForm,
  setReviewLoading,
  reviewForm,
  token,
  user,
  product,
  setReviewData,
  setEditData,
  setDeleteData,
  reviewLoading,
}) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState({});
  /**
   *
   *
   * ADD REVIEW
   
   */
  const AddReview = async (e) => {
    e.preventDefault();
    if (rating !== 0) {
      setReviewLoading(true);
      let formData = new FormData();
      const attachments = image
        ? Object?.values(image)?.map((file) => file)
        : null;
      formData.append("ProductID", product?.ProductID);
      if (review !== "") {
        formData.append("Review", review);
      }
      formData.append("StarCount", rating);
      if (image !== null && attachments) {
        attachments.forEach((file) => formData.append("Attachments", file));
      }

      axios
        .post(POST_PRODUCT_REVIEW, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        })
        .then((res) => {
          setReviewForm(!reviewForm);
          async function fetchReviewData() {
            setReviewLoading(true);
            const { data } = await axios.get(
              GET_PRODUCT_REVIEW_BY_ID.replace(
                "[ProductID]",
                product?.ProductID
              )
            );
            setReviewData(data.reviews.reverse());
            setRating(0);
            setReview("");
            setImage(null);
          }
          fetchReviewData();
          setReviewLoading(false);
          toast.success("Review added successfully!");
          setReview("");
          setImage({});
          setRating(0);
        })
        .catch((err) => {
          toast.error("Ooops...! Something went wrong.");
          setReviewLoading(false);
        });
    } else {
      toast.warn("Please rate this product");
    }
  };

  return (
    <SectionContainer
      className="w-full bg-white shadow-md my-4 p-5"
      line
      title="Reviews & Ratings"
    >
      <div className="lg:flex justify-between items-center ">
        <div className="flex-between ">
          {reviewData?.length === 0 ? (
            <h1 className="lg:text-3xl lg:my-4 my-2 font-semibold text-secondary">
              No reviews yet
            </h1>
          ) : (
            <div className="flex-between space-x-5 my-4">
              <div>
                <h1 className="text-5xl  font-semibold text-gray-500">
                  {reviewData?.length
                    ? Number(
                        reviewData.reduce(
                          (index, item) => (index = index + item.StarCount),
                          0
                        ) / reviewData.length
                      ).toFixed(1)
                    : 0.0}
                </h1>
              </div>
              <div className="grid">
                {reviewData.length === 1
                  ? "1 rating and review"
                  : `${reviewData?.length} ratings and reviews`}
                <div className="rating ">
                  <div className="flex items-center gap-2 mb-2">
                    <ReactStars
                      value={
                        reviewData.reduce(
                          (index, item) => (index = index + item.StarCount),
                          0
                        ) / reviewData.length
                      }
                      size={35}
                      color2={"#F26133"}
                      edit={false}
                    />
                    <p className="text-secondary text-sm">
                      ({reviewData?.length})
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center lg:space-x-4 mb-8 lg:mb-0">
          {token ? (
            <div className="flex items-center ">
              <button
                className={
                  reviewForm
                    ? "hidden"
                    : "btn btn-primary  btn-wide rounded   text-white"
                }
                onClick={() => setReviewForm(!reviewForm)}
              >
                Write a review
              </button>
            </div>
          ) : (
            <div className="space-y-4 lg:space-y-0 lg:flex items-center ">
              <p className="text-gray-500 mx-6">Sign in To Write a Review</p>
              <Link href="/signin">
                <p className="btn btn-primary rounded px-24 py-4 text-white">
                  Sign in
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>
      {reviewForm ? (
        <form onSubmit={AddReview} className="">
          <textarea
            onChange={(e) => setReview(e.target.value)}
            name=""
            id=""
            rows={6}
            autoFocus
            placeholder="Write here ..."
            className="w-full border focus:outline-primary p-3 rounded-md"
          ></textarea>
          <div className="form-control w-full ">
            <label className="label">
              <p className="text-md font-poppins font-bold">Attatch Photos</p>
            </label>
            <input
              type="file"
              className="mt-2 text-sm text-grey-500
                file:mr-3 file:py-2 file:px-6
                file:rounded-lg file:border-0
                file:text-sm file:font-medium
                hover:file:cursor-pointer file:bg-primary transition-all
                file:text-white "
              name="img"
              id="img"
              onChange={(e) => setImage(e.target.files)}
              max="4"
              accept="image/*"
              multiple
            />
            <span className="text-secondary my-2">
              *Select multiple at once
            </span>
          </div>
          <div className="flex lg:items-center flex-col lg:flex-row lg:space-y-3 justify-between my-8 space-y-6 lg:px-6">
            <Rating setRating={setRating}></Rating>
            <div className="flex items-center  gap-2">
              <button
                className={
                  "btn btn-primary btn-outline rounded px-8 lg:px-24  text-white"
                }
                onClick={() => setReviewForm(!reviewForm)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary rounded px-8 lg:px-24  text-white"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      ) : (
        ""
      )}
      {reviewForm && reviewLoading ? <Loader></Loader> : ""}
      <div className="lg:my-10 my-4">
        {reviewData.map((reviews) => {
          return (
            <Review
              key={reviews._id}
              user={user}
              reviews={reviews}
              setDeleteData={setDeleteData}
              setEditData={setEditData}
            ></Review>
          );
        })}
      </div>
    </SectionContainer>
  );
};

export default ReveiwSection;
