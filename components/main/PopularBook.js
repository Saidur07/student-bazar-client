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
const PopularBooks = ({ popular_products, categories }) => {
  // console.log(categories);
  // console.log("popular", popular_products);
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
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
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <section className="custom-container lg:mt-4">
      {/* section header */}
      <SectionContainer
        title="বিশেষ অফারের বই"
        line={true}
        className="bg-white md:p-8 p-3 shadow-md"
      >
        <div className="mx-auto lg:my-[1.3rem]">
          <Slider {...settings}>
            {popular_products?.map((item) => {
              return (
                <Link
                  href={`subject/${item?.ProductType}?CategoryID=${item?.CategoryID}`}
                  key={item?._id}
                >
                  <div className=" p-2 rounded-lg font-bangla cursor-pointer overflow-hidden relative hover:text-primary transition-all hover:scale-[.99]">
                    <div className="w-full">
                      <div
                        className={` ${
                          item?.images?.length <= 1
                            ? ""
                            : "grid gap---1 overflow-hidden"
                        } grid-cols-2 overflow-hidden border`}
                      >
                        {item?.images?.length > 0 ? (
                          item?.images
                            ?.reverse()
                            .slice(0, 4)
                            .map((item, index) => {
                              return item !== null && item !== "" ? (
                                <Image
                                  src={item}
                                  alt="Book"
                                  width="85%"
                                  priority={true}
                                  height="100%"
                                  objectFit="cover"
                                  layout="responsive"
                                  key={index}
                                  className="cursor-pointer"
                                />
                              ) : (
                                <Image
                                  src="https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png"
                                  alt="Book"
                                  priority={true}
                                  width="85%"
                                  height="100%"
                                  objectFit="cover"
                                  layout="responsive"
                                  className="cursor-pointer"
                                />
                              );
                            })
                        ) : item?.images?.length === 0 ? (
                          <Image
                            src="https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png"
                            alt="Book"
                            priority={true}
                            width="85%"
                            height="100%"
                            objectFit="cover"
                            layout="responsive"
                            className="cursor-pointer"
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <h1 className="mt-4 text-center font-bold cursor-pointer font-bangla">
                        {item?.Title ? item?.Title : item?.CategoryName}
                      </h1>
                    </div>
                  </div>
                </Link>
              );
            })}
          </Slider>
        </div>
      </SectionContainer>
      <div className="grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 md:gap-4 lg:text-center lg:py-5 py-3 mb-[1rem]">
        {categories.map((item) => (
          <Link
            href={`subject/${item?.ProductType}?CategoryID=${item?.CategoryID}`}
            key={item._id}
            className="cursor-pointer"
          >
            <button className="py-4 px-2 md:px-4 lg:px-10 lg:hover:bg-primary border bg-slate-50 border-dashed border-primary font-bangla text-md rounded-md hover:text-white cursor-pointer transition-all overflow-hidden group  relative text-black ease-out duration-300">
              <span className="absolute right-0 w-6 h-32 -mt-12 transition-all duration-300 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-[9rem] ease" />
              <span className="relative">{item?.CategoryName}</span>
            </button>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularBooks;
