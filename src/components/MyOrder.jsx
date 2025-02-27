import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { setNotification } from "../redux/slices/notificationSlice";
import { updateUser } from "../redux/slices/userSlice";
import error from "../assets/svgs/error.svg";
import tick1 from "../assets/svgs/tick1.svg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { config } from "../lib/config";
import Delivery from "./smallComponents/Delivery";
import { showDate, showTime } from "../lib/datetime";

const MyOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderId = useParams().id;
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(0);
  const user = useSelector((state) => state.user.user);
  const catalogue = useSelector((state) => state.catalogue.Catalogue);

  useGSAP(() => {
    if (order && orderId && catalogue)
      gsap.from("#line1", {
        duration: 3,
        width: 0,
        ease: "power4.out",
        delay: 1,
      });
  }, [user, orderId]);

  useEffect(() => {
    if (user) setOrder(user?.orders?.find((item) => item.orderId === orderId));
  }, [user, orderId]);

  useEffect(() => {
    const st = order?.status?.toLowerCase();
    if (st) {
      if (st === "processing") setStatus(0);
      else if (st === "processed") setStatus(1);
      else if (st === "in transit") setStatus(2);
      else if (st === "dispatched") setStatus(3);
      else if (st === "shipped") setStatus(4);
      else if (st === "out for delivery") setStatus(5);
      else if (st === "delivered") setStatus(6);
      else setStatus(7);
    }
  }, [order]);

  const deliveryDate = (date) => {
    return new Date(new Date(date).getTime() + 60 * 60 * 72 * 1000)
      .toString()
      .slice(0, 16);
  };

  const cancelOrder = async () => {
    console.log(orderId);
    const API = config.server;
    const SERVER_SECRET = config.serverSecret;
    const token = localStorage.getItem("authy");
    const response = await fetch(`${API}/api/user/cancelorder`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        secret: SERVER_SECRET,
        authToken: token,
      },
      body: JSON.stringify({ orderId: orderId }),
    });

    const data = await response.json();
    if (data.success) {
      dispatch(
        setNotification({
          message: data.message,
          type: "success",
          logo: "heart",
        }),
      );
      navigate("/orders");
      dispatch(updateUser());
    } else {
      dispatch(
        setNotification({
          message: data.message,
          type: "error",
          logo: "brokenHeart",
        }),
      );
      console.log("Order not cancelled");
    }
  };

  return !order ? (
    <div className="mt-10 pageheight">
      <h1 className="my-4 mb-8 ml-6 text-center font-bubble text-2xl font-bold tracking-widest text-brown md:text-3xl lg:ml-8 lg:text-4xl">
        Order not found!
      </h1>
      <h2 className="mb-2 ml-6 text-center font-bubble text-xl font-bold tracking-widest text-orange md:text-2xl lg:ml-8 lg:text-3xl">
        Order details unavailable!
      </h2>
    </div>
  ) : (
    <div className="flex-center mb-4 mt-10 flex-col pageheight">
      <h1 className="my-4 text-center text-xl font-semibold md:text-2xl">
        Order #{order.orderId}
      </h1>
      <div className="w-[90vw] rounded-xl py-4">

        {/* Order details */}
        <div className="relative mb-4 flex w-full  flex-col items-center justify-center rounded-2xl border pt-3 pb-8 md:ml-3 md:justify-around">
          {status === 6 && <div className="smallbutton" onClick={()=>navigate(`/order/${order.orderId}/invoice`)}>INVOICE</div>}
          <div className="mx-2 flex w-full gap-2 overflow-auto px-2">
            {catalogue.length &&
              order?.orderList?.map((item) => {
                const product = catalogue.find(
                  (product) => product.id === item.id,
                );
                return (
                  <div
                    onClick={() => navigate(`/product/${product.id}`)}
                    key={product.id}
                    className="hover:neu2 relative mx-auto mb-3 flex w-[240px] min-w-[160px] cursor-pointer flex-col items-center justify-around rounded-2xl border px-1 shadow-lg transition-all md:min-w-[200px] lg:min-w-[240px]"
                  >
                    <div className="rounded-xl py-2 md:py-4">
                      <h2 className="sub-heading mb-2">{product?.name}</h2>
                      <div className="flex-center flex-col md:flex-row">
                        <img
                          src={product?.image}
                          alt={product?.name}
                          className="mb-2 h-[120px] max-w-[100%] rounded-md lg:h-[180px]"
                        />
                      </div>
                    </div>
                    <div className="mb-2 text-xl font-bold text-brown md:text-2xl">
                      x {item.quantity}
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="mb-4 flex w-full flex-col items-center justify-center text-center md:ml-3 md:flex-row md:justify-around">
            <div>
              <h2 className="mt-4 text-center font-semibold text-orange md:text-xl">
                Total Price:{" "}
                <span className="font-bold text-green-600">
                  &#8377; {order.totalPrice}
                </span>
                {order.deliveryCharges >= 0 && (
                  <span className="ml-3 text-sm font-medium md:text-base">
                    <span className="text-brown">
                      (Delivery :
                      <span className="font-bold text-green-600">
                        &#8377; {order.deliveryCharges}{" "}
                      </span>
                      included)
                    </span>
                  </span>
                )}
              </h2>
              <h2 className="mt-2 font-semibold text-orange md:text-xl">
                Ordered on:{" "}
                <span className="font- text-brown">
                  {showDate(order.date)} at {showTime(order.date)}
                </span>
              </h2>
            </div>

            <div className="mt-2 lg:mt-4">
              <h2 className="font-semibold text-orange md:text-xl">
                Payment mode:{" "}
                <span className="text-brown">
                  {order.method === "COD"
                    ? "Cash on Delivery"
                    : order.method === "UPI"
                      ? "UPI"
                      : order.method + " CARD"}
                </span>
              </h2>
              <h2 className="mt-2 font-semibold text-orange md:text-xl">
                Order Status :{" "}
                <span className="text-brown">{order.status.toUpperCase()}</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Delivery */}
        <div className="relative pt-2">
          <h2 className="sub-heading">{status<7 ? "Delivery to" : "Delivered to"}</h2>
                  <Delivery user={user} />
        </div>

        {/* Order Status */}
        <h2 className="sub-heading">Order Status</h2>
        <div className="m-4 mt-0 rounded-2xl border p-4">
          {status !== 7 && (
            <div
              id="line1"
              className={`absolute z-[0] mx-2 mb-4 hidden h-6 rounded-xl bg-green-200 md:block ${status === 0 ? "w-[7%]" : status === 1 ? "w-[21%]" : status === 2 ? "w-[35%]" : status === 3 ? "w-[45%]" : status === 4 ? "w-[56%]" : status === 5 ? "w-[68%]" : "w-[80%]"} `}
            />
          )}
          {status === 7 ? (
            <div className="mx-auto">
              <h2 className="text-center text-xl font-bold text-brown">
                Order is cancelled by the user. ❌
              </h2>
            </div>
          ) : (
            <div className="flex flex-col justify-between gap-3 md:flex-row md:gap-0">
              <div className="z-[1] ml-[20vw] flex gap-4 md:ml-0 md:w-[14%] md:flex-col md:items-center">
                <div
                  className={` ${status === 0 && "animate-ping"} flex-center h-4 w-4 rounded-full border border-black md:h-6 md:w-6`}
                >
                  <div
                    className={`h-2 w-2 rounded-full bg-orange md:h-4 md:w-4`}
                  ></div>
                </div>
                <h2 className="text-center text-sm md:text-lg lg:text-xl">
                  Order processing
                </h2>
              </div>
              <div className="z-[1] ml-[20vw] flex gap-4 md:ml-0 md:w-[14%] md:flex-col md:items-center">
                <div
                  className={` ${status === 1 && "animate-ping"} flex-center h-4 w-4 rounded-full border border-black md:h-6 md:w-6`}
                >
                  <div
                    className={` ${status >= 1 ? "bg-orange" : "bg-brown"} h-2 w-2 rounded-full md:h-4 md:w-4`}
                  ></div>
                </div>
                <h2 className="text-center text-sm md:text-lg lg:text-xl">
                  Processed
                </h2>
              </div>
              <div className="z-[1] ml-[20vw] flex gap-4 md:ml-0 md:w-[14%] md:flex-col md:items-center">
                <div
                  className={` ${status === 2 && "animate-ping"} flex-center h-4 w-4 rounded-full border border-black md:h-6 md:w-6`}
                >
                  <div
                    className={` ${status >= 2 ? "bg-orange" : "bg-brown"} h-2 w-2 rounded-full md:h-4 md:w-4`}
                  ></div>
                </div>
                <h2 className="text-center text-sm md:text-lg lg:text-xl">
                  In transit
                </h2>
              </div>
              <div className="z-[1] ml-[20vw] flex gap-4 md:ml-0 md:w-[14%] md:flex-col md:items-center">
                <div
                  className={` ${status === 3 && "animate-ping"} flex-center h-4 w-4 rounded-full border border-black md:h-6 md:w-6`}
                >
                  <div
                    className={` ${status >= 3 ? "bg-orange" : "bg-brown"} h-2 w-2 rounded-full md:h-4 md:w-4`}
                  ></div>
                </div>
                <h2 className="text-center text-sm md:text-lg lg:text-xl">
                  Dispatched
                </h2>
              </div>
              <div className="z-[1] ml-[20vw] flex gap-4 md:ml-0 md:w-[14%] md:flex-col md:items-center">
                <div
                  className={` ${status === 4 && "animate-ping"} flex-center h-4 w-4 rounded-full border border-black md:h-6 md:w-6`}
                >
                  <div
                    className={` ${status >= 4 ? "bg-orange" : "bg-brown"} h-2 w-2 rounded-full md:h-4 md:w-4`}
                  ></div>
                </div>
                <h2 className="text-center text-sm md:text-lg lg:text-xl">
                  Shipped
                </h2>
              </div>
              <div className="z-[1] ml-[20vw] flex gap-4 md:ml-0 md:w-[14%] md:flex-col md:items-center">
                <div
                  className={` ${status === 5 && "animate-ping"} flex-center h-4 w-4 rounded-full border border-black md:h-6 md:w-6`}
                >
                  <div
                    className={` ${status >= 5 ? "bg-orange" : "bg-brown"} h-2 w-2 rounded-full md:h-4 md:w-4`}
                  ></div>
                </div>
                <h2 className="text-center text-sm md:text-lg lg:text-xl">
                  Out for delivery
                </h2>
              </div>
              <div className="z-[1] ml-[20vw] flex gap-4 md:ml-0 md:w-[14%] md:flex-col md:items-center">
                <div
                  className={` ${status === 6 && "animate-ping"} flex-center h-4 w-4 rounded-full border border-black md:h-6 md:w-6`}
                >
                  <div
                    className={` ${status >= 6 ? "bg-orange" : "bg-brown"} h-2 w-2 rounded-full md:h-4 md:w-4`}
                  ></div>
                </div>
                <h2 className="text-center text-sm md:text-lg lg:text-xl">
                  Delivered
                </h2>
              </div>
            </div>
          )}
        </div>

        {status < 7 && (
          <div className="my-4 flex flex-col items-center justify-center md:flex-row">
            <div className="mx-auto w-full">
              {status === 0 && (
                <div>
                  <h1 className="text-center text-xl font-bold text-brown md:text-2xl">
                    Your order is being packed and processed by the seller and
                    will be in transit within 4-6 hours.
                  </h1>
                </div>
              )}

              {status === 1 && (
                <div>
                  <h1 className="text-center text-xl font-bold text-brown md:text-2xl">
                    Your order is processed and will be in transit soon.
                  </h1>
                </div>
              )}

              {status === 2 && (
                <div>
                  <h1 className="text-center text-xl font-bold text-brown md:text-2xl">
                    Your order is in transit and will be dispatched soon.
                  </h1>
                </div>
              )}

              {status === 3 && (
                <div>
                  <h1 className="text-center text-xl font-bold text-brown md:text-2xl">
                    Your order is dispatched by the seller and will soon reach
                    the nearest delivery point.
                  </h1>
                </div>
              )}

              {status === 4 && (
                <div>
                  <h1 className="text-center text-xl font-bold text-brown md:text-2xl">
                    Your order has been shipped to the {user?.address?.city}{" "}
                    delivery point nearest to you.{" "}
                  </h1>
                </div>
              )}

              {status === 5 && (
                <div className="flex items-center justify-center gap-4">
                  <h1 className="text-center text-xl font-bold text-brown md:text-2xl">
                    Your order is out for delivery for {user?.address?.lane1},{" "}
                    {user?.address?.lane2}, {user?.address.city}{" "}
                  </h1>
                  <img src={error} alt="out" className="h-4 w-4 animate-ping" />
                </div>
              )}
              {status === 6 && (
                <div className="flex items-center justify-center gap-4">
                  <h1 className="text-center text-xl font-bold text-brown md:text-2xl">
                    Your order has been delivered to you. ❤️{" "}
                  </h1>
                  <img src={tick1} alt="out" className="h-8 w-8" />
                </div>
              )}
            </div>
          </div>
        )}

        {status < 6 && (
          <div className="my-4 flex flex-col items-center justify-center md:flex-row">
            <h1 className="text-xl font-semibold text-brown md:text-2xl">
              Expected delivery date:{" "}
            </h1>
            <h1 className="ml-4 text-xl font-bold text-green-700 md:text-2xl">
              {deliveryDate(order.date)} within 9 PM
            </h1>
          </div>
        )}

        {status < 6 && (
          <div>
            <h2
              onClick={cancelOrder}
              className="mx-auto mb-3 mt-6 w-[40%] min-w-fit cursor-pointer rounded-2xl bg-brown px-4 py-2 text-center text-xl font-semibold text-white hover:bg-darkbrown hover:font-bold md:my-auto md:w-[30%] xl:w-[20%]"
            >
              Cancel my order
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
