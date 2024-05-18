import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GET_UNIVERSITIES } from "../../api";
import placeholder from "../../public/image/book.png";
import Loader from "../shared/Loader";

const HigherStudies = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const { data } = await axios.get(
        GET_UNIVERSITIES.replace("[page]", page).replace("[query]", query)
      );
      const sortedUniversities = data?.data?.sort((a, b) => {
        return a?.RankNo - b?.RankNo;
      });
      setUniversities(sortedUniversities);
      setLoading(false);
    }
    fetchData();
  }, [page, query]);
  const [universityData, setUniversityData] = useState([]);

  return (
    <div>
      {/* Higher Studies Filter */}
      <div className="flex justify-end font-poppins items-center mb-[40px]">
        <h2 className="text-[#8A8A8A] lg:md:text-[16px] text-[11px] lg:md:mr-[12px] mr-[8px]">
          Filter by
        </h2>
        <input
          type="number"
          placeholder="Rank No"
          onChange={(e) => setQuery(e.target.value)}
          className="lg:md:placeholder:text-[11px] placeholder:text-[8px] border-[.5px] lg:text-sm text-xs border-[#9b9b9b] lg:md:w-[70px] w-[45px] h-[35px]
                    focus:border-[.5px] focus:border-[#29b9b9b] pl-[2px] lg:md:pl-[8px]"
        />
        <h2 className="text-[#8A8A8A] lg:md:text-[16px] text-[11px] lg:md:mx-[12px] mx-[8px]">
          Or
        </h2>
        <input
          type="text"
          placeholder="University Name"
          onChange={(e) => setQuery(e.target.value)}
          className="lg:md:placeholder:text-[11px] placeholder:text-[8px] lg:text-sm text-xs border-[.5px] border-[#9b9b9b] lg:md:w-[143px] w-[70px] h-[35px] 
                    focus:border-[.5px] focus:border-[#9b9b9b] pl-[2px] lg:md:pl-[8px]"
        />
        <h2 className="text-[#8A8A8A] lg:md:text-[16px] text-[11px] lg:md:mx-[12px] mx-[8px]">
          Or
        </h2>
        <input
          type="text"
          placeholder="Country Name"
          onChange={(e) => setQuery(e.target.value)}
          className="lg:md:placeholder:text-[11px] placeholder:text-[8px] lg:text-sm text-xs border-[.5px] border-[#9b9b9b] lg:md:w-[143px] w-[70px] h-[35px] 
                    focus:border-[.5px] focus:border-[#9b9b9b] pl-[2px] lg:md:pl-[8px]"
        />
      </div>
      {loading ? (
        <Loader></Loader>
      ) : (
        <div className="w-full overflow-x-auto little-scrollbar">
          <table className=" table w-full">
            <thead className="text-[#000000] ">
              <tr>
                <td className="bg-[#FFBF9D17] text-center lg:md:text-sm text-xs ">
                  Numbering by Ranking
                </td>
                <td className=" bg-[#FFBF9D17] text-center lg:md:text-sm text-xs ">
                  University{" "}
                </td>
                <td className=" bg-[#FFBF9D17] text-center lg:md:text-sm text-xs ">
                  Country
                </td>
                <td className=" bg-[#FFBF9D17] text-center lg:md:text-sm text-xs ">
                  Scholarship Notice & Process
                </td>
              </tr>
            </thead>
            <tbody className=" w-full">
              {universities?.length > 0 &&
                universities?.map((uni) => (
                  <tr
                    key={uni?._id}
                    className="text-[#737373] even:bg-[#FFBF9D17] bg-[#fff]"
                  >
                    <td className="text-[rgb(115,115,115)] border-0 text-center bg-transparent lg:md:text-[15px] text-[12px]">
                      {uni?.RankNo ? uni?.RankNo : "N/A"}
                    </td>
                    <td className=" text-[#737373] flex items-center border-0 bg-transparent justify-start space-x-2 lg:md:text-[15px] text-[12px]">
                      <div className="lg:h-10 lg:w-10 h-7 w-7">
                        {uni?.Logo ? (
                          <Image
                            src={uni?.Logo ? uni?.Logo : placeholder}
                            height="100%"
                            width="100%"
                            className="rounded-full"
                            alt="uni"
                          />
                        ) : (
                          <Image
                            src={placeholder}
                            height="100%"
                            width="100%"
                            className="rounded-full"
                            alt="uni"
                          />
                        )}
                      </div>

                      <div className="text-[#737373] ">
                        {uni?.InstituteName ? uni?.InstituteName : "N/A"}
                      </div>
                    </td>
                    <td className="text-[#737373] border-0 bg-transparent text-center lg:md:text-[15px] text-[12px]">
                      {uni?.Country ? uni?.Country : "N/A"}
                    </td>
                    <td className="text-primary border-0 bg-transparent lg:hover:underline text-center lg:md:text-[15px] text-[12px]">
                      <Link href={`/higherstudies/${uni?.InstituteSlug}`}>
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
            {/* </tbody> */}
          </table>
          {universities?.length === 0 && (
            <p className="text-orange-400 px-4 my-7 whitespace-nowrap lg:text-2xl font-semibold font-poppins text-center">
              {" "}
              No more books found
            </p>
          )}
        </div>
      )}
      <div className="flex justify-around">
        <button
          onClick={() => {
            page > 1 ? setPage(page - 1) : setPage(1);
          }}
          disabled={page > 1 ? false : true}
          className={
            page < 1
              ? "hidden"
              : "flex text-primary items-center btn btn-ghost border-0 rounded lg:my-6"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          Previous page
        </button>
        <button
          disabled={universities?.length < 30 ? true : false}
          onClick={universities?.length > 1 ? () => setPage(page + 1) : null}
          className={
            universities?.length < 1
              ? "hidden"
              : "btn text-primary btn-ghost border-0 rounded flex items-center lg:my-6"
          }
        >
          Next{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>{" "}
        </button>
      </div>
    </div>
  );
};

export default HigherStudies;
