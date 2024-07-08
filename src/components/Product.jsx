import { Link, useParams } from "react-router-dom"
import { useEffect, useState, useRef } from "react";

import Cart from "./Cart";
import CheckOut from "./CheckOut";

import catalogue from "../constants/Catalogue";
import nostar from "../assets/svgs/nostar.svg";
import fullstar from "../assets/svgs/fullstar.svg";
import halfstar from "../assets/svgs/halfstar.svg";
import forward from "../assets/svgs/forward.svg";
import cartadd from "../assets/svgs/cartadd.svg";
import tick from "../assets/svgs/tick.svg";
import bolt from "../assets/svgs/bolt.svg";
import transport from "../assets/svgs/transport.svg";
import error from "../assets/svgs/error.svg";
import loaderSpinner from "../assets/svgs/loader.svg";



const Product = () => {
    const ref = useRef(null); // Ref for pincode input to set pincode after every input change
    const { id } = useParams();

    const product = catalogue.find((item) => item.id === id);
    const { name, details, images, stars, seller, ratings, reviews, rrlink, description, instructions } = product;


    const [pincode, setPincode] = useState(localStorage.getItem('pincode') || '');
    const [pinc, setPinc] = useState(pincode); // extra variable to handle onchange event of pincode input
    const [visible, setVisible] = useState(pincode !== '' ? 1 : 0); // Visibility of the delivery status
    const [loader, setLoader] = useState(false);  // Loader for fetching data
    const [address, setAddress] = useState({ pincode: "", office: "", city: "", district: "", state: "" }); // Address of the pincode
    const [deliverable, setDeliverable] = useState(false); // Delivery status of the pincode to show if it is deliverable or not at the pincode
    const [n, setN] = useState(0); // Image index for the product images


    useEffect(() => {
        localStorage.setItem('pincode', pincode);
        setPinc(pincode);
    }, [pincode])

    useEffect(() => {
        if (pincode.length === 6) submitPincode();

    }, [])


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
            console.error(error);
        }
    }

    // Stars for the product
    const starrs = () => {
        return <div className="flex items-center">
            <h2 className="font-bold text-2xl mr-4">Rating: </h2>
            <img src={stars - 1 <= 0 ? stars - 1 > (-1) ? halfstar : nostar : fullstar} alt="star" className="h-6 w-6" />
            <img src={stars - 2 <= 0 ? stars - 2 > (-1) ? halfstar : nostar : fullstar} alt="star" className="h-6 w-6" />
            <img src={stars - 3 <= 0 ? stars - 3 > (-1) ? halfstar : nostar : fullstar} alt="star" className="h-6 w-6" />
            <img src={stars - 4 <= 0 ? stars - 4 > (-1) ? halfstar : nostar : fullstar} alt="star" className="h-6 w-6" />
            <img src={stars - 5 <= 0 ? stars - 5 > (-1) ? halfstar : nostar : fullstar} alt="star" className="h-6 w-6" />
            <h2 className="ml-2 font-bold text-[1.1em]"> ({stars})</h2>
        </div>
    }

    return (
        <div className="flex flex-col items-center mt-6 mb-4 w-[90%] mx-auto">

            {/* IMAGE PART */}
            <div className="xl:flex flex flex-col p-8 mb-4 min-w-3/4 w-fit items-center neu1">
                <div className="flex flex-col xl:w-[50vw] w-[70vw] mx-auto justify-around items-center">

                    <div className="w-[70vw]">

                        <div className="border-b-2 rounded-2xl flex flex-col items-center shadow-orange/80">
                            <div className="mb-1 mt-4">
                                <img src={images[`${n}`]} alt={name} className="rounded-t-2xl md:min-h-[50vh] min-h-[30vh] h-[50vh]" />
                            </div>
                            <div className={`flex rounded-2xl max-w-[70vw] ${images.length>2 && 'overflow-x-scroll'}`}>
                                {images.map((image, i) => (
                                    <div className="cursor-pointer mx-1 min-w-[120px] min-h-[150px] w-[200px]" key={i} onMouseOver={() => { setN(i) }}>
                                        <img src={image} alt={name} className="rounded-xl px-1 shadow-lg border object-cover" />
                                    </div>
                                ))}
                            </div>
                            <h1 className="text-center font-bold text-3xl my-4">{name}</h1>
                        </div>



                    </div>
                    
                        <div className="flex mt-6 items-center justify-center">
                            <h3 className="text-green-600 font-bold text-3xl"> &#8377;{details.price} <span className="text-2xl">only</span></h3>
                            <p className="mx-2 text-lg font-semibold text-gray-600">( {Math.floor((details.price2 - details.price) * 100 / details.price2)}% OFF )</p>
                        </div>
                        <div className="flex justify-center mt-4 mb-4">
                            <span>{starrs()}</span>
                        </div>
                </div>
            </div>


            {/* BUY NOW PART */}
            <div className="flex-center rounded-3xl py-4 m-2 mb-4 px-6 gap-4 w-[80vw]">
                <Link to="/checkout" className="flex-center px-6 py-4 bg-green-500 hover:scale-105 transition-all text-gray-50 rounded-2xl">
                    <h1 className="text-xl mr-4">Buy Now! </h1>
                    <img src={tick} alt="BUY" className="h-8 w-8" />
                </Link>
                <Link to="/cart" className="flex-center px-6 py-4 bg-yellow-500 rounded-2xl hover:scale-105 transition-all">
                    <h1 className="text-xl mr-4">Add to Cart </h1>
                    <img src={cartadd} alt="BUY" className="h-8 w-8" />
                </Link>

            </div>


            {/* PRODUCT DETAILS PART */}
            <div className=" border-2 w-[80vw] mx-auto rounded-2xl p-2">
                <div className="flex-col items-center ml-4 mt-2">
                    <h1 className="text-3xl font-bold text-brown mb-4">{name} <span className=" text-xl">(by {seller})</span></h1>
                </div>
                <div className="flex m-4 items-center">
                    <h3 className="text-green-600 font-bold text-3xl"> &#8377;{details.price} </h3>
                    <p className="mx-2 text-gray-600">MRP: <span className="line-through">{details.price2}</span></p>
                    <p className="mx-2 text-xl text-gray-600 font-bold">{Math.floor((details.price2 - details.price) * 100 / details.price2)}% (&#8377;{details.price2 - details.price}) OFF</p>

                </div>
                <div className="ml-4">
                    <span className="">{starrs()}</span>
                    <Link to={rrlink} className="mb-4 mt-1 flex items-center">
                        <span className="block text-gray-100  bg-green-600 font-bold p-1 rounded-xl hover:scale-105 transition-all">View {ratings} Ratings and {reviews} Reviews</span>
                        <img src={forward} alt="" className="h-8 w-8 m-2  hover:scale-150 transition-all" />
                    </Link>

                </div>
                <div className="border-t-2 p-2">
                    <h2 className="text-gray-700 text-2xl font-bold ml-2">Product Description</h2>
                    <h2 className="text-gray-700 text-xl p-2">{description}</h2>
                    <h1 className="text-3xl font-bold mb-4 ml-2 mt-4">Product Details</h1>
                    <div className="md:flex justify-around gap-4 ml-2">
                        <div className="flex-col">
                            <h2 className=" text-gray-700 text-xl font-bold ">Quantity : <span className="text-brown text-xl">{details.weight}</span></h2>
                            <h2 className=" text-gray-700 text-xl font-bold ">Packaging: <span className="text-brown text-xl">{details.packaging}</span></h2>
                            <h2 className=" text-gray-700 text-xl font-bold ">Life: <span className="text-brown text-xl">{details.life}</span></h2>
                        </div>
                        <div className="md:mx-8 mx-0">
                            <h2 className="text-xl font-bold ">Ingredients: </h2>
                            <p className="text-gray-600 mr-4 text-lg">{details.ingredients}</p>
                        </div>
                    </div>
                    {instructions && <div className="p-2 rounded-2xl mt-4">
                        <h2 className="text-2xl font-bold text-brown">Instructions</h2>
                        <h4 className="text-gray-800 text-lg">{instructions}</h4>
                    </div>}
                </div>
            </div>


            {/* DELIVERY PART */}
            <div className="w-[80vw] rounded-2xl m-8 p-4 border-2 ">
                <div className="flex items-center ml-4">
                    <h1 className="text-3xl font-bold ml-2">Delivery</h1>
                    <img src={transport} alt="transport" className="h-12 w-12 ml-6" />
                </div>
                <div className="ml-4 my-2">
                    <h2 className="text-xl font-bold m-2">Enter Pincode to check delivery</h2>
                    <div className="flex flex-col xl:flex-row">
                        <div>
                            <input type="text" className="border-2 p-1 m-2 rounded-lg " ref={ref} value={pinc} onChange={() => {setPincode(ref.current.value); setVisible(false) }} onKeyDown={(e)=>{valid() && e.key=="Enter" && submitPincode()}}/>
                            <button className={`bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 text-xl text-white px-2 py-1 rounded-2xl  ${valid() ? '' : 'hidden'}`} onClick={submitPincode}>SUBMIT</button>
                            <button className="text-2xl bg-gray-200 hover:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring focus:ring-violet-300 text-black px-4 pb-2 ml-4 rounded-2xl font-bold" onClick={() => { setPincode(''); setVisible(false) }}>x</button>
                        </div>


                        <div className={`${!valid() && pincode !== '' ? 'flex' : 'hidden'} items-center ml-4`}>
                            <h2 className="font-bold mr-4 text-red-600">{pincode.length !== 6 ? 'Length of Pincode should must be 6 ' : "Pincode should contain only numeric values"}</h2>
                            <img src={error} alt="error" className="rounded-full h-4 w-4 animate-ping" />
                        </div>
                    </div>
                </div>

                <div className={`${!loader && 'hidden'} flex justify-center`}>
                    <img src={loaderSpinner} alt="WAIT..." className="h-16 w-16" />
                </div>

                <div className={`${visible ? '' : 'hidden'} ml-6 items-center border-4 shadow-lg shadow-blue-600 p-4 rounded-2xl`}>
                    <div className={`${!deliverable && 'hidden'}`}>
                        <div className="flex items-center">
                            <img src={bolt} alt="bolt" className="h-8 w-8" />
                            <h2 className="font-bold ml-2 flex items-center text-xl">Faster Delivery by 10 PM, within <p className="text-gray-50 bg-blue-700 px-2 py-1 rounded-2xl text-xl mx-1">{Math.floor(Math.random() * 3) + 1}</p> days</h2>
                        </div>
                        <h2 className="ml-12 font-bold">Deliver to {address.district}, {address.state}</h2>
                    </div>
                    <div className={`${deliverable && 'hidden'}`}>
                        <div className="flex items-center">
                            <h2 className="font-bold text-red-600 mr-4 text-xl">Delivery Unavailable </h2>
                            <img src={error} alt="error" className="rounded-full h-4 w-4 animate-ping" />
                        </div>
                        <h2 className="font-bold">Sorry! We don't deliver to this location at this moment !</h2>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Product
