import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const MyOrder = () => {
  const orderId = useParams().id;
  const [order, setOrder] = useState(null);
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState(0);
  const user = useSelector(state => state.user.user);
  const catalogue = useSelector(state => state.catalogue.Catalogue)

  useEffect(() => {
    if (user) setOrder(user.orders.find((item) => item.orderId === orderId))
  }, [user, orderId])

  useEffect(() => {
    if (order && catalogue) setProduct(catalogue.find((item) => item.id === order.id))
    const st = order?.status?.toLowerCase();
    if (st) {
      if (st === 'processed') setStatus(1);
      else if (st === 'in transit') setStatus(2);
      else if (st === 'dispatched') setStatus(3);
      else if (st === 'shipped') setStatus(4);
      else if (st === 'out for delivery') setStatus(5);
      else if (st === 'delivered') setStatus(6);
    }
  }, [order])

  const showDate = (da) => {
    const d = new Date(da);
    return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
  }

  const showTime = (da) => {
    const d = new Date(da);
    return `${d.getHours()}:${d.getMinutes()}`
  }

  return (
    !order || !product ? <div className='mt-10'>
      <h1 className="font-bold font-bubble text-2xl md:text-3xl lg:text-4xl text-brown ml-6 lg:ml-8 tracking-widest text-center my-4 mb-8">Order not found!</h1>
      <h2 className="font-bold font-bubble text-xl md:text-2xl lg:text-3xl text-orange mb-2 ml-6 lg:ml-8 tracking-wider text-center">Please check your order id.</h2>
    </div> :
      <div className='flex-center flex-col mt-10'>
        <h1 className='text-center text-xl font-semibold'>Order #{order.orderId}</h1>
        <div className='w-[90vw] border py-4 rounded-xl  '>
          <h2 className=' font-bold my-2 text-center mb-4 text-2xl'>{product?.name}</h2>
          <div className='flex-col flex-center md:flex-row'>
            <img src={product?.image} alt={product?.name} className='w-40 h-40 rounded-lg' />
            <div className='md:ml-3'>
              <h2 className='text-xl text-brown font-medium'>Price: <span className='text-green-600 font-bubble'>{order.price}</span></h2>
              <h2 className='text-xl text-brown font-medium'>Quantity: <span className='font-bold'>{order.quantity}</span></h2>
              <h2 className='text-xl text-brown font-medium'>Date: <span className='font-bold'>{showDate(order.date)} at {showTime(order.date)}</span></h2>
              {order.payment && <h2 className='text-xl font-medium'>Payment mode: <span className='font-bold'>{order.payment}</span></h2>}
              {order.transaction && <h2 className='text-xl font-medium'>Quantity: <span className='font-bold'>{order.transactionId}</span></h2>}
            </div>
          </div>
          <h2 className='text-xl text-center my-4 font-semibold '>Order Status</h2>
          <div className={`hidden md:block h-6 bg-green-200 rounded-xl absolute z-[0] ${status === 0 ? 'w-[7%]' : status === 1 ? 'w-[21%]' : status === 2 ? 'w-[35%]' : status === 3 ? 'w-[49%]' : status === 4 ? 'w-[63%]' : status === 5 ? 'w-[77%]' : 'w-[100%]'} `}></div>
          <div className='flex flex-col gap-3 md:gap-0 md:flex-row justify-between '>

            <div className='md:items-center ml-[20vw] md:ml-0 flex md:flex-col md:w-[14%] gap-4 z-[1]'>
              <div className={` ${status === 0 && 'animate-ping'} h-4 w-4 md:h-6 md:w-6 rounded-full border border-black flex-center`}><div className={` bg-green-700                                   h-2 w-2 md:h-4 md:w-4 rounded-full`}></div></div>
              <h2 className='text-center text-sm md:text-lg lg:text-xl'>Order processing</h2>
            </div>
            <div className='md:items-center ml-[20vw] md:ml-0 flex md:flex-col md:w-[14%] gap-4 z-[1]'>
              <div className={` ${status === 1 && 'animate-ping'} h-4 w-4 md:h-6 md:w-6 rounded-full border border-black flex-center`}><div className={` ${status >= 1 ? 'bg-green-700' : 'bg-black'} h-2 w-2 md:h-4 md:w-4 rounded-full`}></div></div>
              <h2 className='text-center text-sm md:text-lg lg:text-xl'>Processed</h2>
            </div>
            <div className='md:items-center ml-[20vw] md:ml-0 flex md:flex-col md:w-[14%] gap-4 z-[1]'>
              <div className={` ${status === 2 && 'animate-ping'} h-4 w-4 md:h-6 md:w-6 rounded-full border border-black flex-center`}><div className={` ${status >= 2 ? 'bg-green-700' : 'bg-black'} h-2 w-2 md:h-4 md:w-4 rounded-full`}></div></div>
              <h2 className='text-center text-sm md:text-lg lg:text-xl'>In transit</h2>
            </div>
            <div className='md:items-center ml-[20vw] md:ml-0 flex md:flex-col md:w-[14%] gap-4 z-[1]'>
              <div className={` ${status === 3 && 'animate-ping'} h-4 w-4 md:h-6 md:w-6 rounded-full border border-black flex-center`}><div className={` ${status >= 3 ? 'bg-green-700' : 'bg-black'} h-2 w-2 md:h-4 md:w-4 rounded-full`}></div></div>
              <h2 className='text-center text-sm md:text-lg lg:text-xl'>Dispatched</h2>
            </div>
            <div className='md:items-center ml-[20vw] md:ml-0 flex md:flex-col md:w-[14%] gap-4 z-[1]'>
              <div className={` ${status === 4 && 'animate-ping'} h-4 w-4 md:h-6 md:w-6 rounded-full border border-black flex-center`}><div className={` ${status >= 4 ? 'bg-green-700' : 'bg-black'} h-2 w-2 md:h-4 md:w-4 rounded-full`}></div></div>
              <h2 className='text-center text-sm md:text-lg lg:text-xl'>Shipped</h2>
            </div>
            <div className='md:items-center ml-[20vw] md:ml-0 flex md:flex-col md:w-[14%] gap-4 z-[1]'>
              <div className={` ${status === 5 && 'animate-ping'} h-4 w-4 md:h-6 md:w-6 rounded-full border border-black flex-center`}><div className={` ${status >= 5 ? 'bg-green-700' : 'bg-black'} h-2 w-2 md:h-4 md:w-4 rounded-full`}></div></div>
              <h2 className='text-center text-sm md:text-lg lg:text-xl'>Out for delivery</h2>
            </div>
            <div className='md:items-center ml-[20vw] md:ml-0 flex md:flex-col md:w-[14%] gap-4 z-[1]'>
              <div className={` ${status === 6 && 'animate-ping'} h-4 w-4 md:h-6 md:w-6 rounded-full border border-black flex-center`}><div className={` ${status >= 6 ? 'bg-green-700' : 'bg-black'} h-2 w-2 md:h-4 md:w-4 rounded-full`}></div></div>
              <h2 className='text-center text-sm md:text-lg lg:text-xl'>Delivered</h2>
            </div>
          </div>
        </div>
      </div>
  )
}

export default MyOrder
