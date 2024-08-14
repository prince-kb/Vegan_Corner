import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMain } from "../redux/slices/mainSlice";

import Category from "./Category"
import gsap from "gsap";

const LandingPage = () => {

  const ref = useRef(null);
  const dispatch = useDispatch()
  
  // const [category, setCategory] = useState(useSelector(state => state.home.home))
  const [n, setN] = useState(0);
  const [banners, setBanners] = useState([]);
  const [x1, setX1] = useState(0) //To hold the value of touch start

  const startAnim2 = gsap.timeline({});
  
  useEffect(() => {
    startAnim2.from('.bannerss', { scale : 0, translateX : "-100%",translateY : "100%",opacity:0, duration: 1,delay: 0.5, ease: 'power2.out' })
    startAnim2.from('.intro', { y: '70', duration: 1,delay:0.7,opacity : 0, ease: 'power2.out' })
    gsap.from('#categories', { y: '70vh',opacity:0.5, duration: 1,delay:0 })
  }, [window.onload])

  useEffect(() => {
    const mainData = async () => {
      try {
        const API = import.meta.env.VITE_REACT_APP_API
        const SERVER_SECRET = import.meta.env.VITE_REACT_APP_SERVER_SECRET
        const response = await fetch(`${API}/api/getcatalogue`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'secret': SERVER_SECRET
          }
        })
        const data = await response.json();
        dispatch(updateMain(data))
      } catch (err) {
        dispatch(updateMain([]))
        console.log(" Unable to fetch data")
      }
    }

    const fetchBanners = async () => {
      try {
        const API = import.meta.env.VITE_REACT_APP_API
        const SERVER_SECRET = import.meta.env.VITE_REACT_APP_SERVER_SECRET
        const response = await fetch(`${API}/api/getbanners`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'secret': SERVER_SECRET
          }
        })
        const data = await response.json()
        setBanners(data)
      } catch (err) {
        console.log(" Unable to fetch banners data")
      }
    }
    mainData();
    fetchBanners();
  }, [window.onload])

  useEffect(() => {
    const interval = setInterval(() => n === banners.length - 1 ? setN(0) : setN(n + 1), 3500)
    return () => clearInterval(interval);
  })

  useEffect(() => {
    let x;
    ref.current.addEventListener('touchend', e => {
      x = e.changedTouches[0].clientX;
      if (x1 && x) {
        if (x1 > x) setN(n === banners.length - 1 ? 0 : n + 1)
        else setN(n === 0 ? banners.length - 1 : n - 1)
      }
      setX1(0);
    })

    return ref.current.removeEventListener('touchend', e => {
      x = e.changedTouches[0].clientX;
      if (x1 && x) {
        if (x1 > x) setN(n === banners.length - 1 ? 0 : n + 1)
        else setN(n === 0 ? banners.length - 1 : n - 1)
      }
      setX1(0);
    })
  })

  return (
    <div className=" hover:love" ref={ref}  >
      <h2 className="intro text-center font-bold text-base md:text-xl tracking-tighter md:tracking-normal xl:text-2xl mx-2 mt-4 font-cav">Only Plant based Products.</h2>
      <h2 className="intro text-center font-bold text-base md:text-xl tracking-tighter md:tracking-normal xl:text-2xl mx-2 font-cav"> Real and Pure.</h2>

      {/* Banner */}
      <div onTouchStart={e => { setX1(e.changedTouches[0].clientX) }} className={`z-[2] bannerss mx-auto mt-4 lg:mt-8 h-[18vh] md:h-[30vh] lg:h-[40vh] xl:w-[40vw] w-[60vw] rounded-3xl lg:rounded-3xl bg-green-200 relative flex justify-center items-end`}>
        {banners && banners.length > 0 && banners.map((banner, index) => (
          <img src={banners[index]} key={index} alt="Banner" className={` h-full w-[100%] absolute transition-all duration-500 neu2 border-l-4 lg:border-b-8 lg:border-l-8 border-b-4 border-green-800 ${index === n ? ' z-[2]' : index === (n + 1) % banners.length ? ' -translate-x-2 translate-y-2 lg:-translate-x-4 lg:translate-y-4 z-[1] ' : '-translate-x-4 translate-y-4 lg:-translate-x-8 lg:translate-y-8 z-[0]'} `} />
        ))}
        <div className="flex z-[2] ">
          <div className="flex mb-2 md:mb-4 lg:mb-6 gap-3 md:gap-4 lg:gap-6 items-center">
            {banners && banners.length > 0 && banners.map((banner, index) => (
              <div key={index} className={`${n === index ? "lg:h-6 lg:w-6 md:w-4 md:h-4 h-2 w-2" : "lg:h-4 lg:w-4 md:h-2 md:w-2 h-1 w-1"} rounded-full ${n == index ? "bg-orange" : "bg-brown"} cursor-pointer transition-all`} onClick={() => setN(index)}></div>
            ))}
          </div>
        </div>
      </div>

      <div id="categories">
      <Category type="milk" />
      <Category type="snacks" />
      <Category type="quick foods" />
      <Category type="grocery" />
      <Category type="munchies" />
      </div>


    </div>
  )

}

export default LandingPage
