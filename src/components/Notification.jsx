import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification,deleteNotification } from '../redux/slices/notificationSlice'
import gsap from 'gsap'

import heart from "../assets/svgs/heart2.svg"
import brokenheart from "../assets/svgs/brokenheart.svg"
import tick from "../assets/svgs/tick1.svg"
import error from "../assets/svgs/error.svg"
import cart from "../assets/svgs/cartadd.svg"
import user from "../assets/svgs/navbar/user.svg"

const Notification = () => {

    const dispatch = useDispatch();
    const state = useSelector((state) => state.notification);

    useEffect(() => {
        if(state.length === 0) return;
        else if(state.length > 3)
            dispatch(deleteNotification());
        else setTimeout(() => {
            dispatch(deleteNotification())
        }, 5000)
    }, [state.length])

    useEffect(() => {
        state.length>0 && gsap.from(`.noti${state.length-1}`, { y: 100, duration: 1, ease: "power2.in" })
    },[state.length])

    return (
        state.length>0 && <div className='fixed z-[10] top-[2%] left-[50%] w-2/3 md:w-fit'>
            {state.map((i, index) => {
                const {message,type,logo} = i;
                return <div key={index} className={`noti${index} -translate-x-1/2 my-2 md:my-4 h-[50px] backdrop-blur-lg flex-center rounded-2xl px-2 py-1 md:px-4 md:py-2 shadow-md ${type === "error" ? "shadow-red-500" : type === "warning" ? "shadow-yellow-500" : type === "none" ? "shadow-blue-500" : "shadow-green-500"}`}>
                <div className={`h-12 rounded-full flex-center `}>
                    <img src={logo === 'heart' ? heart : logo === 'brokenheart' ? brokenheart : logo === 'tick' ? tick : logo === 'error' ? error : logo === 'cart' ? cart : user} alt="logo" className='h-8 md:h-10 lg:h-12' />
                </div>
                <p className='tracking-tighter md:tracking-normal text-black font-semibold ml-2 '>{message}</p>
            </div>
            }
        )}
        </div>
    )
}

export default Notification
