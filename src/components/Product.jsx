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
    const ref = useRef(null);
    const { id } = useParams();
    const [pincode, setPincode] = useState(localStorage.getItem('pincode') || '');
    const [pinc, setPinc] = useState(pincode);
    const [visible, setVisible] = useState(pincode !== '' ? 1 : 0);
    const [loader, setLoader] = useState(false);
    const [address, setAddress] = useState({pincode : "",office : "",city : "",district : "",state : ""});
    const [deliverable, setDeliverable] = useState(false);

    useEffect(() => {
        localStorage.setItem('pincode', pincode);
        setPinc(pincode);
    }, [pincode])

    const valid = () => {
        
        // console.log(!isNaN(Number(n)));
        // if (!isNaN(Number(n))) console.log(0);
        // console.log(1);
        // if(n.length === 0) return 1;
        // if (n.length === 6) return 2;
        // return 2;

        if (!isNaN(Number(pincode)) && pincode.length===6) return true;
        else return false; 
    }

    const submitPincode = async () => {

        const url=`https://api.data.gov.in/resource/6176ee09-3d56-4a3b-8115-21841576b2f6?api-key=${import.meta.env.VITE_REACT_APP_API}&format=json&limit=1&filters%5Bpincode%5D=${pincode}`
        console.log(url);
        try {
            setLoader(true);
            const response = await fetch(url);
            const result = await response.text();

            console.log(result);

            try{
                console.log(result.total)
            if(result.total) {
                setDeliverable(false);
                setTimeout(() => {
                    setLoader(false);
                    setVisible(true);
                },500);                                                                 q
            }
            else{ setAddress({...address, pincode : pincode,office : result.records[0].officename,city : result?.records[0]?.taluk ,district : result?.records[0]?.taluk,state : result?.records[0]?.taluk});}
            setDeliverable(true);
            setTimeout(() => {
            setLoader(false);
            setVisible(true);
            },500);
        } catch (error) {
            console.log(error);
        }
        } catch (error) {
            setLoader(false);
            setVisible(true);
            console.error(error);
        }
    }

    const product = catalogue.find((item) => item.id === parseInt(id));
    const { name, details, images, stars, seller, ratings, reviews, rrlink, description, info, instructions } = product;
    const [n, setN] = useState(0);
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
            <div className="xl:flex flex flex-col border-2 p-8 rounded-3xl mb-4 min-w-3/4 w-fit items-center">
                <div className="flex h-auto xl:w-[50vw] w-[70vw] mx-auto justify-around">
                    <div className=" min-w-[20%] max-w-[20%] h-[700px] flex-col overflow-y-auto rounded-2xl">
                        {images.map((image, i) => (
                            <div className="mt-[10%] w-[100%] cursor-pointer" key={i} onMouseOver={() => { setN(i) }}>
                                <img src={image} alt={name} className="rounded-xl p-1 shadow-lg border" />
                            </div>
                        ))}
                    </div>
                    <div className="border-2 rounded-3xl min-h-[400px]  shadow-orange/80 shadow-lg">
                        <div className="border-b-2 rounded-2xl">
                            <div className="max-w-[100%]">
                                <img src={images[`${n}`]} alt={name} className="rounded-t-2xl h-[50vh] w-[50vh]" />
                            </div>
                            <h1 className="text-center font-bold text-3xl mt-4 mb-4">{name}</h1>
                        </div>
                        <div className="flex mt-4 items-center justify-center ">
                            <h3 className="text-green-600 font-bold text-3xl"> &#8377;{details.price} <span className="text-2xl">only</span></h3>
                            <p className="mx-2 text-gray-600">( {Math.floor((details.price2 - details.price) * 100 / details.price2)}% OFF )</p>

                        </div>
                        <div className="flex justify-center mt-4 mb-4">
                            <span>{starrs()}</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* BUY NOW PART */}
            <div className="border-2 flex-center rounded-3xl py-4 m-2 mb-4 px-20 gap-4">
                <Link to="/checkout" className="flex-center p-8 py-6 bg-green-500 hover:scale-105 transition-all text-gray-50 rounded-3xl">
                    <h1 className="text-2xl mr-4">Buy Now! </h1>
                    <img src={tick} alt="BUY" className="h-8 w-8" />
                </Link>
                <Link to="/cart" className="flex-center p-8 py-6 bg-yellow-500 rounded-3xl hover:scale-105 transition-all">
                    <h1 className="text-2xl mr-4">Add to Cart </h1>
                    <img src={cartadd} alt="BUY" className="h-8 w-8" />
                </Link>
                <Link to="/" ><button className="bg-green-600 py-6 text-white p-2 rounded-2xl hover:scale-90 transition-all">Go Back</button></Link>

            </div>


            {/* PRODUCT DETAILS PART */}
            <div className=" border-2 w-[80vw] mx-auto rounded-2xl p-2">
                <div className="flex-col items-center ml-4">
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
                        <img src={forward} alt="" className="h-6 w-6 m-2  hover:scale-150 transition-all" />
                    </Link>

                </div>
                <div className="border-t-2 p-2">
                    <h2 className="text-gray-700 text-2xl font-bold ml-2">Product Description</h2>
                    <h2 className="text-gray-700 text-xl p-2">{description}</h2>
                    <h1 className="text-3xl font-bold mb-4 ml-2">Product Details</h1>
                    <div className="md:flex justify-around gap-4 ml-2">
                        <div className="flex-col">
                            <h2 className=" text-gray-700 text-xl font-bold ">Quantity : <span className="text-brown text-xl">{details.weight}</span></h2>
                            <h2 className=" text-gray-700 text-xl font-bold ">Packaging: <span className="text-brown text-xl">{details.packaging}</span></h2>
                            <h2 className=" text-gray-700 text-xl font-bold ">Life: <span className="text-brown text-xl">{details.life}</span></h2>
                        </div>
                        <div className="flex-col mx-8">
                            <h2 className="text-xl font-bold ">Ingredients: </h2>
                            <p className="text-gray-600 mr-4">{details.ingredients}</p>
                        </div>
                    </div>
                    {instructions && <div className="p-2 rounded-2xl mt-4">
                        <h2 className="text-2xl font-bold text-brown">Instructions</h2>
                        <h4 className="text-gray-600">{instructions}</h4>
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
                            <input type="text" className="border-2 p-1 m-2 rounded-lg " ref={ref} value={pinc} onChange={() => { setPincode(ref.current.value) }} />
                            <button className={`text-xl bg-green-700 text-white px-2 py-1 rounded-2xl  ${valid() ? '' : 'hidden'}`} onClick={submitPincode}>SUBMIT</button>
                            <button className="text-2xl bg-gray-200 text-black px-4 py-1 ml-4 rounded-2xl font-bold" onClick={() => { setPincode(''); setVisible(false) }}>X</button>
                        </div>


                        <div className={`${!valid() ? 'flex' : 'hidden'} items-center ml-4`}>
                            <h2 className="font-bold mr-4 text-red-600">{pincode.length!==6 ? 'Length of Pincode should must be 6 ' : "Pincode should contain only numeric values"}</h2>
                            <img src={error} alt="error" className="rounded-full h-4 w-4 animate-ping" />
                        </div>
                    </div>
                </div>

                <div className={`${!loader && 'hidden'} flex justify-center`}>
                    <img src={loaderSpinner} alt="WAIT..." className="h-16 w-16"/>
                </div>

                <div className={`${visible ? 'flex flex-col' : 'hidden'} ml-8 items-center`}>
                    <div className={`${!deliverable && 'hidden'}`}>
                    <div className="flex">
                    <img src={bolt} alt="bolt" className="h-8 w-8" />
                    <h2 className="font-bold ml-2 flex items-center">Faster Delivery by 10 PM, within <span className="text-blue-600 text-xl mx-1">{Math.floor(Math.random()*4)+2}</span> days</h2>
                    </div>
                    <h2>Deliver to {address.city}, {address.district}, {address.state}</h2>
                    </div>
                    <div className={`${deliverable && 'hidden'}`}>
                        <h2 className="font-bold text-red-600">Sorry! We don't deliver to this location at this moment.</h2>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Product
