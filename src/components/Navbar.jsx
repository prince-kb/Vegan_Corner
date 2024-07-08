import sun from '../assets/svgs/sun.svg'
import logo from '../assets/svgs/logo.svg'
import shop from '../assets/svgs/navbar/shop.svg'
import quick from '../assets/svgs/navbar/quick.svg'
import baked from '../assets/svgs/navbar/baked.svg'
import love from '../assets/svgs/navbar/love.svg'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
    const navigate = useNavigate();
    const ref = useRef(null);
    const rotate = () => ref.current.classList.toggle('rotate-[-90deg]')
    const goToHomePage = () => navigate('/'); // Function to navigate to homepage


    return (
        <div className="flex overflow-x-hidden">
            <div className="w-[60vw] h-[92px] bg-orange rounded-br-full flex  items-center">
                <img src={logo} alt="Vegan" className='h-16' onClick={goToHomePage} />
                <h1 className="font-bold text-3xl">Vegans Corner</h1>
            </div>
            <div className='flex absolute right-0'>
                <div className='group flex transition-all justify-end items-start translate-x-1/2 -translate-y-1/2' onClick={rotate}>
                    <div className=" w-[256px] h-[256px] bg-yellow-200 relative rounded-full md:group-hover:rotate-[-90deg] transition-all duration-300 flex justify-center items-center " ref={ref}>
                        <img src={sun} alt="market" className='h-48 w-48' />

                        <div className="flex-center rounded-full absolute w-[48px] h-[48px] bg-brown left-[72px] top-[-48px] hover:scale-150 transition-all group/1">
                            <h2 className='bg-brown text-white font-bold text-sm px-2 py-1 rotate-90 rounded-2xl absolute -translate-y-[250%] hidden group-hover/1:block'>Categories</h2>
                            <img src={shop} alt="❤️" className='h-8 w-8 rotate-90 ' />
                        </div>

                        <div className="flex-center rounded-full absolute w-[48px] h-[48px] bg-brown left-[-30px]  top-[12px]  hover:scale-150 transition-all group/2">
                            <h2 className='bg-brown text-white font-bold text-sm px-2 py-1 rotate-90 rounded-2xl absolute -translate-y-[250%] hidden group-hover/2:block'>Cooked</h2>                        
                            <img src={quick} alt="❤️" className='h-8 w-8 rotate-90 ' />
                        </div>

                        <div className="flex-center rounded-full absolute w-[48px] h-[48px] bg-brown left-[12px]   top-[-30px] hover:scale-150 transition-all group/3">
                            <h2 className='bg-brown text-white font-bold text-sm px-2 py-1 rotate-90 rounded-2xl absolute -translate-y-[150%] hidden group-hover/3:block'>Quick Food</h2>                        
                            <img src={baked} alt="❤️" className='h-8 w-8 rotate-90 ' />
                        </div>

                        <div className="flex-center rounded-full absolute w-[48px] h-[48px] bg-brown left-[-48px]  top-[72px]  hover:scale-150 transition-all group/4">
                            <h2 className='bg-brown text-white font-bold text-sm px-2 py-1 rotate-90 rounded-2xl absolute -translate-y-[250%] hidden group-hover/4:block'>Wishlist</h2>                        
                            <img src={love} alt="❤️" className='h-8 w-8 rotate-90 ' />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar