import { faEnvelope, faHome, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import GenLogo from "../../public/image/GenLogo.png";
import logo from "../../public/image/okkhor site_white.png";
import useInfo from "../hooks/useInfo";

const Footer = () => {
  const [data, loading] = useInfo();
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-primary text-white  ">
      <div className="border-b border-b-slate-400">
        <div className="flex items-stretch justify-around flex-col lg:flex-row pt-16 pb-4 gap-4 lg:gap-12 custom-container">
          <div className="lg:w-2/5 lg:block flex items-center justify-center flex-col">
            <div className="flex items-center">
              <div className="w-56 cursor-pointer ">
                <Link href="/">
                  {data?.GrayLogo ? (
                    <Image
                      src={data?.GrayLogo ? data?.GrayLogo : logo}
                      alt="footer-logo"
                      width="100%"
                      height="20px"
                      layout="responsive"
                      objectFit="contain"
                      className="hover:scale-[.98] transition-all"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <Image
                      src={data?.GrayLogo ? data?.GrayLogo : logo}
                      alt="footer-logo"
                      width="100%"
                      height="20px"
                      layout="responsive"
                      objectFit="contain"
                      className="hover:scale-[.98] transition-all"
                    />
                  )}
                </Link>
              </div>
            </div>
            <p className="border-spacing-3 text-sm my-5 text-center lg:text-left">
              {loading ? "Loading..." : data?.FooterDescription}
            </p>
            {/*      <div className="flex  gap-4">
              <a href="#" className="">
                <Image
                  src={playstore}
                  alt="Google Play"
                  width={140}
                  height={55}
                  className="scale-110 lg:scale-100 lg:hover:scale-[.98] transition-all"
                ></Image>
              </a>
              <a href="#">
                <Image
                  src={applestore}
                  width={140}
                  height={55}
                  alt="Apps store"
                  className="scale-110 lg:scale-100 lg:hover:scale-[.98] transition-all"
                ></Image>
              </a>
            </div> */}
          </div>

          <div className="lg:w-1/5 lg:block flex items-center justify-center flex-col text-sm">
            <h1 className="text-3xl font-bold font-amaranth mb-8">
              Contact US
            </h1>
            <div className="flex items-center  mb-4">
              <FontAwesomeIcon
                icon={faHome}
                className="text-white mr-4 w-4 h-4"
              ></FontAwesomeIcon>
              <p>
                Office:{" "}
                <span className="cursor-pointer lg:hover:text-orange-400">
                  {loading ? "..." : data?.OfficeAddress}
                </span>
              </p>
            </div>
            <div className="flex items-center mb-4">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-white mr-4 w-4 h-4"
              ></FontAwesomeIcon>
              <a href={`mailto:${data?.Email}`}>
                E-mail:{" "}
                <span className="cursor-pointer lg:hover:text-orange-400">
                  {loading ? "..." : data.Email}
                </span>
              </a>
            </div>
            <div className="flex items-center mb-4">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-white mr-4 w-4 h-4"
              ></FontAwesomeIcon>
              <a href={`tel:${data?.Phone}`}>
                Phone:{" "}
                <span className="cursor-pointer lg:hover:text-orange-400">
                  {loading ? "..." : data?.Phone}
                </span>
              </a>
            </div>
          </div>

          {data?.SocialLinks?.length > 0 && (
            <div className="lg:w-1/5 lg:block flex items-center justify-center flex-col">
              <h1 className="text-3xl font-bold font-amaranth mb-8">
                Policies
              </h1>
              <div className="lg:block flex flex-wrap items-center justify-center text-sm">
                {data?.FooterPolicyPages
                  ? data?.FooterPolicyPages.map((item, index) => (
                      <div className="mb-3 mx-2 lg:mx-0 " key={index}>
                        <Link href={item.path}>
                          <span className="underline lg:hover:text-primary cursor-pointer">
                            {" "}
                            {loading ? "..." : item.title}
                          </span>
                        </Link>
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          )}

          <div className="lg:ml-[-40px] lg:w-1/5 lg:block flex items-center justify-center flex-col-reverse">
            {typeof data?.SocialLinks === "object" &&
              Object.keys(data?.SocialLinks).length > 0 && (
                <div className="lg:block flex items-center justify-center flex-col">
                  <h1 className="text-3xl font-bold font-amaranth mb-5">
                    Follow us
                  </h1>
                  <div className="flex  items-center  gap-5">
                    <a href={data?.SocialLinks?.Facebook} target="blank">
                      <FaFacebook size={"2em"} />
                    </a>
                    <a href={data?.SocialLinks?.Twitter} target="blank">
                      <FaTwitter size={"2em"} />
                    </a>
                    <a href={data?.SocialLinks?.Instagram} target="blank">
                      <FaInstagram size={"2em"} />
                    </a>
                    <a href={data?.SocialLinks?.Youtube} target="blank">
                      <FaYoutube size={"2em"} />
                    </a>
                  </div>
                </div>
              )}
            {data?.FooterImporantLinksPages?.length > 0 && (
              <div className="  lg:mt-8 mb-5 lg:mb-0 lg:block flex items-center justify-center flex-col">
                <h1 className="text-3xl font-bold font-amaranth mb-4">
                  Important links
                </h1>
                <div className="flex w-full flex-wrap gap-2">
                  {data?.FooterImporantLinksPages
                    ? data?.FooterImporantLinksPages?.map((item, index) => (
                        <div className="flex items-center" key={index}>
                          <Link href={item.path}>
                            <span className="underline lg:hover:text-orange-400 cursor-pointer">
                              {loading ? "..." : item.title}
                            </span>
                          </Link>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="text-center flex items-center justify-center py-5 custom-container lg:text-sm text-xs">
        © {new Date().getFullYear()}
        <span className="text-white font-bold lg:hover:underline pl-1">
          <Link href="/">Okkhor.com</Link>
        </span>
        <span className="px-2">| Designed & Developed by </span>
        <a
          href="https://www.genres-agency.com"
          target="_blank"
          rel="noreferrer"
        >
          <>
            <span className="lg:hidden">
              <Image
                src={GenLogo}
                alt="GenRes Logo"
                height={10}
                width={50}
                className="cursor-pointer"
              />
            </span>
            <span className="lg:flex hidden">
              <Image
                src={GenLogo}
                alt="GenRes Logo"
                height={15}
                width={70}
                className="cursor-pointer"
              />
            </span>
          </>
        </a>
      </p>
    </div>
  );
};

export default Footer;
