import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../redux/slices/notificationSlice";
import { updateUser } from "../redux/slices/userSlice";
import { updateOrderList } from "../redux/slices/orderSlice";
import { config } from "../lib/config";
import Category from "./Category";
import loaderSpinner from "../assets/svgs/loader.svg";

const Category2 = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const catalogue = useSelector((state) => state.catalogue.Catalogue);
  const user = useSelector((state) => state.user.user);
  const [all, setAll] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    if (user && user.cart && catalogue) {
      let updatedCart = user.cart;
      setOrderList([]);

      updatedCart.length > 0 &&
        updatedCart.map((cartItem) => {
          const item = catalogue.find((item) => item.id === cartItem.id);
          if (item) {
            const p = { ...cartItem, price: item.price };
            setOrderList((prev) => [...prev, p]);
          }
        });
    }
  }, [user]);

  useEffect(() => {
    if (orderList.length) dispatch(updateOrderList(orderList));
  }, [orderList]);

  useEffect(() => {
    if (props.type === "cart" && user && catalogue?.length > 0) {
      if (!user || !catalogue || !user.cart) {
        setAll([]);
        return;
      }
      const alll = catalogue.filter((item) => {
        return (
          user.cart.filter(function (cartItem) {
            return cartItem.id === item.id;
          }).length !== 0
        );
      });
      setAll(alll);
    } else if (props.type === "wishlist" && user && catalogue.length > 1) {
      if (!user || !catalogue || !user.cart) {
        setAll([]);
        return;
      }
      setAll(
        catalogue?.filter((item) => {
          return (
            user?.wishlist?.filter(function (wishlistItem) {
              return wishlistItem === item.id;
            }).length !== 0
          );
        }),
      );
    } else setAll([]);
    setPending(false);
  }, [user, catalogue]);

  const remove = async (id) => {
    const API = config.server;
    const SERVER_SECRET = config.serverSecret;
    const token = localStorage.getItem("authy");

    if (props.type === "cart") {
      const response = await fetch(`${API}/api/user/removefromcart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          secret: SERVER_SECRET,
          authToken: token,
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (data.success) {
        if (data.message === "Item removed from cart") {
          window.location.reload(false);
          dispatch(
            setNotification({
              message: data.message,
              type: "success",
              logo: "brokenheart",
            }),
          );
        } else
          dispatch(
            setNotification({
              message: data.message,
              type: "error",
              logo: "heart",
            }),
          );
        dispatch(updateUser());
      } else
        dispatch(
          setNotification({
            message: data.message,
            type: "warning",
            logo: "brokenheart",
          }),
        );
    } else if (props.type === "wishlist") {
      const response = await fetch(`${API}/api/user/wishlist`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          secret: SERVER_SECRET,
          authToken: token,
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (data.success) {
        if (data.message === "Item removed from wishlist")
          dispatch(
            setNotification({
              message: data.message,
              type: "success",
              logo: "brokenheart",
            }),
          );
        else
          dispatch(
            setNotification({
              message: data.message,
              type: "error",
              logo: "heart",
            }),
          );
        dispatch(updateUser());
      } else
        dispatch(
          setNotification({
            message: data.message,
            type: "warning",
            logo: "brokenheart",
          }),
        );
    }
  };

  const addCart = async (id) => {
    const API = config.server;
    const SERVER_SECRET = config.serverSecret;
    const token = localStorage.getItem("authy");
    const response = await fetch(`${API}/api/user/addtocart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        secret: SERVER_SECRET,
        authToken: token,
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    if (data.success) {
      if (data.message === "Item added to cart")
        dispatch(
          setNotification({
            message: data.message,
            type: "success",
            logo: "cart",
          }),
        );
      else
        dispatch(
          setNotification({
            message: data.message,
            type: "error",
            logo: "cart",
          }),
        );
      dispatch(updateUser());
    } else
      dispatch(
        setNotification({
          message: "Unavailable, try again",
          type: "warning",
          logo: "cart",
        }),
      );
  };

  const subtractCart = async (id) => {
    const API = config.server;
    const SERVER_SECRET = config.serverSecret;
    const token = localStorage.getItem("authy");
    const response = await fetch(`${API}/api/user/updatecart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        secret: SERVER_SECRET,
        authToken: token,
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    if (data.success) {
      if (data.remove === true) {
        dispatch(
          setNotification({
            message: data.message,
            type: "success",
            logo: "cart",
          }),
        );
        window.location.reload(false);
      } else if (data.message === "Item removed from cart") {
        dispatch(
          setNotification({
            message: data.message,
            type: "success",
            logo: "cart",
          }),
        );
      } else if (data)
        dispatch(
          setNotification({
            message: data.message,
            type: "error",
            logo: "cart",
          }),
        );
      dispatch(updateUser());
    } else {
      dispatch(
        setNotification({
          message: "Unavailable, try again",
          type: "warning",
          logo: "cart",
        }),
      );
    }
  };

  return pending ? (
    <div className="flex-center">
      <img src={loaderSpinner} alt="loader" className="h-20 w-20" />
    </div>
  ) : (
    <div className="z-[3] mt-8">
      {all?.length > 0 ? (
        all?.map((item) => {
          return (
            <div
              key={item.id}
              className="relative my-2 flex items-center justify-center gap-4"
            >
              <div className="my-2 flex w-[80vw] items-center justify-around rounded-2xl border md:w-[70vw] lg:w-[60vw] xl:w-[50vw]">
                <img
                  onClick={() => navigate(`/product/${item.id}`)}
                  src={item.image}
                  alt={item.name}
                  className="w-1/4 cursor-pointer rounded-2xl p-2"
                />
                <div
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="flex cursor-pointer flex-col gap-4"
                >
                  <h1 className="headtext mx-2">
                    {item.name} ({item.quantity})
                  </h1>
                  <h1 className="headtext mx-2 text-green-600">
                    ₹{item.price}
                  </h1>
                </div>
                <div>
                  {props.type === "cart" && (
                    <div className="mr-4 flex flex-col gap-2 md:mr-6">
                      <button
                        onClick={() => addCart(item.id)}
                        className="rounded-xl bg-orange px-2 pb-1 text-2xl font-bold text-white transition-all hover:-translate-y-1 hover:scale-110"
                      >
                        {" "}
                        +
                      </button>
                      <h2 className="text-center text-xl font-bold md:text-2xl">
                        {
                          user?.cart?.filter((item1) => item1.id === item.id)[0]
                            ?.quantity
                        }
                      </h2>
                      <button
                        onClick={() => subtractCart(item.id)}
                        className="rounded-xl bg-orange px-2 pb-2 text-2xl font-bold text-white transition-all hover:translate-y-1 hover:scale-110"
                      >
                        {" "}
                        -
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div
                onClick={() => {
                  remove(item.id);
                }}
                className="absolute right-0 top-0 z-[4] -translate-x-[9vw] -translate-y-2 cursor-pointer rounded-full border-2 border-red-600 p-0 transition-all hover:scale-110 md:-translate-x-[13vw] md:p-1 lg:-translate-x-[27vw] lg:border-4"
              >
                <h2 className="md:text-md lg:text-xl">❌</h2>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-3xl text-brown">
            No items, currently in the {props.type.toUpperCase()}
          </h1>
          <h1 className="text-center text-2xl text-black">
            Add some from the recents or view from the{" "}
            <span
              onClick={() => navigate("/")}
              className="cursor-pointer font-medium text-orange hover:text-purple-600"
            >
              HOMEPAGE
            </span>
          </h1>
          <Category type="recent" />
        </div>
      )}
    </div>
  );
};

export default Category2;
