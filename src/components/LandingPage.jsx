import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import Category from "./Category";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { config } from "../lib/config";

const LandingPage = () => {
  const ref = useRef(null);

  const c = useSelector((state) => state.home.home);
  const [n, setN] = useState(0);
  const [banners, setBanners] = useState([]);
  const [x1, setX1] = useState(0); //To hold the value of touch start

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".bannerss", {
      translateX: "-100%",
      translateY: "100%",
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "power2.out",
    });
    tl.from(".intro", {
      y: "70",
      duration: 1,
      delay: 0.7,
      opacity: 0,
      ease: "power2.out",
    });
    gsap.from("#categories", { y: "70vh", opacity: 0, duration: 1, delay: 1 });
  });

  useEffect(() => {
    // const mainData = async () => {
    //   try {
    //     const API = config.server
    //     const SERVER_SECRET = config.serverSecret
    //     const response = await fetch(`${API}/api/getcatalogue`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'secret': SERVER_SECRET
    //       }
    //     })
    //     const data = await response.json();
    //     dispatch(updateMain(data))
    //   } catch (err) {
    //     setTimeout(() =>mainData(), 5000)
    //     dispatch(updateMain([]))
    //     console.log(" Unable to fetch data, retrying...")
    //   }
    // }

    const fetchBanners = async () => {
      try {
        const API = config.server;
        const SERVER_SECRET = config.serverSecret;
        const response = await fetch(`${API}/api/getbanners`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            secret: SERVER_SECRET,
          },
        });
        const data = await response.json();
        setBanners(data);
      } catch (err) {
        console.log(" Unable to fetch banners data, retrying...");
        setTimeout(() => fetchBanners(), 5000);
      }
    };

    // mainData();
    fetchBanners();
  }, [window.onload]);

  useEffect(() => {
    if (!banners.length) return;
    const interval = setInterval(
      () => (n === banners.length - 1 ? setN(0) : setN(n + 1)),
      3500,
    );
    return () => clearInterval(interval);
  });

  useEffect(() => {
    let x;
    ref.current.addEventListener("touchend", (e) => {
      x = e.changedTouches[0].clientX;
      if (x1 && x) {
        if (x1 > x) setN(n === banners.length - 1 ? 0 : n + 1);
        else setN(n === 0 ? banners.length - 1 : n - 1);
      }
      setX1(0);
    });

    return ref.current.removeEventListener("touchend", (e) => {
      x = e.changedTouches[0].clientX;
      if (x1 && x) {
        if (x1 > x) setN(n === banners.length - 1 ? 0 : n + 1);
        else setN(n === 0 ? banners.length - 1 : n - 1);
      }
      setX1(0);
    });
  });

  return (
    <div className="hover:love" ref={ref}>
      <h2 className="intro mx-2 mt-4 text-center font-cav text-base font-bold tracking-tighter md:text-xl md:tracking-normal xl:text-2xl">
        Only Plant based Products.
      </h2>
      <h2 className="intro mx-2 text-center font-cav text-base font-bold tracking-tighter md:text-xl md:tracking-normal xl:text-2xl">
        {" "}
        Real and Pure.
      </h2>

      {/* Banner */}
      <div
        onTouchStart={(e) => {
          setX1(e.changedTouches[0].clientX);
        }}
        className={`bannerss relative z-[2] mx-auto mt-4 flex h-[18vh] w-[60vw] items-end justify-center rounded-3xl bg-green-200 md:h-[30vh] lg:mt-8 lg:h-[40vh] lg:rounded-3xl xl:w-[40vw]`}
      >
        {banners &&
          banners.length > 0 &&
          banners.map((b, index) => (
            <img
              src={banners[index]}
              key={index}
              alt="Banner"
              className={`neu2 absolute h-full w-[100%] border-b-4 border-l-4 border-green-800 transition-all duration-500 lg:border-b-8 lg:border-l-8 ${index === n ? "z-[2]" : index === (n + 1) % banners.length ? "z-[1] -translate-x-2 translate-y-2 lg:-translate-x-4 lg:translate-y-4" : "z-[0] -translate-x-4 translate-y-4 lg:-translate-x-8 lg:translate-y-8"} `}
            />
          ))}
        <div className="z-[2] flex">
          <div className="mb-2 flex items-center gap-3 md:mb-4 md:gap-4 lg:mb-6 lg:gap-6">
            {banners &&
              banners.length > 0 &&
              banners.map((b, index) => (
                <div
                  key={index}
                  className={`${n === index ? "h-2 w-2 md:h-4 md:w-4 lg:h-6 lg:w-6" : "h-1 w-1 md:h-2 md:w-2 lg:h-4 lg:w-4"} rounded-full ${n == index ? "bg-orange" : "bg-brown"} cursor-pointer transition-all`}
                  onClick={() => setN(index)}
                ></div>
              ))}
          </div>
        </div>
      </div>

      {/* All categories */}
      <div id="categories">
        {c === "quick foods" ? (
          <Category type="quick foods" />
        ) : c === "cooked" ? (
          <div>
            <Category type="snacks" />
            <Category type="milk" />
            <Category type="munchies" />
          </div>
        ) : c === "recent" ? (
          <div>
            <Category type="recent" />
          </div>
        ) : (
          <div>
            <Category type="milk" />
            <Category type="snacks" />
            <Category type="quick foods" />
            <Category type="grocery" />
            <Category type="munchies" />
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
