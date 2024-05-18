import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { GET_POPUP } from "../../api";
const PopupModal = () => {
  const [popup, setPopup] = useState([]);
  const [checked, setChecked] = useState(true);
  useEffect(() => {
    axios.get(GET_POPUP).then((res) => setPopup(res?.data?.data));
  }, []);
  // console.log(popup);
  // console.log(popup);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  // window.onload((e) => console.log("Loaded"));
  // if (typeof window !== "undefined") {
  //   // Client-side-only code
  //   window.onload = function () {
  //     setTimeout(loadAfterTime, 5000);
  //   };
  // }

  // function loadAfterTime() {
  //   setChecked(true);
  // }
  return (
    <div>
      <input />
      <div className="">
        <div className="">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-1 top-1"
            onClick={() => setChecked(false)}
          >
            ✕
          </label>
          <div>
            <Slider {...settings}>
              {popup?.map((item, index) => (
                <Link href={item?.url} key={index}>
                  <figure className="!w-full md:!min-h-[290px] min-h-[130px]">
                    sdfsdf
                    <Image
                      src={item?.image}
                      alt={item?.title}
                      style={{ cursor: "pointer" }}
                      priority={true}
                      objectFit="cover"
                      layout="fill"
                    />
                  </figure>
                </Link>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
