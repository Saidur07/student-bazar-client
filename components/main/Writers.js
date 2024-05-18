import Image from "next/image";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";
import "swiper/css";
import "swiper/css/navigation";
import SectionContainer from "../reusable/SectionContainer";
// Slider Custom Arrow
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

const Writers = ({ writer }) => {
  // Slider Settings
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <section className="custom-container">
      <SectionContainer
        title="জনপ্রিয় লেখকজন"
        className="p-8 bg-white my-5 shadow-md"
        line={true}
      >
        <div className="flex items-center justify-end lg:px-0">
          <div className="flex flex-col md:flex-row justify-between items-center lg:gap-8 gap-2 md:my-0">
            <Link href="/authors">
              <span className="text-primary lg:hover:underline cursor-pointer">
                View All
              </span>
            </Link>
          </div>
        </div>
        <div className="mx-auto">
          <Slider {...settings}>
            {writer.map((writer) => (
              <div key={writer?._id} className="p-3">
                <Link href={`/author/${writer.AuthorSlug}`}>
                  <div className=" lg:flex justify-center flex-col items-center w-full cursor-pointer">
                    {writer?.AuthorPhoto ? (
                      <Image
                        src={writer?.AuthorPhoto}
                        alt={writer?.AuthorName}
                        width="100%"
                        height="100%"
                        priority={true}
                        objectFit="contain"
                        className="rounded-full "
                      />
                    ) : (
                      <Image
                        src="https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png"
                        alt={writer?.AuthorName}
                        width="100%"
                        height="100%"
                        priority={true}
                        objectFit="contain"
                        className="rounded-full"
                      />
                    )}

                    <h1 className="mt-4 font-bold text-sm cursor-pointer text-center font-bangla">
                      {writer?.AuthorNameBN}
                    </h1>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </SectionContainer>
    </section>
  );
};

export default Writers;
