import { Link, useParams } from "react-router-dom"
import { useState } from "react";

import Cart from "./Cart";
import CheckOut from "./CheckOut";

import catalogue from "../constants/Catalogue";
import nostar from "../assets/svgs/nostar.svg";
import fullstar from "../assets/svgs/fullstar.svg";
import halfstar from "../assets/svgs/halfstar.svg";
import forward from "../assets/svgs/forward.svg";
import cartadd from "../assets/svgs/cartadd.svg";
import tick from "../assets/svgs/tick.svg";

const Product = () => {
    const { id } = useParams();

    const product = catalogue.find((item) => item.id === parseInt(id));
    const { name, details, images, stars, seller, ratings, reviews, rrlink,description,info,instructions } = product;
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

            <div className="border-2 flex-center rounded-3xl py-4 m-2 mb-4 px-20 gap-4">
                <Link to="/checkout" className="flex-center p-8 py-6 bg-green-500 text-gray-50 rounded-3xl">
                    <h1 className="text-2xl mr-4">Buy Now! </h1>
                    <img src={tick} alt="BUY" className="h-8 w-8"/>
                </Link>
                <Link to="/cart" className="flex-center p-8 py-6 bg-yellow-500 rounded-3xl">
                    <h1 className="text-2xl mr-4">Add to Cart </h1>
                    <img src={cartadd} alt="BUY" className="h-8 w-8"/>
                </Link>
                <Link to="/" ><button className="bg-green-600 py-6 text-white p-2 rounded-2xl">Go Back</button></Link>

            </div>

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
                    <p className="">{starrs()}</p>
                    <Link to={rrlink} className="mb-4 mt-1 flex items-center hover:translate-x-2 hover:scale-105">
                        <span className="text-gray-100  bg-green-600 font-bold p-1 rounded-xl">View {ratings} Ratings and {reviews} Reviews</span>
                        <img src={forward} alt="" className="h-6 w-6 m-2  hover:scale-150" />
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
                        <h2 className="text-2xl font-bold text-brown">Instructions to prepare</h2>
                        <h4 className="text-gray-600">{instructions}</h4>
                    </div>}
                </div>
            </div>

        </div>
    )
}

export default Product
