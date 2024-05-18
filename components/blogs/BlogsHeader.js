import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import useBlogs from "../hooks/useBlogs";
import Image from "next/image";
function BlogsHeader() {
  const [blogs, loading] = useBlogs();
  return (
    <div className="lg:px-12 py-8">
      <Swiper
        pagination={{
          //   dynamicBullets: true,
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper "
      >
        <div>
          {blogs.slice(0, 3).map((item) => (
            <SwiperSlide key={item._id}>
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2  w-full mx-4 flex justify-center items-center ">
                  <Image
                    src={item?.image}
                    alt="Blog Image"
                    width={600}
                    height={400}
                    className="rounded "
                  />
                </div>
                <div className="lg:w-1/2 w-full  flex  justify-center flex-col ">
                  <p className="text-secondary text-lg">{item.date}</p>
                  <h1 className="text-3xl font-bold">{item.title}</h1>
                  <p className="text-secondary text-lg">{item.shortDesc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}
export default BlogsHeader;
