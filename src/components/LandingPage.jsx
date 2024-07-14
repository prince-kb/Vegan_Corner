import { useEffect, useState } from "react";
import Category from "./Category"
import { useDispatch } from "react-redux";
import { updateMain } from "../redux/slices/mainSlice";

const LandingPage = () => {
  
  const dispatch = useDispatch()
  const [n, setN] = useState(0);
  const [banners, setBanners] = useState(["https://img.freepik.com/free-vector/green-sale-banner_1017-7937.jpg"]);


  useEffect(() => {
    const mainData = async () => {
      try {
        const response = await fetch('http://localhost:8010/api/getallproducts')
        const data = await response.json()
        // console.log(data)
        dispatch(updateMain(data))
      } catch (err) {
        dispatch(updateMain([]))
        console.log(err, " Unable to fetch data")
      }
    }
    mainData();

    const fetchBanners = async () => {
      try {
        const response = await fetch('http://localhost:8010/api/getbanners')
        const data = await response.json()
        setBanners(data)
        setN(0)
      } catch (err) {
        console.log(err, " Unable to fetch banners data")
      }
    }
    fetchBanners();

  }, [])

  useEffect(() => {
    const interval = setInterval(() => n === banners.length - 1 ? setN(0) : setN(n + 1), 3000)
    return () => clearInterval(interval);
  }, [n])


  return (
    <div className="">
      <h2 className="text-center font-bold text-xl md:text-2xl xl:text-3xl mx-2 mt-4 font-cav">Only Plant based Products.</h2>
      <h2 className="text-center font-bold text-xl md:text-2xl xl:text-3xl mx-2 font-cav"> Real and Pure.</h2>

      {/* Banner */}
      <div className={`mx-auto mt-4 lg:mt-8 h-[18vh] md:h-[30vh] lg:h-[40vh] xl:w-[50vw] w-[60vw] rounded-3xl bg-green-200 relative flex justify-center items-end`}>
        {banners.map((banner, index) => (
          <img src={banners[index]} key={index} alt="Banner" className={`h-full w-[100%] absolute transition-all duration-1000 neu2 ${index === n ? 'z-[2]' : index === (n + 1) % banners.length ? '-translate-x-2 translate-y-2 lg:-translate-x-4 lg:translate-y-4 z-[1]' : '-translate-x-4 translate-y-4 lg:-translate-x-8 lg:translate-y-8 z-[0]'} `} />
        ))}
        <div className="flex z-[2] ">
          <div className="flex mb-2 md:mb-4 lg:mb-6 gap-6 items-center">
            {banners.map((banner, index) => (
              <div key={index} className={`${n === index ? "lg:h-6 lg:w-6 h-4 w-4" : "lg:h-4 lg:w-4 h-2 w-2"} rounded-full ${n == index ? "bg-red-200" : "bg-white"} cursor-pointer transition-all`} onClick={() => setN(index)}></div>
            ))}
          </div>

        </div>
      </div>

      <Category type="milk" />
      <Category type="snacks" />
      <Category type="instant foods" />
      <Category type="grocery" />
      <Category type="munchies" />


    </div>
  )

}

export default LandingPage
