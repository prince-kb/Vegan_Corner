import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { setNotification } from '../redux/slices/notificationSlice';
import { updateUser } from '../redux/slices/userSlice';
import error from "../assets/svgs/error.svg"
import tick1 from "../assets/svgs/tick1.svg"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { config } from '../lib/config';

const MyOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderId = useParams().id;
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(0);
  const user = useSelector(state => state.user.user);
  const catalogue = useSelector(state => state.catalogue.Catalogue)

  useGSAP(() => {
    if (order && orderId && catalogue)
      gsap.from("#line1", { duration: 3, width: 0, ease: 'power4.out', delay: 1 })
  }, [user, orderId])

  useEffect(() => {
    if (user) setOrder(user?.orders?.find((item) => item.orderId === orderId))
  }, [user, orderId])

  useEffect(() => {
    const st = order?.status?.toLowerCase();
    if (st) {
      if (st === 'processing') setStatus(0);
      else if (st === 'processed') setStatus(1);
      else if (st === 'in transit') setStatus(2);
      else if (st === 'dispatched') setStatus(3);
      else if (st === 'shipped') setStatus(4);
      else if (st === 'out for delivery') setStatus(5);
      else if (st === 'delivered') setStatus(6);
      else setStatus(7);
    }
  }, [order])

  const showDate = (da) => {
    return new Date(new Date(da).getTime()).toString().slice(0, 16);
  }

  const showTime = (da) => {
    const d = new Date(da);
    const x = d.toLocaleString();
    return x.slice(x.length - 11, x.length - 6) + ' ' + x.slice(x.length - 2);
  }

  const deliveryDate = (date) => {
    return new Date(new Date(date).getTime() + 60 * 60 * 72 * 1000).toString().slice(0, 16);
  }

  const cancelOrder = async () => {
    console.log(orderId)
    const API = config.server;
    const SERVER_SECRET = config.serverSecret;
    const token = localStorage.getItem('authy');
    const response = await fetch(`${API}/api/user/cancelorder`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'secret': SERVER_SECRET,
        'authToken': token
      },
      body: JSON.stringify({ orderId: orderId })
    })

    const data = await response.json();
    if (data.success) {
      dispatch(setNotification({ message: data.message, type: "success", logo: "heart" }));
      navigate('/orders');
      dispatch(updateUser());
    }
    else {
      dispatch(setNotification({ message: data.message, type: "error", logo: "brokenHeart" }));
      console.log("Order not cancelled")
    }
  }

  return (
    !order ? <div className='mt-10'>
      <h1 className="font-bold font-bubble text-2xl md:text-3xl lg:text-4xl text-brown ml-6 lg:ml-8 tracking-widest text-center my-4 mb-8">Order not found!</h1>
      <h2 className="font-bold font-bubble text-xl md:text-2xl lg:text-3xl text-orange mb-2 ml-6 lg:ml-8 tracking-widest text-center">Order details unavailable!</h2>
    </div> :
      <div className='flex-center flex-col mt-10 mb-4'>
        <h1 className='text-center text-xl md:text-2xl my-4 font-semibold'>Order #{order.orderId}</h1>
        <div className='w-[90vw] py-4 rounded-xl  '>

          {/* Order details */}
          <div className=' md:ml-3 mb-4 w-full flex flex-col justify-center md:justify-around items-center  border rounded-2xl py-3'>

            <div className='flex mx-2 gap-2 overflow-auto w-full px-2'>
              {catalogue.length && order?.orderList?.map((item) => {
                const product = catalogue.find((product) => product.id === item.id);
                return (
                  <div onClick={() => navigate(`/product/${product.id}`)} key={product.id} className='mb-3 mx-auto cursor-pointer border relative px-1 w-[240px] min-w-[160px] md:min-w-[200px] lg:min-w-[240px] hover:neu2 rounded-2xl transition-all shadow-lg flex flex-col items-center justify-around'>
                    <div className=' py-2 md:py-4 rounded-xl'>
                      <h2 className='sub-heading mb-2'>{product?.name}</h2>
                      <div className='flex-col flex-center md:flex-row'>
                        <img src={product?.image} alt={product?.name} className='max-w-[100%] h-[120px] lg:h-[180px] mb-2 rounded-md' />
                      </div>
                    </div>
                    <div className='text-xl md:text-2xl text-brown font-bold mb-2'>x {item.quantity}</div>
                  </div>
                )
              })
              }
            </div>

            <div className='text-center md:ml-3 mb-4 w-full flex flex-col justify-center md:flex-row md:justify-around items-center'>
              <div>
                <h2 className='md:text-xl text-center text-orange font-semibold mt-4'>
                  Total Price: <span className='text-green-600 font-bold'>&#8377; {order.totalPrice}</span>
                  {order.deliveryCharges >= 0 && <span className='text-sm md:text-base font-medium ml-3'>
                    <span className='text-brown'>(Delivery :
                      <span className='text-green-600 font-bold'>&#8377; {order.deliveryCharges} </span>
                      included)
                    </span>
                  </span>}
                </h2>
                <h2 className='mt-2 md:text-xl text-orange font-semibold'>Ordered on: <span className='text-brown font-'>{showDate(order.date)} at {showTime(order.date)}</span></h2>
              </div>

              <div className='mt-2 lg:mt-4'>
                <h2 className='md:text-xl text-orange font-semibold'>Payment mode: <span className=' text-brown'>{order.method === 'COD' ? 'Cash on Delivery' : order.method === 'UPI' ? 'UPI' : order.method + ' CARD'}</span></h2>
                <h2 className='md:text-xl text-orange font-semibold mt-2'>Order Status : <span className=' text-brown'>{order.status.toUpperCase()}</span></h2>
              </div>
            </div>
          </div>

          {/* Delivery */}
          <div className='relative'>
            <h2 className='sub-heading'>Delivery to</h2>
            <div className='flex flex-col gap-2 mx-4 border py-6 rounded-3xl px-4 mt-0 mb-8 paratext'>
              <div className='md:flex md:gap-2'>
                <h3>{user?.name}, </h3>
                <h3>{user?.mobile}</h3>
              </div>
              <div className='md:flex md:gap-4'>
                <h3>Address:</h3>
                <h3>{user?.address?.line1}, {user?.address?.line2},</h3>
              </div>
              <div className='md:flex md:gap-2 '>
                <h3>{user?.address?.city}, {user?.address?.state}</h3>
                <h3>{user?.address?.pincode}</h3>
              </div>
              {status < 7 && <div className='text-sm absolute bottom-0 right-0 -translate-x-full -translate-y-full font-bold bg-orange md:px-2 md:py-1 px-1 rounded-md hover:bg-brown hover:text-white transition-all cursor-pointer'>CHANGE</div>}
            </div>
          </div>

          {/* Order Status */}
          <h2 className='sub-heading'>Order Status</h2>
          <div className='border p-4 m-4 mt-0 rounded-2xl'>
            {status !== 7 && <div id="line1" className={`mx-2 hidden md:block h-6 mb-4 bg-green-200 rounded-xl absolute z-[0] ${status === 0 ? 'w-[7%]' : status === 1 ? 'w-[21%]' : status === 2 ? 'w-[35%]' : status === 3 ? 'w-[45%]' : status === 4 ? 'w-[56%]' : status === 5 ? 'w-[68%]' : 'w-[80%]'} `} />}
            {status === 7 ? <div className='mx-auto'>
              <h2 className='text-xl text-center text-brown font-bold'>Order is cancelled by the user. ❌</h2>
            </div> :
              <div className='flex flex-col gap-3 md:gap-0 md:flex-row justify-between '>

                <div className='md:items-center ml-[20vw] md:ml-0 flex md:flex-col md:w-[14%] gap-4 z-[1]'>
                  <div className={` ${status === 0 && 'animate-ping'} h-4 w-4 md:h-6 md:w-6 rounded-full border border-black flex-center`}><div className={` bg-orange                                   h-2 w-2 md:h-4 md:w-4 rounded-full`}></div></div>
                  <h2 className='text-center text-sm md:text-lg lg:text-xl'>Order processing</h2>
                </div>
                <div className='md:items-center ml-[20vw] md:ml-0 flex md:flex-col md:w-[14%] gap-4 z-[1]'>
                  <div className={` ${status === 1 && 'animate-ping'} h-4 w-4 md:h-6 md:w-6 rounded-full border border-black flex-center`}><div className={` ${status >= 1 ? 'bg-orange' : 'bg-brown'} h-2 w-2 md:h-4 md:w-4 rounded-full`}></div></div>
                  <h2 className='text-center text-sm md:text-lg lg:text-xl'>Processed</h2>
                </div>
                <div className='md:items-center ml-[20vw] md:ml-0 flex md:flex-col md:w-[14%] gap-4 z-[1]'>
                  <div className={` ${status === 2 && 'animate-ping'} h-4 w-4 md:h-6 md:w-6 rounded-full border border-black flex-center`}><div className={` ${status >= 2 ? 'bg-orange' : 'bg-brown'} h-2 w-2 md:h-4 md:w-4 rounded-full`}></div></div>
                  <h2 className='text-center text-sm md:text-lg lg:text-xl'>In transit</h2>
                </div>
                <div className='md:items-center ml-[20vw] md:ml-0 flex md:flex-col md:w-[14%] gap-4 z-[1]'>
                  <div className={` ${status === 3 && 'animate-ping'} h-4 w-4 md:h-6 md:w-6 rounded-full border border-black flex-center`}><div className={` ${status >= 3 ? 'bg-orange' : 'bg-brown'} h-2 w-2 md:h-4 md:w-4 rounded-full`}></div></div>
                  <h2 className='text-center text-sm md:text-lg lg:text-xl'>Dispatched</h2>
                </div>
                <div className='md:items-center ml-[20vw] md:ml-0 flex md:flex-col md:w-[14%] gap-4 z-[1]'>
                  <div className={` ${status === 4 && 'animate-ping'} h-4 w-4 md:h-6 md:w-6 rounded-full border border-black flex-center`}><div className={` ${status >= 4 ? 'bg-orange' : 'bg-brown'} h-2 w-2 md:h-4 md:w-4 rounded-full`}></div></div>
                  <h2 className='text-center text-sm md:text-lg lg:text-xl'>Shipped</h2>
                </div>
                <div className='md:items-center ml-[20vw] md:ml-0 flex md:flex-col md:w-[14%] gap-4 z-[1]'>
                  <div className={` ${status === 5 && 'animate-ping'} h-4 w-4 md:h-6 md:w-6 rounded-full border border-black flex-center`}><div className={` ${status >= 5 ? 'bg-orange' : 'bg-brown'} h-2 w-2 md:h-4 md:w-4 rounded-full`}></div></div>
                  <h2 className='text-center text-sm md:text-lg lg:text-xl'>Out for delivery</h2>
                </div>
                <div className='md:items-center ml-[20vw] md:ml-0 flex md:flex-col md:w-[14%] gap-4 z-[1]'>
                  <div className={` ${status === 6 && 'animate-ping'} h-4 w-4 md:h-6 md:w-6 rounded-full border border-black flex-center`}><div className={` ${status >= 6 ? 'bg-orange' : 'bg-brown'} h-2 w-2 md:h-4 md:w-4 rounded-full`}></div></div>
                  <h2 className='text-center text-sm md:text-lg lg:text-xl'>Delivered</h2>
                </div>
              </div>
            }
          </div>

          {status < 7 && <div className='flex flex-col md:flex-row my-4 justify-center items-center'>
            <div className='w-full mx-auto'>
              {status === 0 && <div>
                <h1 className='text-xl md:text-2xl text-center text-brown font-bold'>Your order is being packed and  processed by the seller and will be in transit within 4-6 hours.</h1>
              </div>}

              {status === 1 && <div>
                <h1 className='text-xl md:text-2xl text-center text-brown font-bold'>Your order is processed and will be in transit soon.</h1>
              </div>}

              {status === 2 && <div>
                <h1 className='text-xl md:text-2xl text-center text-brown font-bold'>Your order is in transit and will be dispatched soon.</h1>
              </div>}

              {status === 3 && <div>
                <h1 className='text-xl md:text-2xl text-center text-brown font-bold'>Your order is dispatched by the seller and will soon reach the nearest delivery point.</h1>
              </div>}

              {status === 4 && <div>
                <h1 className='text-xl md:text-2xl text-center text-brown font-bold'>Your order has been shipped to the {user?.address?.city} delivery point nearest to you. </h1>
              </div>}

              {status === 5 && <div className='flex gap-4 justify-center items-center'>
                <h1 className='text-xl md:text-2xl text-center text-brown font-bold'>Your order is out for delivery for {user?.address?.lane1}, {user?.address?.lane2}, {user?.address.city} </h1>
                <img src={error} alt="out" className='h-4 w-4 animate-ping' />
              </div>}
              {status === 6 && <div className='flex gap-4 justify-center items-center' >
                <h1 className='text-xl md:text-2xl text-center text-brown font-bold'>Your order has been delivered to you. ❤️ </h1>
                <img src={tick1} alt="out" className='h-8 w-8' />
              </div>}

            </div>
          </div>}

          {status < 6 && <div className='flex flex-col md:flex-row my-4 justify-center items-center'>
            <h1 className=' text-brown text-xl md:text-2xl  font-semibold ' >Expected delivery date: </h1>
            <h1 className=' text-xl md:text-2xl ml-4 font-bold text-green-700 ' >{deliveryDate(order.date)} within 9 PM</h1>
          </div>}

          {status < 6 && <div>
            <h2 onClick={cancelOrder} className='text-xl bg-brown min-w-fit w-[40%] md:w-[30%] xl:w-[20%] cursor-pointer hover:bg-darkbrown hover:font-bold mb-3 mx-auto mt-6 text-white px-4 py-2 rounded-2xl md:my-auto font-semibold text-center'>Cancel my order</h2>
          </div>}

        </div>
      </div>
  )
}

export default MyOrder
