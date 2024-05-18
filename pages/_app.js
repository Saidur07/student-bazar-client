import ProgressBar from "@badrap/bar-of-progress";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../store/store";
import "../styles/globals.css";
import Maintenance from "./maintenance";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { GET_COMMON_INFO, GET_POPUP } from "../api";
import { useDrawer } from "../components/hooks/useDrawer";
import BottomNav from "../components/main/BottomNav";
import Filters from "../components/shared/Filters";
import Categories from "./../components/shared/Categories";
import Footer from "./../components/shared/Footer";
import Navbar from "./../components/shared/Navbar";
const progress = new ProgressBar({
  size: 4,
  color: "black",
  className: "z-50",
  delay: 100,
});
function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());
  const { drawer, closeDrawer } = useDrawer();

  useEffect(() => {
    AOS.init({
      duration: 700,
    });
    Router.events.on("routeChangeStart", progress.start);
    Router.events.on("routeChangeComplete", progress.finish);
    Router.events.on("routeChangeError", progress.finish);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("globalLoader");
      if (loader) loader.style.display = "none";
    }
  }, []);
  const [data, setData] = useState({});
  console.log("maintanance", data?.UnderMaintenance);
  const [popup, setPopup] = useState([]);
  const [checked, setChecked] = useState(false);
  // Fetching Data
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(GET_COMMON_INFO);
      setData(data?.attributes);
    };
    fetchData();
  }, []);

  useEffect(() => {
    axios.get(GET_POPUP).then((res) => setPopup(res?.data?.data));
  }, []);
  console.log(popup);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  function loadAfterTime() {
    setChecked(true);
  }
  // window.onload((e) => console.log("Loaded"));
  if (typeof window !== "undefined") {
    // Client-side-only code
    window.onload = function () {
      setTimeout(loadAfterTime, 5000);
    };
  }

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            {data?.SiteDetails?.MaintainenceMode === true ? (
              <Maintenance></Maintenance>
            ) : (
              <>
                <div className="drawer relative">
                  <input
                    id="my-drawer"
                    checked={drawer}
                    onChange={() => {}}
                    type="checkbox"
                    className="drawer-toggle accent-primary"
                  />
                  <div className="drawer-content scrollbar-hide">
                    <Navbar />
                    <Categories></Categories>
                    <Component {...pageProps} />
                    <BottomNav></BottomNav>
                    <Footer />
                  </div>
                  <div className="lg:hidden drawer-side max-h-full">
                    <label
                      onClick={closeDrawer}
                      htmlFor="my-drawer"
                      className="lg:hidden drawer-overlay rounded"
                    ></label>
                    <div className="w-10/12 max-h-full">
                      <Filters closeDrawer={closeDrawer}></Filters>
                    </div>
                  </div>
                  {/* Creating a window onload Modal ads UI */}
                  {/* check data is available then render modal */}
                  {popup?.length > 0 && (
                    <div
                      className={
                        checked
                          ? "fixed z-10 overflow-y-auto top-0 w-full left-0"
                          : "hidden"
                      }
                    >
                      <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                          <div
                            className="absolute inset-0 bg-gray-900 opacity-40"
                            onClick={() => setChecked(false)}
                          />
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                          &#8203;
                        </span>
                        <div
                          className="inline-block align-center text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                          role="dialog"
                          aria-modal="true"
                          aria-labelledby="modal-headline"
                        >
                          <Slider {...settings}>
                            {popup?.map((item) => (
                              <Link key={item?.popupId} href={item?.url}>
                                <Image
                                  src={item?.image}
                                  alt={item?.title}
                                  width={520}
                                  height={520}
                                  objectFit="cover"
                                />
                              </Link>
                            ))}
                          </Slider>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Ads Modal end */}
                </div>
              </>
            )}
            {/* <Script id="tawk" strategy="lazyOnload">
              {`
             window.$_REVECHAT_API || (function(d, w) {
          var r = $_REVECHAT_API = function(c) {
            r._.push(c);
          };
          w.__revechat_account='9956693';
          w.__revechat_version=2;
          r._= [];
          var rc = d.createElement('script');
          rc.type = 'text/javascript';
          rc.async = true;
          rc.setAttribute('charset', 'utf-8');
          rc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'static.revechat.com/widget/scripts/new-livechat.js?'+new Date().getTime();
          var s = d.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(rc, s);
          })(document, window);
        `}
            </Script> */}
            <ToastContainer
              position="top-right"
              autoClose={8000}
              hideProgressBar={false}
              newestOnTop={false}
              draggable={false}
              pauseOnVisibilityChange
              closeOnClick
              pauseOnHover
            />
          </Hydrate>
        </QueryClientProvider>
      </Provider>
    </>
  );
}
export default MyApp;
