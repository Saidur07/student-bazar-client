import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Slider from "react-slick";
export default function App({ banner }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const router = useRouter();
  // console.log(banner);
  return (
    <section className="lg:my-4 my-2 ">
      <div className="custom-container">
        <Slider {...settings}>
          {banner?.map((item) => (
            <Link href={item?.BannerLink} key={item.BannerID}>
              <figure className="!w-full md:!min-h-[290px] max-h-[130px]">
                <Image
                  src={item?.BannerImage}
                  alt={item?.BannerTitle}
                  width={1920}
                  height={500}
                  objectFit="cover"
                  style={{ cursor: "pointer" }}
                  priority={true}
                  layout="responsive"
                />
              </figure>
            </Link>
          ))}
        </Slider>
      </div>
    </section>
  );
}
