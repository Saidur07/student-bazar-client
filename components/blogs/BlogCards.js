import React from "react";
import useBlogs from "../hooks/useBlogs";
import Image from "next/image";
import Loader from "../shared/Loader";
const BlogCards = () => {
  const [blogs, loading] = useBlogs();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-24 py-8 px-4 lg:px-12 place-items-center">
      {loading ? <Loader></Loader> : ""}
      {blogs.slice(0, 10).map((item) => (
        <div key={item._id} className="card   border-none rounded-sm ">
          <figure>
            <Image src={item.image} alt="Shoes" width={500} height={400} />
          </figure>
          <div className="card-body px-0 lg:px-4">
            <p className="text-secondary font-semibold text-lg">
              {item.date} ・{" "}
              <span className="text-primary">{item.category}</span>
            </p>
            <h2 className="card-title text-2xl font-bold">{item.title}</h2>
            <p className="text-secondary hidden lg:block text-lg">
              {item.shortDesc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCards;
