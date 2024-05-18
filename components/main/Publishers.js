import Image from "next/image";
import Link from "next/link";
import React from "react";
import usePublications from "../hooks/usePublications";
import Loader from "../shared/Loader";

const Publishers = () => {
  const [publications, loading] = usePublications();
  console.log(publications);
  return (
    <div>
      {loading ? (
        <div className="h-48">
          <Loader></Loader>
        </div>
      ) : (
        <div className="grid xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-5 gap-2 grid-cols-3 mt-5 overflow-y-auto">
          {publications?.map((publisher) => (
            <div key={publisher._id}>
              <div>
                <div className="avatar flex-col items-center w-full">
                  <div className="rounded-full overflow-hidden border-[3px] border-[#F25E31] w-[100px]">
                    <Link href={`/publisher/${publisher?.PublicationSlug}`}>
                      <Image
                        src={publisher?.PublicationPhoto}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png";
                        }}
                        alt={publisher.PublicationNameBN}
                        width="100%"
                        height="100%"
                        priority={true}
                        layout="responsive"
                        objectFit="cover"
                        className="cursor-pointer "
                      />
                    </Link>
                  </div>
                  <div className="mt-3">
                    <Link href={`/publisher/${publisher?.PublicationSlug}`}>
                      <h4 className="lg:md:text-xl text-[16px] font-medium text-center cursor-pointer hover:text-primary transition-all font-bangla">
                        {publisher.PublicationNameBN}
                      </h4>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Publishers;
