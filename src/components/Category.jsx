import { Link } from "react-router-dom"
import catalogue from "../constants/Catalogue"
import bolt1 from '../assets/svgs/bolt1.svg'

const Category = (props) => {
    const { type } = props;
    return (
        <div className={`m-4 lg:m-8 mt-8 ${!catalogue.length && 'hidden'}`}>
            <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-brown mb-2 ml-6 lg:ml-8">{type.toUpperCase()}</h1>
            <div className={`flex gap-4 overflow-auto pl-2 lg:pl-6`}>
                {catalogue.filter(item => item.type === type).map((item, i) => (
                    <div key={i} className="relative mb-4 min-w-[160px] md:min-w-[200px] lg:min-w-[240px] hover:neu2 border rounded-2xl transition-all shadow-lg flex flex-col items-center">

                        {/* Priority Part */}
                        <div className="w-full flex justify-end absolute right-2 top-2">
                            {item.offer ? <div className="flex items-center gap-1 bg-green-500 text-white z-[-1] px-2 py-1 animate-bounce rounded-full text-[10px] lg:text-sm"><img src={bolt1} alt="S" className="h-4 w-4" />SALE </div>
                                : <div className={`${item.priority>=3 ? 'bg-violet-500' : item.priority===2 ? 'bg-orange' : item.priority===1 ? 'bg-blue-500' : 'bg-red-500'} text-white p-1 md:p-2 rounded-full`}></div>
                            }

                        </div>

                        <h2 className="lg:px-2 text-center font-bold text-md md:text-xl lg:text-2xl mt-4 lg:mt-6 mb-2">{item.name}</h2>
                        <Link to={`/product/${item.id}`} className="flex-center">
                            <img src={item.images[0]} alt={item.name} className="max-w-[90%] h-[120px] lg:h-[180px] mb-2 rounded-2xl" />
                        </Link>
                        <hr />
                        <div className="flex mt-2 justify-around w-full">
                            <div className="text-start">
                                <h3 className="text-green-500 font-bold text-xl md:text-2xl">&#8377; {item.details.price} </h3>
                                <p className="text-md md:text-lg text-center font-brown font-bold line-through">{item.details.price2}</p>
                            </div>
                            <div className="text-end flex-col justify-center">
                                <h2 className="">Quantity</h2>
                                <h2 className=" font-bold mr-1">{item.details.weight}</h2>
                            </div>

                        </div>
                        <h2 className="text-xl md:text-2xl text-center font-bold mt-4 mb-2">{item.stars} ⭐</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Category



