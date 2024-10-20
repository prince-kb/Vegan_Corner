import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useRef } from "react";

import nostar from "../assets/svgs/nostar.svg";
import fullstar from "../assets/svgs/fullstar.svg";
import halfstar from "../assets/svgs/halfstar.svg";
import forward from "../assets/svgs/forward.svg";
import cartadd from "../assets/svgs/cartadd.svg";
import love from "../assets/svgs/love.svg";
import tick from "../assets/svgs/tick.svg";
import bolt from "../assets/svgs/bolt.svg";
import share from "../assets/svgs/share.svg";
import transport from "../assets/svgs/transport.svg";
import errorimg from "../assets/svgs/error.svg";
import loaderSpinner from "../assets/svgs/loader.svg";
import { useDispatch, useSelector } from "react-redux";
import { setUser, updateUser } from "../redux/slices/userSlice";
import { setNotification } from "../redux/slices/notificationSlice";
import { updateBuyNow } from "../redux/slices/buyNowSlice";


const Product = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ref = useRef(null); // Ref for pincode input to set pincode after every input change
    const { id } = useParams(); // Getting the id of the product from the url

    const [product, setProduct] = useState({}); // Product details
    const [mainLoader, setMainLoader] = useState(true); //To show product after fetching
    const [pincode, setPincode] = useState(localStorage.getItem('pincode') || '');
    const [pinc, setPinc] = useState(pincode); // extra variable to handle onchange event of pincode input
    const [visible, setVisible] = useState(pincode !== '' ? 1 : 0); // Visibility of the delivery status
    const [loader, setLoader] = useState(false);  // Loader for fetching data
    const [address, setAddress] = useState({ pincode: "", office: "", city: "", district: "", state: "" }); // Address of the pincode
    const [deliverable, setDeliverable] = useState(false); // Delivery status of the pincode to show if it is deliverable or not at the pincode
    const [n, setN] = useState(0); // Image index for the product images
    const [error, setError] = useState(false); // Error in fetching data

    const user = useSelector(state => state.user.user);

    useEffect(() => {
        if (user) {
            const addtorecents = async () => {
                try {
                    const API = import.meta.env.VITE_REACT_APP_API
                    const SERVER_SECRET = import.meta.env.VITE_REACT_APP_SERVER_SECRET
                    await fetch(`${API}/api/user/addtorecent`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'secret': SERVER_SECRET,
                            'authToken': localStorage.getItem('authy')
                        },
                        body: JSON.stringify({ id: id })
                    })

                    dispatch(updateUser());

                } catch (err) {
                    console.log(" Unable to add product to recents")
                }
            }
            addtorecents();
        }
    }, [window.onload])

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const SERVER_SECRET = import.meta.env.VITE_REACT_APP_SERVER_SECRET
                const response = await fetch(`${import.meta.env.VITE_REACT_APP_API}/api/getproduct/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'secret': SERVER_SECRET
                    }
                })
                const data = await response.json()
                setProduct(data)
                setMainLoader(false)
            } catch (err) {
                setError(true);
                console.log(" Unable to fetch data")
            }
        }
        fetchProduct();
    }, [id])

    useEffect(() => {
        localStorage.setItem('pincode', pincode);
        setPinc(pincode);
    }, [pincode])

    useEffect(() => {
        if (pincode.length === 6) submitPincode();
    }, [])

    const addtocart = async () => {
        if (!user) return dispatch(setNotification({ message: "Please Login to add to Cart", type: "none", logo: "user" }))
        try {
            const API = import.meta.env.VITE_REACT_APP_API
            const SERVER_SECRET = import.meta.env.VITE_REACT_APP_SERVER_SECRET
            const response = await fetch(`${API}/api/user/addtocart`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'secret': SERVER_SECRET,
                    'authToken': localStorage.getItem('authy')
                },
                body: JSON.stringify({ id: id })
            })
            const p = await response.json();
            if (p.message === "Item added to cart") dispatch(setNotification({ message: "Product added to Cart", type: "success", logo: "cart" }))
            dispatch(updateUser());
        } catch (err) {
            console.log(err)
            console.log(" Unable to add product to cart")
            dispatch(setNotification({ message: "Unable to add product to Cart", type: "error", logo: "cart" }))
        }
    }

    const buynow = () => {
        if (!user) {
            dispatch(setNotification({ message: "Please Login to Buy Now", type: "none", logo: "user" }))
            navigate('/signin');
            return;
        }
        else {
            dispatch(updateBuyNow({ id: id, quantity: 1 }))
            navigate('/buynow')
        }
    }

    const addtowishlist = async () => {
        if (!user) return dispatch(setNotification({ message: "Please Login to add to Wishlist", type: "none", logo: "user" }))
        try {
            const API = import.meta.env.VITE_REACT_APP_API
            const SERVER_SECRET = import.meta.env.VITE_REACT_APP_SERVER_SECRET
            const response = await fetch(`${API}/api/user/wishlist`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'secret': SERVER_SECRET,
                    'authToken': localStorage.getItem('authy')
                },
                body: JSON.stringify({ id: id })
            })
            dispatch(updateUser());
            const p = await response.json();
            if (p.message === "Item added to wishlist") dispatch(setNotification({ message: "Product added to Wishlist", type: "success", logo: "heart" }))
            else dispatch(setNotification({ message: "Product removed from Wishlist", type: "error", logo: "brokenheart" }))

        } catch (err) {
            console.log(" Unable to add product to wishlist")
            dispatch(setNotification({ message: "Unable to add product to Wishlist", type: "error", logo: "brokenheart" }))
        }
    }

    const shareLink = () => {
        navigator.clipboard.writeText(window.location.href)
        dispatch(setNotification({ message: "Link Copied to Clipboard", type: "none", logo: "tick" }))
    }

    // Checking Valid Pincode
    const valid = () => {
        if (!isNaN(Number(pincode)) && pincode.length === 6) return true;
        else return false;
    }

    // Submitting Pincode to check delivery
    const submitPincode = async () => {
        const url = `https://api.data.gov.in/resource/6176ee09-3d56-4a3b-8115-21841576b2f6?api-key=${import.meta.env.VITE_REACT_APP_DELIVERY_API}&format=json&limit=1&filters%5Bpincode%5D=${pincode}`
        try {
            setVisible(false);
            setLoader(true);
            const response = await fetch(url);
            const result = await response.json();

            if (result.total === 0) {
                setTimeout(() => {
                    setAddress({ pincode: pincode, office: "", city: "", district: "", state: "" })
                    setDeliverable(false);
                    setLoader(false);
                    setVisible(true);
                }, 500);
            }
            else {
                setAddress({ ...address, pincode: pincode, office: result.records[0].officename, city: result.records[0].taluk, district: result.records[0].districtname, state: result.records[0].statename });

                setTimeout(() => {
                    setDeliverable(true);
                    setLoader(false);
                    setVisible(true);
                }, 500);
            }
        } catch (error) {
            setLoader(false);
            setVisible(true);
            console.error("Cannot get your location right now!");
            console.error("Retry after sometime!");
        }
    }

    //Average rating for the product
    const averageRating = () => {
        let x = ratings.reduce((item, a) => item + a, 0);
        return Math.round((x / ratings.length) * 100) / 100
    }

    // Stars for the product
    const starrs = () => {
        if (ratings.length === 0) return <h2 className="font-bold text-lg md:text:xl lg:text-2xl">No Ratings Yet</h2>
        let stars = averageRating();
        return <div className="flex items-center">
            {/* <h2 className="font-bold text-lg md:text:xl lg:text-2xl mr-4">Ratings: </h2> */}
            <img src={stars - 1 <= 0 ? stars - 1 > (-1) ? halfstar : nostar : fullstar} alt="star" className="h-6 w-6" />
            <img src={stars - 2 <= 0 ? stars - 2 > (-1) ? halfstar : nostar : fullstar} alt="star" className="h-6 w-6" />
            <img src={stars - 3 <= 0 ? stars - 3 > (-1) ? halfstar : nostar : fullstar} alt="star" className="h-6 w-6" />
            <img src={stars - 4 <= 0 ? stars - 4 > (-1) ? halfstar : nostar : fullstar} alt="star" className="h-6 w-6" />
            <img src={stars - 5 <= 0 ? stars - 5 > (-1) ? halfstar : nostar : fullstar} alt="star" className="h-6 w-6" />
            <h2 className="ml-2 text-lg md:text-xl xl:text-2xl text-brown font-medium"> ({averageRating()})</h2>
        </div>
    }

    const { name, details, images, seller, ratings, reviews, rrlink } = product;

    return (
        mainLoader ? <div className="flex justify-center items-center h-screen">
            {error ? <div className="text-center">
                <div className="flex items-cente">
                    <img src={errorimg} alt="error" className="h-4 w-4 md:h-8 md:w-8 mr-4 md:mr-8 animate-ping" />
                    <h1 className="md:text-3xl text-red-600 font-bold text-2xl">Unable to fetch data at the Moment</h1>
                </div>
                <button className="my-4 rounded-2xl px-4 py-2 bg-blue-500 text-white font-bold text-xl" onClick={() => window.location.reload()}>Go Back to Home</button>
            </div> :
                <img src={loaderSpinner} alt="Loading..." className="h-24 w-24" />
            }
        </div> : !error &&

        <div className="mt-6 mb-4 flex flex-col items-center">

            {/* IMAGE PART */}
            <div className="xl:flex flex flex-col p-8 mb-4 min-w-3/4 w-fit items-center neu1 ">
                <div className="flex flex-col w-[80vw] xl:w-[80vw] mx-auto justify-around items-center">
                    <div className="w-[80vw] md:w-[70vw]">
                        <div className="border-b-2 border-gray-300 flex flex-col items-center shadow-orange/80">
                            <div className="mb-1 mt-2">
                                <img src={images[`${n}`]} alt={name} className="rounded-t-2xl h-[35vh] sm:h-[40vh] md:h-[50vh] " />
                            </div>
                            <div className={` flex rounded-2xl max-w-[70vw] ${images.length > 2 && 'overflow-x-scroll'}`}>
                                {images.map((image, i) => (
                                    <div className="cursor-pointer mx-1 min-h-[80px] max-h-[160px] " key={i} onMouseOver={() => { setN(i) }}>
                                        <img src={image} alt={name} className="rounded-xl px-1 shadow-lg border object-contain w-[80px] md:min-w-[120px] max-w-[150px] aspect-square" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex md:my-2 z-[3]">
                                <h1 className="text-center font-bold text-2xl md:text-3xl lg:text-4xl my-4">{name}</h1>
                                <div onClick={addtowishlist} className="translate-y-2 ml-4 h-10 md:h-14 lg:h-18 m-2 cursor-pointer hover:scale-115 transition-all hover:-translate-y-1 rounded-full w-fit mb-4" ><img src={love} alt="" className="h-8 md:h-10 lg:h-12 " /></div>
                                <div onClick={shareLink} className="translate-y-2 h-10 md:h-14 lg:h-16 m-2 cursor-pointer hover:scale-115 transition-all hover:translate-x-2  rounded-full w-fit" ><img src={share} alt="" className="h-8 md:h-10 lg:h-12 fill-brown" /></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row mt-6 items-center justify-center text-center">
                        <div className="flex items-center justify-center mb-2">
                            <h3 className="text-green-600 font-bold text-xl md:text-2xl lg:text:3xl lg:text-3xl"> &#8377;{details.price} <span className="text-[0.9em]">only</span></h3>
                            <p className="mx-2 text-md md:text:xl lg:text-2xl font-semibold text-gray-600">( {Math.floor((details.price2 - details.price) * 100 / details.price2)}% OFF )</p>
                        </div>
                        <div className="md:ml-4 xl:ml-6">{starrs()}</div>
                    </div>
                </div>
            </div>

            {/* BUY NOW PART */}
            <div className="flex justify-around rounded-3xl py-2 lg:py-4 m-2 mb-4 px-2 md:px-6 gap-4 w-[95vw] md:w-[80vw] font-semibold">
                <Link to="/buynow" onClick={buynow} className="min-w-[20vw] flex-center px-2 md:px-4 lg:px-6 py-1 md:py-2 lg:py-4 group/1 bg-green-500 shadow-sm shadow-green-300 hover:scale-105 transition-all text-gray-50 rounded-2xl">
                    <h1 className="text-xl md:text-2xl lg:text-3xl mr-2">Buy Now! </h1>
                    <img src={tick} alt="BUY" className="h-6 w-6 md:h-8 md:w-8 md:ml-2 lg:h-12 lg:w-12 group-hover/1:scale-[118%] group-hover/1:translate-x-2 transition-all" />
                </Link>
                <div onClick={addtocart} className="cursor-pointer min-w-[20vw] flex-center px-4 lg:px-6 py-4 lg:py-4 bg-yellow-500 shadow-sm shadow-yellow-300 rounded-2xl hover:scale-105 transition-all group/2">
                    <h1 className="text-xl md:text-2xl lg:text-3xl mr-2">Add to Cart </h1>
                    <img src={cartadd} alt="BUY" className="h-6 w-6 md:h-8 md:w-8 md:ml-2 lg:h-12 lg:w-12 group-hover/2:scale-[118%] transition-all" />
                </div>
            </div>

            {/* PRODUCT DETAILS PART */}
            <div className="border-2 w-[90vw] mx-auto rounded-2xl p-2 text-xl md:text:2xl lg:text-3xl text-balance">

                <div className="ml-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-brown mb-2 md:mb-4 ml-4">{name} <span className=" text-xl">(by {seller})</span></h1>
                    <div className="flex m-4 my-2 items-center text-xl md:text:2xl lg:text-3xl">
                        <h3 className="text-green-600 font-bold"> &#8377;{details.price} </h3>
                        <p className="ml-2 text-sm md:text-md lg:text-xl text-gray-600 ">MRP: <span className="line-through">{details.price2}</span></p>
                        <p className="ml-6 text-gray-900 font-bold text-sm md:text-md lg:text-xl">{Math.floor((details.price2 - details.price) * 100 / details.price2)}% (&#8377;{details.price2 - details.price}) OFF</p>
                    </div>

                    <div className="ml-4">
                        <span className="">{starrs()}</span>
                        <Link to={rrlink} className="cursor-pointer mb-4 flex items-center text-sm md:text-md lg:text-lg">
                            <span className="px-2 text-gray-100 bg-green-600 font-bold p-1 rounded-xl hover:scale-105 transition-all">View {ratings.length} Ratings and {reviews.length} Reviews</span>
                            <img src={forward} alt="" className="h-8 w-8 m-2 hover:scale-150 transition-all" />
                        </Link>
                    </div>
                </div>


                <div className="border-t-2 p-2 text-gray-800 ml-2 lg:ml-6">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold ">Product Description</h2>
                    <h2 className="text-sm md:text-lg my-2">{details.description}</h2>

                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mt-2 md:mt-4">Product Details</h1>
                    <div className="md:flex">
                        <div className="flex-col text-sm md:text-lg mt-1">
                            <h2 className="font-bold ">Quantity : <span className="text-brown">{details.weight}</span></h2>
                            <h2 className="font-bold ">Packaging: <span className="text-brown">{details.packaging}</span></h2>
                            <h2 className="font-bold ">Life: <span className="text-brown">{details.life}</span></h2>
                        </div>
                        <div className="md:ml-8 lg:ml-12 mx-0">
                            <h2 className="mt-2 md:mt-0 text-xl font-bold ">Ingredients: </h2>
                            <p className="text-gray-600 mr-4 text-sm md:text-lg">{details.ingredients}</p>
                        </div>
                    </div>

                    {details.instructions && <div className="mt-2 md:mt-4">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Instructions</h2>
                        <h4 className="text-gray-800 text-sm md:text-lg">{details.instructions}</h4>
                    </div>}
                </div>
            </div>

            {/* DELIVERY PART */}
            <div className="w-[90vw] md:w-[80vw] rounded-2xl m-8 p-4 border-2 ">
                <div className="flex items-center mx-auto">
                    <h1 className="ml-6 text-xl md:text-2xl lg:text-3xl font-bold">Delivery</h1>
                    <img src={transport} alt="transport" className="h-8 w-8 lg:h-12 lg:w-12 ml-6" />
                </div>
                <div className="ml-4 my-2">
                    <h2 className="text-xl block font-bold ml-2 text-blue-700 mt-4 md:text-2xl">{details.price >= 99 ? 'Free Delivery with this item' : 'Delivery charge ₹ 49'}</h2>
                    <h2 className="text-md xl:text-xl font-bold m-2">Enter Pincode to check delivery</h2>
                    <div className="flex flex-col xl:flex-row">
                        <div className="flex flex-col md:flex-row md:items-center">
                            <input type="text" id="1" className="border-2 p-1 m-2 rounded-xl border-black font-bold text-center" ref={ref} value={pinc} onChange={() => { setPincode(ref.current.value); setVisible(false) }} onKeyDown={(e) => { valid() && e.key == "Enter" && submitPincode() }} />
                            <div className="flex justify-center">
                                <button className={`ml-2 bg-blue-700 hover:bg-violet-600 hover:shadow-md hover:shadow-purple-500 transition-all active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 text-lg lg:text-xl text-white px-4 py-1 rounded-2xl  ${valid() ? '' : 'hidden'}`} onClick={submitPincode}>SUBMIT</button>
                                <button className="md:text-xl bg-gray-200 hover:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring focus:ring-violet-300 text-base px-2 pb-1 lg:px-4 ml-4 rounded-2xl font-bold" onClick={() => { setPincode(''); setVisible(false) }}>❌</button>
                            </div>
                        </div>


                        <div className={`${!valid() && pincode !== '' ? 'flex' : 'hidden'} items-center ml-4`}>
                            <h2 className="font-bold mr-4 text-red-600">{pincode.length !== 6 ? 'Length of Pincode should must be 6 ' : "Pincode should contain only numeric values"}</h2>
                            <img src={errorimg} alt="error" className="rounded-full h-4 w-4 animate-ping" />
                        </div>
                    </div>
                </div>

                <div className={`${!loader && 'hidden'} flex justify-center`}>
                    <img src={loaderSpinner} alt="WAIT..." className="h-16 w-16" />
                </div>

                <div className={`${visible ? '' : 'hidden'} ml-6 items-center shadow-md ${deliverable ? 'shadow-blue-600' : 'shadow-red-600'} p-4 rounded-2xl`}>
                    <div className={`${!deliverable && 'hidden'}`}>
                        <div className="flex-col items-center pt-2">
                            <div className="ml-1 flex-center gap-2">
                                <img src={bolt} alt="bolt" className="h-8 w-8 lg:h-12 lg:w-12" />
                                <h2 className="font-semibold text-md md:text-xl">Faster Delivery by 10 PM, within <p className="inline text-gray-50 bg-blue-700 px-2 py-1 rounded-2xl mx-1">{Math.floor(Math.random() * 3) + 1}</p> days</h2>
                            </div>
                            <h2 className="mt-2 text-center">Deliver to {address.city}, {address.district}, {address.state} ✔️</h2>
                        </div>
                    </div>
                    <div className={`${deliverable && 'hidden'}`}>
                        <div className="flex items-center">
                            <h2 className="font-bold text-red-600 mr-4 text-xl">Delivery Unavailable </h2>
                            <img src={errorimg} alt="error" className="rounded-full h-4 w-4 animate-ping" />
                        </div>
                        <h2 className="font-bold">Sorry! We don't deliver to this location at this moment !</h2>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Product
