import { Link } from "react-router-dom"
import catalogue from "../constants/Catalogue"

const Category = (props) => {
    const { type } = props;
    return (
        <div className="m-8">
            <h1 className="font-bold text-3xl text-brown my-4 ml-8">{type.toUpperCase()}</h1>
            <div className={`flex gap-4 snap-x overflow-auto`}>
                {catalogue.filter(item => item.type === type).map((item, i) => (
                    <div key={i} className="snap-proximity snap-start mb-4 lg:min-w-[260px] min-w-[220px] aspect-video border-2 border-orange hover:border-brown rounded-3xl transition-all shadow-md hover:shadow-md flex flex-col items-center">
                        <h2 className="text-center font-bold text-[1.2em] my-2">{item.name}</h2>
                        <Link to={`/product/${item.id}`} className="flex-center">
                            <img src={item.images[0]} alt={item.name} className="max-w-[90%] h-[180px] mb-2 rounded-2xl" />
                        </Link>
                        <hr />
                        <div className="flex mt-2 justify-around w-full">
                            <div className="text-start">
                                <h3 className="text-green-500 font-bold text-2xl">&#8377; {item.details.price} </h3>
                                <p className="text-lg text-center font-brown font-bold line-through">{item.details.price2}</p>
                            </div>
                            <div className="text-end flex-col justify-center">
                                <h2 className="">Quantity</h2>
                                <h2 className=" font-bold mr-1">{item.details.weight}</h2>
                            </div>

                        </div>
                        <h2 className="text-2xl text-center font-bold mt-4 mb-2">{item.stars} ⭐</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Category



