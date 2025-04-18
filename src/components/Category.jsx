import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import bolt1 from '../assets/svgs/bolt1.svg';
import { sortLocal } from "../utils/sortRandom";

const Category = (props) => {
    const navigate = useNavigate();
    const catalogue = useSelector(state => state.catalogue.Catalogue)
    const user = useSelector(state => state.user.user)
    const [all, setAll] = useState(catalogue && catalogue.length > 0 && catalogue.filter(item => item.type === props.type))

    useEffect(() => {
        if (props.type === 'recent') {
            if (user && catalogue?.length > 0) {
                let p = [];
                if(!user || !user.frequentItems) return;
                user?.frequentItems?.map((item) => {
                    catalogue.reduce((x, y) => {
                        if (x.id === item.id) p.push(x)
                        return y
                    })
                })
                setAll(p.reverse());
            }
        }
        else if (props.type === 'recentProducts') {
            if (user && catalogue?.length > 0) {
                let p = [];
                if(!user || !user.frequentItems) return;
                user?.frequentItems?.map((item) => {
                    catalogue.reduce((x, y) => {
                        if (x.id === item.id) p.push(x)
                        return y
                    })
                })
                p=p.reverse().slice(1,9);
                setAll(p);
            }
        }
        else if (props.type === "type" && props.product) {
            let prods = new Set();
            for (let t in props.product.tag)
                for (let p in catalogue)
                    for (let z in catalogue[p].tag) if (catalogue[p].tag[z] === props.product.tag[t] && catalogue[p].id !== props.product.id) prods.add(catalogue[p])
            setAll(sortLocal(Array.from(prods).slice(0, 9)))
        }
        else setAll(catalogue?.length > 0 && sortLocal(catalogue.filter(item => item.type === props.type)))
    },[catalogue, user, props.type, props.product])

    return (
        all && all.length > 0 &&
        <div className={`m-4 lg:m-8 mt-12`} >
            <h1 className="font-bold font-bubble text-xl md:text-2xl lg:text-3xl text-brown mb-2 ml-6 lg:ml-8">{props.type === 'recent' ? 'RECENTLY VIEWED' : props.type === "type" ? "SIMILAR PRODUCTS" : props.type.toUpperCase()}</h1>
            <div className={`flex gap-4 overflow-auto pl-2 lg:pl-6`}>
                {all.map((item, i) => (
                    <div onClick={() => {props.type === "type" && scrollTo(0, 0); navigate(`/product/${item.id}`)}} key={i} className="cursor-pointer relative mb-4 min-w-[160px] md:min-w-[200px] lg:min-w-[220px] hover:neu2 border rounded-2xl transition-all shadow-lg flex flex-col items-center justify-around">
                        {/* Priority Part */}
                        <div className="w-full flex justify-end absolute right-2 top-2">
                            {item.offer ? <div className="flex items-center gap-1 bg-green-500 text-white z-[-1] px-2 py-1 animate-bounce rounded-full text-[10px] font-semibold lg:text-sm"><img src={bolt1} alt="S" className="h-3 w-3 md:h-4 md:w-4" />SALE </div>
                                : <div className={`${item.priority >= 3 ? 'bg-violet-500' : item.priority === 2 ? 'bg-orange' : item.priority === 1 ? 'bg-blue-500' : 'bg-red-500'} text-white p-1 md:p-2 rounded-full`}></div>
                            }
                        </div>
                        <h2 className="px-2 text-center font-semibold text-md md:text-xl lg:text-2xl mt-4 lg:mt-6 mb-2">{item.name}</h2>
                        <img src={item.image} alt={item.name} className="max-w-[100%] h-[120px] lg:h-[180px] mb-2 rounded-md" />
                        <hr />
                        <div className="flex mt-2 justify-around w-full">
                            <div className="text-start">
                                <h3 className="text-green-700 font-bold text-md md:text-xl">&#8377;{item.price} </h3>
                                <p className="text-md md:text-lg text-center font-brown font-walto line-through text-gray-600">{item.price2}</p>
                            </div>
                            <div className="text-end flex-col justify-center  text-gray-700">
                                <h2 className="font-medium mr-1">{item.quantity}</h2>
                                <h2 className="text-base md:text-xl font-medium text-center mb-2">{item.rating}<span className="text-sm md:text-base">⭐<span /></span></h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Category



