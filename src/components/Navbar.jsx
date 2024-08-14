import wheel from '../assets/svgs/wheel.svg'
import logo from '../assets/svgs/logo.svg'
import shop from '../assets/svgs/navbar/shop.svg'
import quick from '../assets/svgs/navbar/quick.svg'
import baked from '../assets/svgs/navbar/baked.svg'
import love from '../assets/svgs/navbar/love.svg'
import logoutsvg from '../assets/svgs/navbar/logout.svg'
import usersvg from '../assets/svgs/navbar/user.svg'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import gsap from 'gsap'
import { setUser } from '../redux/slices/userSlice'
import { setNotification } from '../redux/slices/notificationSlice'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger) 


const Navbar = () => {
    const user = useSelector(state => state.user.user);
    const [opened, setOpened] = useState(false); //To check if toolbox is opened

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const ref = useRef();
    const ref1 = useRef();
    
    const rotate = () => ref.current.classList.toggle('rotate-[-90deg]')
    const rotate1 = () => ref.current.classList.add('rotate-[-90deg]')
    const goToHomePage = () => location.pathname !== '/' && navigate('/');

    const startAnim = gsap.timeline({
        onStart: () => {
            document.getElementById('sun').style.overflow = 'visible'
            document.getElementById('sun').style.zIndex = '10'
            document.querySelectorAll('.stars').forEach((star) => star.style.display = 'none')
            ref1.current.classList.add('sunshadow')
        },
        onComplete: () => {
            setTimeout(() => {
                document.getElementById('sun').style.overflow = 'hidden'
                document.getElementById('sun').style.zIndex = '1'
                document.querySelectorAll('.stars').forEach((star) => star.style.display = 'flex')
                ref1.current.classList.remove('sunshadow')
            }, 3000)
        }
    })

    useEffect(() => {
        gsap.from("#tool2", { x: '-50vw', duration: 2, delay: 1, ease: 'power2.out' })
        gsap.from("#tool1", { x: '-100%', duration: 2, delay: 1, ease: 'power2.out' })
        startAnim.from('#sun', { x: '-100%', y: '60vh', duration: 2, ease: 'power2.out' })
        startAnim.from('#wheel', { rotate: '-300deg', duration: 2, ease: 'cubic-bezier(0.12, 0, 0.39, 0)' }, '<')

        gsap.to('.sunImage',{
            scrollTrigger: {
                trigger: '#sun',
                start: 'top center',
                end: 'bottom center',
                scrub: 1,
            },
            rotate: '180deg',
            duration: 5,
            ease: 'linear'
        })
        


    }, [window.onload])

    const logout=()=>{
        localStorage.removeItem('authy');
        dispatch(setUser(null));
        dispatch(setNotification({message:'Logged out successfully',type:'success',logo:'tick'}))
        window.location.reload(false);
    }

    return (
        <div className="flex select-none" onClick={() => opened && setOpened(false)}>

            <div id="tool1"  onClick={goToHomePage} className=" w-fit px-4 cursor-pointer md:pr-6 lg:pr-10 h-[64px] lg:h-[92px] bg-orange rounded-br-full flex items-center relative z-[3]">
                <img src={logo} alt="Vegan" className='h-8 md:h-12 lg:h-16' />
                <h1 className="font-bold font-janime tracking-wider text-xl md:text-2xl lg:text-3xl xl:text-4xl ml-2 lg:ml-4">Vegan's Corner</h1>
            </div>

            <div id="tool2" className="group/xx relative h-fit w-fit z-[3] flex justify-center">
                <div className={`h-[64px] w-[64px] lg:h-[92px] lg:w-[92px] flex rounded-full bg-orange justify-center cursor-pointer items-center `} onMouseEnter={() => { if (!opened) setOpened(!opened) }} onClick={() => setOpened(!opened)}  >
                    <div className='h-[80%] w-[80%] bg-brown rounded-full flex-center'>
                        {user?.name ? <h2 className='text-yellow-300 font-peach text-4xl md:text-3xl lg:text-4xl'>{user.name.slice(0, 1)}</h2> :
                            <img src={usersvg} alt="user" className='h-[80%] fill-white bg-brown rounded-full' />}
                    </div>
                </div>

                <div id='toolbox' className=" group-hover/xx:translate-x-0 translate-x-[-150vw] sm:translate-x-[-100vw] transition-all translate-y-[64px] lg:translate-y-[92px] z-[5] absolute gap-4 shadow-brown shadow-2xl rounded-3xl bg-[#eca042f1]" onClick={() => setOpened(!opened)}>
                    <div className='flex flex-col justify-between items-center min-h-[50vh] md:min-h-[30vh] min-w-[60vw] md:min-w-[40vw] lg:min-w-[25vw] '>
                        <div className='flex items-center w-full justify-around gap-2 md:gap-4 mt-4 border-b-2 ml-2 pb-2'>
                            {user?.name && <div className='h-2 w-2 bg-transparent' />}
                            <div className='font font-bubble text-white tracking-wider text-xl md:text-2xl'>{user?.name ? user.name.split(' ')[0] : 'WELCOME'}</div>
                            {user?.name &&
                                <img src={logoutsvg} alt="user" className='cursor-pointer hover:scale-110  transition-all hover:translate-x-1 h-8 w-8 stroke-white fill-white' onClick={logout} />
                            }
                        </div>

                        {user?.name ? <div className='mx-auto flex mb-4 items-center w-fit'>
                            <div className='text-sm md:text-base bg-darkbrown hover:scale-105 cursor-pointer transition-all hover:bg-brown mx-1 rounded-xl px-2 py-1 md:px-4 md:py-2 text-white font-bold' onClick={() => navigate('cart')}>CART ({user?.cart?.length ? user.cart.length : 0})</div>
                            <div className='text-sm md:text-base bg-darkbrown hover:scale-105 cursor-pointer transition-all hover:bg-brown mx-1 rounded-xl px-2 py-1 md:px-4 md:py-2 text-white font-bold' onClick={() => navigate('wishlist')}>WISHLIST ({user?.wishlist?.length ? user.wishlist.length : 0}) </div>
                        </div> :
                            <div className='mx-auto flex mb-4 items-center w-fit'>
                                <div className='text-sm md:text-base bg-darkbrown hover:scale-105 cursor-pointer transition-all hover:bg-brown mx-1 rounded-xl px-2 py-1 md:px-4 md:py-2 text-white font-bold' onClick={() => navigate('signin')}>LOGIN &#8702;</div>
                                <div className='text-sm md:text-base bg-darkbrown hover:scale-105 cursor-pointer transition-all hover:bg-brown mx-1 rounded-xl px-2 py-1 md:px-4 md:py-2 text-white font-bold' onClick={() => navigate('signup')}>SIGNUP &#8702; </div>
                            </div>}
                    </div>
                </div>
            </div>

            <div id="sun" className='fixed h-[92px] md:h-[164px] lg:h-[256px] w-[100vw] flex justify-end '>
                <div className='flex absolute transition-all translate-x-1/2 -translate-y-1/2 scale-50 md:scale-75 lg:scale-100 xl:scale-110'>
                    <div ref={ref1} className='group flex transition-all rounded-full duration-1000' onClick={rotate}>
                        <div  className=" w-[256px] h-[256px] bg-orange relative rounded-full md:group-hover:rotate-[-90deg] transition-all duration-300 flex justify-center items-center " ref={ref}>

                            <img src={wheel} alt="market" className='sunImage h-64 w-64' id="wheel" />

                            <div onClick={()=>{navigate('/'); rotate1()}} className="cursor-pointer stars flex-center rounded-full absolute w-[48px] h-[48px] bg-brown left-[72px] top-[-48px] hover:scale-150 transition-all group/1" >
                                <h2 className='bg-brown text-white font-bold text-sm px-2 py-1 rotate-90 rounded-2xl absolute -translate-y-[250%] hidden group-hover/1:block'>Categories</h2>
                                <img src={shop} alt="❤️" className='h-8 w-8 rotate-90 ' />
                            </div>

                            <div className="cursor-pointer stars flex-center rounded-full absolute w-[48px] h-[48px] bg-brown left-[-30px]  top-[12px]  hover:scale-150 transition-all group/2" onClick={rotate1}>
                                <h2 className='bg-brown text-white font-bold text-sm px-2 py-1 rotate-90 rounded-2xl absolute -translate-y-[250%] hidden group-hover/2:block'>Cooked</h2>
                                <img src={quick} alt="❤️" className='h-8 w-8 rotate-90 ' />
                            </div>

                            <div className="cursor-pointer stars flex-center rounded-full absolute w-[48px] h-[48px] bg-brown left-[12px]   top-[-30px] hover:scale-150 transition-all group/3" onClick={rotate1}>
                                <h2 className='bg-brown text-white font-bold text-sm px-2 py-1 rotate-90 rounded-2xl absolute -translate-y-[130%] hidden group-hover/3:block'>Quick food</h2>
                                <img src={baked} alt="❤️" className='h-8 w-8 rotate-90 ' />
                            </div>

                            <div onClick={()=>{navigate('/wishlist'); rotate1()}} className="cursor-pointer stars flex-center rounded-full absolute w-[48px] h-[48px] bg-brown left-[-48px]  top-[72px]  hover:scale-150 transition-all group/4">
                                <h2 className='bg-brown text-white font-bold text-sm px-2 py-1 rotate-90 rounded-2xl absolute -translate-y-[250%] hidden group-hover/4:block'>Wishlist</h2>
                                <img src={love} alt="❤️" className='h-8 w-8 rotate-90 ' />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar