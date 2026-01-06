import wheel from "../assets/svgs/wheel.svg";
import logo from "../assets/svgs/logo.svg";
import shop from "../assets/svgs/navbar/shop.svg";
import quick from "../assets/svgs/navbar/quick.svg";
import baked from "../assets/svgs/navbar/baked.svg";
import love from "../assets/svgs/navbar/love.svg";
import logoutsvg from "../assets/svgs/navbar/logout.svg";
import usersvg from "../assets/svgs/navbar/user.svg";
import cartsvg from "../assets/svgs/cart.svg";
import ordersvg from "../assets/svgs/order.svg"; 
import videosvg from "../assets/svgs/video.svg"; 
import wishsvg from "../assets/svgs/wish.svg"; 
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import gsap from "gsap";
import { setUser } from "../redux/slices/userSlice";
import { setNotification } from "../redux/slices/notificationSlice";
import { setHome } from "../redux/slices/homeSlice";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef();
  const ref1 = useRef();

  const user = useSelector((state) => state.user.user);
  const [opened, setOpened] = useState(false); //To check if toolbox is opened

  const rotate = () => ref.current.classList.toggle("rotate-[-90deg]");
  const rotate1 = () => ref.current.classList.add("rotate-[-90deg]");

  const goToHomePage = () => {
    dispatch(setHome(""));
    navigate("/");
  };

  const startAnim = gsap.timeline({
    onStart: () => {
      document.getElementById("sun").style.overflow = "visible";
      document.getElementById("sun").style.zIndex = "10";
      document
        .querySelectorAll(".stars")
        .forEach((star) => (star.style.display = "none"));
      ref1.current.classList.add("sunshadow");
    },
    onComplete: () => {
      ref1.current.classList.remove("sunshadow");
      setTimeout(() => {
        document.getElementById("sun").style.overflow = "hidden";
        document.getElementById("sun").style.zIndex = "1";
        document
          .querySelectorAll(".stars")
          .forEach((star) => (star.style.display = "flex"));
      }, 1000);
    },
  });

  useGSAP(() => {
    gsap.from("#tool2", {
      x: "-50vw",
      duration: 2,
      delay: 1,
      ease: "power2.out",
    });
    gsap.from("#tool1", {
      x: "-100%",
      duration: 2,
      delay: 1,
      ease: "power2.out",
    });
    startAnim.from("#sun", {
      x: "-100%",
      y: "60vh",
      duration: 2,
      ease: "power2.out",
    });
    startAnim.from(
      "#wheel",
      {
        rotate: "-300deg",
        duration: 2,
        ease: "cubic-bezier(0.12, 0, 0.39, 0)",
      },
      "<",
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    tl.to(".sunImage", {
      rotate: "540deg",
      ease: "linear",
    });
  });

  const logout = () => {
    localStorage.removeItem("authy");
    dispatch(setUser(null));
    dispatch(
      setNotification({
        message: "Logged out successfully",
        type: "success",
        logo: "tick",
      }),
    );
    window.location.reload(false);
  };

  const recents = () => {
    if (user) {
      dispatch(setHome("recent"));
      navigate("/");
      rotate1();
    } else {
      navigate("/signin");
      setNotification({
        message: "Please login to view recents",
        type: "error",
        logo: "cross",
      });
    }
  };

  return (
    <div
      className="flex select-none"
      onClick={() => opened && setOpened(false)}
    >
      <div
        id="tool1"
        onClick={goToHomePage}
        className="relative z-[3] flex h-[50px] md:h-[64px] w-fit cursor-pointer items-center rounded-br-full bg-orange px-4 md:pr-6 lg:h-[80px] lg:pr-10"
      >
        <img src={logo} alt="Vegan" className="h-8 md:h-12 lg:h-16" />
        <h1 className="ml-2 font-janime text-xl font-bold tracking-wider md:text-2xl lg:ml-4 lg:text-3xl xl:text-4xl">
          Vegan's Corner
        </h1>
      </div>

      <div
        id="tool2"
        className="group/xx relative z-[3] flex h-fit w-fit justify-center"
      >
        <div
          className={`flex h-[50px] w-[50px] md:h-[64px] md:w-[64px] cursor-pointer items-center justify-center rounded-full bg-orange lg:h-[80px] lg:w-[80px]`}
          onMouseEnter={() => {
            if (!opened) setOpened(!opened);
          }}
          onClick={() => setOpened(!opened)}
        >
          <div className="flex-center h-[80%] w-[80%] rounded-full bg-brown">
            {user?.status === "PENDING" ? (
              <div className="flex-center mx-auto h-2 w-6 animate-spin rounded-xl bg-white" />
            ) : user?.name ? (
              <h2 className="font-peach text-4xl text-yellow-300 md:text-3xl lg:text-4xl">
                {user.name.slice(0, 1)}
              </h2>
            ) : (
              <img
                src={usersvg}
                alt="user"
                className="h-[80%] rounded-full bg-brown fill-white"
              />
            )}
          </div>
        </div>

        <div
          id="toolbox"
          className="absolute z-[5] translate-x-[-150vw] translate-y-[64px] gap-4 rounded-3xl bg-[#eca042f1] shadow-2xl shadow-brown transition-all group-hover/xx:translate-x-0 sm:translate-x-[-100vw] lg:translate-y-[92px]"
          onClick={() => setOpened(!opened)}
        >
          <div className="flex min-h-[50vh] min-w-[60vw] flex-col items-center justify-between md:min-h-[30vh] md:min-w-[40vw] lg:min-w-[25vw]">
            <div className="ml-2 mt-4 flex w-full items-center justify-around gap-2 border-b-2 pb-2 md:gap-4">
              {user?.name && <div className="h-2 w-2 bg-transparent" />}
              <div className="font font-peach text-3xl text-darkbrown tracking-wide md:text-4xl">
                {user?.name ? user.name.split(" ")[0] : "WELCOME"}
              </div>
              {user?.name && (
                <img
                  src={logoutsvg}
                  alt="user"
                  className="h-8 w-8 cursor-pointer fill-white stroke-white transition-all hover:translate-x-1 hover:scale-110"
                  onClick={logout}
                />
              )}
            </div>
            <div
              onClick={() => navigate("/video")}
              className=" group cursor-pointer rounded-2xl flex gap-1 lg:gap-2 items-center bg-white px-4 py-2 text-2xl font-bold text-brown transition-all hover:bg-darkbrown hover:text-white"
            >
              <img src={videosvg} alt="video" className="h-6 lg:h-8 group-hover:scale-110 group-hover:stroke-#ffffff" />
              Surprise
            </div>
            <div
              onClick={() => navigate("/orders")}
              className="cursor-pointer rounded-2xl flex gap-1 lg:gap-2 items-center bg-brown px-4 py-2 text-2xl font-bold text-white transition-all hover:bg-darkbrown"
            >
              <img src={ordersvg} alt="order" className="h-6 lg:h-8" />
              My Orders
            </div>

            {user?.name ? (
              <div className="mx-auto mb-4 flex w-fit items-center ">
                <div
                  className="mx-1 flex gap-1 lg:gap-2 items-center cursor-pointer rounded-xl bg-darkbrown px-2 py-1 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-brown md:px-4 md:py-2 md:text-base"
                  onClick={() => navigate("cart")}
                >
              <img src={cartsvg} alt="cart" className="h-6 lg:h-8" />
                  CART ({user?.cart?.length ? user.cart.length : 0})
                </div>
                <div
                  className="mx-1 flex items-center gap-1 lg:gap-2 cursor-pointer rounded-xl bg-darkbrown px-2 py-1 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-brown md:px-4 md:py-2 md:text-base"
                  onClick={() => navigate("wishlist")}
                >
              <img src={wishsvg} alt="wishlist" className="h-6 lg:h-8" />

                  WISHLIST ({user?.wishlist?.length ? user.wishlist.length : 0}){" "}
                </div>
              </div>
            ) : (
              <div className="mx-auto mb-4 flex w-fit items-center">
                <div
                  className="mx-1 cursor-pointer rounded-xl bg-darkbrown px-2 py-1 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-brown md:px-4 md:py-2 md:text-base"
                  onClick={() => navigate("signin")}
                >
                  LOGIN &#8702;
                </div>
                <div
                  className="mx-1 cursor-pointer rounded-xl bg-darkbrown px-2 py-1 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-brown md:px-4 md:py-2 md:text-base"
                  onClick={() => navigate("signup")}
                >
                  SIGNUP &#8702;{" "}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        id="sun"
        className="pointer-events-none fixed flex h-[92px] w-[100vw] justify-end md:h-[164px] lg:h-[256px]"
      >
        <div className="pointer-events-auto absolute flex -translate-y-1/2 translate-x-1/2 scale-50 transition-all md:scale-75 lg:scale-100 xl:scale-110">
          <div
            ref={ref1}
            className="group flex rounded-full transition-all duration-1000"
            onClick={rotate}
          >
            <div
              className="relative flex h-[256px] w-[256px] items-center justify-center rounded-full bg-orange transition-all duration-300 md:group-hover:rotate-[-90deg]"
              ref={ref}
            >
              <img
                src={wheel}
                alt="market"
                className="sunImage h-64 w-64"
                id="wheel"
              />

              <div
                onClick={recents}
                className="stars flex-center group/1 absolute left-[72px] top-[-48px] h-[48px] w-[48px] cursor-pointer rounded-full bg-brown transition-all hover:scale-150"
              >
                <h2 className="absolute hidden -translate-y-[250%] rotate-90 rounded-2xl bg-brown px-2 py-1 text-sm font-bold text-white group-hover/1:block">
                  Recents
                </h2>
                <img src={shop} alt="❤️" className="h-8 w-8 rotate-90" />
              </div>

              <div
                onClick={() => {
                  dispatch(setHome("cooked"));
                  navigate("/");
                  rotate1();
                }}
                className="stars flex-center group/2 absolute left-[-30px] top-[12px] h-[48px] w-[48px] cursor-pointer rounded-full bg-brown transition-all hover:scale-150"
              >
                <h2 className="absolute hidden -translate-y-[250%] rotate-90 rounded-2xl bg-brown px-2 py-1 text-sm font-bold text-white group-hover/2:block">
                  Ready to eat
                </h2>
                <img src={quick} alt="❤️" className="h-8 w-8 rotate-90" />
              </div>

              <div
                onClick={() => {
                  dispatch(setHome("quick foods"));
                  navigate("/");
                  rotate1();
                }}
                className="stars flex-center group/3 absolute left-[12px] top-[-30px] h-[48px] w-[48px] cursor-pointer rounded-full bg-brown transition-all hover:scale-150"
              >
                <h2 className="absolute hidden -translate-y-[130%] rotate-90 rounded-2xl bg-brown px-2 py-1 text-sm font-bold text-white group-hover/3:block">
                  Quick food
                </h2>
                <img src={baked} alt="❤️" className="h-8 w-8 rotate-90" />
              </div>

              <div
                onClick={() => {
                  navigate("/wishlist");
                  rotate1();
                }}
                className="stars flex-center group/4 absolute left-[-48px] top-[72px] h-[48px] w-[48px] cursor-pointer rounded-full bg-brown transition-all hover:scale-150"
              >
                <h2 className="absolute hidden -translate-y-[250%] rotate-90 rounded-2xl bg-brown px-2 py-1 text-sm font-bold text-white group-hover/4:block">
                  Wishlist
                </h2>
                <img src={love} alt="❤️" className="h-8 w-8 rotate-90" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
