import sun from '../assets/svgs/sun.svg'
import logo from '../assets/svgs/logo.svg'
import shop from '../assets/svgs/navbar/shop.svg'
import quick from '../assets/svgs/navbar/quick.svg'
import baked from '../assets/svgs/navbar/baked.svg'
import love from '../assets/svgs/navbar/love.svg'
import { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const ref = useRef();
    const rotate = () => ref.current.classList.toggle('rotate-[-90deg]')
    const rotate1 = () => ref.current.classList.add('rotate-[-90deg]')
    const goToHomePage = () => location.pathname !== '/' && navigate('/');


    return (
        <div className="flex select-none">

            <div className="w-[60vw] h-[64px] lg:h-[92px] bg-orange rounded-br-full flex items-center relative">
                <img src={logo} alt="Vegan" className='h-16 cursor-pointer' onClick={goToHomePage} />
                <h1 className="font-bold text-2xl lg:text-3xl">Vegans Corner</h1>
            </div>

            <div className='fixed w-[100vw] h-[256px] flex justify-end overflow-hidden'>
            <div className='flex absolute transition-all translate-x-1/2 -translate-y-1/2 scale-50 md:scale-75 lg:scale-100 xl:scale-110'>
                <div className='group flex transition-all ' onClick={rotate}>
                    <div className=" w-[256px] h-[256px] bg-yellow-200 relative rounded-full md:group-hover:rotate-[-90deg] transition-all duration-300 flex justify-center items-center " ref={ref}>

                        <img src={sun} alt="market" className='h-48 w-48' />

                        <div className="flex-center rounded-full absolute w-[48px] h-[48px] bg-brown left-[72px] top-[-48px] hover:scale-150 transition-all group/1"  onClick={rotate1} > 
                            <h2 className='bg-brown text-white font-bold text-sm px-2 py-1 rotate-90 rounded-2xl absolute -translate-y-[250%] hidden group-hover/1:block'>Categories</h2>
                            <img src={shop} alt="❤️" className='h-8 w-8 rotate-90 ' />
                        </div>

                        <div className="flex-center rounded-full absolute w-[48px] h-[48px] bg-brown left-[-30px]  top-[12px]  hover:scale-150 transition-all group/2"  onClick={rotate1}>
                            <h2 className='bg-brown text-white font-bold text-sm px-2 py-1 rotate-90 rounded-2xl absolute -translate-y-[250%] hidden group-hover/2:block'>Cooked</h2>                        
                            <img src={quick} alt="❤️" className='h-8 w-8 rotate-90 ' />
                        </div>

                        <div className="flex-center rounded-full absolute w-[48px] h-[48px] bg-brown left-[12px]   top-[-30px] hover:scale-150 transition-all group/3"  onClick={rotate1}>
                            <h2 className='bg-brown text-white font-bold text-sm px-2 py-1 rotate-90 rounded-2xl absolute -translate-y-[130%] hidden group-hover/3:block'>Quick food</h2>                        
                            <img src={baked} alt="❤️" className='h-8 w-8 rotate-90 ' />
                        </div>

                        <div className="flex-center rounded-full absolute w-[48px] h-[48px] bg-brown left-[-48px]  top-[72px]  hover:scale-150 transition-all group/4"  onClick={rotate1}>
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