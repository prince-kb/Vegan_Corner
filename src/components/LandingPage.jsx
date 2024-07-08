import { useEffect, useState } from "react";
import Category from "./Category"

const LandingPage = () => {

  const banners = ["https://img.freepik.com/free-vector/green-sale-banner_1017-7937.jpg", "https://www.shutterstock.com/image-vector/mega-sale-special-offer-neon-260nw-2175745107.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTNagSLVyW8PtNv_hPkH8KAoice3KwjVSkVQ&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHisXpd0L1vyKCFgg4guL8NA4UZLuFgb639A&s"];

  const [n, setN] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => n===banners.length-1 ? setN(0) : setN(n+1), 3000)
    return () => clearInterval(interval);
  }, [n])


  return (
    <div className="">
      <h2 className="text-center font-bold text-3xl my-6 font-cav">Only Plant based Products. Real and Pure.</h2>

      {/* Banner */}
      <div className={`mx-auto mt-12 h-[40vh] xl:w-[50vw] w-[80vw] rounded-3xl bg-red-200 relative flex justify-center items-end`}>
        <img src={banners[n]} alt="Banner" className="h-full rounded-2xl w-[100%] absolute ease-in duration-1000" />
        <div className="flex z-[2] ">
          <div className="flex mb-6 gap-6 items-center">
            {banners.map((banner, index) => (
              <div key={index} className={`${n===index? "h-6 w-6" : "h-4 w-4"} rounded-full ${n==index?"bg-red-100":"bg-gray-100"} cursor-pointer transition-all`} onClick={()=>setN(index)}></div>
            ))}
          </div>

        </div>
      </div>

      <Category type="milk" />
      <Category type="snacks" />
      <Category type="instant foods" />
      <Category type="grocery" />


    </div>
  )

}

export default LandingPage
