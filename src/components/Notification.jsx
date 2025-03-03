import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteNotification } from "../redux/slices/notificationSlice";
import gsap from "gsap";

import heart from "../assets/svgs/heart2.svg";
import brokenheart from "../assets/svgs/brokenheart.svg";
import tick from "../assets/svgs/tick1.svg";
import error from "../assets/svgs/error.svg";
import cart from "../assets/svgs/cartadd.svg";
import user from "../assets/svgs/navbar/user.svg";

const Notification = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.notification);

  useEffect(() => {
    if (state.length === 0) return;
    else if (state.length > 3) dispatch(deleteNotification());
    else
      setTimeout(() => {
        dispatch(deleteNotification());
      }, 5000);
  }, [state.length]);

  useEffect(() => {
    state.length > 0 &&
      gsap.from(`.noti${state.length - 1}`, {
        y: 100,
        duration: 1,
        ease: "power2.in",
      });
  }, [state.length]);

  return (
    state.length > 0 && (
      <div className="fixed left-[50%] top-[2%] z-[10] w-2/3 md:w-fit">
        {state.map((i, index) => {
          const { message, type, logo } = i;
          return (
            <div
              key={index}
              className={`noti${index} flex-center my-2 h-[50px] -translate-x-1/2 rounded-2xl px-2 py-1 shadow-[7px_7px_14px_0px] backdrop-blur-lg md:my-4 md:px-4 md:py-2 ${type === "error" ? "shadow-red-500" : type === "warning" ? "shadow-yellow-500" : type === "none" ? "shadow-blue-500" : "shadow-green-500"}`}
            >
              <div className={`flex-center h-12 rounded-full`}>
                <img src={ logo === "heart" ? heart : logo === "brokenheart" ? brokenheart : logo === "tick" ? tick : logo === "error" ? error : logo === "cart" ? cart : user }
                  alt="logo"
                  className="h-8 md:h-10 lg:h-12"
                />
              </div>
              <p className="ml-2 font-semibold tracking-tighter text-black md:tracking-normal">
                {message}
              </p>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Notification;
