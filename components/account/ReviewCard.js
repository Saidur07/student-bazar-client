import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import ReactStars from "react-stars";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import { UPDATE_REVIEW } from "../../api";
import Loader from "../shared/Loader";

const ReviewCard = ({ review, setEditData }) => {
  const cookie = new Cookies();
  const token = cookie.get("accessToken");
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [reviewLimit, setReviewLimit] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [reviewEdit, setReviewEdit] = useState(false);
  const [reviews, setReviews] = useState(review?.Review);
  const [rating, setRating] = useState(review?.StarCount);
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  const handleReviewChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setReviews(value);
  };
  const handleReviewEdit = (e) => {
    e.preventDefault();
    setEditLoading(true);
    let formData = new FormData();
    formData.append("ReviewID", review?.ReviewID);
    formData.append("Review", reviews);
    formData.append("StarCount", rating);
    axios
      .patch(UPDATE_REVIEW, formData, {
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })
      .then((res) => {
        setEditData(res.data);
        Swal.fire({
          icon: "success",
          title: "Review edited successfully!",
        });
        setReviewEdit(false);
        setEditLoading(false);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        setReviewEdit(false);
        setEditLoading(false);
      });
  };
  return (
    <div>
      <div>
        <div className="flex justify-between gap-2 p-3 rounded-md">
          {/* item content */}
          <div className="">
            <div>
              <Link href={`/book/${review?.product_details?.URLSlug}`}>
                <span className="lg:text-2xl text-lg cursor-pointer lg:hover:text-primary lg:hover:underline font-semibold transition-all">
                  {review?.product_details?.ProductTitle}
                </span>
              </Link>
            </div>
            {reviewEdit ? (
              <div className="">
                <form onSubmit={handleReviewEdit}>
                  <div className="flex my-3 justify-start items-center space-x-4 ">
                    {" "}
                    <div className="rating ">
                      <input
                        type="radio"
                        name="rating-2"
                        className=" w-5 mx-1 h-5 mask mask-star-2 bg-primary"
                        defaultChecked={rating >= 0 ? true : false}
                        onClick={() => setRating(1)}
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="  w-5 mx-1 h-5 mask mask-star-2 bg-primary"
                        onClick={() => setRating(2)}
                        defaultChecked={rating > 1 ? true : false}
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="  w-5 mx-1 h-5 mask mask-star-2 bg-primary"
                        onClick={() => setRating(3)}
                        defaultChecked={rating > 2 ? true : false}
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="  w-5 mx-1 h-5 mask mask-star-2 bg-primary"
                        onClick={() => setRating(4)}
                        defaultChecked={rating > 3 ? true : false}
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="  w-5 mx-1 h-5 mask mask-star-2 bg-primary"
                        onClick={() => setRating(5)}
                        defaultChecked={rating > 4 ? true : false}
                      />
                    </div>
                  </div>
                  <textarea
                    value={reviews}
                    onChange={handleReviewChange}
                    name=""
                    id=""
                    rows={5}
                    autoFocus
                    placeholder="Write your honest review"
                    className="w-full my-3 border-b focus:outline-primary p-2 outline-none"
                    required
                  ></textarea>
                  {editLoading ? <Loader></Loader> : ""}
                  <div className="flex items-center justify-end  gap-2 mt-3 mb-8">
                    <button
                      className={
                        "btn btn-primary btn-outline rounded px-6 lg:px-12  text-white"
                      }
                      onClick={() => setReviewEdit(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary rounded px-6 lg:px-12   text-white"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <div className="flex flex-col lg:flex-row  lg:items-center">
                  <ReactStars
                    value={review?.StarCount}
                    size={25}
                    color2={"#F26133"}
                    edit={false}
                  />
                  <p className="text-xs text-secondary pt-1 lg:mx-2">
                    (You rated this book on{" "}
                    <b>{review?.CreatedDate.slice(0, 10)}</b>)
                  </p>
                </div>

                <p className="text-secondary text-sm my-2">
                  {reviewLimit ? (
                    <div>
                      {review?.Review}
                      <button
                        className="text-primary font-semibold"
                        onClick={() => setReviewLimit(null)}
                      >
                        ...read less
                      </button>
                    </div>
                  ) : (
                    <div>
                      {review?.Review?.length < 120 ? (
                        <p className="text-secondary">{review?.Review}</p>
                      ) : (
                        <div>
                          {review?.Review.slice(0, 120)}

                          <button
                            className="text-primary font-semibold"
                            onClick={() => setReviewLimit(true)}
                          >
                            ...read more
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </p>
              </>
            )}
            {review?.Attachments && (
              <div className="lg:flex gap-x-2 mt-4 hidden">
                {review?.Attachments.map((src, index) => (
                  <Image
                    src={src}
                    onClick={() => openImageViewer(index)}
                    width={100}
                    height={70}
                    key={index}
                    objectFit="cover"
                    className="m-[2px] cursor-pointer"
                    alt=""
                  />
                ))}

                {isViewerOpen && (
                  <ImageViewer
                    src={review?.Attachments}
                    currentIndex={currentImage}
                    onClose={closeImageViewer}
                    width={300}
                    height={300}
                    disableScroll={false}
                    backgroundStyle={{
                      backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                    closeOnClickOutside={true}
                  />
                )}
              </div>
            )}
          </div>
          <div className="">
            <div className="text-center">
              {!reviewEdit ? (
                <btn
                  onClick={() => setReviewEdit(!reviewEdit)}
                  className="text-primary text-sm font-semibold btn-link cursor-pointer my-2 text-center hover:underline"
                >
                  Edit your review
                </btn>
              ) : (
                ""
              )}
            </div>
            <div className="text-center lg:text-sm text-xs mt-2">
              <Link href={`/book/${review?.product_details?.URLSlug}`}>
                <button className="btn btn-outline rounded-md btn-primary  normal-case">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
