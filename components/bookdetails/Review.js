import axios from "axios";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import ReactStars from "react-stars";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import { UPDATE_REVIEW } from "../../api";
import avatar from "../../public/image/avatar.jpg";
import Loader from "../shared/Loader";

const Review = ({ reviews, user, setDeleteData, setEditData }) => {
  const cookie = new Cookies();
  const token = cookie.get("accessToken");
  const [reviewLimit, setReviewLimit] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [reviewEdit, setReviewEdit] = useState(false);
  const [review, setReview] = useState(reviews?.Review);
  const [rating, setRating] = useState(reviews?.StarCount);
  const [userData, setUserData] = useState({});
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);
  const handleReviewChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setReview(value);
  };
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/customer?CustomerID=${reviews?.CustomerID}`
      )
      .then(({ data }) => {
        setUserData(data);
      });
  }, [reviews?.CustomerID]);
  const handleReviewDelete = async (id) => {
    if (
      user?.CustomerID !== userData?.CustomerID &&
      user?.CustomerID === "" &&
      userData?.CustomerID === ""
    ) {
      return;
    }
    Swal.fire({
      title: "Are you sure to delete this review?",
      // text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8A8A8A",
      cancelButtonColor: "#F26133",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        setDeleteLoading(true);
        const delete_data = {
          ReviewID: id,
        };
        axios
          .delete(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/review/delete-review?ReviewID=${id}`,

            {
              body: delete_data,
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
            }
          )
          .then((res) => {
            setDeleteData(res.data);

            setDeleteLoading(false);
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
            setDeleteLoading(false);
          });
      }
    });
  };
  // console.log(user, userData?.CustomerID);
  const handleReviewEdit = (e) => {
    e.preventDefault();
    setEditLoading(true);
    let formData = new FormData();
    formData.append("ReviewID", reviews?.ReviewID);
    formData.append("Review", review);
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
        // Swal.fire({
        //   icon: "success",
        //   title: "Review edited successfully!",
        // });
        setReviewEdit(false);
        setEditLoading(false);
      })
      .catch((err) => {
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
    <div className="border-t w-11/12 mx-auto  py-6 break-words">
      <div className="flex-wrap items-center">
        <div className={reviewEdit ? "" : " flex justify-between"}>
          <div className="space-y-2">
            <div className="flex justify-start items-center ">
              {" "}
              <div className="avatar">
                <div className="w-8 rounded-full mr-3">
                  {userData?.ProfilePic ? (
                    <Image
                      src={userData?.ProfilePic}
                      alt="reviewer"
                      width={20}
                      height={20}
                      layout="responsive"
                    />
                  ) : (
                    <Image
                      src={avatar}
                      alt="reviewer"
                      width={20}
                      height={20}
                      layout="responsive"
                    />
                  )}
                </div>
              </div>
              <h1 className="text-lg font-semibold font-poppins text-gray-800">
                {userData?.FullName}
              </h1>
              {/*  {user?.EmailVerified && (
                <p className="mx-2 text-sm text-sky-400 font-semibold flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>{" "}
                  Verified Purchase
                </p>
              )} */}
            </div>
            {reviewEdit ? (
              <div className="w-full ">
                <form onSubmit={handleReviewEdit}>
                  <div className="flex my-3 justify-start items-center space-x-4 ">
                    {" "}
                    <div className="rating ">
                      <input
                        type="radio"
                        name="rating-2"
                        className=" w-6 mx-1 h-6 mask mask-star-2 bg-primary"
                        defaultChecked={rating >= 0 ? true : false}
                        onClick={() => setRating(1)}
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="  w-6 mx-1 h-6 mask mask-star-2 bg-primary"
                        onClick={() => setRating(2)}
                        defaultChecked={rating > 1 ? true : false}
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="  w-6 mx-1 h-6 mask mask-star-2 bg-primary"
                        onClick={() => setRating(3)}
                        defaultChecked={rating > 2 ? true : false}
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="  w-6 mx-1 h-6 mask mask-star-2 bg-primary"
                        onClick={() => setRating(4)}
                        defaultChecked={rating > 3 ? true : false}
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="  w-6 mx-1 h-6 mask mask-star-2 bg-primary"
                        onClick={() => setRating(5)}
                        defaultChecked={rating > 4 ? true : false}
                      />
                    </div>
                  </div>
                  <textarea
                    value={review}
                    onChange={handleReviewChange}
                    name=""
                    id=""
                    rows={6}
                    autoFocus
                    placeholder="Write your honest review"
                    className="w-full my-3 border-b focus:outline-primary p-2 outline-none"
                    required
                  ></textarea>
                  {editLoading ? <Loader></Loader> : ""}
                  <div className="flex items-center lg:justify-end  gap-2 mt-3 mb-8">
                    <button
                      className={
                        "btn btn-primary btn-outline rounded px-12 lg:px-20  text-white"
                      }
                      onClick={() => setReviewEdit(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary rounded px-12 lg:px-20   text-white"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <div>
                  <div className="flex justify-start items-center space-x-4 ">
                    <div>
                      {" "}
                      <ReactStars
                        value={reviews?.StarCount}
                        size={26}
                        color2={"#F26133"}
                        edit={false}
                      />
                    </div>
                    <p className="text-xs text-secondary pt-1">
                      {reviews?.CreatedDate?.slice(0, 10)}
                    </p>
                  </div>
                </div>

                <div className=" text-secondary text-sm pt-2">
                  {reviewLimit ? (
                    <div>
                      {reviews?.Review}
                      <button
                        className="text-primary font-semibold"
                        onClick={() => setReviewLimit(null)}
                      >
                        ...read less
                      </button>
                    </div>
                  ) : (
                    <div>
                      {reviews?.Review?.length < 300 ||
                      reviews?.Review === undefined ? (
                        <p className="text-secondary">{reviews?.Review}</p>
                      ) : (
                        <div>
                          {reviews?.Review?.slice(0, 300)}

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
                </div>
              </div>
            )}

            <div>
              {reviews?.Attachments && (
                <div className="flex gap-x-2 mt-4">
                  {reviews?.Attachments?.map((src, index) => (
                    <Image
                      src={src}
                      onClick={() => openImageViewer(index)}
                      width={70}
                      height={60}
                      key={index}
                      className="m-[2px] cursor-pointer"
                      alt=""
                    />
                  ))}

                  {isViewerOpen && (
                    <ImageViewer
                      src={reviews?.Attachments}
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
          </div>

          {!reviewEdit && (
            <div
              className={
                userData?.CustomerID !== undefined &&
                user?.CustomerID === userData?.CustomerID
                  ? ""
                  : "hidden"
              }
            >
              {deleteLoading ? (
                <Loader></Loader>
              ) : (
                <button
                  onClick={() => handleReviewDelete(reviews?.ReviewID)}
                  className="text-red-400 rounded-full hover:bg-slate-100 p-3 group cursor-pointer block"
                  title="Delete"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="lg:h-7 lg:w-7 h-5 w-5 group-hover:text-red-600 hover:scale-105 transition-all ease-in-out"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}

              <button
                onClick={() => setReviewEdit(!reviewEdit)}
                className="text-green-400 rounded-full hover:bg-slate-100 p-3 group cursor-pointer block"
                title="Edit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="lg:h-7 lg:w-7 h-5 w-5 group-hover:text-green-600 hover:scale-105 transition-all ease-in-out"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>{" "}
    </div>
  );
};

export default Review;
