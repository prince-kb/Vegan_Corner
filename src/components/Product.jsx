import { useParams } from "react-router-dom"
import catalogue from "../constants/Catalogue";
import { useState } from "react";
import nostar from "../assets/svgs/nostar.svg";
import fullstar from "../assets/svgs/fullstar.svg";
import halfstar from "../assets/svgs/halfstar.svg";

const Product = () => {
    const { id } = useParams();

    const product = catalogue.find((item) => item.id === parseInt(id));
    const { name, details, images, stars } = product;
    const [n, setN] = useState(0);
    const starrs = () => {
        return <div className="flex items-center">
            <h2 className="font-bold text-[1.3em] mr-4">Rating: </h2>
            <img src={stars - 1 <= 0 ? stars - 1 > (-1) ? halfstar : nostar : fullstar} alt="star" className="h-6 w-6" />
            <img src={stars - 2 <= 0 ? stars - 2 > (-1) ? halfstar : nostar : fullstar} alt="star" className="h-6 w-6" />
            <img src={stars - 3 <= 0 ? stars - 3 > (-1) ? halfstar : nostar : fullstar} alt="star" className="h-6 w-6" />
            <img src={stars - 4 <= 0 ? stars - 4 > (-1) ? halfstar : nostar : fullstar} alt="star" className="h-6 w-6" />
            <img src={stars - 5 <= 0 ? stars - 5 > (-1) ? halfstar : nostar : fullstar} alt="star" className="h-6 w-6" />
            <h2 className="ml-2 font-bold text-[1.1em]"> ({stars})</h2>
        </div>
    }

    return (
        <div className="flex justify-center ">

            <div className="xl:flex mt-8">

                <div className="flex gap-4 h-[60vh] w-[60vh]">
                    <div className=" min-w-[30%] max-w-[30%] flex-col justify-center items-center overflow-y-auto border-2 rounded-2xl">
                        {images.map((image, i) => (
                            <div className="mt-[10%] w-[100%] cursor-pointer" key={i} onMouseOver={() => { setN(i) }}>
                                <img src={image} alt={name} className=" " />
                            </div>
                        ))}
                    </div>
                    <div className="border-2 rounded-2xl">
                        <div className="border-2 rounded-2xl shadow-lg">
                            <img src={images[`${n}`]} alt={name} className=" w-full rounded-t-2xl" />
                            <h1 className="text-center font-bold text-3xl mt-4 mb-4">{name}</h1>
                        </div>
                        <div className="flex mt-4 items-center justify-center">
                            <h3 className="text-green-600 font-bold text-3xl mt-2"> &#8377;{details.price}</h3>
                            <p className="mx-2 line-through text-gray-600">{details.price2}</p>
                            <p className="mx-2 text-xl text-gray-600">{Math.floor(details.price * 100 / details.price2)}% (&#8377;{details.price2 - details.price}) OFF</p>
                        </div>
                        <div className="flex justify-center mt-4">
                            <span>{starrs()}</span>
                        </div>
                    </div>
                </div>


                <div className="flex">
                    
                </div>
            </div>
        </div>
    )
}

export default Product
