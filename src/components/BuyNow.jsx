import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import debitIcon from "../assets/icons/debit.svg";
import upiIcon from "../assets/icons/upi.svg";
import creditIcon from "../assets/icons/credit.svg";
import codIcon from "../assets/icons/cod.svg";
import tick from "../assets/svgs/tick.svg";
import { useEffect, useState } from "react";
import {
  updateMethod,
  updateOrderList,
  updateTotalPrice,
  updateTransactionId,
} from "../redux/slices/orderSlice";
import { setNotification } from "../redux/slices/notificationSlice";
import { updateUser } from "../redux/slices/userSlice";
import { config } from "../lib/config";

const BuyNow = () => {
  const user = useSelector((state) => state.user.user);
  const catalogue = useSelector((state) => state.catalogue.Catalogue);
  const buyNow = useSelector((state) => state.buyNow.buynow);
  const order = useSelector((state) => state.order.order);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(1);

  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [pay, setPay] = useState(999999);
  const [payment, setPayment] = useState(999999);

  const deliveryDate = new Date(
    Date.now() + 1000 * 60 * 60 * 24 * 3,
  ).toDateString();

  useEffect(() => {
    buyNow?.id &&
      setItem(catalogue.find((product) => product.id === buyNow.id));
  }, [buyNow, user, catalogue, item]);

  useEffect(() => {
    setPay(item ? item?.price * quantity : 9999999);
    setPayment(
      item
        ? item.price * quantity > 399
          ? item.price * quantity
          : item.price * quantity + 49
        : 999999,
    );
  }, [item, quantity, buyNow]);

  useEffect(() => {
    dispatch(updateTotalPrice(pay));
  }, [pay]);

  useEffect(() => {
    if (item)
      dispatch(
        updateMethod(
          checked === 1
            ? "COD"
            : checked === 2
              ? "DEBIT"
              : checked === 3
                ? "UPI"
                : "CREDIT",
        ),
      );
  }, [checked, item]);

  useEffect(() => {
    if (item) {
      dispatch(updateOrderList([{ id: item.id, quantity: quantity }]));
      const transactionIdd = Math.floor(Math.random() * 1000000000000000);
      dispatch(updateTransactionId(transactionIdd));
    }
  }, [item, quantity, window.onload]);

  const placeOrder = async () => {
    const { orderList, method, transactionId, deliveryCharges, totalPrice } =
      order;
    if (!orderList.length || !method || !transactionId || !totalPrice) {
      navigate(-1);
    }

    const API = config.server;
    const SERVER_SECRET = config.serverSecret;
    const token = localStorage.getItem("authy");

    const response = await fetch(`${API}/api/user/order`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        secret: SERVER_SECRET,
        authToken: token,
      },
      body: JSON.stringify({
        orderList,
        method,
        transactionId,
        deliveryCharges,
        totalPrice,
      }),
    });
    const data = await response.json();
    if (data.success) {
      dispatch(
        setNotification({ message: data.message, type: "", logo: "heart" }),
      );
      dispatch(updateUser());
      navigate("/orders");
    } else {
      dispatch(
        setNotification({
          message: "Order not placed, TRY AGAIN",
          type: "error",
          logo: "brokenheart",
        }),
      );
    }
  };

  return (
    <div>
      {!buyNow?.id ? (
        <div className="flex-center my-4 mt-12 flex-col gap-6 lg:my-8">
          <h1 className="mb-2 ml-6 font-bubble text-2xl font-bold tracking-widest text-brown md:text-3xl lg:ml-8 lg:text-4xl">
            OOPS! The page was refreshed
          </h1>
          <h2 className="mb-2 ml-6 font-bubble text-xl font-bold tracking-wider text-orange md:text-2xl lg:ml-8 lg:text-3xl">
            Please click on buynow again on the product page.
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer text-2xl font-bold text-purple-500 hover:text-orange"
          >
            Go back to product page
          </button>
        </div>
      ) : !user ? (
        <div>
          <h1 className="mb-2 ml-6 font-bubble text-2xl font-bold tracking-widest text-brown md:text-3xl lg:ml-8 lg:text-4xl">
            Not LOGGED IN!
          </h1>
          <h2 className="mb-2 ml-6 font-bubble text-xl font-bold tracking-wider text-orange md:text-2xl lg:ml-8 lg:text-3xl">
            Please login to continue.
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer text-2xl font-bold text-purple-500 hover:text-orange"
          >
            LOGIN
          </button>
        </div>
      ) : !catalogue ? (
        <div>
          <h1 className="mb-2 ml-6 font-bubble text-2xl font-bold tracking-widest text-brown md:text-3xl lg:ml-8 lg:text-4xl">
            Product not found!
          </h1>
          <button
            onClick={() => window.location.reload()}
            className="cursor-pointer text-2xl font-bold text-purple-500 hover:text-orange"
          >
            REFRESH
          </button>
        </div>
      ) : (
        item && (
          <div className="my-4 mt-12 justify-center lg:my-8">
            <div className="mx-auto my-2 flex w-[80vw] items-center justify-around rounded-2xl border md:w-[70vw] lg:w-[60vw] xl:w-[50vw]">
              <img
                onClick={() => navigate(`/product/${item.id}`)}
                src={item.image}
                alt={item.name}
                className="w-1/4 cursor-pointer rounded-3xl p-2"
              />
              <div
                onClick={() => navigate(`/product/${item.id}`)}
                className="flex cursor-pointer flex-col gap-4"
              >
                <h1 className="mx-2 text-center text-2xl font-bold">
                  {item.name} ({item.quantity})
                </h1>
                <h1 className="mx-2 text-center font-bubble text-2xl font-bold text-green-600">
                  ₹{item.price}
                </h1>
              </div>
              <div>
                <div className="mr-4 flex flex-col gap-2 md:mr-6">
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="rounded-xl bg-orange px-2 pb-1 text-2xl font-bold text-white transition-all hover:-translate-y-1 hover:scale-110"
                  >
                    +
                  </button>
                  <h2 className="text-center text-xl font-bold md:text-2xl">
                    {quantity}
                  </h2>
                  <button
                    onClick={() => {
                      quantity !== 1 && setQuantity(quantity - 1);
                    }}
                    className="rounded-xl bg-orange px-2 pb-2 text-2xl font-bold text-white transition-all hover:translate-y-1 hover:scale-110"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>

            <div className="z-[1] my-2 mb-8 border-b-2 border-black">
              {pay < 399 && (
                <div className="flex flex-col gap-0">
                  <h2 className="mx-auto min-w-fit px-4 text-center text-xl font-bold text-black md:text-xl">
                    Product Cost :{" "}
                    <span className="rounded-xl px-2 py-1 text-[1.1em] text-green-600">
                      &#8377; {pay}
                    </span>
                  </h2>
                  <h2 className="mx-auto min-w-fit border-b-2 px-4 text-center text-xl font-bold text-black md:text-xl">
                    Delivery Charges :{" "}
                    <span className="rounded-xl px-2 py-1 text-[1.1em] text-green-600">
                      &#8377; {49}
                    </span>
                  </h2>
                </div>
              )}
              <h2 className="mx-auto min-w-fit px-4 py-2 text-center text-2xl font-bold text-black md:text-3xl">
                Total Amount :{" "}
                <span className="rounded-xl px-2 py-1 text-[1.1em] text-green-600">
                  &#8377; {payment}
                </span>
              </h2>
              <div>
                <h2 className="mx-auto min-w-fit px-4 py-2 text-center text-xl font-bold text-black md:text-2xl">
                  Delivery by
                  <span className="rounded-xl px-2 py-1 text-green-700">
                    {deliveryDate}
                  </span>{" "}
                  within 9 PM
                </h2>
              </div>
            </div>

            <div className="relative">
              <h2 className="mx-auto mb-3 w-[60%] min-w-fit rounded-2xl bg-[#dcdce6] px-4 py-2 text-center text-2xl font-bold text-brown md:my-auto md:w-[40%] xl:w-[30%]">
                Delivery to
              </h2>
              <div className="my-2 mb-8 ml-4 flex flex-col gap-2 rounded-3xl border-2 px-4 py-6">
                <div className="md:flex md:gap-2">
                  <h3 className="text-xl font-bold">{user?.name}, </h3>
                  <h3 className="text-xl font-bold">{user?.mobile}</h3>
                </div>
                <div className="md:flex md:gap-4">
                  <h3 className="text-xl font-bold">Address:</h3>
                  <h3 className="text-xl font-semibold">
                    {user?.address?.line1}, {user?.address?.line2},
                  </h3>
                </div>
                <div className="md:flex md:gap-2">
                  <h3 className="text-xl font-semibold">
                    {user?.address?.city}, {user?.address?.state}
                  </h3>
                  <h3 className="text-xl font-bold">
                    {user?.address?.pincode}
                  </h3>
                </div>
                <div className="absolute bottom-0 right-0 -translate-x-full -translate-y-full cursor-pointer rounded-md bg-orange px-1 font-bold transition-all hover:bg-brown hover:text-white md:px-2 md:py-1">
                  CHANGE
                </div>
              </div>
            </div>

            <h2 className="mx-auto my-2 w-[60%] min-w-fit rounded-2xl bg-[#dcdce6] px-4 py-2 text-center text-2xl font-bold text-brown md:w-[50%] lg:w-[40%]">
              Payment Method
            </h2>
            <div className="ml-4 mt-2 flex flex-col gap-2 rounded-3xl border-2 px-4 py-6">
              <div className="my-2 flex items-center justify-between rounded-2xl border px-2 py-4 md:px-4">
                <div className="flex">
                  <input
                    type="radio"
                    name="method"
                    id="cashondelivery"
                    className="scale-125"
                    checked={checked === 1}
                    onChange={() => setChecked(1)}
                  />
                  <label
                    htmlFor="cashondelivery"
                    className="m-2 ml-4 cursor-pointer text-xl font-bold"
                  >
                    Cash on Delivery
                    <div className="text-sm font-medium">
                      <h3 className="text-base font-semibold md:text-lg">
                        Secure payment using cash or upi at the time of
                        delivery.
                      </h3>
                      <h4 className="text-sm font-medium md:text-base">
                        Available only for orders above &#8377; 399 else a
                        nominal fee of &#8377;439 will be charged.
                      </h4>
                    </div>
                  </label>
                </div>
                <img
                  src={codIcon}
                  alt="cod"
                  className="size-10 md:size-14 lg:size-20"
                />
              </div>

              <div className="my-2 flex items-center justify-between rounded-2xl border px-2 py-4 md:px-4">
                <div className="flex">
                  <input
                    type="radio"
                    name="method"
                    id="debitcard"
                    className="scale-125"
                    checked={checked === 2}
                    onChange={() => setChecked(2)}
                  />
                  <label
                    htmlFor="debitcard"
                    className="m-2 ml-4 cursor-pointer text-xl font-bold"
                  >
                    Debit Card
                    <div className="text-sm font-medium">
                      <h3 className="text-base font-semibold md:text-lg">
                        Secure and reliable.
                      </h3>
                      <h4 className="text-sm font-medium md:text-base">
                        Pay using your Rupay or VISA Debit card.
                      </h4>
                    </div>
                  </label>
                </div>
                <img
                  src={debitIcon}
                  alt="cod"
                  className="size-10 md:size-14 lg:size-20"
                />
              </div>

              <div className="my-2 flex items-center justify-between rounded-2xl border px-2 py-4 md:px-4">
                <div className="flex">
                  <input
                    type="radio"
                    name="method"
                    id="upi"
                    className="scale-125"
                    checked={checked === 3}
                    onChange={() => setChecked(3)}
                  />
                  <label
                    htmlFor="upi"
                    className="m-2 ml-4 cursor-pointer text-xl font-bold"
                  >
                    UPI
                    <div className="text-sm font-medium">
                      <h3 className="text-base font-semibold md:text-lg">
                        Faster and reliable paymet method.{" "}
                      </h3>
                      <h4 className="text-sm font-medium md:text-base">
                        Pay using your PayTM, PhonePe, GooglePay, BhimUPI or any
                        other UPI app.
                      </h4>
                    </div>
                  </label>
                </div>
                <img
                  src={upiIcon}
                  alt="cod"
                  className="size-10 md:size-14 lg:size-20"
                />
              </div>

              <div className="my-2 flex items-center justify-between rounded-2xl border px-2 py-4 md:px-4">
                <div className="flex">
                  <input
                    type="radio"
                    name="method"
                    id="credit"
                    className="scale-125"
                    checked={checked === 4}
                    onChange={() => setChecked(4)}
                  />
                  <label
                    htmlFor="credit"
                    className="m-2 ml-4 cursor-pointer text-xl font-bold"
                  >
                    Credit Card
                    <div className="text-sm font-medium">
                      <h3 className="text-base font-semibold md:text-lg">
                        Faster, reliable and best offer payment method.{" "}
                      </h3>
                      <h3 className="text-sm font-semibold text-green-700 md:text-base">
                        7% instant discount on SBI, HDFC and IndusInd Bank
                        credit cards.
                      </h3>
                      <h4 className="text-sm font-medium md:text-base">
                        Pay using your Mastercard, from any country.
                      </h4>
                    </div>
                  </label>
                </div>
                <img
                  src={creditIcon}
                  alt="cod"
                  className="size-10 md:size-14 lg:size-20"
                />
              </div>

              <div
                className="flex-center group mx-auto w-[70%] cursor-pointer gap-4 rounded-2xl bg-orange px-6 py-2 text-center text-2xl font-bold text-white ring-brown transition-all hover:translate-x-2 active:ring-2 md:w-[50%] md:text-3xl lg:w-[40%] xl:w-[30%]"
                onClick={placeOrder}
              >
                <h2>PLACE ORDER </h2>
                <img
                  src={tick}
                  alt="go"
                  className="h-8 w-8 transition-all group-hover:translate-x-6"
                />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default BuyNow;
