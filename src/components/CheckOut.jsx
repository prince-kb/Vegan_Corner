import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CheckOut = () => {
  const user = useSelector(state => state.user.user)
  const navigate = useNavigate()
  return (
    user ? <div className="m-4 lg:m-8 mt-12 flex-center flex-col gap-6 ">
      <h1 className="font-bold font-bubble text-2xl md:text-3xl lg:text-4xl text-brown mb-2 ml-6 lg:ml-8 tracking-widest">CHECKOUT</h1>
      <h2 className="font-bold font-bubble text-xl md:text-2xl lg:text-3xl text-orange mb-2 ml-6 lg:ml-8 tracking-wider">WORKING ON IT! Sorry for inconvenience</h2>
      </div> : <div className="m-4 lg:m-8 mt-12 flex-center flex-col gap-6 ">
      <h1 className="font-bold font-bubble text-2xl md:text-3xl lg:text-4xl text-brown mb-2 ml-6 lg:ml-8 tracking-widest">Not logged in!</h1>
      <h2 className="font-bold font-bubble text-xl md:text-2xl lg:text-3xl text-orange mb-2 ml-6 lg:ml-8 tracking-wider">Login to continue</h2>
      <button onClick={()=>navigate('/signin')} className='text-2xl font-bold text-purple-500 hover:text-orange cursor-pointer' >LOGIN</button>
      </div>
  )
}

export default CheckOut
