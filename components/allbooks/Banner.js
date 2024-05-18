import Image from "next/image";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
const Banner = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props?.data);
  }, [props]);
  console.log(data);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    // breakpoint
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          dots: false,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };

  return (
    <div>
      {/* Check data length and image url */}
      {data?.length > 0 && (
        <Slider {...settings}>
          {data?.map((item, index) => {
            return (
              // check image url and redirect url is not null or undefined or empty string or 0 or false or NaN or null or undefined or empty string or 0 or false or NaN if true then return placeholder image otherwise return image
              item?.CategoryBanner &&
              item?.CategoryBanner && (
                <div key={index}>
                  {/* <a href={item?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  > */}
                  <figure key={index}>
                    <Image
                      src={item?.CategoryBanner}
                      alt={item?.CategoryBanner}
                      width={1920}
                      height={500}
                      objectFit="cover"
                      layout="responsive"
                    />
                  </figure>
                </div>
              )
            );
          })}
        </Slider>
      )}
    </div>
  );
};

export default Banner;
