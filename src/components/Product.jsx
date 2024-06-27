import { useParams } from "react-router-dom"
import catalogue from "../constants/Catalogue";
import { useState } from "react";

const Product = () => {
    // const { name, details, images, stars } = props;
    // console.log({item});
    const { id } = useParams();

    const product = catalogue.find((item) => item.id === parseInt(id));
    // console.log(product)
    const { name, details, images, stars } = product;
    const n=()=>{
        return 7;
    }
    return (
        <div className="flex justify-center ">

            <div className="xl:flex mt-8">

                <div className="flex gap-4 h-[60vh] w-[60vh]">
                    <div className=" w-[30%] flex-col justify-center items-center overflow-y-auto border-2 rounded-2xl">
                        {images.map((image, i) => (
                            <div className="mt-[10%] w-[100%]" key={i} >
                                <img src={image} alt={name} className=" " />
                            </div>
                        ))}
                    </div>
                    <div className="border-2 rounded-2xl">
                    <img src={images[1]} alt={name} className=" w-full"/>
                    <h1 className="text-center font-bold text-2xl mt-4">{name}</h1>
                    </div>
                </div>


                <div className="flex">
                    <hr />
                    <div>
                        <div>
                            <span>
                                <h3>&#8377; {details.price} </h3>
                                <p>{details.price2}</p>
                            </span>
                        </div>
                        <div>
                            <h2>Quantity <br /> {details.weight ? details.weight : "1L"}</h2>
                        </div>
                    </div>
                    <h2>{stars} ⭐</h2>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default Product
