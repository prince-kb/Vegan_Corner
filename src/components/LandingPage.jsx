import { Link } from "react-router-dom"
import catalogue from "../constants/Catalogue"

const LandingPage = () => {

  return (
    <div className="">
      <h2 className="text-center mt-4 font-bold text-2xl font-cav">Only Plant based Products. Real and Pure.</h2>
        <div className={`mx-auto bg-[url('https://img.freepik.com/free-vector/green-sale-banner_1017-7937.jpg')] mt-12 h-[40vh] w-[70vw] rounded-3xl flex justify-center items-end`}>
            <div className="flex">
                <div className="flex mb-6 gap-6">
                <div className="rounded-full w-[10px] h-[10px] bg-white"></div>
                <div className="rounded-full w-[10px] h-[10px] bg-white"></div>
                <div className="rounded-full w-[10px] h-[10px] bg-white"></div>
                </div>

            </div>
        </div>

        <div className="flex justify-center m-8">
            <div className="flex gap-4 overflow-auto">
              {catalogue.map((item,i) => (
                <div key={i} className="h-[400px] max-w-[300px] aspect-video border-2 rounded-3xl shadow-md">
                  <h2 className="text-center font-bold text-[1.2em]">{item.name}</h2>
                  <Link to={`/product/${item.id}`}>
                    <img src={item.images[0]} alt={item.name} className="w-full h-[200px] object-cover" />
                  </Link>
                  <hr />
                  <div className="flex mx-2 mt-2 gap-2 justify-around">
                    <div className="text-center">
                      <span><h3 className="text-green-500 font-bold text-3xl">&#8377; {item.details.price} </h3><p className="text-lg font-brown font-bold line-through">{item.details.price2}</p></span>
                    </div>
                    <div className="font-bold text-[1.1em] text-center flex-col justify-center">
                      <h2>Quantity <br /> {item.details.weight}</h2>
                      {/* <h2>By : {item.seller}</h2> */}
                    </div>
                    
                  </div>
                  <h2 className="text-2xl text-center font-bold mt-4">{item.stars} ⭐</h2>

                  
                </div>
              ))
              }
            </div>
            </div>



    </div>
  )

}

export default LandingPage
