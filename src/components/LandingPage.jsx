import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateMain } from "../redux/slices/mainSlice";

import Category from "./Category"

const LandingPage = () => {

  const dispatch = useDispatch()
  const [n, setN] = useState(0);
  const [banners, setBanners] = useState([]);
  
  
  useEffect(() => {
    const mainData = async () => {
      try {
        const API = import.meta.env.VITE_REACT_APP_API
        const SERVER_SECRET = import.meta.env.VITE_REACT_APP_SERVER_SECRET
        const response = await fetch(`${API}/api/getcatalogue`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'secret' : SERVER_SECRET
          }
        })
        const data = await response.json();
        dispatch(updateMain(data))
      } catch (err) {
        dispatch(updateMain([]))
        console.log(" Unable to fetch data")
      }
    }
    mainData();
    
    const fetchBanners = async () => {
      try {
        const API = import.meta.env.VITE_REACT_APP_API
        const SERVER_SECRET = import.meta.env.VITE_REACT_APP_SERVER_SECRET
        const response = await fetch(`${API}/api/getbanners`,{
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'secret' : SERVER_SECRET
          }
      })
        const data = await response.json()
        setBanners(data)
      } catch (err) {
        console.log(" Unable to fetch banners data")
      }
    }
    fetchBanners();
  }, [window.onload])

  useEffect(() => {
    const interval = setInterval(() => n === banners.length - 1 ? setN(0) : setN(n + 1), 3000)
    return () => clearInterval(interval);
  },)



  return (
    <div className="">
      <h2 className="text-center font-bold text-xl md:text-2xl xl:text-3xl mx-2 mt-4 font-cav">Only Plant based Products.</h2>
      <h2 className="text-center font-bold text-xl md:text-2xl xl:text-3xl mx-2 font-cav"> Real and Pure.</h2>

      {/* Banner */}
      <div className={`mx-auto mt-4 lg:mt-8 h-[18vh] md:h-[30vh] lg:h-[40vh] xl:w-[50vw] w-[60vw] rounded-3xl bg-green-200 relative flex justify-center items-end`}>
        {banners && banners.length>0 && banners.map((banner, index) => (
          <img src={banners[index]} key={index} alt="Banner" className={` h-full w-[100%] absolute transition-all duration-1000 neu2 ${index === n ? 'z-[2]' : index === (n + 1) % banners.length ? '-translate-x-2 translate-y-2 lg:-translate-x-4 lg:translate-y-4 z-[1]' : '-translate-x-4 translate-y-4 lg:-translate-x-8 lg:translate-y-8 z-[0]'} `} />
        ))}
        <div className="flex z-[2] ">
          <div className="flex mb-2 md:mb-4 lg:mb-6 gap-6 items-center">
            {banners && banners.length>0 && banners.map((banner, index) => (
              <div key={index} className={`${n === index ? "lg:h-6 lg:w-6 h-4 w-4" : "lg:h-4 lg:w-4 h-2 w-2"} rounded-full ${n == index ? "bg-red-200" : "bg-white"} cursor-pointer transition-all`} onClick={() => setN(index)}></div>
            ))}
          </div>
        </div>
      </div>

      <Category type="milk" />
      <Category type="snacks" />
      <Category type="quick foods" />
      <Category type="grocery" />
      <Category type="munchies" />


    </div>
  )

}

export default LandingPage
