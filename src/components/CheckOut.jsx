import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CheckOut = () => {
  const user = useSelector(state => state.user.user)
  const navigate = useNavigate();

  return (
    <div>{
      !user ? <div className="m-4 lg:m-8 mt-12 flex-center flex-col gap-6 ">
        <h1 className="font-bold font-bubble text-2xl md:text-3xl lg:text-4xl text-brown mb-2 ml-6 lg:ml-8 tracking-widest">Not logged in!</h1>
        <h2 className="font-bold font-bubble text-xl md:text-2xl lg:text-3xl text-orange mb-2 ml-6 lg:ml-8 tracking-wider">Login to continue</h2>
        <button onClick={() => navigate('/signin')} className='text-2xl font-bold text-purple-500 hover:text-orange cursor-pointer' >LOGIN</button>
      </div> :
        <div className="m-4 lg:m-8 mt-12 md:flex md:gap-6 w-80% justify-center ">
          <div className='relative'>
            <h2 className='text-2xl bg-brown min-w-fit w-[50%] mx-auto text-white my-4 px-4 py-2 rounded-2xl md:my-auto font-bold text-center'>Deliver to :</h2>
            <div className='flex flex-col gap-2 ml-4 border-2 py-6 rounded-3xl px-4'>
              <div className='md:flex md:gap-2'>
                <h3 className='text-xl font-bold'>{user.name}, </h3>
                <h3 className='text-xl font-bold'>{user.mobile}</h3>
              </div>
              <div className='md:flex md:gap-4'>
                <h3 className='text-xl font-bold'>Address:</h3>
                <h3 className='text-xl font-semibold'>{user.address.line1}, {user.address.line2},</h3>
              </div>
              <div className='md:flex md:gap-2'>
                <h3 className='text-xl font-semibold'>{user.address.city}, {user.address.state}</h3>
                <h3 className='text-xl font-bold'>{user.address.pincode}</h3>
              </div>
              <div className='absolute bottom-0 right-0 -translate-x-full -translate-y-full font-bold bg-orange md:px-2 md:py-1 px-1 rounded-md hover:bg-brown hover:text-white transition-all cursor-pointer'>CHANGE</div>
            </div>
          </div>

          <h2 className='text-2xl bg-brown min-w-fit w-[60%] mx-auto text-white my-4 px-4 py-2 rounded-2xl font-bold text-center'>Payment Method</h2>
          <div className='flex flex-col gap-2 ml-4 border-2 py-6 rounded-3xl px-4 mt-4'>

            <h3 className='text-xl font-bold'>Cash on Delivery</h3>
            <h3 className='text-xl font-bold'>Pay via CARD</h3>

          </div>
        </div>
    }

    </div>


  )
}

export default CheckOut
