import React, { useEffect, useState } from 'react'
import signupbg from "../assets/images/SIGNUP-BG.jpeg"
import error from "../assets/svgs/error.svg"
import call from "../assets/svgs/call.svg"
import user from "../assets/svgs/call.svg"
import closedeyes from "../assets/svgs/closedeyes.svg"
import openedeyes from "../assets/svgs/openedeyes.svg"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../redux/slices/userSlice'
import { config } from '../lib/config'


const SignUp = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAvailable = useSelector(state => state.user.user)

  useEffect(() => {
    if (userAvailable?.name) navigate('/');
  }, [window.onload])


  const [step, setStep] = useState(1) //1 for name email mobile, 2 for password, 3 for address
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('') //To confirm password
  const [line1, setline1] = useState('')
  const [line2, setline2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pincode, setPincode] = useState('')

  const [passHidden, setPassHidden] = useState(true) //To hide password
  const [validCreds, setValidCreds] = useState(true) //To check name mobile email

  const [valid1, setValid] = useState('') //To check email after checking from server
  // const [valid2, setValid2] = useState('') //To check password
  const [valid3, setValid3] = useState('') //To check address


  const submit1 = async () => {
    if (email.length < 3 || !emailFormatChecker(email) || mobile.length !== 10 || mobile?.slice(0, 1) === 0 || firstName.length < 3) {
      setValidCreds(false)
      setTimeout(() => {
        setValidCreds(true)
      }, 3000);
      return;
    }


    const API = config.server
    const SERVER_SECRET = config.serverSecret
    try {
      const r = await fetch(`${API}/api/user/checkemail`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'secret': SERVER_SECRET
        },
        body: JSON.stringify({ email })
      })
      const d = await r.json();
      if (d.success === false) {
        console.log(d)
        setValid(d.error)
        setTimeout(() => {
          setValid('')
        }, 5000);
        return;
      }
      setStep(2);
    } catch (error) {
      console.log(error)
    }
  }

  const submit2 = () => {
    setStep(3);
  }

  const submit3 = async () => {
    if (line1.length < 3) {
      setValid3("Invalid House no./ Flat no./ Block")
      setTimeout(() => {
        setValid3('')
      }, 3000);
      return;
    }
    else if (line2.length < 3) {
      setValid3("Invalid Road/ Area")
      setTimeout(() => {
        setValid3('')
      }, 3000);
      return;
    }
    else if (city.length < 3) {
      setValid3("Invalid City / Village")
      setTimeout(() => {
        setValid3('')
      }, 3000);
      return;
    }
    else if (state.length < 3) {
      setValid3("Invalid State")
      setTimeout(() => {
        setValid3('')
      }, 3000);
      return;
    }
    else if (pincode.length !== 6) {
      setValid3("Invalid Pincode")
      setTimeout(() => {
        setValid3('')
      }, 3000);
      return;
    }
    const API = config.server
    const SERVER_SECRET = config.serverSecret

    const response = await fetch(`${API}/api/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'secret': SERVER_SECRET
      },
      body: JSON.stringify({
        name: `${firstName} ${lastName}`, mobile, email, password: password1, address: {
          line1, line2, city, state, pincode
        }
      })
    })

    const data = await response.json();
    if (data.success === false) {
      setValid3(data.error)
      setTimeout(() => {
        setValid3('')
      }, 5000);
      return;
    } else {
      localStorage.setItem('authy', data.authToken);
      dispatch(updateUser());
      navigate('/');
      window.location.reload();
    }
  }

  const emailFormatChecker = (email) => {
    if (email.length === 0) return true;
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const changeMobile = (e) => {
    if (e.target.value.slice(-1) >= '0' && e.target.value.slice(-1) <= '9') setMobile(e.target.value)
    else if (e.target.value.length === 0) setMobile('')
  }

  const changePincode = (e) => {
    if (e.target.value.slice(-1) >= '0' && e.target.value.slice(-1) <= '9') setPincode(e.target.value)
    else if (e.target.value.length === 0) setPincode('')
  }

  return (
    <div className='flex justify-center items-center h-[90vh] w-screen gap-6 lg:gap-12 xl:gap-20'>
      <div className='w-fit'>
        <img src={signupbg} alt="LOGIN BACKGROUND" className='rounded-3xl w-0 md:block md:w-[40vw] lg:w-[30vw]' />
      </div>

      <div className='w-[40vw] h-[80vh] md:h-[70vh] lg:h-[60vh]'>
        <div className='flex flex-col justify-center items-center h-full'>

          <h2 className='ml-4 font-semibold font-janime tracking-widest text-brown text-[5vw] md:text-[3.2vw] text-center mb-12'>WELCOME !</h2>
          <h3 className='ml-4 font-semibold font-janime tracking-widest text-brown text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center mb-8'>SIGN UP</h3>

          {step === 1 ?
            <form action="submit " className='flex flex-col'>
              <div className='flex gap-2 justify-around my-2'>
                <img src={user} alt="user" className='hidden xl:block h-10 ml-4' />
                <input type="text" id="name" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder='First Name' className='border-2 border-brown focus:ring-4 ring-orange h-12 w-[30vw] md:w-[20vw] lg:w-[15vw] rounded-2xl px-4 py-2' />
                <input type="text" id="name" value={lastName} onChange={e => setLastName(e.target.value)} placeholder='Last Name' className='border-2 border-brown focus:ring-4 ring-orange h-12 w-[30vw] md:w-[20vw] lg:w-[15vw] rounded-2xl px-4 py-2' />
              </div>

              <div className='flex gap-2 items-center justify-around my-2 mx-auto'>
                <h2 className='ml-4 text-4xl font-bold text-orange font-cavo group'>@</h2>
                <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' className='border-2 ml-2 border-brown focus:ring-4 ring-orange h-12 w-[40vw] md:w-[30vw] rounded-2xl px-4 py-2' />
              </div>
              <label htmlFor="email" className='font-semibold text-center mb-4 text-red-600'>{!emailFormatChecker(email) && "Invalid email"}</label>

              <div className='flex gap-2 items-center justify-around mx-auto'>
                <img src={call} alt="Mobile" className='h-10 ml-4' />
                <input type="text" id="mobile" value={mobile} onKeyDown={e => e.key === 'Enter' && submit1()} onChange={e => changeMobile(e)} placeholder='Mobile no.' className='border-2 border-brown focus:ring-4 ring-orange h-12 w-[40vw] md:w-[30vw] rounded-2xl px-4 py-2' />
              </div>

              <div className='ml-4 flex flex-col items-center mt-2 md:mt-4 w-full'>
                <div className={` ${validCreds && 'hidden'} flex gap-6 items-center `}>
                  <img src={error} alt="error" className='h-4 w-4 md:h-6 md:w-6 animate-ping' />
                  <h2 className='text-red-700 font-bold'>Invalid name, email or mobile</h2>
                </div>
                <div className={` ${valid1 === '' && 'hidden'} mt-2 flex gap-6 items-center `}>
                  <img src={error} alt="error" className='h-4 w-4 md:h-6 md:w-6 animate-ping' />
                  <h2 className='text-red-700 text-center font-bold'>{valid1}</h2>
                </div>
                <h2 className=' cursor-pointer w-[100%] text-end transition-all hover:text-purple-700 mx-2 text-orange font-bold' onClick={() => navigate('/signin')}>Already a User? SIGNIN</h2>
                <h2 className=' cursor-pointer w-[100%] text-end transition-all hover:text-purple-700 mx-2 text-orange font-bold' onClick={() => window.open('https://veganseller.princekb.tech', '_blank', 'noopener')}>SELLER SIGNUP</h2>
                <div onClick={submit1} className='mt-4 bg-brown hover:scale-105 cursor-pointer transition-all hover:bg-lightBrown mx-2 rounded-2xl px-4 py-2 text-white font-bold '>NEXT &#8702;</div>
              </div>
            </form> : step === 2 ?


              <form className=''>
                <div className='flex gap-4 justify-center my-2'>
                  <h2 className='text-brown font-bold text-xl'>PASSWORD</h2>
                  <img src={passHidden ? closedeyes : openedeyes} alt="eyes" className='cursor-pointer bg-orange rounded-[50%] h-8 w-8' onClick={() => { setPassHidden(false); setTimeout(() => setPassHidden(true), 1500) }} />
                </div>

                <div className='flex gap-2 items-center justify-around mx-auto my-2'>
                  <input type={passHidden ? 'password' : 'text'} id="password1" value={password1} onChange={e => setPassword1(e.target.value)} placeholder='Create password' className='border-2 border-brown focus:ring-4 ring-orange h-12 w-[40vw] md:w-[30vw] rounded-2xl px-4 py-2' />
                </div>

                <div className={` ${password1.length > 0 && password1.length < 6 ? 'flex' : 'hidden'} my-4 gap-6 items-center justify-center`}>
                  <img src={error} alt="error" className='h-4 w-4 md:h-6 md:w-6 animate-ping' />
                  <h2 className='text-red-700 text-center font-bold'>"Weak password"</h2>
                </div>

                <div className='flex gap-2 items-center justify-around mx-auto'>
                  <input onKeyDown={e => e.key === 'Enter' && submit2()} type={passHidden ? 'password' : 'text'} id="password2" value={password2} onChange={e => setPassword2(e.target.value)} placeholder='Confirm password' className='border-2 border-brown focus:ring-4 ring-orange h-12 w-[40vw] md:w-[30vw] rounded-2xl px-4 py-2' />
                </div>

                <div onClick={submit2} className={`${password1.length > 5 && password1 === password2 ? 'flex' : 'hidden'} justify-center mt-4 w-[20vw] md:w-[10vw] lg:w-[7vw] mx-auto bg-brown hover:scale-105 cursor-pointer transition-all hover:bg-lightBrown rounded-2xl px-4 py-2 text-white font-bold `}>NEXT &#8702;</div>

              </form> :


              <form>
                <div className='flex gap-2 items-center justify-center mx-auto my-2'>
                  <h2 className='text-2xl'>🏠</h2>
                  <input type='text' id="line1" value={line1} onChange={e => setline1(e.target.value)} placeholder='House no./ Flat no./ Block' className='border-2 border-brown focus:ring-4 ring-orange h-12 w-[40vw] md:w-[30vw] rounded-2xl px-4 py-2' />
                </div>
                <div className='flex gap-2 items-center justify-center mx-auto my-2'>
                  <h2 className='text-2xl'>🛣️</h2>
                  <input type='text' id="line2" value={line2} onChange={e => setline2(e.target.value)} placeholder='Road/ Area' className='border-2 border-brown focus:ring-4 ring-orange h-12 w-[40vw] md:w-[30vw] rounded-2xl px-4 py-2' />
                </div>

                <div className='flex flex-col gap-2 md:flex-row'>
                  <div className='flex gap-2 items-center justify-around mx-auto my-2'>
                    <input type='text' id="city" value={city} onChange={e => setCity(e.target.value)} placeholder='City / Village' className='border-2 border-brown focus:ring-4 ring-orange h-12 w-[40vw] md:w-[20vw] rounded-2xl px-4 py-2' />
                  </div>
                  <div className='flex gap-2 items-center justify-around mx-auto my-2'>
                    <input type='text' id="state" value={state} onChange={e => setState(e.target.value)} placeholder='State' className='border-2 border-brown focus:ring-4 ring-orange h-12 w-[40vw] md:w-[20vw] rounded-2xl px-4 py-2' />
                  </div>
                </div>

                <div className='flex gap-2 items-center justify-around mx-auto my-2'>
                  <input onKeyDown={e => e.key === 'Enter' && submit3()} type='text' id="pincode" value={pincode} onChange={changePincode} placeholder='Area Pincode' className='border-2 border-brown focus:ring-4 ring-orange h-12 w-[40vw] md:w-[30vw] rounded-2xl px-4 py-2' />
                </div>

                <div className={` ${valid3 === '' ? 'hidden' : 'flex'} my-4 gap-6 items-center justify-center`}>
                  <img src={error} alt="error" className='h-4 w-4 md:h-6 md:w-6 animate-ping' />
                  <h2 className='text-red-700 text-center font-bold'>{valid3}</h2>
                </div>

                <div onClick={submit3} className={`flex justify-center mt-4 w-[20vw] md:w-[10vw] lg:w-[7vw] mx-auto bg-brown hover:scale-105 cursor-pointer transition-all hover:bg-lightBrown rounded-2xl px-4 py-2 text-white font-bold `}>NEXT &#8702;</div>


              </form>
          }
        </div>
      </div>

    </div>
  )
}

export default SignUp
