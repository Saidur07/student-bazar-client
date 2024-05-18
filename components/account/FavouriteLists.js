import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { GET_FAV_DATA } from "../../api";
import SectionContainer from "../reusable/SectionContainer";
import Book from "../shared/Book";
import BookSkeleton from "../shared/BookSkeleton";
import Loader from "../shared/Loader";

const FavouriteLists = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(true);
  const cookie = new Cookies();
  const router = useRouter();
  const [postData, setPostData] = useState({});

  useEffect(() => {
    setToken(cookie.get("accessToken"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   *
   *
   * Get all favourite lists of the user
   *
   *
   */

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const { data } = await axios.get(GET_FAV_DATA, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${token}`,
        },
      });
      setData(data?.products);
    };
    if (token) {
      fetchData();
    } else {
      router.push("/signin");
    }
    setLoading(false);
  }, [token, router, postData]);

  return (
    <SectionContainer className="bg-white p-3 my-3" title="Favourite Lists">
      <div className="w-full lg:max-h-screen lg:overflow-y-scroll">
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3  my-5 gap-6">
            <BookSkeleton></BookSkeleton>
            <BookSkeleton></BookSkeleton>
            <BookSkeleton></BookSkeleton>
            <BookSkeleton></BookSkeleton>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 my-5 gap-6">
            {!loading && data?.length < 1 ? (
              <p className="text-3xl text-primary text-center col-span-3">
                No favourite books found{" "}
              </p>
            ) : data ? (
              data.map((book, index) => {
                return (
                  <Book
                    setPostData={setPostData}
                    key={index}
                    book={book}
                  ></Book>
                );
              })
            ) : (
              <Loader></Loader>
            )}
          </div>
        )}
      </div>
    </SectionContainer>
  );
};

export default FavouriteLists;
