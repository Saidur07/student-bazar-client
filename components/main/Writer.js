import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import placeholder from "../../public/image/avatar.jpg";
import useAuthors from "../hooks/useAuthors";
import Loader from "../shared/Loader";

const Writer = () => {
  const [authors, loading] = useAuthors();
  const [imageError, setImageError] = useState(false);
  return (
    <div>
      {loading ? (
        <div className="h-48">
          <Loader></Loader>
        </div>
      ) : (
        <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 mt-5 gap-6 text-center ">
          {authors?.map((author) => (
            <div key={author._id}>
              <div className="">
                <Link href={`/author/${author?.AuthorSlug}`}>
                  <div className="avatar flex-col items-center">
                    <div className="rounded-full overflow-hidden border-[3px] border-[#F25E31] ">
                      <Image
                        src={imageError ? placeholder : author?.AuthorPhoto}
                        alt=""
                        width="100%"
                        height="100%"
                        priority={true}
                        objectFit="contain"
                        className="rounded-full cursor-pointer"
                        onError={() => setImageError(true)}
                      />
                    </div>
                    <h4 className="lg:md:text-xl text-[16px] font-medium text-center mt-4 cursor-pointer hover:text-primary transition-all font-bangla">
                      {author.AuthorNameBN}
                    </h4>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Writer;
