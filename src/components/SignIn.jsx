import React, { useState } from 'react'
import loginbg from "../assets/images/LOGIN-BG.jpeg"
import error from "../assets/svgs/error.svg"
const SignIn = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [valid, setValid] = useState(true)

  const submit = () => {
    if (email.length<3 || !emailFormatChecker(email) || password.length<3){
      setValid(false)
      setTimeout(() => {
        setValid(true)
      }, 3000);
      return;
    }
    
  }

  const emailFormatChecker = (email) => {
    if (email.length === 0) return true;
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  return (
    <div className='flex justify-center items-center h-[90vh] w-screen gap-6 lg:gap-12 xl:gap-20'>
      <div className='w-fit'>
        <img src={loginbg} alt="LOGIN BACKGROUND" className='rounded-3xl w-0 md:block md:w-[40vw] lg:w-[30vw]' />
      </div>

      <div className='w-[40vw] h-[80vh] md:h-[70vh] lg:h-[60vh]'>
        <div className='flex flex-col justify-center items-center h-full'>

          <h2 className='ml-4 font-semibold font-janime tracking-widest text-brown text-[3.2vw] text-center mb-12'>WELCOME BACK !</h2>
          <h3 className='ml-4 font-semibold font-janime tracking-widest text-brown text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center mb-8'>LOGIN</h3>

          <form action="submit " className='flex flex-col items-center gap-2'>
            <div className='flex gap-2 items-center'>
              <h2 className='ml-4 text-3xl font-bold text-brown group'>😊</h2>
              <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' className='border-2 border-brown focus:ring-4 ring-orange h-12 w-[60vw] md:w-[30vw] rounded-2xl px-4 py-2' />
            </div>
            <label htmlFor="email" className='font-semibold text-red-600'>{!emailFormatChecker(email) && "Invalid Email"}</label>

            <div className='flex gap-2 items-center'>
              <h2 className='ml-4 text-3xl font-bold text-brown group'>🔒</h2>
              <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' className='border-2 border-brown focus:ring-4 ring-orange h-12 w-[60vw] md:w-[30vw] rounded-2xl px-4 py-2' />
            </div>

            <div className='ml-4 flex flex-col gap-4 items-center mt-2 md:mt-4 w-full'>
              <div className={` ${valid && 'hidden'} flex gap-6 items-center `}>
                <img src={error} alt="error" className='h-4 w-4 md:h-6 md:w-6 animate-ping' />
                <h2 className='text-red-700 font-bold'>Invalid Email or Password</h2>

              </div>
              <h2 className=' cursor-pointer w-[100%] text-end transition-all hover:text-purple-700 mx-2 text-orange font-bold'>SELLER LOGIN</h2>
              <div onClick={submit} className='bg-brown hover:scale-105 cursor-pointer transition-all hover:bg-lightBrown mx-2 rounded-2xl px-4 py-2 text-white font-bold mt-0'>LOGIN</div>
            </div>

          </form>



        </div>
      </div>

    </div>
  )
}

export default SignIn
