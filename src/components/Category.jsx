import { Link } from "react-router-dom"
import catalogue from "../constants/Catalogue"

const Category = (props) => {
    const { type } = props;
    return (
        <div className="m-8">
            <h1 className="font-bold text-3xl text-brown my-4 ml-8">{type.toUpperCase()}</h1>
            <div className="flex gap-4 overflow-auto ">
                {catalogue.filter(item => item.type === type).map((item, i) => (
                    <div key={i} className="mb-4 min-h-[300px] h-[380px] max-w-[300px] aspect-video border-2 rounded-3xl shadow-md flex flex-col items-center">
                        <h2 className="text-center font-bold text-[1.2em] my-2">{item.name}</h2>
                        <Link to={`/product/${item.id}`}>
                            <img src={item.images[0]} alt={item.name} className="w-[200px] h-[200px] object-cover mb-2 rounded-2xl" />
                        </Link>
                        <hr/>
                        <div className="flex mx-2 mt-2 gap-2 justify-around">
                            <div className="text-center">
                                <span><h3 className="text-green-500 font-bold text-3xl">&#8377; {item.details.price} </h3><p className="text-lg font-brown font-bold line-through">{item.details.price2}</p></span>
                            </div>
                            <div className="text-center flex-col justify-center">
                                <h2 className="text-[1.1em]">Quantity</h2>
                                <h2 className="text-[1.2em] font-bold">{item.details.weight}</h2>
                            </div>

                        </div>
                        <h2 className="text-2xl text-center font-bold mt-4">{item.stars} ⭐</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Category



