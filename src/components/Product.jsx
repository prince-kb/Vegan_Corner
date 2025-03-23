import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/slices/userSlice";
import { setNotification } from "../redux/slices/notificationSlice";
import { updateBuyNow } from "../redux/slices/buyNowSlice";
import { config } from "../lib/config";

import Category from "./Category";

import nostar from "../assets/svgs/nostar.svg";
import fullstar from "../assets/svgs/fullstar.svg";
import halfstar from "../assets/svgs/halfstar.svg";
import forward from "../assets/svgs/forward.svg";
import cartadd from "../assets/svgs/cartadd.svg";
import love from "../assets/svgs/love.svg";
import tick from "../assets/svgs/tick.svg";
import bolt from "../assets/svgs/bolt.svg";
import bolt1 from "../assets/svgs/bolt1.svg";
import share from "../assets/svgs/share.svg";
import transport from "../assets/svgs/transport.svg";
import errorimg from "../assets/svgs/error.svg";
import loaderSpinner from "../assets/svgs/loader.svg";
import iso from "../assets/svgs/sellerfeature/iso.svg";
import vegan from "../assets/svgs/sellerfeature/vegan.svg";
import morereturn from "../assets/svgs/sellerfeature/morereturn.svg";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null); // Ref for pincode input to set pincode after every input change
  const { id } = useParams(); // Getting the id of the product from the url

  const [product, setProduct] = useState({}); // Product details
  const [mainLoader, setMainLoader] = useState(true); //To show product after fetching
  const [pincode, setPincode] = useState(localStorage.getItem("pincode") || "");
  const [pinc, setPinc] = useState(pincode); // extra variable to handle onchange event of pincode input
  const [visible, setVisible] = useState(pincode !== "" ? 1 : 0); // Visibility of the delivery status
  const [loader, setLoader] = useState(false); // Loader for fetching data
  const [address, setAddress] = useState({pincode: "",office: "",city: "",district: "",state: ""}); // Address of the pincode
  const [deliverable, setDeliverable] = useState(false); // Delivery status of the pincode to show if it is deliverable or not at the pincode
  const [n, setN] = useState(0); // Image index for the product images
  const [error, setError] = useState(false); // Error in fetching data

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      const addtorecents = async () => {
        try {
          const API = config.server;
          const SERVER_SECRET = config.serverSecret;
          await fetch(`${API}/api/user/addtorecent`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              secret: SERVER_SECRET,
              authToken: localStorage.getItem("authy"),
            },
            body: JSON.stringify({ id: id }),
          });

          dispatch(updateUser());
        } catch (err) {
          console.log(" Unable to add product to recents");
        }
      };
      addtorecents();
    }
  }, [window.onload]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const SERVER_SECRET = config.serverSecret;
        const response = await fetch(`${config.server}/api/getproduct/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            secret: SERVER_SECRET,
          },
        });
        const data = await response.json();
        setProduct(data);
        setMainLoader(false);
      } catch (err) {
        setError(true);
        dispatch(
          setNotification({
            message: "Unable to fetch product at the moment",
            type: "error",
            logo: "brokenheart",
          }),
        );
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    localStorage.setItem("pincode", pincode);
    setPinc(pincode);
  }, [pincode]);

  useEffect(() => {
    if (pincode.length === 6) submitPincode();
  }, []);

  const addtocart = async () => {
    if (!user)
      return dispatch(
        setNotification({
          message: "Please Login to add to Cart",
          type: "none",
          logo: "user",
        }),
      );
    try {
      const API = config.server;
      const SERVER_SECRET = config.serverSecret;
      const response = await fetch(`${API}/api/user/addtocart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          secret: SERVER_SECRET,
          authToken: localStorage.getItem("authy"),
        },
        body: JSON.stringify({ id: id }),
      });
      const p = await response.json();
      if (p.message === "Item added to cart")
        dispatch(
          setNotification({
            message: "Product added to Cart",
            type: "success",
            logo: "cart",
          }),
        );
      dispatch(updateUser());
    } catch (err) {
      dispatch(
        setNotification({
          message: "Unable to add product to Cart",
          type: "error",
          logo: "cart",
        }),
      );
    }
  };

  const buynow = () => {
    if (!user) {
      dispatch(
        setNotification({
          message: "Please Login to Buy Now",
          type: "none",
          logo: "user",
        }),
      );
      navigate("/signin");
      return;
    } else {
      dispatch(updateBuyNow({ id: id, quantity: 1 }));
      navigate("/buynow");
    }
  };

  const addtowishlist = async () => {
    if (!user)
      return dispatch(
        setNotification({
          message: "Please Login to add to Wishlist",
          type: "none",
          logo: "user",
        }),
      );
    try {
      const API = config.server;
      const SERVER_SECRET = config.serverSecret;
      const response = await fetch(`${API}/api/user/wishlist`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          secret: SERVER_SECRET,
          authToken: localStorage.getItem("authy"),
        },
        body: JSON.stringify({ id: id }),
      });
      dispatch(updateUser());
      const p = await response.json();
      if (p.message === "Item added to wishlist")
        dispatch(
          setNotification({
            message: "Product added to Wishlist",
            type: "success",
            logo: "heart",
          }),
        );
      else
        dispatch(
          setNotification({
            message: "Product removed from Wishlist",
            type: "error",
            logo: "brokenheart",
          }),
        );
    } catch (err) {
      console.log(" Unable to add product to wishlist");
      dispatch(
        setNotification({
          message: "Unable to add product to Wishlist",
          type: "error",
          logo: "brokenheart",
        }),
      );
    }
  };

  const shareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    dispatch(
      setNotification({
        message: "Link Copied to Clipboard",
        type: "none",
        logo: "tick",
      }),
    );
  };

  // Checking Valid Pincode
  const valid = () => {
    if (!isNaN(Number(pincode)) && pincode.length === 6) return true;
    else return false;
  };

  // Submitting Pincode to check delivery
  const submitPincode = async () => {
    const url = `https://api.data.gov.in/resource/6176ee09-3d56-4a3b-8115-21841576b2f6?api-key=${config.deliveryApi}&format=json&limit=1&filters%5Bpincode%5D=${pincode}`;
    try {
      setVisible(false);
      setLoader(true);
      const response = await fetch(url);
      const result = await response.json();

      if (result.total === 0) {
        setTimeout(() => {
          setAddress({
            pincode: pincode,
            office: "",
            city: "",
            district: "",
            state: "",
          });
          setDeliverable(false);
          setLoader(false);
          setVisible(true);
        }, 500);
      } else {
        setAddress({
          ...address,
          pincode: pincode,
          office: result.records[0].officename,
          city: result.records[0].taluk,
          district: result.records[0].districtname,
          state: result.records[0].statename,
        });

        setTimeout(() => {
          setDeliverable(true);
          setLoader(false);
          setVisible(true);
        }, 500);
      }
    } catch (error) {
      setLoader(false);
      setVisible(true);
      dispatch(
        setNotification({
          message: "Unable to check delivery at the moment",
          type: "error",
          logo: "brokenheart",
        }),
      );
    }
  };

  //Average rating for the product
  const averageRating = () => {
    let x = ratings.reduce((item, a) => item + a, 0);
    return Math.round((x / ratings.length) * 100) / 100;
  };

  // Stars for the product
  const starrs = () => {
    if (ratings.length === 0)
      return (
        <h2 className="md:text:xl text-lg font-bold lg:text-2xl">
          No Ratings Yet
        </h2>
      );
    let stars = averageRating();
    return (
      <div className="flex items-center">
        {/* <h2 className="font-bold text-lg md:text:xl lg:text-2xl mr-4">Ratings: </h2> */}
        <img
          src={stars - 1 <= 0 ? (stars - 1 > -1 ? halfstar : nostar) : fullstar}
          alt="star"
          className="h-6 w-6"
        />
        <img
          src={stars - 2 <= 0 ? (stars - 2 > -1 ? halfstar : nostar) : fullstar}
          alt="star"
          className="h-6 w-6"
        />
        <img
          src={stars - 3 <= 0 ? (stars - 3 > -1 ? halfstar : nostar) : fullstar}
          alt="star"
          className="h-6 w-6"
        />
        <img
          src={stars - 4 <= 0 ? (stars - 4 > -1 ? halfstar : nostar) : fullstar}
          alt="star"
          className="h-6 w-6"
        />
        <img
          src={stars - 5 <= 0 ? (stars - 5 > -1 ? halfstar : nostar) : fullstar}
          alt="star"
          className="h-6 w-6"
        />
        <h2 className="ml-2 text-lg font-medium text-brown md:text-xl xl:text-2xl">
          {" "}
          ({averageRating()})
        </h2>
      </div>
    );
  };

  const {name,details,images,seller,ratings,reviews,rrlink,priority,offer} = product;

  return mainLoader ? (
    <div className="flex min-h-screen items-center justify-center">
      {error ? (
        <div className="text-center">
          <div className="flex-center gap-2">
            <img
              src={errorimg}
              alt="error"
              className="h-4 w-4 animate-ping md:mr-4 md:h-8 md:w-8"
            />
            <h1 className="text-xl font-bold text-red-600 md:text-2xl">
              Unable to fetch data at the moment !
            </h1>
          </div>
          <button
            className="para-text my-4 rounded-2xl bg-blue-500 px-4 py-2 text-white"
            onClick={() => window.location.reload()}
          >
            Go back
          </button>
        </div>
      ) : (
        <img src={loaderSpinner} alt="Loading..." className="h-24 w-24" />
      )}
    </div>
  ) : (
    !error && (
      <div className="mb-4 mt-6 flex min-h-screen flex-col">
        {console.log(product)}
        {/* IMAGE PART */}
        <div className="min-w-3/4 neu1 relative mx-auto mb-4 flex w-fit flex-col items-center p-8 xl:flex">
          {/* Priority Part */}
          {
            <div className={`absolute right-2 md:right-4`}>
              {offer && (
                <div className="right-2 z-[1] flex animate-bounce items-center gap-1 rounded-full bg-green-500 px-2 py-1 text-[10px] text-sm font-bold text-white md:right-4 md:text-base lg:text-lg">
                  <img src={bolt1} alt="S" className="h-4 w-4" />
                  SALE LIVE{" "}
                </div>
              )}
              <h1
                className={`rounded-full p-2 text-center text-sm font-bold text-white md:p-3 md:text-lg lg:text-xl ${priority >= 3 ? "bg-violet-500" : priority === 2 ? "bg-orange" : priority === 1 ? "bg-blue-500" : "bg-red-500"}`}
              >
                {priority >= 3
                  ? ""
                  : priority === 2
                    ? "Premium"
                    : priority === 1
                      ? "Value pack"
                      : "Budget Friendly"}
              </h1>
            </div>
          }

          <div className="mx-auto flex w-[80vw] flex-col items-center justify-around xl:w-[80vw]">
            <div className="w-[80vw] md:w-[70vw]">
              <div className="flex flex-col items-center border-b-2 border-gray-300 shadow-orange/80">
                <div className="mb-1 mt-2">
                  <img
                    src={images[`${n}`]}
                    alt={name}
                    className="h-[35vh] rounded-t-2xl sm:h-[40vh] md:h-[50vh]"
                  />
                </div>
                <div
                  className={`flex max-w-[70vw] rounded-2xl ${images.length > 2 && "overflow-x-scroll"}`}
                >
                  {images.map((image, i) => (
                    <div
                      className="mx-1 max-h-[160px] min-h-[80px] cursor-pointer"
                      key={i}
                      onMouseOver={() => {
                        setN(i);
                      }}
                    >
                      <img
                        src={image}
                        alt={name}
                        className="aspect-square w-[80px] max-w-[150px] rounded-xl border object-contain px-1 shadow-lg md:min-w-[120px]"
                      />
                    </div>
                  ))}
                </div>
                <div className="z-[3] flex md:my-2">
                  <h1 className="my-4 text-center text-2xl font-bold md:text-3xl lg:text-4xl">
                    {name}
                  </h1>
                  <div
                    onClick={addtowishlist}
                    className="lg:h-18 hover:scale-115 m-2 mb-4 ml-4 h-10 w-fit translate-y-2 cursor-pointer rounded-full transition-all hover:-translate-y-1 md:h-14"
                  >
                    <img src={love} alt="" className="h-8 md:h-10 lg:h-12" />
                  </div>
                  <div
                    onClick={shareLink}
                    className="hover:scale-115 m-2 h-10 w-fit translate-y-2 cursor-pointer rounded-full transition-all hover:translate-x-2 md:h-14 lg:h-16"
                  >
                    <img
                      src={share}
                      alt=""
                      className="h-8 fill-brown md:h-10 lg:h-12"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center justify-center text-center md:flex-row">
              <div className="mb-2 flex items-center justify-center">
                <h3 className="lg:text:3xl text-xl font-bold text-green-600 md:text-2xl lg:text-3xl">
                  {" "}
                  &#8377;{details.price}{" "}
                  <span className="text-[0.9em]">only</span>
                </h3>
                <p className="text-md md:text:xl mx-2 font-semibold text-gray-600 lg:text-2xl">
                  ({" "}
                  {Math.floor(
                    ((details.price2 - details.price) * 100) / details.price2,
                  )}
                  % OFF )
                </p>
              </div>
              <div className="md:ml-4 xl:ml-6">{starrs()}</div>
            </div>
          </div>
        </div>

        {/* BUY NOW PART */}
        <div className="m-2 mt-6 mb-4 mx-auto flex w-[95vw] justify-around gap-4 rounded-3xl px-2 py-2 font-semibold md:w-[80vw] md:px-6 lg:py-4">
          <Link
            to="/buynow"
            onClick={buynow}
            className="flex-center group/1 min-w-[20vw] rounded-2xl bg-green-500 px-4 py-2 text-gray-50 shadow-sm shadow-green-300 transition-all hover:scale-105 lg:px-6 lg:py-4"
          >
            <h1 className="mr-2 text-xl md:text-2xl lg:text-3xl">Buy Now! </h1>
            <img
              src={tick}
              alt="BUY"
              className="h-6 w-6 transition-all group-hover/1:translate-x-2 group-hover/1:scale-[118%] md:ml-2 md:h-8 md:w-8 lg:h-12 lg:w-12"
            />
          </Link>
          <div
            onClick={addtocart}
            className="flex-center group/2 min-w-[20vw] cursor-pointer rounded-2xl bg-yellow-500 px-4 py-2 shadow-sm shadow-yellow-300 transition-all hover:scale-105 lg:px-6 lg:py-4"
          >
            <h1 className="mr-2 text-xl md:text-2xl lg:text-3xl">
              Add to Cart{" "}
            </h1>
            <img
              src={cartadd}
              alt="BUY"
              className="h-6 w-6 transition-all group-hover/2:scale-[118%] md:ml-2 md:h-8 md:w-8 lg:h-12 lg:w-12"
            />
          </div>
        </div>

        {/* PRODUCT DETAILS PART */}
        <div className="md:text:2xl mx-auto w-[90vw] text-balance rounded-2xl border-2 p-2 text-xl lg:text-3xl">
          <div className="ml-2">
            <h1 className="mb-2 ml-4 text-2xl font-bold text-brown md:mb-4 md:text-3xl">
              {name} <span className="text-xl">(by {seller})</span>
            </h1>
            <div className="md:text:2xl m-4 my-2 flex items-center text-xl lg:text-3xl">
              <h3 className="font-bold text-green-600">
                {" "}
                &#8377;{details.price}{" "}
              </h3>
              <p className="md:text-md ml-2 text-sm text-gray-600 lg:text-xl">
                MRP: <span className="line-through">{details.price2}</span>
              </p>
              <p className="md:text-md ml-6 text-sm font-bold text-gray-900 lg:text-xl">
                {Math.floor(
                  ((details.price2 - details.price) * 100) / details.price2,
                )}
                % (&#8377;{details.price2 - details.price}) OFF
              </p>
            </div>

            <div className="ml-4">
              <span className="">{starrs()}</span>
              <Link
                to={rrlink}
                className="md:text-md mb-4 flex cursor-pointer items-center text-sm lg:text-lg"
              >
                <span className="rounded-xl bg-green-600 p-1 px-2 font-bold text-gray-100 transition-all hover:scale-105">
                  View {ratings.length} Ratings and {reviews.length} Reviews
                </span>
                <img
                  src={forward}
                  alt=""
                  className="m-2 h-8 w-8 transition-all hover:scale-150"
                />
              </Link>
            </div>
          </div>

          <div className="ml-2 border-t-2 p-2 text-gray-800 lg:ml-6">
            <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">
              Product Description
            </h2>
            <h2 className="my-2 text-sm md:text-lg">{details.description}</h2>

            <h1 className="mt-2 text-xl font-bold md:mt-4 md:text-2xl lg:text-3xl">
              Product Details
            </h1>
            <div className="md:flex mt-1">
              <div className="mt-1 flex-col text-gray-800 text-sm md:text-lg min-w-[35%]">
                <h2 className="font-medium ">
                  Quantity :{" "}
                  <span className="">{details.quantity}</span>
                </h2>
                <h2 className="font-medium">
                  Life: <span className="">{details.life}</span>
                </h2>
                <h2 className="font-medium">
                  Packaging:{" "}
                  <span className="">{details.packaging}</span>
                </h2>
              </div>
              <div className="mx-0 md:ml-8 lg:ml-12">
                <h2 className="mt-2 text-xl font-bold md:mt-0">
                  Ingredients:{" "}
                </h2>
                <p className="mr-4 text-sm text-gray-900 md:text-lg">
                  {details.ingredients}
                </p>
              </div>
            </div>

            {details.instructions && (
              <div className="mt-2 md:mt-4">
                <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">
                  Instructions
                </h2>
                <h4 className="text-sm text-gray-800 md:text-lg">
                  {details.instructions}
                </h4>
              </div>
            )}

            <div className="mt-2 md:mt-4">
              <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">
                Seller Details
              </h2>
              <h2 className="text-sm text-gray-800 md:text-lg">
                This product is sold by{" "}
                <span className="font-bold">{seller}</span>.
              </h2>
            </div>

            {/* Product features */}
            <div className="mt-2 md:mt-4">
              <h2 className="mb-4 text-xl font-bold md:text-2xl lg:text-3xl">
                Product Features
              </h2>
              <div className="flex gap-2 md:gap-4 ">
                <div className="flex-col rounded-2xl">
                  <img src={iso} alt="tick" className="featureimg mx-auto" />
                  <h2 className="md:paratext text-center text-sm font-medium tracking-tight">
                    ISO certifiid product.
                  </h2>
                </div>
                <div className="flex-col rounded-2xl">
                  <img src={vegan} alt="tick" className="featureimg mx-auto" />
                  <h2 className="md:paratext text-center text-sm font-medium tracking-tight">
                    Vegan certified.
                  </h2>
                </div>
                <div className="flex-col rounded-2xl">
                  <img
                    src={morereturn}
                    alt="tick"
                    className="featureimg mx-auto transform "
                  />
                  <h2 className="md:paratext text-center text-sm font-medium tracking-tight">
                    5 days return available.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DELIVERY PART */}
        <div className="mx-auto m-8 w-[90vw] rounded-2xl border-2 p-4 md:w-[80vw]">
          <div className="mx-auto flex items-center">
            <h1 className="ml-6 text-xl font-bold md:text-2xl lg:text-3xl">
              Delivery
            </h1>
            <img
              src={transport}
              alt="transport"
              className="ml-6 h-8 w-8 lg:h-12 lg:w-12"
            />
          </div>
          <div className="my-2 ml-4">
            <h2 className="ml-2 mt-4 block text-xl font-bold text-blue-700 md:text-2xl">
              {details.price >= 99
                ? "Free Delivery with this item"
                : "Delivery charge ₹ 49"}
            </h2>
            <h2 className="text-md m-2 font-bold xl:text-xl">
              Enter Pincode to check delivery
            </h2>
            <div className="flex flex-col xl:flex-row">
              <div className="flex flex-col md:flex-row md:items-center">
                <input
                  type="text"
                  id="1"
                  className="m-2 max-w-[240px] rounded-xl border-2 border-black p-1 text-center font-bold"
                  ref={ref}
                  value={pinc}
                  onChange={() => {
                    setPincode(ref.current.value);
                    setVisible(false);
                  }}
                  onKeyDown={(e) => {
                    valid() && e.key == "Enter" && submitPincode();
                  }}
                />
                <div className="flex justify-center">
                  <button
                    className={`ml-2 rounded-2xl px-4 py-1 text-lg font-bold transition-all hover:bg-violet-600 hover:shadow-md hover:shadow-purple-500 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 lg:text-xl ${valid() ? "bg-blue-700 text-white" : "pointer-events-none bg-blue-200 text-black"}`}
                    onClick={submitPincode}
                  >
                    SUBMIT
                  </button>
                  <button
                    className="ml-4 rounded-2xl bg-gray-200 px-2 pb-1 text-base font-bold hover:bg-gray-300 focus:outline-none focus:ring focus:ring-violet-300 active:bg-gray-400 md:text-xl lg:px-4"
                    onClick={() => {
                      setPincode("");
                      setVisible(false);
                    }}
                  >
                    ❌
                  </button>
                </div>
              </div>

              <div
                className={`${!valid() && pincode !== "" ? "flex" : "hidden"} ml-4 items-center`}
              >
                <h2 className="mr-4 font-bold text-red-600">
                  {pincode.length !== 6
                    ? "Length of Pincode should must be 6 "
                    : "Pincode should contain only numeric values"}
                </h2>
                <img
                  src={errorimg}
                  alt="error"
                  className="h-4 w-4 animate-ping rounded-full"
                />
              </div>
            </div>
          </div>

          <div className={`${!loader && "hidden"} flex justify-center`}>
            <img src={loaderSpinner} alt="WAIT..." className="h-16 w-16" />
          </div>

          <div
            className={`${visible ? "" : "hidden"} ml-6 items-center shadow-md ${deliverable ? "shadow-blue-600" : "shadow-red-600"} rounded-2xl p-4`}
          >
            <div className={`${!deliverable && "hidden"}`}>
              <div className="flex-col items-center pt-2">
                <div className="flex-center ml-1 gap-2">
                  <img
                    src={bolt}
                    alt="bolt"
                    className="h-8 w-8 lg:h-12 lg:w-12"
                  />
                  <h2 className="text-md font-semibold md:text-xl">
                    Faster Delivery by 10 PM, within{" "}
                    <p className="mx-1 inline rounded-2xl bg-blue-700 px-2 py-1 text-gray-50">
                      {Math.floor(Math.random() * 3) + 1}
                    </p>{" "}
                    days
                  </h2>
                </div>
                <h2 className="mt-2 text-center">
                  Deliver to {address.city}, {address.district}, {address.state}{" "}
                  ✔️
                </h2>
              </div>
            </div>
            <div className={`${deliverable && "hidden"}`}>
              <div className="flex items-center">
                <h2 className="mr-4 text-xl font-bold text-red-600">
                  Delivery Unavailable{" "}
                </h2>
                <img
                  src={errorimg}
                  alt="error"
                  className="h-4 w-4 animate-ping rounded-full"
                />
              </div>
              <h2 className="font-bold">
                Sorry! We don't deliver to this location at this moment !
              </h2>
            </div>
          </div>
        </div>

        {/* Similar products */}
        {product && (
          <div className="ml-2 ">
            <Category type="type" product={product} />
            <Category type="recentProducts" product={product} />
          </div>
        )}

        
      </div>
    )
  );
};

export default Product;
