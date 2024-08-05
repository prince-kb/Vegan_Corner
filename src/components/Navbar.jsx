import wheel from '../assets/svgs/wheel.svg'
import logo from '../assets/svgs/logo.svg'
import shop from '../assets/svgs/navbar/shop.svg'
import quick from '../assets/svgs/navbar/quick.svg'
import baked from '../assets/svgs/navbar/baked.svg'
import love from '../assets/svgs/navbar/love.svg'
import user from '../assets/svgs/navbar/user.svg'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


const Navbar = () => {

    const [opened, setOpened] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const ref = useRef();
    const rotate = () => ref.current.classList.toggle('rotate-[-90deg]')
    const rotate1 = () => ref.current.classList.add('rotate-[-90deg]')
    const goToHomePage = () => location.pathname !== '/' && navigate('/');

    useEffect(() => {
        gsap.to('#toolbox', { x: !opened ? "-80vw" : "-10vw", duration: 0.3, ease: 'power1.inOut' })
    }, [opened])


    return (
        <div className="flex select-none">
 
            <div className="w-fit px-4 pr-10 h-[64px] lg:h-[92px] bg-orange rounded-br-full flex items-center relative z-[2]">
                <img src={logo} alt="Vegan" className='h-8 md:h-12 lg:h-16 cursor-pointer' onClick={goToHomePage} />
                <h1 className="font-bold font-janime tracking-wider text-2xl md:text-3xl lg:text-4xl ml-2 lg:ml-4">Vegan's Corner</h1>
            </div>

            <div className="relative h-fit w-fit z-[4]">
                <div className='group h-[64px] lg:h-[92px] w-fit flex rounded-full bg-orange justify-center cursor-pointer items-center p-6' onClick={() => setOpened(!opened)} onMouseEnter={() => setOpened(!opened)} >
                    <img src={user} alt="user" className='h-10 w-10' />
                </div>
                <div id='toolbox' className="z-[5] absolute gap-4 shadow-black shadow-2xl  rounded-3xl bg-[#eca042f1]" onClick={() => setOpened(!opened)}>
                    <div className='flex flex-col justify-between items-center min-h-[60vh] md:min-h-[30vh] min-w-[30vw]'>
                        <div className='flex items-center w-full justify-center mt-4 border-b-2 pb-4'>
                            <div className='h-12 w-12 mr-8 bg-brown rounded-full' />
                            <div className='font font-newWalto tracking-widest text-2xl'>YOUR NAME</div>
                        </div>

                        <div className='mx-auto flex mb-4 items-center'>
                            <div className='bg-brown hover:scale-105 cursor-pointer transition-all hover:bg-lightBrown  mx-2 rounded-2xl px-4 py-2 text-white font-bold' onClick={()=>navigate('login')}>LOGIN</div>
                            <div className='bg-brown hover:scale-105 cursor-pointer transition-all hover:bg-lightBrown  mx-2 rounded-2xl px-4 py-2 text-white font-bold'>SIGNUP</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='fixed w-[100vw] h-[256px] flex justify-end overflow-hidden'>
                <div className='flex absolute transition-all translate-x-1/2 -translate-y-1/2 scale-50 md:scale-75 lg:scale-100 xl:scale-110'>
                    <div className='group flex transition-all ' onClick={rotate}>
                        <div className=" w-[256px] h-[256px] bg-orange relative rounded-full md:group-hover:rotate-[-90deg] transition-all duration-300 flex justify-center items-center " ref={ref}>

                            <img src={wheel} alt="market" className='h-64 w-64' />

                            <div className="flex-center rounded-full absolute w-[48px] h-[48px] bg-brown left-[72px] top-[-48px] hover:scale-150 transition-all group/1" onClick={rotate1} >
                                <h2 className='bg-brown text-white font-bold text-sm px-2 py-1 rotate-90 rounded-2xl absolute -translate-y-[250%] hidden group-hover/1:block'>Categories</h2>
                                <img src={shop} alt="❤️" className='h-8 w-8 rotate-90 ' />
                            </div>

                            <div className="flex-center rounded-full absolute w-[48px] h-[48px] bg-brown left-[-30px]  top-[12px]  hover:scale-150 transition-all group/2" onClick={rotate1}>
                                <h2 className='bg-brown text-white font-bold text-sm px-2 py-1 rotate-90 rounded-2xl absolute -translate-y-[250%] hidden group-hover/2:block'>Cooked</h2>
                                <img src={quick} alt="❤️" className='h-8 w-8 rotate-90 ' />
                            </div>

                            <div className="flex-center rounded-full absolute w-[48px] h-[48px] bg-brown left-[12px]   top-[-30px] hover:scale-150 transition-all group/3" onClick={rotate1}>
                                <h2 className='bg-brown text-white font-bold text-sm px-2 py-1 rotate-90 rounded-2xl absolute -translate-y-[130%] hidden group-hover/3:block'>Quick food</h2>
                                <img src={baked} alt="❤️" className='h-8 w-8 rotate-90 ' />
                            </div>

                            <div className="flex-center rounded-full absolute w-[48px] h-[48px] bg-brown left-[-48px]  top-[72px]  hover:scale-150 transition-all group/4" onClick={rotate1}>
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