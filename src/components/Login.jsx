import React from 'react'
import loginbg from "../assets/images/LOGIN-BG.jpeg"
const Login = () => {
  return (
    <div className='flex justify-center items-center h-[90vh] w-screen gap-6 lg:gap-12 xl:gap-20'>
      <div className='w-fit'>
        <img src={loginbg} alt="LOGIN BACKGROUND" className='rounded-3xl w-0 md:block md:w-[40vw]' />
      </div>

      <div className='w-[40vw] h-[80vh] md:h-[70vh] lg:h-[60vh]'>
        <div className='flex flex-col justify-center items-center h-full'>
          <div className='font-semibold font-janime tracking-widest text-brown text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center'>LOGIN</div>

          <div className='flex gap-2 border items-center'>
            <h2 className='ml-4 text-3xl font-bold text-brown'>@</h2>
            <input type="text" placeholder='Email' className=' h-12 md:h-16 w-[30vw] rounded-2xl px-4 py-2 border-none active:border-none' />
          </div>

          <div className='flex flex-col gap-4 items-center mt-4 md:mt-8'>
            <div className='bg-brown hover:scale-105 cursor-pointer transition-all hover:bg-lightBrown  mx-2 rounded-2xl px-4 py-2 text-white font-bold mt-4'>LOGIN</div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Login
